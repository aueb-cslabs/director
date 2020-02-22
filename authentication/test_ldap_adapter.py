import pytest

from director import db
from director.model import User
from director.authentication.ldap_adapter import LdapAdapter


@pytest.fixture
def ldap_adapter(app):
    yield LdapAdapter()


def test_bind(ldap_adapter):
    def assertion(conn):
        assert conn is not None

    ldap_adapter._LdapAdapter__with_connection(assertion)


def test_get_user(ldap_adapter):
    assert ldap_adapter.get_user('admin') is not None
    assert ldap_adapter.get_user('user') is None


def test_search_user(ldap_adapter):
    assert len(ldap_adapter.search_user('admin')) == 1
    assert len(ldap_adapter.search_user('user')) == 0

def test_authenticate(ldap_adapter):
    user = ldap_adapter.get_user('admin')

    assert ldap_adapter.authenticate(user, 'director') is True
    assert ldap_adapter.authenticate(user, 'password') is False

