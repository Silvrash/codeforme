from flask_restful import Resource
from flask import make_response, jsonify, request
from Utils.validators import expect


class TestResource(Resource):

    def get(self):
        return {'message': 'response ok'}

    @staticmethod
    def test():
        return make_response(jsonify({'message': 'success'}), 201)

    @expect('test_validation_SCHEMA')
    def post(self):
        data = request.get_json()['data']
        return {'message': data}
