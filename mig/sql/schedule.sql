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