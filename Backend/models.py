from db import db
from datetime import datetime

class User(db.Model):
    id       = db.Column(db.Integer, primary_key=True)
    uid      = db.Column(db.String(120), unique=True)  # Firebase UID
    email    = db.Column(db.String(180))
    created  = db.Column(db.DateTime, default=datetime.utcnow)

class VMInstance(db.Model):
    id        = db.Column(db.Integer, primary_key=True)
    user_id   = db.Column(db.Integer, db.ForeignKey("user.id"))
    os_type   = db.Column(db.String(50))        # ubuntu / fedora / kali / debian
    status    = db.Column(db.String(20))        # running / stopped
    port      = db.Column(db.Integer)           # VNC / noVNC port
    started   = db.Column(db.DateTime, default=datetime.utcnow)
