from flask_restful import Resource


class TestResource(Resource):

    def get(self):
        return {'message': 'response ok'}