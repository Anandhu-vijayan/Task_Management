import { Sequelize } from 'sequelize';
import pg from 'pg';

const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: process.env.PGHOST,
    dialect: 'postgres',
    dialectModule: pg,
    logging: console.log,
    // dialectOptions: {
    //   ssl: {
    //     require: false,
    //     rejectUnauthorized: false, // Supabase uses self-signed certs
    //   },
    // },
  }
);


export default sequelize;

// // lib/db.js
// import { Pool } from 'pg';

// const pool = new Pool({
//   user: process.env.PGUSER,
//   host: process.env.PGHOST,
//   database: process.env.PGDATABASE,
//   password: process.env.PGPASSWORD,
//   port: process.env.PGPORT,
// });

// export default pool;
