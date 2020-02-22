import os
import tempfile
import pytest

from director import create_app, db

# These unit tests only work with the include docker-compose.

@pytest.fixture(scope='session', autouse=True)
def app_primitive():
    app = create_app({
        'AUTH_PROVIDERS': ['local'],
        'SQLALCHEMY_DATABASE_URI': 'postgresql://director:director@127.0.0.1:26339/director',
        'SQLALCHEMY_TRACK_MODIFICATIONS': False,
        'LDAP_URL': 'ldap://127.0.0.1:26340',
        'LDAP_BIND_DN': 'cn=admin,dc=test,dc=org',
        'LDAP_BIND_PASSWD': 'director',
        'LDAP_BASE_DN': 'dc=test,dc=org',
        'LDAP_USERNAME_ATTR': 'cn'
    })

    yield app


@pytest.fixture(autouse=True)
def app(app_primitive):
    with app_primitive.app_context():
        db.session.commit = lambda: None

        yield app_primitive

        db.session.rollback()


@pytest.fixture()
def client(app):
    with app.test_client() as client:
        yield client

