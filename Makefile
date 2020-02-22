.EXPORT_ALL_VARIABLES:

export FLASK_ENV = development
export FLASK_APP = .

.ci-test:
	pytest -s --cov=.

archive: clean
	python3 setup.py sdist bdist_wheel

clean:
	rm -rf build dist *.egg-info || true

run:
	flask run

shell:
	flask shell

test:
	pytest -s
