from flask import Blueprint, request, jsonify
from models import db, User, WasteCollection, Recycling
from flask_login import login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash

main = Blueprint('main', __name__)

@main.route('/')
def home():
    return "Welcome to the Smart Waste Management System!"

@main.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='sha256')
    new_user = User(username=data['username'], email=data['email'], password=hashed_password, role='household')
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully'}), 201

@main.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({'message': 'Login failed'}), 401
    login_user(user)
    return jsonify({'message': 'Logged in successfully'}), 200

@main.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logged out successfully'}), 200

@main.route('/schedule', methods=['POST'])
@login_required
def schedule_collection():
    data = request.get_json()
    new_schedule = WasteCollection(user_id=current_user.id, scheduled_date=data['scheduled_date'])
    db.session.add(new_schedule)
    db.session.commit()
    return jsonify({'message': 'Waste collection scheduled'}), 201

@main.route('/recycling', methods=['POST'])
@login_required
def track_recycling():
    data = request.get_json()
    new_recycling = Recycling(user_id=current_user.id, material=data['material'], quantity=data['quantity'])
    db.session.add(new_recycling)
    db.session.commit()
    return jsonify({'message': 'Recycling effort tracked'}), 201

@main.route('/admin/users', methods=['GET'])
@login_required
def get_users():
    if current_user.role != 'admin':
        return jsonify({'message': 'Unauthorized'}), 403
    users = User.query.all()
    result = [{'id': user.id, 'username': user.username, 'email': user.email, 'role': user.role} for user in users]
    return jsonify(result), 200
