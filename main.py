from flask import jsonify, render_template
from flask_migrate import Migrate, MigrateCommand
from flask_restful import Api
from flask_script import Manager, Server

from Utils.exceptions import BaseError
from Utils.url_handlers import register_app_urls, register_apis, register_events
from app import create_app, db, socketio
from urls import APP_URL, API_URL, SOCKET_EVENTS
import nltk
# import logging

# nltk.download('punkt')
# nltk.download('stopwords')

# logging.basicConfig(format='%(asctime)s : %(levelname)s : %(message)s', level=logging.DEBUG)

app = create_app()
handle_exceptions = app.handle_exception
handle_user_exceptions = app.handle_user_exception

api = Api(app)

migrate = Migrate(app, db)
manager = Manager(app)
manager.add_command('db', MigrateCommand)
manager.add_command('runserver', Server(host='0.0.0.0', port=8080))

socketio.init_app(manager.app)

register_apis(API_URL, api)
register_app_urls(APP_URL, app)
register_events(SOCKET_EVENTS, socketio)
app.handle_exception = handle_exceptions
app.handle_user_exception = handle_user_exceptions


@app.errorhandler(BaseError)
def handle_errors(error):
    response = jsonify({'error': error.to_dict()})
    response.status_code = error.error_code
    return response


@app.errorhandler(404)
def url_not_found(error):
    response = jsonify({
        'error': {
            'message': 'Url not found'
        }
    })

    response.status_code = 404
    return response


@app.errorhandler(405)
def method_not_found(error):
    response = jsonify({
        'error': {
            'message': 'This HTTP method is not allowed on this route'
        }
    })

    response.status_code = 405
    return response


@app.errorhandler(500)
def handle_server_error():
    response = jsonify({
        'error': {
            'message': 'An error occurred from our end. The backend developers are actively investigating this; an email has been sent to the team lead'
        }
    })
    response.status_code = 500
    return response


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Methods',
                         'POST, GET, OPTIONS, DELETE')
    response.headers.add('Access-Control-Allow-Headers',
                         'content-type, Authorization')
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    response.headers['Cache-Control'] = 'public, max-age=0'
    return response


@manager.command
def run():
    socketio.run(manager.app,
                 host='127.0.0.1',
                 port=5000,
                 debug=True)


@app.route('/')
@app.route('/code')
def index():
    return render_template('index.html')



# @app.route('/<path:page>')
# def anypage(page):
#     return render_template('index.html')


if __name__ == '__main__':
    # socketio.run(manager.app, debug=True, port=8000)
    manager.run(default_command=run())
