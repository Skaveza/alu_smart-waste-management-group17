#waste collection tests
import unittest
from app import create_app, db
from app.models import WasteCollection

class WasteCollectionModelCase(unittest.TestCase):

    def setUp(self):
        self.app = create_app()
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_schedule_creation(self):
        wc = WasteCollection(user_id=1, scheduled_date='2023-06-20')
        db.session.add(wc)
        db.session.commit()
        self.assertEqual(WasteCollection.query.count(), 1)
