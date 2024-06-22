from flask import Blueprint, render_template, request, flash, redirect, url_for
from .models import db, User, WasteCollection, Recycling
from flask_login import login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash

auth = Blueprint('auth', __name__)

@auth.route('/')
def home():
    return "Welcome to SMARTECO!"

@auth.route('/login', methods=['GET','POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        user = User.query.filter_by(email=email).first()
        if user:
            if check_password_hash(user.password, password):
                flash('Logged in successfully!', category='success')
                login_user(user, remember=True)
                return redirect(url_for('views.index'))
            else:
                flash('Incorrect password, try again.', category='error')
        else:
            flash('Email does not exist.', category='error')

    return render_template("login.html", user=current_user)

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.login'))

@auth.route('/schedule', methods=['GET','POST'])
@login_required
def schedule_collection():
    if request.method == 'POST':
        scheduled_date = request.form.get('date')
        if not scheduled_date:
            flash('Scheduled date is required.', category='error')
        else:
            new_schedule = WasteCollection(user_id=current_user.id, scheduled_date=scheduled_date)
            db.session.add(new_schedule)
            db.session.commit()
            flash('Waste collection scheduled successfully.', category='success')
            return redirect(url_for('views.index'))

    return render_template("schedule.html", user=current_user)

@auth.route('/recycling', methods=['GET','POST'])
@login_required
def track_recycling():
    if request.method == 'POST':
        recyclingType = request.form.get('recyclingType')
        quantity = request.form.get('quantity')

        if not material or not quantity:
            flash('Material and quantity are required.', category='error')
        else:
            new_recycling = Recycling(user_id=current_user.id, recyclingType=recyclingType, quantity=quantity)
            db.session.add(new_recycling)
            db.session.commit()
            flash('Recycling effort tracked successfully.', category='success')
            return redirect(url_for('views.index'))

    return render_template("tracker.html", user=current_user)
  
@auth.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('name')
        email = request.form.get('email')
        password = request.form.get('password')
        role = request.form.get('role')

        user = User.query.filter_by(email=email).first()
        if user:
            flash('Email already exists.', category='error')
        else:
            hashed_password = generate_password_hash(password, method='sha256')
            new_user = User(username=username, email=email, password=hashed_password, role=role)
            db.session.add(new_user)
            db.session.commit()
            flash('User registered successfully!', category='success')
            return redirect(url_for('auth.login'))

    return render_template("register.html", user=current_user)
