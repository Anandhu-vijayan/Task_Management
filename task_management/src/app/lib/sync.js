// lib/sync.js
import sequelize from './db.js';
import User from '../models/User.js';

export async function syncModels() {
  try {
    await sequelize.authenticate();
    console.log('Database connected!');
    await sequelize.sync({ alter: true }); // Use `force: true` to drop & recreate
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to sync database:', error);
  }
}
