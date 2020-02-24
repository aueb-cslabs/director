from flask import Blueprint, request, Response, jsonify
from director.model import User

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


@PublicAPI.route('/lab/<int:lab>/terminal/<int:terminal>', methods=["PATCH"])
def patch_terminal(lab, terminal):

    # if there is only one element to update then continue
    if len(request.json) == 1:
        
        terminal_result = terminal_model.query.filter_by(lab_id=lab,id=terminal).first_or_404()

        # TODO: Change according to logic of this route
        # item = request.json.item

        statusCode = terminal_result.update_item(None)

        resp = Response(status=statusCode)           
        return resp

    # else return error
    error = {
        "error": "Bad request"
    }
    
    resp = jsonify(error)
    resp.status_code = 400

    return resp

# TODO
# @PublicAPI.route('/lab/<int:lab>/terminal/<int:terminal>/', methods=["PATCH"])
# def patch_terminal_c(lab, terminal):
#     command = request.json['command']
#     return {}

# @PublicAPI.route('/lab/<int:lab>/terminal/<int:terminal>', methods=["PUT"])
# def update_terminal(lab, terminal):
#     return {}
    