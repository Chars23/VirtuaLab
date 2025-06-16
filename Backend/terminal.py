from flask import Blueprint, request, jsonify
import subprocess, uuid

terminal_bp = Blueprint('terminal', __name__)

@terminal_bp.route('/start-terminal')
def start_terminal():
    os_type = request.args.get('os')
    session_id = str(uuid.uuid4())

    # You can dynamically switch logic here (e.g., different docker run images)
    if os_type == 'ubuntu':
        subprocess.Popen(["bash", "scripts/start_ubuntu.sh", session_id])
    elif os_type == 'fedora':
        subprocess.Popen(["bash", "scripts/start_fedora.sh", session_id])
    # Add others...

    return jsonify({"session_id": session_id})
