from datetime import datetime

DRAFT_4_SCHEMA = 'http://json-schema.org/draft-04/schema#'
NULL_SCHEMA = {'type': 'null'}
STRING_SCHEMA = {'type': 'string'}
BOOLEAN_SCHEMA = {'type': 'boolean'}
INTEGER_SCHEMA = {'type': 'integer'}
FLOAT_SCHEMA = {'type': 'number'}
ID_SCHEMA = {'type': 'integer', 'minimum': 0}
TIMESTAMP_SCHEMA = {'type': 'integer', 'minInclusive': 0}
PACKAGE_TYPE_SCHEMA = {'enum': ['free', '150', '250', 'custom']}
NULLABLE_STRING_SCHEMA = {'anyOf': [STRING_SCHEMA, NULL_SCHEMA]}
NULLABLE_INTEGER_SCHEMA = {'anyOf': [INTEGER_SCHEMA, NULL_SCHEMA]}
DURATION_SCHEMA = {'type': 'integer', 'minimum': 3}
ACAD_TERM_SCHEMA = {'enum': [1, 2, 3]}
ACAD_YEAR_SCHEMA = {'type': 'integer', 'minInclusive': 1800,
                    'maxInclusive': datetime.now().year + 1}

UPGRADE_TYPE_SCHEMA = {'enum': ['P', 'E']}

PHONE_NUMBER_SCHEMA = {'type': 'string'}  # TODO: Update the regex for this
NULLABLE_PHONE_NUMBER_SCHEMA = {'anyOf': [PHONE_NUMBER_SCHEMA, NULL_SCHEMA]}

EMAIL_SCHEMA = {
    'type': 'string', 'pattern': r'^[a-zA-Z0-9.\-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9.]+$'
}
NULLABLE_EMAIL_SCHEMA = {'anyOf': [EMAIL_SCHEMA, NULL_SCHEMA]}
STAFF_PRIVILEGES_ENUM = {'enum': ['teacher', 'headmaster', 'admin', 'finance']}
NAME_TITLE_SCHEMA = {'enum': ['Mr', 'Miss', 'Mrs', 'Dr', 'Rev', 'Prof']}
GENDER_SCHEMA = {'enum': ['male', 'female']}

REGISTER_SCHEMA = {
    '$schema': DRAFT_4_SCHEMA,
    'type': 'object',
    'properties': {
        'username': STRING_SCHEMA,
        'password': STRING_SCHEMA,
        'email': EMAIL_SCHEMA
    },
    'additionalProperties': False,
    'required': ['username', 'password', 'email']
}

VERIFICATION_SCHEMA = {
    '$schema': DRAFT_4_SCHEMA,
    'type': 'object',
    'properties': {
        'username': PHONE_NUMBER_SCHEMA,
        'password': STRING_SCHEMA
    },
    'additionalProperties': False,
    'required': ['username', 'password']
}

SCHEMA = {
    'register_SCHEMA': REGISTER_SCHEMA,
    'verification_SCHEMA': VERIFICATION_SCHEMA,
}
