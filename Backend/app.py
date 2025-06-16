from terminal import socketio
# at bottom:
if __name__ == "__main__":
    socketio.init_app(app)
    socketio.run(app, host="0.0.0.0", port=5000, debug=True)
