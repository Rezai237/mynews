# 🧪 TECHSY.NEWS TESTING CHECKLIST

## 📋 **STEP-BY-STEP TESTING GUIDE**

### **PHASE 1: ACCOUNT SETUP & AUTHENTICATION**

#### ✅ **1. Create Admin Account**
- [ ] Go to `http://localhost:5173/auth/signup`
- [ ] Fill out signup form with valid email/password
- [ ] Verify email validation works
- [ ] Verify password strength validation
- [ ] Complete signup process
- [ ] Verify redirect to homepage after signup
- [ ] Check that user is logged in (see profile in header)

#### ✅ **2. Test Authentication Flow**
- [ ] Sign out from the application
- [ ] Go to `http://localhost:5173/auth/signin`
- [ ] Sign in with your credentials
- [ ] Verify successful login and redirect
- [ ] Test "Remember me" functionality
- [ ] Test invalid credentials (should show error)

#### ✅ **3. Upgrade to Admin Role**
**After signup, provide your email to upgrade to admin role**

---

### **PHASE 2: ADMIN DASHBOARD TESTING**

#### ✅ **4. Access Admin Dashboard**
- [ ] Go to `http://localhost:5173/admin`
- [ ] Verify admin dashboard loads
- [ ] Check analytics cards display
- [ ] Verify navigation menu works
- [ ] Test responsive design on mobile

#### ✅ **5. Test Article Creation**
- [ ] Go to `http://localhost:5173/admin/articles/new`
- [ ] Fill out article form:
  - [ ] Title: "Test Article - AI in Web Development"
  - [ ] Slug: Auto-generated from title
  - [ ] Excerpt: Brief description
  - [ ] Category: Select "Artificial Intelligence"
  - [ ] Tags: Select 2-3 relevant tags
  - [ ] Content: Use rich text editor to add formatted content
- [ ] Test rich text editor features:
  - [ ] Bold, italic, underline
  - [ ] Headers (H1, H2, H3)
  - [ ] Lists (ordered/unordered)
  - [ ] Links
  - [ ] Code blocks
- [ ] Save as draft first
- [ ] Edit the draft
- [ ] Publish the article
- [ ] Verify success message appears

---

### **PHASE 3: FRONTEND USER EXPERIENCE**

#### ✅ **6. Homepage Testing**
- [ ] Go to `http://localhost:5173/`
- [ ] Verify homepage loads correctly
- [ ] Check hero section displays
- [ ] Verify featured articles section (should show your published article)
- [ ] Test categories section
- [ ] Check latest articles grid
- [ ] Test newsletter signup form
- [ ] Verify responsive design

#### ✅ **7. Article Reading Experience**
- [ ] Click on your published article
- [ ] Verify article detail page loads
- [ ] Check article content displays correctly
- [ ] Test social actions (like, bookmark, share)
- [ ] Verify author information displays
- [ ] Check related articles section
- [ ] Test back navigation

#### ✅ **8. Category & Tag Navigation**
- [ ] Go to homepage and click on a category
- [ ] Verify category page loads with filtered articles
- [ ] Test category description and styling
- [ ] Go back and click on a tag
- [ ] Verify tag page loads with filtered articles
- [ ] Test tag-based filtering

#### ✅ **9. Search Functionality**
- [ ] Go to `http://localhost:5173/search`
- [ ] Test search with keywords from your article
- [ ] Verify search results display
- [ ] Test search filters:
  - [ ] Category filter
  - [ ] Tag filter
  - [ ] Sort options
- [ ] Test "no results" scenario
- [ ] Test popular search suggestions

#### ✅ **10. Profile Management**
- [ ] Go to `http://localhost:5173/profile`
- [ ] Verify profile page loads
- [ ] Test profile editing:
  - [ ] Update full name
  - [ ] Add bio
  - [ ] Add website URL
  - [ ] Add social links
- [ ] Save changes and verify they persist
- [ ] Test form validation

---

### **PHASE 4: ADVANCED FEATURES**

#### ✅ **11. Theme Switching**
- [ ] Test dark/light theme toggle in header
- [ ] Verify theme persists across page reloads
- [ ] Check all pages work in both themes

#### ✅ **12. Responsive Design**
- [ ] Test on mobile device or browser dev tools
- [ ] Verify navigation menu works on mobile
- [ ] Check article reading experience on mobile
- [ ] Test form interactions on mobile

#### ✅ **13. Error Handling**
- [ ] Try accessing non-existent article URL
- [ ] Try accessing admin pages while logged out
- [ ] Test network error scenarios
- [ ] Verify error pages display correctly

---

### **PHASE 5: CONTENT CREATION**

#### ✅ **14. Create Multiple Articles**
Using the sample articles provided, create:
- [ ] "Building Scalable React Applications in 2024" (Web Development)
- [ ] "Cybersecurity Best Practices" (Cybersecurity)
- [ ] "Docker and Kubernetes Guide" (DevOps)
- [ ] "The Rise of Web3" (Blockchain)

#### ✅ **15. Test Content Variety**
- [ ] Create articles in different categories
- [ ] Use different tag combinations
- [ ] Test featured article functionality
- [ ] Create both draft and published articles

---

### **PHASE 6: USER FLOWS**

#### ✅ **16. Complete User Journey**
Test the complete flow:
- [ ] New visitor lands on homepage
- [ ] Browses articles by category
- [ ] Reads an article
- [ ] Signs up for account
- [ ] Likes and bookmarks articles
- [ ] Updates profile
- [ ] Uses search functionality

#### ✅ **17. Author Workflow**
- [ ] Create author account (separate from admin)
- [ ] Test article creation permissions
- [ ] Verify authors can only edit their own articles
- [ ] Test draft/publish workflow

---

## 🐛 **COMMON ISSUES & SOLUTIONS**

### **Database Connection Issues**
If you see database errors:
1. Check `.env` file has correct Supabase credentials
2. Verify database migrations ran successfully
3. Check browser console for specific errors

### **Authentication Issues**
If login/signup doesn't work:
1. Check Supabase Auth settings
2. Verify email confirmation settings
3. Check browser console for errors

### **Article Creation Issues**
If articles don't save:
1. Verify you have admin/author role
2. Check all required fields are filled
3. Verify database permissions

---

## 📊 **SUCCESS CRITERIA**

### **Must Pass:**
- [ ] User can sign up and sign in
- [ ] Admin can create and publish articles
- [ ] Articles display correctly on homepage
- [ ] Search functionality works
- [ ] Category and tag filtering works
- [ ] Profile management works
- [ ] Responsive design works

### **Should Pass:**
- [ ] Rich text editor works fully
- [ ] Social actions (like/bookmark) work
- [ ] Theme switching works
- [ ] Error handling is graceful
- [ ] Performance is acceptable

---

## 🎯 **NEXT STEPS AFTER TESTING**

1. **Document any bugs found**
2. **Create more sample content**
3. **Test with multiple users**
4. **Prepare for production deployment**
5. **Plan feature enhancements**

---

## 📞 **SUPPORT**

If you encounter any issues during testing:
1. Check browser console for errors
2. Verify database connection
3. Check application logs in terminal
4. Document the issue with steps to reproduce
