from flask import Blueprint, Response,  request, make_response, jsonify
from director.model import User
from .json_web_token import generate_jwt, token_required
from director.authentication import Authenticator
PublicAPI = Blueprint('public_api', __name__, url_prefix='/api/public')

@PublicAPI.route('/user/<username>')
def get_user(username):
    user = User.query.filter_by(username=username).first_or_404()
    return user.serialize()



@PublicAPI.route('/login', methods=['POST'])
def login():
    """
    public api login with ldap authentication and returns a JWT                                  
    """
    if not 'username' in request.form:
        return jsonify({'message': 'username must not be empty'}), 401
    if  not 'password' in request.form:
        return jsonify({'message': ' password must not be empty'}), 401
    authenticator = Authenticator()
    user = authenticator.authenticate(request.form['username'], request.form['password'])                                    
    if user == None:
        #if user do not exist
        return  Response(status=401)
    return generate_jwt(request.form['username']), 200

@PublicAPI.route('/test')
@token_required
def test():
    return Response(status=200)  