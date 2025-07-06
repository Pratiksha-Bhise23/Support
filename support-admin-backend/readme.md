
CREATE TABLE public.users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(20) UNIQUE,
    role VARCHAR(50) DEFAULT 'user',
    status BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    admin_id INTEGER,

    CONSTRAINT users_admin_id_fkey
        FOREIGN KEY (admin_id)
        REFERENCES public.admins(id)
        ON DELETE SET NULL
);


INSERT INTO public.users (
  id, name, email, phone, role, status, admin_id
) VALUES
(101, 'Aman Verma', 'aman.verma@example.com', '+919000000101', 'user', true, NULL),
(102, 'Priya Singh', 'priya.singh@example.com', '+919000000102', 'user', true, NULL),
(103, 'Ravi Sharma', 'ravi.sharma@example.com', '+919000000103', 'user', true, NULL);



CREATE TABLE public.bookings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    flight_id VARCHAR(255) NOT NULL,
    total_price NUMERIC(10, 2) NOT NULL,
    amadeus_order_id VARCHAR(255),
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    payment_id TEXT,
    pnr VARCHAR(10),
    selected_seat VARCHAR(10),
    baggage VARCHAR(10),
    travel_insurance BOOLEAN DEFAULT false,
    refundable_booking BOOLEAN DEFAULT false,
    gstin VARCHAR(15),
    order_id VARCHAR(255),
    signature TEXT,

    CONSTRAINT bookings_user_id_fkey
        FOREIGN KEY (user_id)
        REFERENCES public.users(id)
);



INSERT INTO public.bookings (
  user_id, flight_id, total_price, amadeus_order_id, status, payment_id, pnr,
  selected_seat, baggage, travel_insurance, refundable_booking, gstin,
  order_id, signature
) VALUES 
(101, 'FL-202', 15000.00, 'AMA123456', 'confirmed', 'PAY123456', 'PNR202A', '12A', '15kg', true, true, '22AAAAA0000A1Z5', 'ORD123456', 'abc123signature'),

(102, 'FL-204', 20000.00, 'AMA123457', 'cancelled', 'PAY123457', 'PNR204B', '14B', '20kg', false, false, NULL, 'ORD123457', 'def456signature'),

(103, 'FL-203', 19500.00, 'AMA123458', 'confirmed', 'PAY123458', 'PNR203C', '15C', '10kg', true, false, '27BBBBB1111B2Z6', 'ORD123458', 'ghi789signature'),

(101, 'FL-205', 21000.00, 'AMA123459', 'confirmed', 'PAY123459', 'PNR205D', '16D', '25kg', true, true, '22AAAAA0000A1Z5', 'ORD123459', 'jkl012signature');


CREATE TABLE support_issues (
  id SERIAL PRIMARY KEY,
  booking_id INTEGER NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  issue_type VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'Open',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  support_reply TEXT
);

all endpoint for booking history
http://localhost:5000/api/bookings/history    
method : POST

all endpoint for support issues

for create support issue
http://localhost:5000/api/support
method : POST 

for get all support issue
http://localhost:5000/api/support
method : GET 

for get all support issue by id
http://localhost:5000/api/support/:id
method : GET 

for update support issue
http://localhost:5000/api/support/:id
method : PUT 

for delete support issue
http://localhost:5000/api/support/:id
method : DELETE