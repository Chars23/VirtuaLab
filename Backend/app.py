#!usr/bin/env python3
from flask import Flask
from flask_cors import CORS
from db import init_db
from auth import auth_bp
from chatbot import chatbot_bp
from terminal import terminals_bp

def create_app():
    app = Flask(__name__)
    
    app.config['SECRET_KEY'] = 'supersecretkey'
    
    CORS(app)
    
    init_db(app)
    
    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(chatbot_bp, url_prefix="/chatbot")
    app.register_blueprint(terminals_bp, url_prefix="/terminal")
    
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=5000)
