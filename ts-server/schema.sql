-- USERS

create table users (
    id serial not null primary key,
    name varchar(100) not null,
    email varchar(200) not null unique
);