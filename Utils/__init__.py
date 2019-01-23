import os


def is_in_development_environment():
    '''
    Return True if code is running in a development environment
    '''
    return 'prod' if os.environ.get('DATABASE_URI') else 'dev'
