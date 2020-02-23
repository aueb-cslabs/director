from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_redis import FlaskRedis

from director.authentication import Authenticator

db = SQLAlchemy()
r = FlaskRedis()
auth = Authenticator()

default_settings = {
    'AUTH_PROVIDERS': ['local', 'ldap']
}

print("""
Director, Copyright (C) 2020 - Athens University of Economics and Business, CSLab
This program comes with ABSOLUTELY NO WARRANTY; for details open 'LICENSE.md'.
This is free software, and you are welcome to redistribute it
under certain conditions; open 'LICENSE.md' for details.
""")

def create_app(test_config=None):
    app = Flask(__name__)
    if test_config is None:
        app.config.from_object('director.default_settings')
        app.config.from_envvar('DIRECTOR_SETTINGS')
    else:
        app.config.from_mapping(test_config)

    # Initialize the database and Redis
    db.init_app(app)
    r.init_app(app)

    # Facilitate all the necessary migrations
    with app.app_context():
        import director.model
        db.create_all()

        # Initialize the necessary modules
        auth.init_app(app)

        # Register foreign modules
        from director.api import PublicAPI, PrivateAPI
        app.register_blueprint(PublicAPI)
        app.register_blueprint(PrivateAPI)

    @app.route('/hb')
    def alive():
        """
        Just responds with alive. Useful for checking the service's health.
        """
        return 'alive'

    return app

