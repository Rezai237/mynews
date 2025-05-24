-- Insert categories
INSERT INTO categories (name, slug, description, color) VALUES
('Technology', 'technology', 'Latest technology trends and innovations', '#3b82f6'),
('Artificial Intelligence', 'ai', 'AI developments, machine learning, and automation', '#8b5cf6'),
('Web3', 'web3', 'Blockchain, cryptocurrency, and decentralized technologies', '#f59e0b'),
('Startups', 'startups', 'Startup news, funding, and entrepreneurship', '#10b981'),
('Mobile', 'mobile', 'Mobile app development and mobile technology', '#ef4444'),
('Cloud Computing', 'cloud', 'Cloud services, infrastructure, and DevOps', '#06b6d4'),
('Cybersecurity', 'cybersecurity', 'Security threats, privacy, and protection', '#dc2626'),
('Gaming', 'gaming', 'Video games, esports, and gaming technology', '#7c3aed'),
('Hardware', 'hardware', 'Computer hardware, gadgets, and devices', '#059669'),
('Software', 'software', 'Software development, programming, and tools', '#2563eb'),
('Reviews', 'reviews', 'Product reviews and technology comparisons', '#ea580c'),
('Tutorials', 'tutorials', 'How-to guides and technical tutorials', '#7c2d12');

-- Insert tags
INSERT INTO tags (name, slug) VALUES
('JavaScript', 'javascript'),
('React', 'react'),
('Node.js', 'nodejs'),
('Python', 'python'),
('Machine Learning', 'machine-learning'),
('Blockchain', 'blockchain'),
('Bitcoin', 'bitcoin'),
('Ethereum', 'ethereum'),
('NFT', 'nft'),
('DeFi', 'defi'),
('iOS', 'ios'),
('Android', 'android'),
('Flutter', 'flutter'),
('React Native', 'react-native'),
('AWS', 'aws'),
('Docker', 'docker'),
('Kubernetes', 'kubernetes'),
('DevOps', 'devops'),
('Security', 'security'),
('Privacy', 'privacy'),
('Gaming', 'gaming'),
('VR', 'vr'),
('AR', 'ar'),
('5G', 'five-g'),
('IoT', 'iot'),
('Edge Computing', 'edge-computing'),
('Quantum Computing', 'quantum-computing'),
('Open Source', 'open-source'),
('API', 'api'),
('Database', 'database');

-- Create a demo admin user profile (you'll need to replace the UUID with actual user ID after signup)
-- This is just for reference - actual profiles are created via the trigger when users sign up

-- Insert sample articles (these would normally be created by authenticated users)
-- Note: You'll need to replace author_id with actual user UUIDs after user registration

-- Sample newsletter subscribers
INSERT INTO newsletter_subscribers (email) VALUES
('demo@example.com'),
('tech@example.com'),
('news@example.com');

-- Note: To fully populate with sample articles, you would need:
-- 1. Create user accounts through your application
-- 2. Get the user UUIDs from the profiles table
-- 3. Insert articles with proper author_id references
-- 4. Link articles to tags via article_tags table

-- Example of how to insert a sample article (replace UUIDs with real ones):
/*
INSERT INTO articles (
  title, 
  slug, 
  excerpt, 
  content, 
  author_id, 
  category_id, 
  status, 
  featured, 
  reading_time,
  published_at
) VALUES (
  'The Future of Artificial Intelligence in 2024',
  'future-of-ai-2024',
  'Exploring the latest developments in AI technology and what to expect in the coming year.',
  '<p>Artificial Intelligence continues to evolve at an unprecedented pace...</p>',
  'your-user-uuid-here',
  (SELECT id FROM categories WHERE slug = 'ai'),
  'published',
  true,
  5,
  NOW()
);
*/
