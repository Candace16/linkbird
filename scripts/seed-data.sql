-- Seed data for LinkBird application
-- This script populates the database with sample data for testing

-- Note: Replace 'user_id_here' with actual user ID from Better Auth

-- Insert sample campaigns
INSERT INTO "campaigns" ("name", "status", "user_id", "total_leads", "successful_leads", "response_rate", "progress", "start_date") VALUES
('Just Herbs', 'active', 'user_id_here', 20, 0, 0.00, 85, '2025-03-09'),
('Juicy chemistry', 'active', 'user_id_here', 0, 0, 0.00, 75, '2025-03-09'),
('Hyugalife 2', 'active', 'user_id_here', 0, 0, 0.00, 60, '2025-03-09'),
('Honeyveils', 'active', 'user_id_here', 3, 0, 0.00, 90, '2025-03-09'),
('HempStreet', 'active', 'user_id_here', 7, 0, 0.00, 45, '2025-03-09'),
('HealthyHey 2', 'active', 'user_id_here', 5, 0, 0.00, 70, '2025-03-09'),
('Herbal Chakra', 'active', 'user_id_here', 6, 0, 0.00, 55, '2025-03-09'),
('Healoly', 'active', 'user_id_here', 14, 0, 0.00, 80, '2025-03-09'),
('HealthSense', 'active', 'user_id_here', 2, 0, 0.00, 30, '2025-03-09');

-- Insert sample leads (using campaign IDs from above)
-- Note: Replace campaign_id values with actual UUIDs from campaigns table
INSERT INTO "leads" ("name", "email", "company", "job_title", "campaign_id", "user_id", "status", "activity") VALUES
('Om Satyarthi', 'om@dynamedia.com', 'Dynamedia', 'Regional Head', (SELECT id FROM campaigns WHERE name = 'Just Herbs' LIMIT 1), 'user_id_here', 'pending', 'high'),
('Dr Bhuvaneshwari', 'dr.bhuvan@hospital.com', 'City Hospital', 'Chief Medical Officer', (SELECT id FROM campaigns WHERE name = 'Just Herbs' LIMIT 1), 'user_id_here', 'contacted', 'medium'),
('Sudeep Singh', 'sudeep@seogroup.com', 'SEO Group', 'Marketing Manager', (SELECT id FROM campaigns WHERE name = 'Just Herbs' LIMIT 1), 'user_id_here', 'contacted', 'low'),
('Dilbag Singh', 'dilbag@marketing.com', 'Marketing & Communication', 'Manager Marketing & Communication', (SELECT id FROM campaigns WHERE name = 'Just Herbs' LIMIT 1), 'user_id_here', 'contacted', 'high'),
('Vishnu Jee', 'vishnu@company.com', 'Tech Solutions', 'Software Engineer', (SELECT id FROM campaigns WHERE name = 'Just Herbs' LIMIT 1), 'user_id_here', 'contacted', 'medium'),
('Suneet Mathuria', 'suneet@company.com', 'Business Corp', 'Business Development', (SELECT id FROM campaigns WHERE name = 'Honeyveils' LIMIT 1), 'user_id_here', 'pending', 'high'),
('Megha Laddha', 'megha@justherbs.com', 'Just Herbs', 'Co-Founder', (SELECT id FROM campaigns WHERE name = 'Honeyveils' LIMIT 1), 'user_id_here', 'pending', 'high'),
('Arshna K', 'arshna@justherbs.com', 'Just Herbs', 'Content and Marketing Specialist', (SELECT id FROM campaigns WHERE name = 'Honeyveils' LIMIT 1), 'user_id_here', 'pending', 'medium');

-- Insert sample lead interactions
INSERT INTO "lead_interactions" ("lead_id", "type", "message", "status") VALUES
((SELECT id FROM leads WHERE email = 'om@dynamedia.com' LIMIT 1), 'invitation', 'Hi, I''m looking for LinkedIn account assignments. Let me know if you''re interested.', 'sent'),
((SELECT id FROM leads WHERE email = 'om@dynamedia.com' LIMIT 1), 'connection', 'Connection request sent', 'pending'),
((SELECT id FROM leads WHERE email = 'dr.bhuvan@hospital.com' LIMIT 1), 'invitation', 'Hi Dr. Bhuvaneshwari, I''d like to connect and discuss potential collaboration opportunities.', 'sent'),
((SELECT id FROM leads WHERE email = 'sudeep@seogroup.com' LIMIT 1), 'message', 'Hello Sudeep, I noticed your expertise in SEO and would love to connect.', 'delivered');

-- Insert sample LinkedIn account
INSERT INTO "linkedin_accounts" ("user_id", "name", "email", "profile_url", "is_active", "daily_limit", "current_usage") VALUES
('user_id_here', 'Anush Laddha', 'anush@example.com', 'https://linkedin.com/in/anush-laddha', TRUE, 50, 15);
