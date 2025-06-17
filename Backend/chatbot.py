#!/usr/bin/env python3
"""
Very simple rule‑based chatbot placeholder
"""
from flask import Blueprint, request, jsonify

chatbot_bp = Blueprint("chatbot", __name__)

FAQ = {
    "hello": "Hi there! 👋",
    "help":  "You can launch VMs by clicking an OS tile on the dashboard.",
}

@chatbot_bp.route("/ask", methods=["POST"])
def ask():
    user_msg = (request.json or {}).get("message", "").lower()
    for key, resp in FAQ.items():
        if key in user_msg:
            return jsonify({"reply": resp})
    # default
    return jsonify({"reply": "I'm still learning. Try asking something else!"})
