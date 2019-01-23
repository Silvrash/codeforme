import logging

import nltk
from gensim.models import Doc2Vec
import os
import json
import pandas as pd
from .config import config
from .dataset import Dataset


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
                slot_map = list(slot_map.items())
                for slot in slot_map:
                    intent = intent.replace(slot[1], slot[0])
            prediction = {
                'command': intent,
                'snippet': snippet,
                'accuracy': accuracy
            }
            predictions.append(prediction)
            intents.append(self.data.dataset.rewritten_intent.values[int(index)])
        return predictions

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
    import argparse
    import json
    # parser = argparse.ArgumentParser()
    # parser.add_argument('-intent')
    # args = parser.parse_args()
    # if args.intent is None:
    #     print('Expected argument -intent')
    #     exit()
    
    pybot = PyBot()
    overall_accuracy = pybot.score()
    print(overall_accuracy)
    # predictions = pybot.predict(args.intent)
    # print(json.dumps(predictions, indent=1))
    # problem statement
    # proposed solution
    # methodology
    # finalised solution