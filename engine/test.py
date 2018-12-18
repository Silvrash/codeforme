import logging

import nltk
from gensim.models import Doc2Vec
import os
import json
import pandas as pd
from .config import config
from .dataset import Dataset
from .canonicalize import Canonicalize


class PyBot(object):

    def __init__(self):
        # logging.basicConfig(format='%(asctime)s : %(levelname)s : %(message)s', level=logging.INFO)

        # load dataset
        self.data = Dataset()

        # load weights of saved model
        self.model = Doc2Vec.load(config['model_path'] + "docEmbeddings_5_clean.d2v")

    def predict(self, query):
        """handle predictions"""

        query = query.lower().split()   # tokenise input
        v1 = self.model.infer_vector(query) # vectorize query by making an inference on the model

        similar_doc = self.model.docvecs.most_similar([v1])

        predictions = []
        intents = []

        # format predictions for display
        for index, accuracy in similar_doc:
            if self.data.dataset.rewritten_intent.values[int(index)] in intents:
                continue
            slot_map = self.data.dataset.slot_map.values[int(index)]
            intent =  self.data.dataset.rewritten_intent.values[int(index)]
            snippet = self.data.dataset.snippet.values[int(index)].strip()
            if slot_map:
                slot_map = list(slot_map.items())[0]
                for slot in slot_map:
                    intent = intent.replace(slot_map[1], slot_map[0])
            prediction = {
                'command': intent,
                'snippet': snippet,
                'accuracy': accuracy
            }
            predictions.append(prediction)
            intents.append(self.data.dataset.rewritten_intent.values[int(index)])
        return predictions


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
    # problem statement
    # proposed solution
    # methodology
    # finalised solution