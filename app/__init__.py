from flask import Flask


def create_app(config_type):
    from config import config
    app = Flask(__name__)
    app.config.from_object(config[config_type])

    return app