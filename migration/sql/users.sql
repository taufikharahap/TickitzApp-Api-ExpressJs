CREATE TABLE public.users (
    user_id serial PRIMARY KEY,
    first_name VARCHAR(50) NULL,
    last_name VARCHAR(50),
	username varchar UNIQUE NULL,
    email_user VARCHAR NOT NULL,
	"password" varchar NOT NULL,
	"role" varchar NULL DEFAULT 'user',
    about_me TEXT,
    phone_number VARCHAR(20) NULL,
	created_at timestamp without time zone NULL DEFAULT now(),
	updated_at timestamp without time zone NULL
);

insert into users (first_name, last_name, username, email_user, password, role, about_me, phone_number) 
values 
('Ainslie', 'Jurczyk', 'ainslie', 'ajurczyk0@histats.com', 'sakajsdf334wldfk','user', 'Cras non velit nec nisi vulputate nonummy', '+970 897 865 3564');