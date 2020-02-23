from director import db
from director.model import User
from director.authentication.local_adapter import LocalAdapter

def test_get_user(client):
    db.session.add(User(username='p3150133', full_name='Spyridon Pagkalos'))

    rv = client.get('/api/public/user/p3150133')
    assert b'p3150133' in rv.data
    assert b'Spyridon Pagkalos' in rv.data


def test_get_user_failing_test(client):
    rv = client.get('/api/public/user/p3150133')
    assert rv.status_code == 404

