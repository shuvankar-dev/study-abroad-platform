# Email Notification Troubleshooting Guide

## Problem
Email notifications stopped working when Super Admin or Admin updates application status.

## What I Fixed

### 1. Vendor Path Issue
- **Problem**: The `email_config.php` was looking for vendor folder in wrong order
- **Fix**: Updated to check project root first (`study-abroad-platform/vendor/`) before API folder
- **File**: `studyabroadplatform-api/config/email_config.php`

### 2. Added Detailed Error Logging
- **Problem**: No way to know why emails were failing
- **Fix**: Added comprehensive error logging at every step:
  - PHPMailer autoload status
  - PHPMailer class availability
  - SMTP connection initialization
  - Email sending success/failure
- **Files**: 
  - `studyabroadplatform-api/config/email_config.php`
  - `studyabroadplatform-api/test_email.php`

### 3. Created Diagnostic Script
- **New File**: `studyabroadplatform-api/diagnose_email.php`
- **Purpose**: Step-by-step diagnosis of email system

## How to Diagnose the Issue

### Step 1: Run Diagnostic Script
1. Open browser and go to: `http://localhost/studyabroadplatform-api/diagnose_email.php`
2. Review all checks (should all be green ✓)
3. Click "Send Test Email" button
4. Check if email arrives

### Step 2: Check PHP Error Logs
Look for error messages in your PHP error log:
- XAMPP: `C:\xampp\apache\logs\error.log`
- WAMP: `C:\wamp\logs\php_error.log`
- Check for lines containing:
  - "PHPMailer autoload"
  - "CRITICAL:"
  - "Email sending failed"

### Step 3: Test from Production
If it works on localhost but not production:
1. Upload updated files to production server
2. Run diagnostic script on production: `https://codescholaroverseas.com/studyabroadplatform-api/diagnose_email.php`
3. Check production PHP error logs

## Common Issues and Solutions

### Issue 1: PHPMailer Class Not Found
**Symptoms**: "PHPMailer class not found" in logs
**Solution**: 
```bash
cd study-abroad-platform
composer install
```

### Issue 2: SMTP Authentication Failed
**Symptoms**: "SMTP Error: Could not authenticate"
**Solution**: 
- Verify email credentials in `email_config.php`:
  - Username: `info@codescholaroverseas.com`
  - Password: `z5~RjLPsLEp`
- Check if Hostinger email account is active
- Try logging into webmail: https://webmail.hostinger.com

### Issue 3: Port 587 Blocked
**Symptoms**: "Could not connect to SMTP host"
**Solution**:
- Check if firewall is blocking port 587
- Try alternative port 465 with SSL:
  ```php
  $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
  $mail->Port = 465;
  ```

### Issue 4: Emails Going to Spam
**Symptoms**: Email sends successfully but not received
**Solution**:
- Check spam/junk folder
- Add `info@codescholaroverseas.com` to contacts
- Check email headers for spam score

### Issue 5: Email Condition Not Met
**Symptoms**: No email sent, no errors in log
**Solution**: Check if condition is met in `update_application_status.php`:
```php
if ($notify_data['recipient_id'] != $user_id && $notify_data['recipient_email'])
```
This means:
- Email only sent if updater is different from application creator
- Email address must exist in database

## Testing Email Functionality

### Test 1: Direct Test Script
```
http://localhost/studyabroadplatform-api/diagnose_email.php
```

### Test 2: Update Application Status
1. Login as Super Admin or Admin
2. Go to any application
3. Update status (e.g., from "Application Created" to "Application Started")
4. Check if email is sent to the agent/counselor who created the application

### Test 3: Check Database
```sql
-- Check if users have email addresses
SELECT id, user_name, email, role FROM users WHERE role IN ('Agent', 'Counselor');

-- Check application ownership
SELECT id, student_name, user_id, application_status FROM applications;
```

## Email Flow Explanation

1. **Admin updates application status** → `update_application_status.php`
2. **Status updated in database** → `applications` table
3. **History recorded** → `application_status_history` table
4. **Query for notification data**:
   - Get application creator (user_id)
   - Get creator's email
   - Get updater's name
5. **Check condition**:
   - Is updater different from creator? ✓
   - Does creator have email? ✓
6. **Send email** → `sendApplicationStatusUpdateEmail()`
7. **Log result** → PHP error log

## Files Modified

1. `studyabroadplatform-api/config/email_config.php` - Fixed vendor path, added logging
2. `studyabroadplatform-api/test_email.php` - Updated vendor path check
3. `studyabroadplatform-api/diagnose_email.php` - NEW diagnostic script

## Next Steps

1. Run `diagnose_email.php` and share the results
2. Check PHP error logs for any CRITICAL errors
3. Test updating an application status
4. Verify email arrives (check spam folder too)

## Production Deployment

When deploying to production:
1. Upload all modified files
2. Ensure vendor folder exists on production
3. Run diagnostic script on production
4. Test with real application status update
5. Monitor PHP error logs

## Contact Information

If emails still don't work after following this guide:
- Check Hostinger email account status
- Verify SMTP credentials haven't changed
- Contact Hostinger support if SMTP connection fails
- Check server firewall settings for port 587/465
