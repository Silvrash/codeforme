import logging
import os

from gensim import corpora
from gensim.models import Doc2Vec
from gensim.models.doc2vec import TaggedDocument
from random import shuffle
import multiprocessing
from collections import OrderedDict
from gensim.test.test_doc2vec import ConcatenatedDoc2Vec
import numpy as np
import statsmodels.api as sm
from random import sample
from collections import defaultdict

from .config import config
from .dataset import Dataset


class Trainer(object):

    def __init__(self):
        logging.basicConfig(
            format='%(asctime)s : %(levelname)s : %(message)s', level=logging.INFO)
        self.dataset = Dataset(generate_corpus=True)
        # if os.path.exists(config['dictionary_path']):
        # self.dictionary = self.dataset.load_dictionary()
        # self.corpus = self.dataset.load_corpus()
        # logging.debug('Loaded generated files')

        logging.debug('Training model')
        commands = self.dataset.load_commands()
        self.commands = [TaggedDocument(words=command, tags=[i])
                         for i, command in enumerate(commands)]

        self.init_model()

    def init_model(self):
        train_size = 2380
        test_size = 500
        max_epochs = 100
        vec_size = 400
        alpha = 0.05

        cores = multiprocessing.cpu_count()

        shuffle(self.commands)

        model = Doc2Vec(size=vec_size,
                        alpha=alpha,
                        min_alpha=0.0005,
                        min_count=1,
                        dm=0,
                        window=10,
                        sample=1e-3,
                        negative=5,
                        workers=cores,
                        train_lbls=False)
                        
        model.build_vocab(self.commands)

        for epoch in range(max_epochs):
            print('Epoch {0}'.format(epoch))
            model.train(self.commands,
                        total_examples=model.corpus_count,
                        epochs=model.iter)
            # decrease the learning rate
            model.alpha -= 0.0002
            # fix the learning rate, no decay
            model.min_alpha = model.alpha

        model.save(config['model_path'] + "docEmbeddings_5_clean.d2v")
        logging.info("Model Saved")


# lsi = models.LsiModel.load(lsi_model_path)
if __name__ == '__main__':
    trainer = Trainer()
