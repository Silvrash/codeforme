import logging

import nltk
from gensim.models import Doc2Vec
import numpy as np
from gensim.test.test_doc2vec import ConcatenatedDoc2Vec
import os
import pandas as pd
from .config import config
from sklearn.linear_model import LogisticRegression
from .dataset import Dataset


class PyBot(object):

    def __init__(self):
        # logging.basicConfig(format='%(asctime)s : %(levelname)s : %(message)s', level=logging.INFO)
        self.data = Dataset()

        # if os.path.exists(config['dictionary_path']):
        #     self.dictionary: corpora.Dictionary = self.data.load_dictionary()
        #     self.corpus: MmCorpus = self.data.load_corpus()
        #     logging.debug('Loaded generated files')
        # else:
        #     logging.error('Please run \'dataset.py\' first')

        # self.lsi = models.LsiModel.load(config['lsi_model_path'])
        self.model = Doc2Vec.load(config['model_path'] + "docEmbeddings_5_clean.d2v")

    def predict(self, query):
        query = query.lower().split()
        v1 = self.model.infer_vector(query)
        # print("V1_infer", v1)

        similar_doc = self.model.docvecs.most_similar([v1])

        predictions = []
        intents = []
        for index, accuracy in similar_doc:
            if self.data.dataset.rewritten_intent.values[int(index)] in intents:
                continue
            prediction = {
                'command': self.data.dataset.rewritten_intent.values[int(index)],
                'snippet': self.data.dataset.snippet.values[int(index)],
                'accuracy': accuracy
            }
            predictions.append(prediction)
            intents.append(self.data.dataset.rewritten_intent.values[int(index)])
        return predictions

    def score(self):
        test_size = 500
        train_size = 2380
        test_data = pd.read_json(
                os.path.join(os.path.dirname(os.path.abspath(__file__)), "../dataset/conala-test.json")).dropna()
        overall_accuracy = []

        for i in range(len(test_data)):
            query = test_data.rewritten_intent.values[i]
            predictions = self.predict(query)
            accuracy = [item['accuracy'] for item in predictions[:3]]
            accuracy = sum(accuracy) / float(len(accuracy))
            overall_accuracy.append(accuracy)

        overall_accuracy = sum(overall_accuracy) / float(len(overall_accuracy))
        print('Model accuracy: {}'.format(overall_accuracy))
        return overall_accuracy


if __name__ == '__main__':
    import argparse
    import json
    parser = argparse.ArgumentParser()
    parser.add_argument('-intent')
    args = parser.parse_args()
    if args.intent is None:
        print('Expected argument -intent')
        exit()
    
    pybot = PyBot()
    predictions = pybot.predict(args.intent)
    print(json.dumps(predictions, indent=1))
    # pybot.score()
    # problem statement
    # proposed solution
    # methodology
    # finalised solution