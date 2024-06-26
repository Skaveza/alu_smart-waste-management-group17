import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from os import path


db = SQLAlchemy()
DB_NAME = "database.db"

def create_app():
    app = Flask(__name__) 
    
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'c57cdd3f1ccd87cfec1e54a76306abc2618813aa4cce89b8')
    
    # Database configuration
    database_url = os.environ.get('DATABASE_URL')
    if database_url:
        # Modify the URL if it starts with 'postgres://'
        if database_url.startswith("postgres://"):
            database_url = database_url.replace("postgres://", "postgresql://", 1)
        app.config['SQLALCHEMY_DATABASE_URI'] = database_url
    else:
        # Fallback for local development
        app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://smart_user:smart_waste@localhost:5432/waste_management_db'

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_ECHO'] = True  # For debugging, remove in production

    db.init_app(app)

    # Test database connection
    with app.app_context():
        try:
            db.engine.connect()
            print("Database connection successful!")
        except Exception as e:
            print(f"Database connection failed. Error: {e}")

    from .views import views
    from .auth import auth

    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')

    from .models import User, WasteCollection, Recycling

    with app.app_context():
        db.create_all()  # Create database tables if they don't exist
        print('Connected to the database')
        
    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)
    
    @login_manager.user_loader
    def load_user(id):
        return User.query.get(int(id))

    return app

def create_database(app):
    if not path.exists('website/' + DB_NAME):
        db.create_all(app=app)
        print('Created Database!')
