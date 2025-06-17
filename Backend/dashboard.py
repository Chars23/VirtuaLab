"""
Returns simple dashboard data (e.g., which OS options to show)
"""
from flask import Blueprint, jsonify

dashboard_bp = Blueprint("dashboard", __name__)

@dashboard_bp.route("/tiles", methods=["GET"])
def tiles():
    """Frontend fetches which OS tiles to render."""
    return jsonify(
        [
            {"os": "ubuntu",  "label": "Ubuntu 22"},
            {"os": "kali",    "label": "Kali Linux"},
            {"os": "fedora",  "label": "Fedora XFCE"},
            {"os": "debian",  "label": "Debian XFCE"},
        ]
    )
