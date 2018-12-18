from datetime import datetime

DRAFT_4_SCHEMA = 'http://json-schema.org/draft-04/schema#'
NULL_SCHEMA = {'type': 'null'}
STRING_SCHEMA = {'type': 'string'}
BOOLEAN_SCHEMA = {'type': 'boolean'}
INTEGER_SCHEMA = {'type': 'integer'}
FLOAT_SCHEMA = {'type': 'number'}
ID_SCHEMA = {'type': 'integer', 'minimum': 0}
TIMESTAMP_SCHEMA = {'type': 'integer', 'minInclusive': 0}
NULLABLE_STRING_SCHEMA = {'anyOf': [STRING_SCHEMA, NULL_SCHEMA]}
NULLABLE_INTEGER_SCHEMA = {'anyOf': [INTEGER_SCHEMA, NULL_SCHEMA]}
EMAIL_SCHEMA = {
    'type': 'string', 'pattern': r'^[a-zA-Z0-9.\-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9.]+$'
}
NULLABLE_EMAIL_SCHEMA = {'anyOf': [EMAIL_SCHEMA, NULL_SCHEMA]}

TEST_VALIDATION_SCHEMA = {
    '$schema': DRAFT_4_SCHEMA,
    'type': 'object',
    'properties': {
        'item': STRING_SCHEMA
    },
    'additionalProperties': False,
    'required': ['item']
}

SCHEMA = {
    'test_validation_SCHEMA': TEST_VALIDATION_SCHEMA,
}
