CREATE TABLE IF NOT EXISTS x.user (
  id            SERIAL PRIMARY KEY,
  email         VARCHAR(255),
  login         VARCHAR(255),
  avatar        VARCHAR(255),
  state         VARCHAR(255),
  password      VARCHAR(255),
  session_id    VARCHAR(2048)
);