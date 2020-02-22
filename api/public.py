from flask import Blueprint
from app import auth
from model import User

PublicAPI = Blueprint('public_api', __name__, url_prefix='/api/public')

@PublicAPI.route('/user/<username>')
def get_user(username):
    user = auth.get_user(username)
    if user is None:
        return ({}, 404)
    return user.serialize()
