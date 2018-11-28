from app import db


class User(db.Model):
    """
        This model represents all the users of the database be it a staff or service provider or general user.
    """
    __tablename__ = "user"
    __table_args__ = {'extend_existing': True}

    public_id = db.Column(db.String, primary_key=True, nullable=False, unique=True)
    username = db.Column(db.String, nullable=False, unique=True)
    email = db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)
    profile_picture = db.Column(db.String, default="No profile provided")
    time_joined = db.Column(db.DateTime, nullable=False, default='now')



