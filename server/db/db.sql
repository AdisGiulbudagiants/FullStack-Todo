CREATE TABLE users (
    id int GENERATED ALWAYS AS IDENTITY NOT NULL,
    name varchar(255) DEFAULT 'User',
    email varchar(255) NOT NULL UNIQUE,
    password text NOT NULL,

    CONSTRAINT pk_users_id PRIMARY KEY(id)
);

CREATE TABLE todos (
    id int GENERATED ALWAYS AS IDENTITY NOT NULL,
    title text DEFAULT 'Title',
    description text DEFAULT 'Description',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    favorite boolean DEFAULT false,
    user_id int REFERENCES users(id),

    CONSTRAINT pk_todos_id PRIMARY KEY(id)
);


DROP TABLE users;
DROP TABLE todos;

TRUNCATE TABLE todos RESTART IDENTITY;


INSERT INTO users ( email, password)
VALUES
('test@mail.com','123456')
RETURNING *;

INSERT INTO todos (title,description)
VALUES
('Hello','World')
RETURNING *;

SELECT * FROM users;
SELECT * FROm todos;

TRUNCATE users RESTART IDENTITY;