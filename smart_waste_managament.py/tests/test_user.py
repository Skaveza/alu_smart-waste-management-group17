#user management
import unittest
from app import create_app, db
from app.models import User

class UserModelCase(unittest.TestCase):

    def setUp(self):
        self.app = create_app()
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_user_creation(self):
        u = User(username='testuser', email='test@example.com', password='testpass')
        db.session.add(u)
        db.session.commit()
        self.assertEqual(User.query.count(), 1)
