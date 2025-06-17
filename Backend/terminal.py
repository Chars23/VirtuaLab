#!/usr/bin/env python3
"""
Endpoint to launch VM scripts and return VNC URL
"""
from flask import Blueprint, request, jsonify
from utils.vm_manager import start_vm

terminal_bp = Blueprint("terminal", __name__)

@terminal_bp.route("/launch", methods=["POST"])
def launch_vm():
    data = request.get_json(silent=True) or {}
    os_type = data.get("os", "ubuntu").lower()

    try:
        port = start_vm(os_type)
        novnc_url = f"http://<YOUR-SERVER-IP>:{port}/vnc.html"
        return jsonify({"status": "starting", "os": os_type, "port": port, "url": novnc_url})
    except FileNotFoundError as e:
        return jsonify({"error": str(e)}), 400
