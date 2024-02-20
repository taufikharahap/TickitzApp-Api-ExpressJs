CREATE TABLE public.users (
    user_id serial PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50),
	username varchar UNIQUE NOT NULL,
    email_user VARCHAR NULL,
	"password" varchar NOT NULL,
	"role" varchar NULL DEFAULT 'user',
    about_me TEXT,
    phone_number VARCHAR(20) NOT NULL,
	created_at timestamp without time zone NULL DEFAULT now(),
	updated_at timestamp without time zone NULL
);

insert into users (first_name, last_name, username, email_user, password, role, about_me, photo_profile, phone_number) 
values 
('Ainslie', 'Jurczyk', 'ainslie', 'ajurczyk0@histats.com', 'sakajsdf334wldfk','user', 'Cras non velit nec nisi vulputate nonummy', 'http://dummyimage.com/176x100.png/cc0000/ffffff', '+970 897 865 3564');