import os


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your_default_secret_key'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'postgresql://smart_user:smart_waste@localhost:5432/waste_management_db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
