""" Custom errors in this application """
from requests import Response, HTTPError
from logging import error as log_error

class BaseError(Exception):
    def __init__(self, message, error_code=400, payload=None, *args):
        super(BaseError, self).__init__(*args)
        self.message = message
        self.payload = payload
        self.error_code = error_code

    def to_dict(self):
        response = {
            'message': self.message
        }
        response.update({
            'data': self.payload
        }) if self.payload is not None else None
        return response


class JSONDataValidationError(BaseError):
    def __init__(self, message, data, error_code=442):
        super(JSONDataValidationError, self).__init__(message=message, payload=data, error_code=error_code)

