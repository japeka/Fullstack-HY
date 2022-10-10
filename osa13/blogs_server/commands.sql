CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text NOT NULL,
    url text NOT NULL,
    title text NOT NULL,
    likes int DEFAULT 0
);  

insert into blogs (author, url, title, likes) values ('helstoon', 'http://abc.com', 'titteli', 1);
insert into blogs (author, url, title) values ('helstoon2', 'http://abc2.com', 'titteli2');

