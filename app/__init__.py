from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
socketio = SocketIO()


def create_app(config_type='dev'):
    from config import config
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(config[config_type])

    db.init_app(app)

    return app