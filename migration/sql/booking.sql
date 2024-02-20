CREATE TYPE payment_method AS ENUM ('BRI','BCA', 'VISA', 'gopay', 'OVO', 'PAYPAL', 'DANA', 'GPAY');

CREATE TABLE booking (
    booking_id serial PRIMARY KEY,
    user_id INT NOT NULL,
    schedule_id INT NOT NULL,
    category VARCHAR NOT NULL,
    seat TEXT[] NOT NULL,
    amount INT NOT NULL,
    payment_method payment_method NOT NULL,
    order_date TIMESTAMP NOT NULL DEFAULT current_timestamp,
    FOREIGN KEY (schedule_id)
        REFERENCES public.schedule(schedule_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_id)
        REFERENCES public.users(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO public.booking(user_id, schedule_id, category, seat, amount, payment_method)
    VALUES
        (3, 2, 'PG-13', ARRAY['C4', 'C5'], 2,'BCA'),
        (3, 2, 'PG-14', ARRAY['C4', 'C5'], 2,'BCA'),
        (2, 2, 'PG-15', ARRAY['C4', 'C5'], 2,'DANA'),
        (2, 2, 'PG-13', ARRAY['C4', 'C5'], 2,'DANA'),
        (8, 2, 'PG-14', ARRAY['C4', 'C5'], 2,'DANA'),
        (8, 2, 'PG-14', ARRAY['C4', 'C5'], 2,'DANA');