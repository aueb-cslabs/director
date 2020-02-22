import bcrypt
import base64

from flask import current_app as app
from model import User

from .adapter import Adapter

class LocalAdapter(Adapter):
    def get_user(self, username):
        return User.query.filter_by(username=username).first()


    def search_user(self, query):
        return User.query.filter(
            (User.username.like("%{}%".format(query))) |
            (User.full_name.like("%{}%".format(query)))
        ).all()


    def authenticate(self, user, password):
        return None # Not implemented

