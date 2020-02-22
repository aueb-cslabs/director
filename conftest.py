import os
import tempfile
import pytest

from app import create_app, db

@pytest.fixture(scope='session', autouse=True)
def app_primitive():
    db_fd, db_file = tempfile.mkstemp()
    app = create_app({
        'AUTH_PROVIDERS': ['local'],
        'SQLALCHEMY_DATABASE_URI': 'sqlite:///' + db_file,
        'SQLALCHEMY_TRACK_MODIFICATIONS': False
    })

    yield app

    os.close(db_fd)
    os.unlink(db_file)

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

