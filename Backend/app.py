#!/usr/bin/env python3
"""
Main Flask entry‑point
"""
from flask import Flask
from flask_cors import CORS
from db import init_db
from terminal import terminal_bp
from chatbot import chatbot_bp
from dashboard import dashboard_bp  # optional JSON helpers

def create_app() -> Flask:
    app = Flask(__name__)
    app.config["SECRET_KEY"] = "CHANGE_ME_IN_PROD"
    CORS(app)                # allow frontend ↔ backend

    # Database (SQLite for now)
    init_db(app)

    # Blueprints
    app.register_blueprint(terminal_bp, url_prefix="/api/terminal")
    app.register_blueprint(chatbot_bp,  url_prefix="/api/chatbot")
    app.register_blueprint(dashboard_bp, url_prefix="/api/dashboard")

    return app

app = create_app()

@app.route('/')
def index():
    return "Backend server is running"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
