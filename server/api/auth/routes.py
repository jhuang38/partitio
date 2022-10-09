from api.auth import auth
from requests import request
from flask import jsonify

@auth.route('/', methods=['GET'])
def test():
    print('hi')
    return jsonify({"hi":"hi"})
