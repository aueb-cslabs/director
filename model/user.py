from app import db
import enum

from marshmallow import Schema, fields
from marshmallow_enum import EnumField

class UserType(enum.Enum):
    local = 0
    ldap = 1

class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    user_type = EnumField(UserType)
    username = fields.Str()
    full_name = fields.Str()
    mail = fields.Str()
    phone = fields.Str()
    affiliation = fields.Str()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    foreign_id = db.Column(db.String(256), unique=True, nullable=True)
    user_type = db.Column(db.Enum(UserType), default='local')

    username = db.Column(db.String(128), unique=True, nullable=False)
    full_name = db.Column(db.String())
    mail = db.Column(db.String(128))
    phone = db.Column(db.String())
    affiliation = db.Column(db.String())

    cached_password = db.Column(db.String())

    def serialize(self):
        return UserSchema().dump(self)

    def __repr__(self):
        return '<User %r %r %r %r %r %r %r>' % (self.id,
                                                self.foreign_id,
                                                self.user_type,
                                                self.username,
                                                self.full_name,
                                                self.mail,
                                                self.affiliation)
