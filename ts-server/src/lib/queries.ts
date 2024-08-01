/**
 * All queries to db here
 */

export const USERS_GET_ALL = `
SELECT id, name, email FROM users;
`;

export const USERS_INSERT = `
INSERT INTO users (name, email)
VALUES ($1, $2)
RETURNING id, name, email;
`;
