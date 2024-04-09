

import mysql, { PoolOptions } from 'mysql2';

const access: PoolOptions = {
  user: 'admin',
  database: 'test',
};

const conn = mysql.createPool(access);