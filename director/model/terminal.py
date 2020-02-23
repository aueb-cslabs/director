import enum

from sqlalchemy import ForeignKey

from director import db


class Status(enum.Enum):
    down = 0
    locked = 1
    up = 2
    logged_in = 3


class Terminal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    host_name = db.Column(db.String(256), unique=True, nullable=True)
    ip = db.Column(db.String(128), unique=True, nullable=False)
    status = db.Column(db.Enum(Status), default=0)
    room = db.Column(db.String(256), nullable=True)
    lab_id = db.Column(db.Integer, ForeignKey('lab.id'))
    sessions = db.relationship("Session", backref="terminal")

    def __repr__(self):
        return '<Terminal %r %r %r %r %r %r>' % (self.id,
                                                 self.host_name,
                                                 self.ip,
                                                 self.status,
                                                 self.room,
                                                 self.lab_id)
