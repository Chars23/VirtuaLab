from flask import Blueprint, request, jsonify

chatbot_bp = Blueprint('chatbot', __name__)

@chatbot_bp.route('/ask', methods=['POST'])
def ask():
    data = request.json['query']
    # Basic example logic
    if "ls" in data:
        return jsonify({'response': 'ls lists files in the current directory'})
    return jsonify({'response': "I'm not sure. Try another command."})