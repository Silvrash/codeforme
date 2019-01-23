import requests, zipfile, io, os
from engine.train import Trainer


def dataset_sync():
    """database synchronization"""
    print('Dataset synchronization started')
    save_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'dataset')
    r = requests.get('http://www.phontron.com/download/conala-corpus-v1.1.zip')
    z = zipfile.ZipFile(io.BytesIO(r.content))
    z.extractall(path=save_path)
    Trainer()


if __name__ == '__main__':
    dataset_sync()