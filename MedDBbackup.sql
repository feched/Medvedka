CREATE EXTENSION IF NOT EXISTS pgcrypto;

create table users(
	id_user serial primary key not null,
	login varchar(255),
	pass varchar(255)
);

insert into users(login, pass) values
	('user1', encode(digest('123', 'sha256'), 'hex')),	
	('user2', encode(digest('321', 'sha256'), 'hex'));