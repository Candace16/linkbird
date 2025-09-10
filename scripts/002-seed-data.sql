-- Insert sample campaigns
INSERT INTO campaigns (id, name, status, user_id, total_leads, successful_leads, response_rate, progress, conversion_rate, start_date, auto_pilot_enabled) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Just Herbs', 'active', 'user1', 20, 5, 25.00, 65, 8.5, '2025-01-01', true),
('550e8400-e29b-41d4-a716-446655440002', 'Juicy chemistry', 'active', 'user1', 15, 3, 20.00, 45, 6.2, '2025-01-05', true),
('550e8400-e29b-41d4-a716-446655440003', 'Hyugalife 2', 'active', 'user1', 18, 4, 22.22, 55, 7.1, '2025-01-10', false),
('550e8400-e29b-41d4-a716-446655440004', 'Honeyweds', 'active', 'user1', 12, 2, 16.67, 35, 4.8, '2025-01-15', true),
('550e8400-e29b-41d4-a716-446655440005', 'HempStreet', 'paused', 'user1', 25, 6, 24.00, 70, 9.2, '2025-01-20', false),
('550e8400-e29b-41d4-a716-446655440006', 'HealthyHey 2', 'active', 'user1', 14, 3, 21.43, 40, 5.9, '2025-01-25', true),
('550e8400-e29b-41d4-a716-446655440007', 'Herbal Chakra', 'active', 'user1', 22, 5, 22.73, 60, 8.1, '2025-02-01', false),
('550e8400-e29b-41d4-a716-446655440008', 'Healoly', 'active', 'user1', 16, 4, 25.00, 50, 7.5, '2025-02-05', true);

-- Insert sample leads
INSERT INTO leads (id, name, email, company, job_title, linkedin_url, avatar, campaign_id, user_id, status, activity, last_contact_date) VALUES
('650e8400-e29b-41d4-a716-446655440001', 'Suneet Mathura', 'suneet@dynamedia.com', 'Dynamedia', 'Marketing Manager', 'https://linkedin.com/in/suneet', '/professional-headshot.png', '550e8400-e29b-41d4-a716-446655440001', 'user1', 'pending', 'medium', '2025-01-15'),
('650e8400-e29b-41d4-a716-446655440002', 'Megha Laddha', 'megha@techcorp.com', 'TechCorp', 'Co-Founder', 'https://linkedin.com/in/megha', '/professional-doctor.png', '550e8400-e29b-41d4-a716-446655440001', 'user1', 'contacted', 'high', '2025-01-16'),
('650e8400-e29b-41d4-a716-446655440003', 'Archna K.', 'archna@innovate.com', 'Innovate Solutions', 'Content Specialist', 'https://linkedin.com/in/archna', '/diverse-business-professionals.png', '550e8400-e29b-41d4-a716-446655440002', 'user1', 'responded', 'high', '2025-01-17'),
('650e8400-e29b-41d4-a716-446655440004', 'Himalayan Herbs', 'contact@himalayan.com', 'Himalayan Herbs', 'Co-Founder', 'https://linkedin.com/in/himalayan', '/marketing-professional.png', '550e8400-e29b-41d4-a716-446655440002', 'user1', 'pending', 'low', '2025-01-18'),
('650e8400-e29b-41d4-a716-446655440005', 'Ritika Dind', 'ritika@brandmanager.com', 'Brand Solutions', 'Brand Manager', 'https://linkedin.com/in/ritika', '/tech-professional.png', '550e8400-e29b-41d4-a716-446655440003', 'user1', 'contacted', 'medium', '2025-01-19'),
('650e8400-e29b-41d4-a716-446655440006', 'Praveena Kumar Raikiran', 'praveena@vicepresident.com', 'Corporate Inc', 'Vice President', 'https://linkedin.com/in/praveena', '/professional-headshot.png', '550e8400-e29b-41d4-a716-446655440003', 'user1', 'pending', 'high', '2025-01-20'),
('650e8400-e29b-41d4-a716-446655440007', 'Shubham Sahoo', 'shubham@associate.com', 'Business Associates', 'Associate', 'https://linkedin.com/in/shubham', '/professional-doctor.png', '550e8400-e29b-41d4-a716-446655440004', 'user1', 'responded', 'medium', '2025-01-21'),
('650e8400-e29b-41d4-a716-446655440008', 'Mirana Saldanha', 'mirana@director.com', 'Executive Solutions', 'Brand Director', 'https://linkedin.com/in/mirana', '/diverse-business-professionals.png', '550e8400-e29b-41d4-a716-446655440004', 'user1', 'contacted', 'low', '2025-01-22');

-- Insert sample lead interactions
INSERT INTO lead_interactions (lead_id, type, message, status, sent_at) VALUES
('650e8400-e29b-41d4-a716-446655440001', 'invitation', 'Hi Suneet, I noticed your work in marketing at Dynamedia. Would love to connect!', 'sent', '2025-01-15 10:00:00'),
('650e8400-e29b-41d4-a716-446655440002', 'message', 'Thanks for connecting! I saw your recent post about digital marketing trends.', 'delivered', '2025-01-16 14:30:00'),
('650e8400-e29b-41d4-a716-446655440003', 'follow_up', 'Following up on our previous conversation about content strategy.', 'responded', '2025-01-17 09:15:00'),
('650e8400-e29b-41d4-a716-446655440007', 'connection', 'Great to connect with you, Shubham! Looking forward to potential collaboration.', 'read', '2025-01-21 16:45:00');

-- Insert sample LinkedIn accounts
INSERT INTO linkedin_accounts (id, user_id, name, email, profile_url, avatar, is_active, daily_limit, current_usage) VALUES
('750e8400-e29b-41d4-a716-446655440001', 'user1', 'Pulkit Dey', 'pulkit@company.com', 'https://linkedin.com/in/pulkit-dey', '/professional-headshot.png', true, 50, 15),
('750e8400-e29b-41d4-a716-446655440002', 'user1', 'Anesh Lakhani', 'anesh@company.com', 'https://linkedin.com/in/anesh-lakhani', '/professional-doctor.png', true, 45, 8),
('750e8400-e29b-41d4-a716-446655440003', 'user1', 'Ishaan Srivastava', 'ishaan@company.com', 'https://linkedin.com/in/ishaan-srivastava', '/diverse-business-professionals.png', false, 40, 0),
('750e8400-e29b-41d4-a716-446655440004', 'user1', 'Shreya Ramachandran', 'shreya@company.com', 'https://linkedin.com/in/shreya-ramachandran', '/marketing-professional.png', true, 55, 22);
