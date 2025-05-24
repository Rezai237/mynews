# Database Setup Instructions

## 🗄️ Setting Up Your Supabase Database

Follow these steps to set up your database schema:

### 1. Access Supabase SQL Editor

1. Go to your Supabase project dashboard
2. Navigate to the "SQL Editor" tab in the left sidebar
3. Click "New Query" to create a new SQL query

### 2. Run Migration Files

Execute the following SQL files in order:

#### Step 1: Initial Schema
Copy and paste the contents of `supabase/migrations/001_initial_schema.sql` and run it.

#### Step 2: Row Level Security Policies
Copy and paste the contents of `supabase/migrations/002_rls_policies.sql` and run it.

#### Step 3: Database Functions
Copy and paste the contents of `supabase/migrations/003_functions.sql` and run it.

#### Step 4: Seed Data
Copy and paste the contents of `supabase/migrations/004_seed_data.sql` and run it.

### 3. Verify Setup

After running all migrations, you should see the following tables in your database:

- `profiles` - User profiles
- `categories` - Article categories
- `tags` - Article tags
- `articles` - Main articles table
- `article_tags` - Junction table for article-tag relationships
- `comments` - Article comments
- `bookmarks` - User bookmarks
- `newsletter_subscribers` - Newsletter subscriptions
- `article_likes` - Article likes
- `analytics` - Analytics data

### 4. Test the Application

1. The development server should be running at `http://localhost:5173`
2. You can now:
   - Browse the homepage
   - Sign up for a new account
   - Sign in with existing credentials
   - Navigate through different sections

### 5. Create Your First Admin User

1. Sign up for an account through the application
2. Go to your Supabase dashboard > Authentication > Users
3. Find your user and copy the UUID
4. Go to SQL Editor and run:

```sql
UPDATE profiles 
SET role = 'admin' 
WHERE id = 'your-user-uuid-here';
```

### 6. Optional: Add Sample Content

To add sample articles and content:

1. Create a few categories through the admin interface (once built)
2. Add some tags
3. Create sample articles

## 🎉 You're All Set!

Your Techsy.News platform is now ready for development and testing!
