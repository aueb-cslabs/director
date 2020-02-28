# Director

[![Build Status](https://travis-ci.com/aueb-cslabs/director.svg?branch=master)](https://travis-ci.com/aueb-cslabs/director)
[![codecov](https://codecov.io/gh/aueb-cslabs/director/branch/master/graph/badge.svg)](https://codecov.io/gh/aueb-cslabs/director)

Director is a service for computer laboratory management.

More to be added here soon!

## Setup environment

To setup your development environment, simply copy `config.example.py` and rename
it `config.py`, whilst changing any settings that you might want! Keep it in the
project root if you want the `make` targets below it work properly!

If you want to run tests with `pytest`, you also need to have the testing Docker
database and LDAP up and running. For that, do `docker-compose up -d` to bring
them up.

## Running

To start the Flask application, while inside the project's directory, run:

```bash
export DIRECTOR_SETTINGS="<path to your config.py file>"
FLASK_ENV=development FLASK_APP=director flask run
```

Alternatively, to not repeat yourself, just run the `make` target:
(This will use the config.py file that you create inside the root directory).

```bash
make run
```

You can always replace the `run` with `shell`, to get a Flask interactive shell
instead of starting the server.

## Setup in production

To set it up in production, simply install the `aueb-cslabs-director` package inside a virtualenv, by doing:

```bash
pip install aueb-cslabs-director
```

Afterwards, you need to setup a `config.py` file that will contain your app configuration.

In any case, you will need to provide a `DIRECTOR_SETTINGS` environment variable that
points to the absolute path of that `config.py` file you just created.

Finally to make it run, you need to setup a uWSGI server, as explained here:
[https://flask.palletsprojects.com/en/1.0.x/deploying/uwsgi/](https://flask.palletsprojects.com/en/1.0.x/deploying/uwsgi/)

As an example, here is a uWSGI command you can build on:

```bash
export DIRECTOR_SETTINGS="<path to your config.py file>"
uwsgi --http :5000 --module 'director:create_app()' -H "<path to your virtualenv>"
```
