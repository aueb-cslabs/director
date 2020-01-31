from flask import Blueprint
from authentication.ldap_adapter import LdapAdapter
from model import User

PublicAPI = Blueprint('public_api', __name__, url_prefix='/api/public')

@PublicAPI.route('/user/<username>')
def get_user(username):
    pass

