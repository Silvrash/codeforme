from resources.test import TestResource
from views import index
from resources.snippets import Snippets

GET = 'GET'
POST = 'POST'
DELETE = 'DELETE'
PUT = 'PUT'

APP_URL = [
    {
        'func': TestResource.test,
        'url': 'test/func',
        'endpoint': 'test_func',
        'methods': [GET]
    }
]

API_URL = [
    {
        'resource': TestResource,
        'url': 'test',
        'endpoint': 'test'
    },
    {
        'resource': Snippets,
        'url': 'snippets/<intent>',
        'endpoint': 'intents'
    }
]

VIEWS = [
    {
        'func': index,
        'url': '/'
    },
    {
        'func': index,
        'url': '/code'
    },
]
