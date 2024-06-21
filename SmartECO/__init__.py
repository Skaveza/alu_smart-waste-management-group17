# smart_waste_management/__init__.py
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
    app = Flask(__name__, template_folder='templates')
    app.config.from_pyfile("config.py")

    db.init_app(app)
    migrate.init_app(app, db)
    login_manager.init_app(app)

    from routes import main as main_blueprint
    app.register_blueprint(main_blueprint)

    return app


