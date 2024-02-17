CREATE TABLE public.movie (
	movie_id serial NOT NULL,
	movie_name varchar NOT NULL,
	movie_banner varchar NULL,
	release_date date NULL,
	created_at timestamp without time zone NULL DEFAULT now(),
	updated_at timestamp without time zone NULL,
	CONSTRAINT movie_pk PRIMARY KEY (movie_id)
);