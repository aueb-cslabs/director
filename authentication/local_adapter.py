from flask import current_app as app

from .adapter import Adapter

class LocalAdapter(Adapter):
    def get_user(self, username):
        return None

    def search_user(self, query):
        return []

    def authenticate(self, user, password):
        return False
