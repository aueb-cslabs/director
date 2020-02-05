from app import db
import enum

class UserType(enum.Enum):
    local = 0
    ldap = 1

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    foreign_id = db.Column(db.String(256), unique=True, nullable=True)
    user_type = db.Column(db.Enum(UserType), default=0)

    username = db.Column(db.String(128), unique=True, nullable=False)
    full_name = db.Column(db.String())
    mail = db.Column(db.String())
    phone = db.Column(db.String())
    affiliation = db.Column(db.String())

    cached_password = db.Column(db.String())

    def __repr__(self):
        return '<User %r %r %r %r %r %r %r>' % (self.id,
                                                self.foreign_id,
                                                self.user_type,
                                                self.username,
                                                self.full_name,
                                                self.mail,
                                                self.affiliation)
