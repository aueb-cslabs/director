import enum

from sqlalchemy import ForeignKey

from marshmallow import Schema, fields
from marshmallow_enum import EnumField

from director import db

class Status(enum.Enum):
    down = 0
    locked = 1
    up = 2
    logged_in = 3

class TerminalSchema(Schema):
    id = fields.Int(dump_only=True)
    host_name = fields.Str()
    ip = fields.Str()
    status = EnumField(Status)
    room = fields.Str()
    lab_id = fields.Int(dump_only=True)


class Terminal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    host_name = db.Column(db.String(256), unique=True, nullable=True)
    ip = db.Column(db.String(128), unique=True, nullable=False)
    status = db.Column(db.Enum(Status), default=0)
    room = db.Column(db.String(256), nullable=True)
    lab_id = db.Column(db.Integer, ForeignKey('lab.id'))
    sessions = db.relationship("Session", backref="terminal")

    def serialize(self):
        return TerminalSchema().dump(self)

    def update_all(self, changes):
        try:
            self.host_name = changes["host_name"]
            self.ip = changes["ip"]
            self.status = Status.down if changes["status"] == None else changes["status"]
            self.room = changes["room"]
            self.lab_id = changes["lab_id"]
            db.session.commit()
        except:
            return {"error", "Possible duplicate host name or IP."}, 400
        
        return {"message": "Update successful"}

    def update(self, changes):
        madeChanges = 204
        for key, value in changes.items():
            madeChanges = 200
            setattr(self, key, value)
        try:
            db.session.commit()
        except:
            return {"error", "Possible duplicate host name or IP."}, 400
        return {"Success": "Updated."}, madeChanges

    def __repr__(self):
        return '<Terminal %r %r %r %r %r %r>' % (self.id,
                                                 self.host_name,
                                                 self.ip,
                                                 self.status,
                                                 self.room,
                                                 self.lab_id)
