from app import db
from model import User

def test_get_user(client):
    db.session.add(User(username='p3150133', full_name='Spyridon Pagkalos'))
    db.session.commit()

    rv = client.get('/api/public/user/p3150133')
    assert b'p3150133' in rv.data
    assert b'Spyridon Pagkalos' in rv.data

