import os

if not os.path.exists('model'):
    os.mkdir('model')

config = {
    'dataset_path': os.path.join(os.path.dirname(os.path.abspath(__file__)), "model/serialised_data"),
    'data_checkpoint': os.path.join(os.path.dirname(os.path.abspath(__file__)), "model/data_checkpoint"),
    'dictionary_path': os.path.join(os.path.dirname(os.path.abspath(__file__)), "model/dictionary.dict"),
    'corpus_path':os.path.join(os.path.dirname(os.path.abspath(__file__)), "model/corpus.mm"),
    'lsi_model_path': os.path.join(os.path.dirname(os.path.abspath(__file__)), "model/model.lsi"),
    'commands_path': os.path.join(os.path.dirname(os.path.abspath(__file__)), "model/commands"),
    'model_path': os.path.join(os.path.dirname(os.path.abspath(__file__)), "model/")
}
