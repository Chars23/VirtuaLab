import hashlib

def hash_password(password: str) -> str:
    """
    Hashes a password using SHA-256.
    """
    return hashlib.sha256(password.encode('utf-8')).hexdigest()

def verify_password(password: str, hashed: str) -> bool:
    """
    Verifies a password against the given SHA-256 hash.
    """
    return hash_password(password) == hashed
