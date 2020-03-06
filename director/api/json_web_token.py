from flask import jsonify, request, current_app
import jwt
import datetime
from functools import wraps

def token_required(f):
    """
    THIS function requires the use of a json web token in order to be accepted 
    """
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'x-access-token' in  request.headers:
            token = request.headers['x-access-token']
        if not token:
            jsonify({'message': 'Token is missing'}), 401
        try:
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
        except:
            return jsonify({'message':'Token is false'}), 401
        return f(*args,**kwargs)
    return decorated


def generate_jwt(username):
    """
    Generats a Jwt given a username more could be added in the future
    """
    token = jwt.encode({'username': username,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60)},
                current_app.config['SECRET_KEY'])
    return jsonify({'token': token.decode('UTF-8')})
