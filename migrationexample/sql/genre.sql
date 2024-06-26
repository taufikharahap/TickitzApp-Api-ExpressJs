CREATE TABLE public.genre (
	genre_id serial NOT NULL,
	genre_name varchar NOT NULL,
	created_at timestamp without time zone NULL DEFAULT now(),
	updated_at timestamp without time zone NULL,
	CONSTRAINT genre_pk PRIMARY KEY (genre_id),
	CONSTRAINT genre_un UNIQUE (genre_name)
);

INSERT INTO genre(genre_name)
    VALUES
        ('Adventure'),
        ('Action'),
        ('Fantasy'),
        ('Comedy'),
        ('Family'),
        ('Drama'),
        ('Sc-Fi'),
        ('crime'),
        ('Horror'),
        ('Romance'),
        ('Thriller');