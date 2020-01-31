from flask import current_app as app
from ldap import initialize, SCOPE_SUBTREE, INVALID_CREDENTIALS

from .adapter import Adapter

class LocalAdapter(Adapter):
    def get_user(self, username):
        return []

    def search_user(self, query):
        return []

    def authenticate(self, username, password):
        return False
