from flask_restful import Resource
from flask import request

from code import InteractiveConsole

 
class Console(InteractiveConsole):
        
    def __init__(*args): InteractiveConsole.__init__(*args)


class Execution(Resource):

    def post(self):
        data = request.get_json()
        code = data
        console = Console()
        console.runcode(code)
        # code execution
        return {'data': data}
