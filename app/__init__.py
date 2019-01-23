from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO

socketio = SocketIO()


def create_app(config_type='dev'):
    from config import config
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(config[config_type])

    return app