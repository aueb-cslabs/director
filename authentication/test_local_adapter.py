import pytest

from app import db
from model import User
from authentication.local_adapter import LocalAdapter


@pytest.fixture
def local_adapter(app):
    db.session.add(User(username='p3150133', full_name='Pagkalos Spyridon'))
    db.session.add(User(username='p3140001', full_name='Aggelou Christos'))
    db.session.add(User(username='t8150008', full_name='Some Random Student'))

    yield LocalAdapter()


@pytest.mark.parametrize('username, full_name', [
    ('p3150133', 'Pagkalos Spyridon'),
    ('p3140001', 'Aggelou Christos'),
    ('p3140002', None),
])
def test_get_user(local_adapter, username, full_name):
    user = local_adapter.get_user(username)

    try:
        assert user.full_name == full_name
    except:
        assert full_name == None


@pytest.mark.parametrize('q, l', [
    ('p3', 2),
    ('p31', 2),
    ('p315', 1),
    ('p314', 1),
    ('p3140001', 1),
    ('p316', 0),
    ('t815', 1),
    ('t8150008', 1),
])
def test_search_user(local_adapter, q, l):
    assert len(local_adapter.search_user(q)) == l

