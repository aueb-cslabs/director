from app import db


class Lab(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    number_of_pcs = db.Column(db.Integer, nullable=False, default=0)
    terminals = db.relationship("Terminal", backref="lab")
    sessions = db.relationship("Session", backref="lab")

    def __repr__(self):
        return '<Lab %r %r %r>' % (self.id,
                                   self.name,
                                   self.number_of_pcs)
