from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_redis import FlaskRedis

from authentication import Authenticator

db = SQLAlchemy()
r = FlaskRedis()
auth = Authenticator()

def create_app(test_config=None):
    app = Flask(__name__)
    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)

    # Initialize the database and Redis
    db.init_app(app)
    r.init_app(app)

    # Facilitate all the necessary migrations
    with app.app_context():
        import model
        db.create_all()

        # Initialize the necessary modules
        auth.init_app(app)

        # Register foreign modules
        from api import PublicAPI, PrivateAPI
        app.register_blueprint(PublicAPI)
        app.register_blueprint(PrivateAPI)

    @app.route('/hb')
    def alive():
        """
        Just responds with alive. Useful for checking the service's health.
        """
        return 'alive'

    return app
