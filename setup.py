import setuptools
import os

with open("README.md", "r") as fh:
    long_description = fh.read()

setuptools.setup(
    name="director-aueb-cslabs", # Replace with your own username
    version=os.environ.get('TRAVIS_TAG', 'dev'),
    author="Athens University of Economics and Business, CSLab",
    author_email="cslab@aueb.gr",
    description="A laboratory management solution",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/aueb-cslabs/director",
    packages=setuptools.find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: GNU General Public License v3 (GPLv3)",
        "Operating System :: MacOS",
        "Operating System :: POSIX :: Linux",
    ],
    python_requires='>=3.7',
)
