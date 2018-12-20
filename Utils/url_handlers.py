from flask.app import Flask

from flask_restful import Api
from flask_restful import Resource


def add_api_resource(resource, url, endpoint, api):
    # type: (Resource, str, str, Api) -> None
    api.add_resource(resource, '/api/%s' % url, endpoint=endpoint)


def add_views(func, url, app):
    app.add_url_rule(url, view_func=func)


def register_apis(api_urls, api):
    # type: (list[dict], Api) -> None
    for api_url in api_urls:
        add_api_resource(api_url.get('resource'), api_url.get('url'), api_url.get('endpoint'), api)


def add_app_url(func, url, app, endpoint, method):
    # type: (func, str, Flask) -> None
    app.add_url_rule('/api/%s' % url, endpoint=endpoint, view_func=func, methods=method)


def register_app_urls(app_urls, app):

    for app_url in app_urls:
        add_app_url(app_url.get('func'), app_url.get('url'), app, app_url.get('endpoint'),
                    method=app_url.get('methods'))


def register_views(views, app):
    for view in views:
        add_views(view.get('func'), view.get('url'), app)

def register_events(events, socketio):
    for event in events:
        socketio.on_event(event['event'], event['func'])