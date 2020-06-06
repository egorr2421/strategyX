"use strict";

const Sequelize = require("sequelize");

const sequelize = new Sequelize("course_pr", "postgres", "123789q", {
  host: "localhost",
  dialect: "postgres",
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 1000
  }
});

module.exports = sequelize;
