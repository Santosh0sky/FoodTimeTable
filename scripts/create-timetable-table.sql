-- Create table for hostel mess timetable
CREATE TABLE IF NOT EXISTS mess_timetable (
    id SERIAL PRIMARY KEY,
    day_of_week VARCHAR(10) NOT NULL,
    meal_type VARCHAR(10) NOT NULL,
    meal_time VARCHAR(50) NOT NULL,
    menu_items TEXT[] NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(day_of_week, meal_type)
);

-- Insert initial data
INSERT INTO mess_timetable (day_of_week, meal_type, meal_time, menu_items) VALUES
('Monday', 'breakfast', '7:30 AM - 9:00 AM', ARRAY['Idli', 'Sambar', 'Chutney', 'Tea', 'Banana']),
('Monday', 'lunch', '12:30 PM - 2:00 PM', ARRAY['Rice', 'Dal', 'Chapati', 'Mixed Veg Curry', 'Curd', 'Salad']),
('Monday', 'snacks', '5:00 PM - 5:30 PM', ARRAY['Samosa', 'Tea']),
('Monday', 'dinner', '7:30 PM - 9:00 PM', ARRAY['Jeera Rice', 'Rajma', 'Chapati', 'Cabbage Sabzi', 'Papad']),

('Tuesday', 'breakfast', '7:30 AM - 9:00 AM', ARRAY['Poha', 'Boiled Egg', 'Tea', 'Fruit']),
('Tuesday', 'lunch', '12:30 PM - 2:00 PM', ARRAY['Rice', 'Sambar', 'Chapati', 'Beans Poriyal', 'Curd', 'Pickle']),
('Tuesday', 'snacks', '5:00 PM - 5:30 PM', ARRAY['Bread Pakora', 'Lemon Tea']),
('Tuesday', 'dinner', '7:30 PM - 9:00 PM', ARRAY['Plain Rice', 'Chicken Curry', 'Chapati', 'Carrot Sabzi', 'Sweet']),

('Wednesday', 'breakfast', '7:30 AM - 9:00 AM', ARRAY['Upma', 'Coconut Chutney', 'Tea', 'Banana']),
('Wednesday', 'lunch', '12:30 PM - 2:00 PM', ARRAY['Rice', 'Chole', 'Chapati', 'Pumpkin Curry', 'Buttermilk']),
('Wednesday', 'snacks', '5:00 PM - 5:30 PM', ARRAY['Biscuits', 'Milk']),
('Wednesday', 'dinner', '7:30 PM - 9:00 PM', ARRAY['Fried Rice', 'Gobi Manchurian', 'Salad', 'Ice Cream']),

('Thursday', 'breakfast', '7:30 AM - 9:00 AM', ARRAY['Dosa', 'Sambar', 'Chutney', 'Tea']),
('Thursday', 'lunch', '12:30 PM - 2:00 PM', ARRAY['Rice', 'Dal', 'Chapati', 'Aloo Gobi', 'Raita']),
('Thursday', 'snacks', '5:00 PM - 5:30 PM', ARRAY['Banana Chips', 'Tea']),
('Thursday', 'dinner', '7:30 PM - 9:00 PM', ARRAY['Khichdi', 'Papad', 'Curd', 'Pickle']),

('Friday', 'breakfast', '7:30 AM - 9:00 AM', ARRAY['Paratha', 'Curd', 'Pickle', 'Tea']),
('Friday', 'lunch', '12:30 PM - 2:00 PM', ARRAY['Pulao', 'Chana Masala', 'Chapati', 'Salad', 'Kheer']),
('Friday', 'snacks', '5:00 PM - 5:30 PM', ARRAY['Bhel Puri', 'Lemon Tea']),
('Friday', 'dinner', '7:30 PM - 9:00 PM', ARRAY['Rice', 'Paneer Butter Masala', 'Chapati', 'Sweet Corn Sabzi']),

('Saturday', 'breakfast', '8:00 AM - 9:30 AM', ARRAY['Sandwich', 'Boiled Egg', 'Tea', 'Fruit']),
('Saturday', 'lunch', '1:00 PM - 2:30 PM', ARRAY['Biryani', 'Raita', 'Salad', 'Sweet']),
('Saturday', 'snacks', '5:00 PM - 5:30 PM', ARRAY['Veg Cutlet', 'Tea']),
('Saturday', 'dinner', '8:00 PM - 9:00 PM', ARRAY['Plain Rice', 'Mixed Veg Kurma', 'Chapati', 'Payasam']),

('Sunday', 'breakfast', '8:00 AM - 10:00 AM', ARRAY['Puri', 'Aloo Curry', 'Halwa', 'Tea']),
('Sunday', 'lunch', '1:00 PM - 2:30 PM', ARRAY['Special Thali (Rice, Dal, 2 Curries, Papad, Curd, Sweet)']),
('Sunday', 'snacks', '5:00 PM - 5:30 PM', ARRAY['Cake Slice', 'Hot Chocolate']),
('Sunday', 'dinner', '8:00 PM - 9:30 PM', ARRAY['Veg Noodles', 'Spring Roll', 'Fruit Salad'])

ON CONFLICT (day_of_week, meal_type) DO NOTHING;
