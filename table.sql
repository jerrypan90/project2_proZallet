-- create user table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name varchar (255),
  email varchar (255),
  password varchar (255),
  gender varchar (255),
  age numeric,
  occupation varchar (255),
  salary varchar (255)
);

-- create budget table
CREATE TABLE IF NOT EXISTS budget (
  id SERIAL PRIMARY KEY,
  users_id numeric,
  category varchar (255),
  budget numeric
);

-- create expense table
CREATE TABLE IF NOT EXISTS expense (
  id SERIAL PRIMARY KEY,
  users_id numeric,
  date varchar (255),
  category varchar (255),
  spent numeric,
  remark varchar (255)
);

-- create friendship table
CREATE TABLE IF NOT EXISTS friendship (
  id SERIAL PRIMARY KEY,
  users_id numeric,
  friend_users_id numeric
);