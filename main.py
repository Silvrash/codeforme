from flask import jsonify, render_template
from flask_restful import Api

from Utils.exceptions import BaseError
from Utils.url_handlers import register_app_urls, register_apis, register_views, register_events
from app import create_app, socketio
from urls import APP_URL, API_URL, VIEWS, SOCKET_EVENTS
import os
from flask_apscheduler import APScheduler

config_type = os.environ.get('DEVELOPMENT_TYPE') or 'dev'
app = create_app(config_type)
handle_exceptions = app.handle_exception
handle_user_exceptions = app.handle_user_exception

api = Api(app)
socketio.init_app(app)

register_apis(API_URL, api)
register_app_urls(APP_URL, app)
register_views(VIEWS, app)
register_events(SOCKET_EVENTS, socketio)

app.handle_exception = handle_exceptions
app.handle_user_exception = handle_user_exceptions

# configure cron scheduler
scheduler = APScheduler()
scheduler.init_app(app)
scheduler.start()

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
            'message': 'Internal Server Error'
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


if __name__ == '__main__':
    socketio.run(app,
                 host='0.0.0.0',
                 port=14000,
                 debug=True)
