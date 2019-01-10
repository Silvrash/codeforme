import datetime
import logging
import os
import time
from collections import defaultdict

import nltk
from nltk.stem import WordNetLemmatizer
from nltk.corpus import wordnet

import pandas as pd
from nltk.corpus import stopwords
import pickle
from .config import config
from .canonicalize import Canonicalize


class Dataset(object):
    """
    This module handles all the preprocessing of the dataset
    """

    def __init__(self, generate_corpus=False):
        self.canonicalize = Canonicalize()
        # logging.basicConfig(format='%(asctime)s : %(levelname)s : %(message)s', level=logging.INFO)

        self._init_dataset()

        logging.info('Loading dataset')
        self.dataset = pd.read_pickle(config['dataset_path'])
        logging.info('Dataset loaded')

        if generate_corpus:
            self.generate_corpus()

    def _init_dataset(self):
        """create, clean and save dataset to a single pickle file"""

        # create pickle file if it doesn't exist
        if not os.path.exists(config['dataset_path']):
            logging.info('Initializing dataset')

            train = pd.read_json(
                os.path.join(os.path.dirname(os.path.abspath(__file__)),
                             "../dataset/conala-corpus/conala-train.json")).dropna()
            test = pd.read_json(
                os.path.join(os.path.dirname(os.path.abspath(__file__)),
                             "../dataset/conala-corpus/conala-test.json")).dropna()
            mined = pd.read_json(
                os.path.join(os.path.dirname(os.path.abspath(__file__)), "../dataset/conala-corpus/conala-mined.jsonl"),
                lines=True).dropna()
            mined['rewritten_intent'] = mined['intent']
            dataset = pd.concat([train, test, mined]).reset_index(drop=True)
            dataset['slot_map'] = None

            # resume from data checkpoint
            checkpoint = pd.DataFrame().reindex_like(dataset).dropna()
            checkpoint['slot_map'] = None

            # create data checkpoint file to enable resuming of preprocessing
            if os.path.exists(config['data_checkpoint']):
                checkpoint = pd.read_pickle(
                    os.path.abspath(config['data_checkpoint'])
                )

            # remove unwanted encodings from our data
            dataset = self.normalise_data(dataset, checkpoint)

            # save dataset file
            dataset.to_pickle(config['dataset_path'])
            logging.info('Initializing dataset Completed')

    def generate_corpus(self):
        """clean commands and save them to a pickle file"""

        logging.info('Generating Corpus')

        commands = self.dataset.rewritten_intent.values
        stop = set(stopwords.words('english'))
        lem = WordNetLemmatizer()
        commands = [nltk.word_tokenize(i.lower()) for i in commands if i not in stop]
        commands = [[lem.lemmatize(word, wordnet.VERB) for word in command] for command in commands]

        frequency = defaultdict(int)
        for command in commands:
            for token in command:
                frequency[token] += 1

        commands = [[token for token in command if frequency[token] > 1] for command in commands]

        with open(config['commands_path'], 'wb') as f:
            pickle.dump(commands, f)

        logging.info('Corpus generation completed')

    def normalise_data(self, dataset, checkpoint):
        """ remove unwanted encodings from data"""

        start_time = time.time()
        start_row = checkpoint.shape[0]
        for row_id in range(start_row, len(dataset)):
            snippet = dataset.snippet[row_id]
            rewritten_intent = dataset.rewritten_intent[row_id]

            normalized_intent, slot_map = self.canonicalize.canonicalize_intent(rewritten_intent)
            normalized_snippet = self.canonicalize.cononicalize_code(snippet, slot_map)

            dataset['rewritten_intent'][row_id] = normalized_intent
            dataset['snippet'][row_id] = normalized_snippet
            dataset['slot_map'][row_id] = slot_map

            logging.info('ROW_ID: %d' % row_id)
            logging.info('TIME: %s' % datetime.datetime.today().isoformat())
            logging.info("PERCENTAGE: {0:.2f}%".format((row_id / len(dataset)) * 100))
            logging.info('ELAPSED TIME: %s\n' % str(time.time() - start_time))

            checkpoint.loc[checkpoint.shape[0]] = dataset.iloc[row_id].values

            if row_id % 500 == 0:
                logging.info('CHECKPOINT: {0:.2f}%'.format((row_id / len(dataset)) * 100))
                checkpoint.to_pickle(config['data_checkpoint'])
                logging.info('CHECKPOINT: SAVED')

        dataset = checkpoint
        return dataset

    def load_commands(self):
        with open(config['commands_path'], 'rb') as f:
            data = pickle.loads(f.read())
            return data
