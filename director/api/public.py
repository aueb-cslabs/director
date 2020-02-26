from flask import Blueprint, request, Response, jsonify
from director.model import User
from functools import wraps

PublicAPI = Blueprint('public_api', __name__, url_prefix='/api/public')

@PublicAPI.route('/user/<username>')
def get_user(username):
    user = User.query.filter_by(username=username).first_or_404()
    return user.serialize()


from director.model import Terminal as terminal_model

@PublicAPI.route('/lab/<int:lab>/terminal/<int:terminal>', methods=["GET"])
@PublicAPI.route('/lab/<int:lab>/terminals', methods=["GET"])
def get_terminals(lab, terminal = None):
    # GET: /terminals
    if terminal == None:
        terminals = terminal_model.query.filter_by(lab_id=lab).all()
        jsonArray = {'terminals': []}

        for _ in terminals:
            jsonArray['terminals'].append(_.serialize())

        return jsonArray
    #end if
    
    # GET: /terminal/<terminal>
    terminal_result = terminal_model.query.filter_by(lab_id=lab,id=terminal).first_or_404()

    return terminal_result.serialize()

# Checks if the client sends a (not-empty-also) json
def empty_json_body(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        try:
            # Check if empty
            if len(request.get_json()) == 0:
                return jsonify({'message': 'Provide some values.'}), 400
        except:
            # There was no json in request data
            return jsonify({"message": "Provide a json body."}), 400
        return f(*args,**kwargs)
    return decorated

@PublicAPI.route('/lab/<int:lab>/terminal/<int:terminal>', methods=["PATCH"])
@empty_json_body
def patch_terminal(lab, terminal):
        
    terminal_result = terminal_model.query.filter_by(lab_id=lab,id=terminal).first_or_404()

    valid_options = ['host_name', 'ip', 'status', 'room', 'lab_id']
    changes = {}
    # Keep only the values we need
    for key, value in dict(request.json).items():
        if key in valid_options:
            changes[key] = value
    
    statusCode = terminal_result.update_items(changes)
    
    resp = Response(status=statusCode)           
    return resp

@PublicAPI.route('/lab/<int:lab>/terminal/<int:terminal>/<command>', methods=["PATCH"])
def patch_terminal_c(lab, terminal, command):
    
    valid_commands = ['restart','shutdown','hibernate','log-out']

    if command not in valid_commands:
        error = {
            "error": "Bad request"
        }
        
        resp = jsonify(error)
        resp.status_code = 406

        return resp

    # TODO
    # communicate with user-agent

    resp = Response(status=501)

    return resp

@PublicAPI.route('/lab/<int:lab>/terminal/<int:terminal>', methods=["PUT"])
@empty_json_body
def update_terminal(lab, terminal):

    terminal_result = terminal_model.query.filter_by(lab_id=lab,id=terminal).first_or_404()

    valid_options = ['host_name', 'ip', 'status', 'room', 'lab_id']
    changes = {}
    # Keep only the values we need
    for key, value in dict(request.json).items():
        if key in valid_options:
            changes[key] = value
    
    statusCode = terminal_result.update_items(changes)
    
    resp = Response(status=statusCode)           
    return resp