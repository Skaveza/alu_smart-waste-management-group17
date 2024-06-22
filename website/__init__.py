import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from os import path

db = SQLAlchemy()

migrate = Migrate()
login_manager = LoginManager()

def create_app():
    app = Flask(__name__)
    
    load_dotenv()
    
    url = os.getenv("DATABASE_URL")
    connection = psycopg2.connect(url)
     
     
    db.init_app(app)
    migrate.init_app(app, db)
    login_manager.init_app(app)

    from .views import views
    from .auth import auth
    
    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')
    
    from .models import User, WasteCollection, Recycling
    
    with app.app_context():
           db.create_all()
           print('Connected to a database')
    
    

    return app

       




