/* Replace with your SQL commands */

CREATE TABLE public.users (
    user_id serial PRIMARY KEY,
    first_name VARCHAR(50) NULL,
    last_name VARCHAR(50),
	username varchar UNIQUE NULL,
    email_user VARCHAR NOT NULL,
	"password" varchar NOT NULL,
	"role" varchar NULL DEFAULT 'user',
    title TEXT DEFAULT 'Moviegoers',
    points int DEFAULT 0,
    photo_url VARCHAR DEFAULT '',
    phone_number VARCHAR(20) NULL,
	created_at timestamp without time zone NULL DEFAULT now(),
	updated_at timestamp without time zone NULL
);

CREATE TABLE public.movie (
   movie_id serial PRIMARY KEY,
   movie_name VARCHAR NOT NULL,
   movie_poster varchar NULL,
   release_date DATE NOT NULL,
   directed_by VARCHAR(50) NOT NULL,
   casts TEXT[] NOT NULL,
   duration INTERVAL NOT NULL,
   synopsis TEXT NOT NULL
);

CREATE TABLE schedule (
    schedule_id SERIAL PRIMARY KEY,
    movie_id INT NOT NULL,
    show_date TIMESTAMP without time zone NOT NULL,
    show_location VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    cinema_name VARCHAR(50),
    CONSTRAINT fk_schedule_movie
    FOREIGN KEY (movie_id)
        REFERENCES movie(movie_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE public.genre (
	genre_id serial NOT NULL,
	genre_name varchar NOT NULL,
	created_at timestamp without time zone NULL DEFAULT now(),
	updated_at timestamp without time zone NULL,
	CONSTRAINT genre_pk PRIMARY KEY (genre_id),
	CONSTRAINT genre_un UNIQUE (genre_name)
);

CREATE TABLE public.movie_genre (
	movie_genre_id serial NOT NULL,
	movie_id int NOT NULL,
	genre_id int NOT NULL,
	CONSTRAINT movie_genre_pk PRIMARY KEY (movie_genre_id),
	CONSTRAINT movie_genre_fk FOREIGN KEY (movie_id) REFERENCES public.movie(movie_id) ON DELETE CASCADE,
	CONSTRAINT movie_genre_fk_1 FOREIGN KEY (genre_id) REFERENCES public.genre(genre_id) ON DELETE CASCADE
);

CREATE TYPE payment_method AS ENUM ('BRI','BCA', 'VISA', 'gopay', 'OVO', 'PAYPAL', 'DANA', 'GPAY');

CREATE TABLE booking (
    booking_id serial PRIMARY KEY,
    user_id INT NOT NULL,
    schedule_id INT NOT NULL,
    category VARCHAR NOT NULL,
    seat TEXT[] NOT NULL,
    amount INT NOT NULL,
    payment_method payment_method NOT NULL,
    order_date TIMESTAMP without time zone NOT NULL DEFAULT current_timestamp,
    FOREIGN KEY (schedule_id)
        REFERENCES public.schedule(schedule_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_id)
        REFERENCES public.users(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE ticket (
    ticket_id SERIAL PRIMARY KEY,
    booking_id INT NOT NULL,
    created_at timestamp without time zone NULL DEFAULT now(),
	updated_at timestamp without time zone NULL,
    CONSTRAINT fk_ticket_booking
    FOREIGN KEY (booking_id)
        REFERENCES booking(booking_id)
        ON DELETE CASCADE
);
