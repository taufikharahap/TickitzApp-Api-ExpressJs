CREATE TABLE public.movie_genre (
	movie_genre_id serial NOT NULL,
	movie_id int NOT NULL,
	genre_id int NOT NULL,
	CONSTRAINT movie_genre_pk PRIMARY KEY (movie_genre_id),
	CONSTRAINT movie_genre_fk FOREIGN KEY (movie_id) REFERENCES public.movie(movie_id) ON DELETE CASCADE,
	CONSTRAINT movie_genre_fk_1 FOREIGN KEY (genre_id) REFERENCES public.genre(genre_id) ON DELETE CASCADE
);
