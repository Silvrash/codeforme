import jsonschema
from Utils.exceptions import JSONDataValidationError
from data_schema import DRAFT_4_SCHEMA, SCHEMA
from flask import request



def validate_request(schema_name, payload, nested_in_data=None, is_multiple=None):
    try:
        data = payload if nested_in_data is None else payload['data']
    except KeyError as e:
        raise JSONDataValidationError(message=e.__repr__(), data={'path': 'expected {}'.format(e)})
    except TypeError as e:
        raise JSONDataValidationError(message='Invalid Json Data', data={'path': 'expected key \'/data/\''})

    try:
        if is_multiple:
            schema = {
                '$schema': DRAFT_4_SCHEMA,
                'type': 'array',
                'items': {'$ref': '#/definitions/dataElement'},
                'definitions': {'dataElement': SCHEMA[schema_name]}
            }
        else:
            schema = SCHEMA[schema_name]
    except KeyError:
        raise Exception('Invalid schema_name \'%s\'' % schema_name)

    try:
        jsonschema.validate(data, schema)
    except jsonschema.exceptions.ValidationError as error:
        try:
            error_details = {
                'path': (
                    '/' +
                    ('data/' if nested_in_data else '') +
                    ('[]/' if is_multiple else '') +
                    ('/'.join([str(p) for p in list(error.absolute_path)[1::2]]))
                ),
            }
        except IndexError:
            error_details = {'path': ''}
        raise JSONDataValidationError(message=error.message, data=error_details)



class _Expect(object):
    def __init__(self, schema_name, nested_in_data=True, is_multiple=False):
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

expect = _Expect
