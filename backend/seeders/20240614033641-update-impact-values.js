"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Example: Update the impact value for existing entries
    await queryInterface.bulkUpdate("RecyclingEntries", { impact: 0 }, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Example: Revert the impact value to null if needed
    await queryInterface.bulkUpdate("RecyclingEntries", { impact: null }, {});
  },
};
