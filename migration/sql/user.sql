CREATE TABLE public.users (
	user_id serial NOT NULL,
	fullname varchar NOT NULL,
	username varchar NOT NULL,
	"password" varchar NOT NULL,
	email varchar NULL,
	"role" varchar NULL DEFAULT 'user',
	created_at timestamp without time zone NULL DEFAULT now(),
	updated_at timestamp without time zone NULL,
	CONSTRAINT users_pk PRIMARY KEY (user_id),
	CONSTRAINT users_un UNIQUE (username)
);