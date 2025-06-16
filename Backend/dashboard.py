from flask import Blueprint, jsonify, session

dashboard_bp = Blueprint('dashboard', __name__)

@dashboard_bp.route('/')
def dashboard():
    if 'user' not in session:
        return jsonify({'error': 'Not logged in'}), 401
    return jsonify({'projects': ['OS Project', 'DBMS Lab', 'MiniShell']})
