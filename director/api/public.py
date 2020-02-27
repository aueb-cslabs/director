from flask import Blueprint, request
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
    #end if: GET: /terminals
    
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
                return {'message': 'Provide some values.'}, 400
        except:
            # There was no json in request data
            return {"message": "Provide a json body."}, 400
        return f(*args,**kwargs)
    return decorated

@PublicAPI.route('/lab/<int:lab>/terminal/<int:terminal>', methods=["PATCH", "PUT"])
@empty_json_body
def patch_terminal(lab, terminal):
        
    terminal_result = terminal_model.query.filter_by(lab_id=lab,id=terminal).first_or_404()
    
    valid_options = ['host_name', 'ip', 'status', 'room', 'lab_id']
        
    changes = {}
    for key, value in dict(request.json).items():
        if key in valid_options:
            value = None if value == "" else value
            changes[key] = value

    # If not any value is assigned, assign the uri's lab otherwise the terminal
    # will be lost forever from the client (only the database will be able to see it)
    if changes.get("lab_id") == None:
        changes["lab_id"] = lab
    
    # possible TODO: check status value (is it 0 1 2 3) or (down, locked, up, logged_in)

    # PATCH: Update only the parameters we are given
    if request.method == 'PATCH':
        if changes['ip'] == None:   # IP is not nullable
            return {"error": "Terminal IP can't be null or empty"}, 400

        return terminal_result.update(changes)
    # end if:PATCH

    # PUT: Update all parameters
    for option in valid_options:
        if option not in changes.keys():
            changes[option] = None
    
    if changes['ip'] == None:   # IP is not nullable
        return {"error": "Terminal IP can't be null or empty"}, 400

    return terminal_result.update_all(changes)

@PublicAPI.route('/lab/<int:lab>/terminal/<int:terminal>/<command>', methods=["PATCH"])
def patch_terminal_c(lab, terminal, command):
    
    valid_commands = ['restart','shutdown','hibernate','log-out']
    
    if command not in valid_commands:
        return {"error": "Invalid command"}, 406

    # TODO
    # communicate with user-agent

    return {"message": "Not implemented"}, 501