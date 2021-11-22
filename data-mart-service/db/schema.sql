CREATE TABLE mart (
  id            serial,
  dist          decimal(8,3),  
  user_name     varchar(50),
  insert_date   timestamp with time zone NOT NULL
);