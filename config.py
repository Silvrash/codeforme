import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    DEBUG = False
    TESTING = False
    SECRET_KEY = 'fa87198cb183bc42ad88b90bccf9b735b846227d0973e129735b4ed29eabcd22'
    JWT_SECRET_KEY = SECRET_KEY
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = "postgres://postgres:jellybean@localhost:5432/PyBotdb"


class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URI')
    SECRET_KEY = os.environ.get('SECRET_KEY')
    JWT_SECRET_KEY = SECRET_KEY


config = {
    'dev': DevelopmentConfig,
    'prod': ProductionConfig
}
