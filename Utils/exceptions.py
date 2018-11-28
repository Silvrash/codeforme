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


class UnAuthorisedAccess(BaseError):
    def __init__(self):
        super(UnAuthorisedAccess, self).__init__('Access denied', error_code=403)


class AuthenticationRequired(BaseError):
    def __init__(self):
        super(AuthenticationRequired, self).__init__('Authorisation Required, Access Denied', error_code=401)


class AuthenticationFailed(BaseError):
    def __init__(self, message='Authentication Failed'):
        super(AuthenticationFailed, self).__init__(message, error_code=401)


class InvalidFieldError(BaseError):
    '''
    Error raised when there are invalid fields for a table, in an INSERT or UPDATE
    '''

    def __init__(self, message='There are invalid fiels in the data'):
        super(InvalidFieldError, self).__init__(message, 400)


class UnAuthorisedAccessError(BaseError):
    '''
    Error raised when a user attempts to access content which he/she has not got permission to access
    '''

    def __init__(self, message='You do not have enough permission. Access Denied!'):
        super(UnAuthorisedAccessError, self).__init__(message, 403)


class AuthenticationFailedError(BaseError):
    '''
    Error raised when authenticating a user failed
    '''

    def __init__(self, message='Authentication Failed. Access Denied'):
        super(AuthenticationFailedError, self).__init__(message, 401)

def raise_error_for_response(response, error_msg_prefix=''):
    # type: (Response) -> None
    """ Raise a custom error for a response's stored `HTTPError`.
    If the response was a success, no error will be thrown.

    NB: 'Fail' here means, the response's status code is not between 200 and 299 inclusive

    Arguments:
        response {requests.Response}
        error_msg_prefix {str} -- A string to prepend to the error message
    """
    try:
        response.raise_for_status()
    except HTTPError:
        try:
            error_message = error_msg_prefix + str(response.json()['error'])
        except (ValueError, KeyError): # <- The response has no json data or no 'error' in the json data
            error_message = error_msg_prefix + 'An error occurred while making request to external service'
        
        log_error(error_message + ': %s' % response.url)

        error_code = response.status_code if (299 < response.status_code) else 400
        raise BaseError(error_message, error_code=error_code)
    else:
        pass
        # the response depicts a success, so no error will be thrown
    
    