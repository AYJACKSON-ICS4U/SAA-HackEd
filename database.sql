CREATE TABLE users (
  id serial primary key,
  description varchar(255)
);

CREATE TABLE userdata (
  id serial primary key,
  album_id integer,
  description varchar(255),
  filepath varchar(255)
);