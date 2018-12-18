import logging
import os
import pandas as pd
from gensim.models import Doc2Vec
from gensim.models.doc2vec import TaggedDocument
from random import shuffle
import multiprocessing

from .config import config
from .dataset import Dataset


class Trainer(object):
    """This module handles training of the model"""

    def __init__(self):
        
        # set logging configurations
        logging.basicConfig(
            format='%(asctime)s : %(levelname)s : %(message)s', level=logging.INFO)

        # load dataset
        self.dataset = Dataset(generate_corpus=True)
        # if os.path.exists(config['dictionary_path']):
        # self.dictionary = self.dataset.load_dictionary()
        # self.corpus = self.dataset.load_corpus()
        # logging.debug('Loaded generated files')

        logging.debug('Training model')
        commands = self.dataset.load_commands()     # load commands

        self.commands = [TaggedDocument(words=command, tags=[i])
                         for i, command in enumerate(commands)]     # tag commands with a label

        self.init_model()

    def init_model(self):
        """start training model"""

        # train_size = 2380
        # test_size = 500
        max_epochs = 100
        vec_size = 400
        alpha = 0.05

        # get number of cpu cores to enable multi-threaded training
        cores = multiprocessing.cpu_count()

        # shuffle commands to reduce model bias
        shuffle(self.commands)

        # create doc2vec model instance
        model = Doc2Vec(vector_size=vec_size,
                        alpha=alpha,
                        min_alpha=0.0005,
                        min_count=1,
                        dm=0,
                        window=10,
                        sample=1e-3,
                        negative=5,
                        workers=cores,
                        train_lbls=False)
                        
        # build model vocabs
        model.build_vocab(self.commands)

        # start training
        for epoch in range(max_epochs):
            print('Epoch {0}'.format(epoch))
            model.train(self.commands,
                        total_examples=model.corpus_count,
                        epochs=model.iter)
            # decrease the learning rate
            model.alpha -= 0.0002
            # fix the learning rate, no decay
            model.min_alpha = model.alpha

        # save model
        model.save(config['model_path'] + "docEmbeddings_5_clean.d2v")
        logging.info("Model Saved")


    def score(self):
        """get model accuracy"""

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
    trainer = Trainer()
