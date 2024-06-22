const User = require('./models/user');
const sequelize = require('./config/database');

async function seedDatabase() {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synchronized');

    // Create Users
    const users = [
      { firstname: 'John', lastname: 'Doe', address: '123 Main St', password: 'password', email: 'john@example.com', role: 'user' },
      { firstname: 'Jane', lastname: 'Smith', address: '456 Elm St', password: 'password', email: 'jane@example.com', role: 'admin' }
    ];

    for (const user of users) {
      try {
        await User.create(user);
        console.log(`User ${user.firstname} ${user.lastname} created`);
      } catch (error) {
        console.error(`Error creating user ${user.firstname} ${user.lastname}:`, error);
      }
    }

    console.log('Database seeding completed');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    sequelize.close();
  }
}

seedDatabase();
