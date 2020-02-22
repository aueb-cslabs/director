from flask import Blueprint
from app import auth
from model import User

PublicAPI = Blueprint('public_api', __name__, url_prefix='/api/public')

@PublicAPI.route('/user/<username>')
def get_user(username):
    return auth.get_user(username)
