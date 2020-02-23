import pytest
import bcrypt
import base64

from director import db, auth
from director.model import User

@pytest.fixture
def authenticator(app):
    db.session.add(User(
        username='p3150133',
        full_name='Spyridon Pagkalos'
    ))
    db.session.add(User(
        username='p3160026',
        full_name='Christos Gkoumas'
    ))

    yield auth


@pytest.mark.parametrize('username,value', [
    ('p3150133', True),
    ('p3160026', True),
    ('p3160027', False),
])
def test_get_user(authenticator, username, value):
    assert (authenticator.get_user(username) is not None) == value


@pytest.mark.parametrize('query,length', [
    ('p31', 2),
    ('p3150133', 1),
    ('p3160026', 1),
    ('p3160027', 0),
])
def test_search_user(authenticator, query, length):
    assert len(authenticator.search_user(query)) == length


@pytest.mark.skip(reason="no way of currently testing this")
@pytest.mark.parametrize('username,password,result', [
    ('p3150133', 'testpast', True),
    ('p3150133', 'testpa', False),
    ('p3150133', '', False),
    ('p3150133', '', False),
])
def test_authenticate(authenticator, username, password, result):
    assert (authenticator.authenticate(username, password) is not None) == result

