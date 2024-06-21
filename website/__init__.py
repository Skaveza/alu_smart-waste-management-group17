from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager

print("smart_waste_management module loaded")

db = SQLAlchemy()
migrate = Migrate()
login_manager = LoginManager()

def create_app():
    print("create_app function called")
    app = Flask(__name__)
    app.config['SECRET KEY'] = 'c57cdd3f1ccd87cfec1e54a76306abc2618813aa4cce89b8'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://smart_user:smart_waste@localhost:5432/waste_management_db'  
    

    db.init_app(app)
    migrate.init_app(app, db)
    login_manager.init_app(app)

    from .views import views
    from .auth import auth
    
    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')

    return app




