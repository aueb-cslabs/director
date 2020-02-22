from flask import current_app as app
from model import User

from .adapter import Adapter

class LocalAdapter(Adapter):
    def get_user(self, username):
        return User.query.filter_by(username=username).first()

    def search_user(self, query):
        return []

    def authenticate(self, user, password):
        return False
