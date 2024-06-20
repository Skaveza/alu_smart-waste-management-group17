from flask import Flask, render_template, redirect, url_for, request
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user

app = Flask(__name__)
app.secret_key = 'your_secret_key'
login_manager = LoginManager()
login_manager.init_app(app)

# Dummy user model for demonstration purposes
class User(UserMixin):
    def __init__(self, id, email, password, role):
        self.id = id
        self.email = email
        self.password = password
        self.role = role

# Example user data
users = {
    'user1@example.com': User('1', 'user1@example.com', 'password', 'household'),
    'admin@example.com': User('2', 'admin@example.com', 'password', 'admin')
}

@login_manager.user_loader
def load_user(user_id):
    for user in users.values():
        if user.id == user_id:
            return user
    return None

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        user = users.get(email)
        if user and user.password == password:
            login_user(user)
            return redirect(url_for('dashboard'))
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        # Handle registration logic here
        pass
    return render_template('register.html')

@app.route('/dashboard')
@login_required
def dashboard():
    return render_template('dashboard.html')

@app.route('/schedule', methods=['GET', 'POST'])
@login_required
def schedule():
    if request.method == 'POST':
        # Handle scheduling logic here
        pass
    return render_template('schedule.html')

@app.route('/tracker', methods=['GET', 'POST'])
@login_required
def tracker():
    if request.method == 'POST':
        # Handle recycling tracking logic here
        pass
    return render_template('tracker.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
