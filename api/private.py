from flask import Blueprint

PrivateAPI = Blueprint('private_api', __name__, url_prefix='/api/private')
