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

INSERT INTO public.ticket(booking_id)
    VALUES
        (1),
        (2),
        (3),
        (4),
        (5),
        (6);