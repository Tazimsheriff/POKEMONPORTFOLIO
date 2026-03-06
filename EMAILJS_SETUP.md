# EmailJS Setup Guide for Contact Form

## Overview
The contact form in your portfolio uses **EmailJS** to send emails directly from the frontend without a backend server. Follow these steps to configure it:

## Step 1: Create an EmailJS Account
1. Go to [EmailJS](https://www.emailjs.com/)
2. Click **Sign Up** and create a free account
3. Verify your email

## Step 2: Get Your Public Key
1. Log in to EmailJS
2. Go to **Admin** → **Account** → **API Keys**
3. Copy your **Public Key**
4. Create a `.env` file in your project root:

```env
VITE_APP_EMAILJS_PUBLIC_KEY=your_public_key_here
```

## Step 3: Create an Email Service
1. In EmailJS, go to **Admin** → **Email Services**
2. Click **Add Service**
3. Choose your email provider (Gmail, Outlook, etc.) or use **Gmail**
4. Follow the authentication steps
5. Copy your **Service ID** (you'll need this next)

## Step 4: Create an Email Template
1. Go to **Admin** → **Email Templates**
2. Click **Create New Template**
3. Name it something like `portfolio_contact`
4. In the template, add these variables that the form will send:

```
Name: {{from_name}}
Email: {{from_email}}
Inquiry Type: {{inquiry_type}}
Message: {{message}}
```

**Template Content Example:**
```
Hello,

You have a new message from {{from_name}} ({{from_email}}):

Inquiry Type: {{inquiry_type}}

Message:
{{message}}

Best regards,
Portfolio Contact Form
```

5. Set **To Email** to: `{{to_email}}`
6. Save and copy your **Template ID**

## Step 5: Update Your Code
Open `src/components/Achievements.jsx` and replace these placeholders:

```javascript
// Line ~78: Replace YOUR_PUBLIC_KEY
emailjs.init('YOUR_PUBLIC_KEY');

// Line ~100: Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID
const result = await emailjs.send(
    'YOUR_SERVICE_ID',
    'YOUR_TEMPLATE_ID',
    // ... rest of the code
);
```

**Or use environment variables:**

```javascript
// In Achievements.jsx
emailjs.init(import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY);

const result = await emailjs.send(
    import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
    // ... rest of the code
);
```

And in `.env`:
```env
VITE_APP_EMAILJS_PUBLIC_KEY=your_public_key
VITE_APP_EMAILJS_SERVICE_ID=your_service_id
VITE_APP_EMAILJS_TEMPLATE_ID=your_template_id
```

## Step 6: Test the Form
1. Start your dev server: `npm run dev`
2. Scroll to the Contact section
3. Fill out the form and click **SEND MESSAGE**
4. Check your email for the message!

## Troubleshooting

**"Failed to send message" error:**
- Make sure your Public Key, Service ID, and Template ID are correct
- Check that your email service is verified in EmailJS
- Check the browser console for detailed error messages

**Not receiving emails:**
- Verify the email service is active in EmailJS
- Check your email's spam folder
- Ensure the template variables match what the form is sending

**Questions?**
Visit [EmailJS Documentation](https://www.emailjs.com/docs/)

---

### Summary of Your Setup:
- ✅ Email: tazimsheriffr@gmail.com
- ✅ GitHub: https://github.com/Tazimsheriff
- ✅ LinkedIn: https://www.linkedin.com/in/tazim-sheriff-r-15a355230/
