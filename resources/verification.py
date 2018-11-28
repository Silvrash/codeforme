from Utils.decorators import expect
from dependency_injector import DependencyInjector
from flask import make_response, jsonify, request
from flask_restful import Resource

from services.verification_service import VerificationService


class VerificationResource(Resource):
    def __init__(self, *args, **kwargs):
        super(VerificationResource, self).__init__(*args, **kwargs)
        self.service = DependencyInjector().provide(VerificationService)  # type: VerificationService

    @staticmethod
    @expect('register_SCHEMA', nested_in_data=True, is_multiple=False)
    def register_user():
        data = request.get_json()['data']
        service = DependencyInjector().provide(VerificationService)  # type: VerificationService
        service.register_user(data['username'], data['email'], data['password'])
        return make_response(jsonify({'message': 'success'}), 201)

    @expect('verification_SCHEMA', is_multiple=False)
    def post(self):
        data = request.get_json()['data']
        username = data.get('phone_number')
        password = data.get('password')
        data = self.service.verify_guardian(username=username, password=password)
        return {'data': data}, 201


