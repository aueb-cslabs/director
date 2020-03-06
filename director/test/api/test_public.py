from director import db
from director.model import User
from director.authentication.local_adapter import LocalAdapter

def test_get_user(client):
    db.session.add(User(username='p3150133', full_name='Spyridon Pagkalos', cached_password='pass'))

    rv = client.get('/api/public/user/p3150133')
    assert b'p3150133' in rv.data
    assert b'Spyridon Pagkalos' in rv.data


def test_get_user_failing_test(client):
    rv = client.get('/api/public/user/p3150133')
    assert rv.status_code == 404

def test_test_Token_false(client):
    rv = client.get('/api/public/test', 
                    headers={'x-access-token': "e1NiJ9.eyJ1c2VybmFtZSI6ImJpbNDd9.L1CYZ0pxmMxG0pBVTOS8FMjXhdfmd6CRfP-QU4"})
    assert rv.status_code == 401

def test_test_Token_missing(client):
    rv = client.get('/api/public/test')
    assert rv.status_code == 401

def test_test_Token(client):
    rv = client.get('/api/public/test',
    headers=[('x-access-token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImJpbGwiLCJleHAiOjE2ODM0MTM0NDd9.ylB6wPEizwVn9Dcjuzxq0iPLI23FU9cRwUU3anRYDt0')])
    assert rv.status_code == 200


def test_login_fail_no_password(client):
    rv = client.post('api/public/login',data=dict(
        username='bill'),
        follow_redirects=True)
    assert rv.status_code==401

def test_login_success(client):
    db.session.add(User(username='p3150133', full_name='Spyridon Pagkalos', cached_password='pass'))
    rv = client.post('api/public/login', data=dict(
        username='p3150133',
        cached_password = 'pass' 
    ), follow_redirects=True)
    assert rv.status_code==200