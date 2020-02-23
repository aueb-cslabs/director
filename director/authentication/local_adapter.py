import bcrypt
import base64

from flask import current_app as app

from director import db
from director.model import User, UserType
from director.authentication.adapter import Adapter

class LocalAdapter(Adapter):
    def get_user(self, username):
        return User.query.filter_by(username=username).first()


    def search_user(self, query):
        return User.query.filter(
            (User.username.like("%{}%".format(query))) |
            (User.full_name.like("%{}%".format(query)))
        ).all()


    def authenticate(self, user, password):
        return False # Not implemented


    def post_authenticate(self, user, password):
        local_user = self.get_user(user.username)
        
        if local_user is None:
            db.session.add(user)
        elif local_user.user_type != UserType.local:
            local_user.update_from_remote(user)

        db.session.commit()

