from resources.snippets import Snippets
from resources.test import TestResource
from resources.verification import VerificationResource

GET = 'GET'
POST = 'POST'
DELETE = 'DELETE'
PUT = 'PUT'

APP_URL = [
    {
        'func': VerificationResource.register_user,
        'url': 'user/register',
        'endpoint': 'add_user',
        'methods': [POST]
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

SOCKET_EVENTS = [
    {
        'event': 'text-to-intents',
        'func': Snippets.textToIntents
    },
    {
        'event': 'connect',
        'func': Snippets.onConnect
    },
    {
        'event': 'speech-to-intents',
        'func': Snippets.speechToIntents
    }
]
