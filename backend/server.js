const app = require("./app");
const { sequelize } = require("./models");

const PORT = process.env.PORT || 3000;

// Start the server and connect to DB
sequelize.sync().then(() => {
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
});
