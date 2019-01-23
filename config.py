import os

class Config(object):
    DEBUG = True
    SECRET_KEY = 'fa87198cb183bc42ad88b90bccf9b735b846227d0973e129735b4ed29eabcd22'
    JWT_SECRET_KEY = SECRET_KEY

    JOBS = [
        {
            'id': 'dataset-sync',
            'func': 'jobs:dataset_sync',
            'trigger': 'cron',
            'day': 1
            # 'seconds': 5
        }
    ]

    SCHEDULER_API_ENABLED = True


class DevelopmentConfig(Config):
    ENV = 'development'


class ProductionConfig(Config):
    DEBUG = False
    ENV = 'production'


config = {
    'dev': DevelopmentConfig,
    'prod': ProductionConfig
}
