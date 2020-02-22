from flask import Blueprint
from model import User

PublicAPI = Blueprint('public_api', __name__, url_prefix='/api/public')

@PublicAPI.route('/user/<username>')
def get_user(username):
    user = User.query.filter_by(username=username).first_or_404()
    return user.serialize()
