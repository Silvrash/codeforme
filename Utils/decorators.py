import logging
from functools import wraps

from flask import request

from Utils.exceptions import BaseError, AuthenticationFailed
from Utils.globals import decode_jwt, set_current_user
from Utils.validators import validate_request


class _Expect(object):
    def __init__(self, schema_name, nested_in_data=True, is_multiple=True):
        self.is_multiple = is_multiple
        self.nested_in_data = nested_in_data
        self.schema_name = schema_name

    def __call__(self, validate_request_func):
        def wrapper(*args, **kwargs):
            data = request.get_json()
            validate_request(schema_name=self.schema_name, payload=data, nested_in_data=self.nested_in_data,
                             is_multiple=self.is_multiple)
            return validate_request_func(*args, **kwargs)

        return wrapper


def authenticate_request(func):
    @wraps(func)
    def decorated(*args, **kwargs):
        try:
            auth_token = request.headers.get('Authorization').split()[1]
            token_payload = decode_jwt(auth_token)
            current_user = set_current_user(token_payload['id'], token_payload['username']
                                            )  # set as the data for the currently logged in user

            student_id, school_id = int(request.headers.get('student') or -1), int(request.headers.get('school') or -1)
            if student_id != -1 and school_id != current_user['wards_schools'][student_id]:
                raise BaseError("Unauthorised access to student: %s of school: %s" % (student_id, school_id))

            logging.info(
                '(Authenticated as (id=%s, number=%s))' % (
                    token_payload.get('id'), token_payload.get('phone_number')
                )
            )

        except Exception as error:
            logging.error('Authentication failed...')
            logging.error(error)
            raise AuthenticationFailed('Authentication Failed...')

        return func(*args, **kwargs)

    return decorated


expect = _Expect
