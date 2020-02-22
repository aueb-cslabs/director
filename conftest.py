import os
import tempfile

import pytest

from app import create_app

@pytest.fixture(scope="session")
def app():
    db_fd, db_file = tempfile.mkstemp()
    app = create_app({
        'AUTH_PROVIDERS': ['local'],
        'SQLALCHEMY_DATABASE_URI': 'sqlite:///' + db_file,
        'SQLALCHEMY_TRACK_MODIFICATIONS': False
    })

    with app.app_context():
        yield app

    os.close(db_fd)
    os.unlink(db_file)


@pytest.fixture(scope="session")
def client(app):
    with app.test_client() as client:
        yield client
