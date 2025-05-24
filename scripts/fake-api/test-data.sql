/*
 * File: test-data.sql
 * Project: job-ad
 *
 * Author: Denes Solti
 */

CREATE TABLE role(id INTEGER PRIMARY KEY, name TEXT);
CREATE UNIQUE INDEX idx_role_name ON role(name);
INSERT INTO role(name) VALUES ('employer');

CREATE TABLE user(id INTEGER PRIMARY KEY, name TEXT);
CREATE UNIQUE INDEX idx_user_name ON user(name);
INSERT INTO user(name) VALUES ('test@employer.hu');

CREATE TABLE user_role(
  userId INTEGER UNIQUE,
  roleId INTEGER UNIQUE,

  FOREIGN KEY (userId) REFERENCES user(id),
  FOREIGN KEY (roleId) REFERENCES role(id)
);
INSERT INTO user_role
SELECT
  (SELECT id FROM user WHERE name = 'test@employer.hu') AS userId,
  (SELECT id FROM role WHERE name = 'employer') AS userId;