from datetime import datetime

from sqlalchemy import ForeignKey

from app import db
from model import user, terminal, lab


class Session(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    terminal_id = db.Column(db.Integer, ForeignKey(terminal.Terminal.id), nullable=False)
    user_id = db.Column(db.Integer, ForeignKey(user.User.id), nullable=False)
    lab_id = db.Column(db.Integer, ForeignKey(lab.Lab.id), nullable=False)
    start = db.Column(db.DateTime, nullable=False, default=datetime.now)
    end = db.Column(db.DateTime, nullable=True)  # nullable because user may still be logged in

    def __repr__(self):
        return '<Session %r %r %r %r %r>' % (self.id,
                                             self.terminal_id,
                                             self.user_id,
                                             self.start,
                                             self.end)
