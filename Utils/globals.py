import logging
import random

import jwt
from flask import g, Flask
from flask_cors import CORS
from flask_socketio import SocketIO
from flask_sqlalchemy import SQLAlchemy
from passlib.handlers.pbkdf2 import pbkdf2_sha256

from Utils.exceptions import AuthenticationRequired

JWT_KEY = 'oRaC34NHLDF,.2umVix@#$dnUqitlD#%^uRUC{":.>+IM#P4Gk[kj!@#$%$%^$#E^oReRctEn(*vo5nMJFxEHc---**>N@#L876R,.34543#$%^%6'



def get_current_user():
    """ Get the data of the currently logged-in user.
    """
    try:
        current_user = getattr(g, 'current_user')
    except:
        raise AuthenticationRequired()
    return current_user


def set_current_user(user_id, username):
    """ Set the current user for this session
    """
    current_user = {'username': username, 'id': user_id}
    setattr(g, 'current_user', current_user)  # set as the data for the currently logged in user
    return get_current_user()


def jwt_encode(payload, key=None):
    key = JWT_KEY if key is None else key
    token = jwt.encode(payload, key, algorithm='HS256')
    return token.decode('unicode_escape')


def decode_jwt(token, key=None, key_to_find=None):
    key = JWT_KEY if key is None else key
    payload = jwt.decode(token, key, algorithms='HS256')
    if key_to_find is not None:
        return payload.get(key_to_find)
    return payload


def generate_pin():
    '''
    Generate a random 4 digit pin
    '''
    return ''.join([str(random.randint(0, 9)) for x in range(4)])


def decode_password(pin, hashed_pin):
    try:
        return pbkdf2_sha256.verify(pin, hashed_pin)
    except Exception as error:
        logging.error('An error occurred while verifying the hash against the hashed pin')
        logging.error(error)
        return False
