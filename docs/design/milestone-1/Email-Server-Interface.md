# Email Server Interface - Milestone 1

## Introduction

Quicksilver is designed as a unified email client that provides a consistent, modern interface across multiple email providers. Rather than being tied to a single service, Quicksilver can connect to any email service that supports IMAP/SMTP, including Gmail, Outlook, Yahoo, and custom mail servers.

**This document focuses on Milestone 1**, which establishes the foundational architecture for email provider integration. Milestone 1 delivers a working email client with direct IMAP/SMTP connections, allowing users to connect their email accounts and view/send messages.

### Milestone 1 Goals

1. **User Registration & Authentication**: Allow users to register and log in to Quicksilver
2. **Email Service Configuration**: Collect email provider credentials during registration
3. **IMAP/SMTP Support**: Enable direct connections using app-specific passwords
4. **Basic Email Operations**: Read emails, send emails, basic folder management
5. **Provider Auto-Configuration**: Pre-populate settings for Gmail, Outlook, Yahoo
6. **Security Foundation**: Encrypt credentials at rest, use TLS for all connections

### Design Principles

1. **Simplicity First**: Get a working system with standard protocols (IMAP/SMTP)
2. **Provider Agnostic**: Support any email provider through standard protocols
3. **Security by Default**: Encrypt credentials at rest and use TLS for all communications
4. **User-Friendly Configuration**: Auto-populate settings for popular providers
5. **Standard Protocols**: Leverage IMAP/SMTP for maximum compatibility

### Milestone 1 Scope

This document covers the foundational implementation:

- **In Scope for Milestone 1:**
  - Direct IMAP/SMTP authentication with app-specific passwords
  - User registration with email service configuration
  - Database schema for user profiles and email settings
  - Basic IMAP operations (list folders, fetch emails, mark read/unread)
  - Basic SMTP operations (send email, reply, forward)
  - Pre-configured settings for Gmail, Outlook, Yahoo
  - Security foundations (credential encryption, TLS)

- **Future Milestones:**
  - OAuth 2.0 authentication flows (Milestone 2)
  - Provider-specific REST APIs (Gmail API, Microsoft Graph) (Milestone 2)
  - Real-time sync and push notifications (Milestone 3)
  - ProtonMail Bridge integration (Milestone 3)
  - Advanced search and filtering (Milestone 3)
  - Multi-account support (Milestone 4)

### Milestone Overview

| Feature | M1 | M2 | M3 | M4 |
|---------|----|----|----|----|
| **Authentication** | App Passwords | + OAuth 2.0 | | |
| **Email Protocols** | IMAP/SMTP | + REST APIs | | |
| **Providers** | Gmail, Outlook, Yahoo, Custom | Same | + ProtonMail | |
| **Email Operations** | View, Send, Reply, Forward | Same | + Search | |
| **Sync** | Manual refresh | Same | + Real-time | |
| **Accounts** | Single account | Same | Same | + Multi-account |
| **Performance** | Basic | Optimized | + Background sync | + Caching |
| **Status** | 🎯 CURRENT | 🚀 PLANNED | 🎨 PLANNED | 💎 PLANNED |

### Why Multiple Providers?

Supporting multiple email providers allows Quicksilver to:

- Give users freedom to use Gmail, Outlook, Yahoo, or any custom IMAP/SMTP provider
- Provide a unified interface regardless of email provider
- Ensure compatibility with any standard IMAP/SMTP email service
- Allow users to switch providers without changing their workflow

## Architecture Overview

Quicksilver's email server interface follows a modular architecture with three main layers:

1. **Frontend Layer**: React application that provides the user interface
2. **Backend Layer**: Node.js server that handles authentication, email operations, and protocol translation
3. **Email Provider Layer**: External email services (Gmail, Outlook, Yahoo, etc.)

The backend server acts as a mediator between the frontend and email providers, handling IMAP/SMTP operations, authentication, and data transformation.

### What We Build

**Quicksilver Frontend** (Custom Implementation)

- React-based single-page application
- UI components for email viewing, composition, and management
- Authentication flows and account setup wizards
- State management for emails, threads, and user settings
- Responsive design for desktop and mobile

**Quicksilver Backend** (Custom Implementation)

- Node.js/Express API server
- User authentication and session management
- Database models for users and email configuration
- IMAP/SMTP connection management
- Request routing and middleware
- Credential encryption utilities

**Database** (Custom Schema, Standard Technology)

- MongoDB or PostgreSQL for storing user data, account credentials, and cached emails
- We design the schema; we use standard database software

### What We Use (Third-Party)

**Email Providers** (External Services)

- Gmail, Outlook, Yahoo, and other IMAP/SMTP providers
- We connect to these; we don't build or control them
- Each provider has its own servers and infrastructure

**NPM Libraries** (Open Source Dependencies)

- `imap`: IMAP protocol implementation (we configure and use it)
- `nodemailer`: SMTP client for sending emails (we configure and use it)
- `mailparser`: Email parsing utilities (we use its parsing logic)
- `express`: Web framework (we build our API on top of it)
- `mongoose` or `sequelize`: Database ORM (we use it for data modeling)

**Infrastructure** (Deployment Environment)

- Web server (e.g., AWS, Heroku, DigitalOcean) - we deploy to it
- Database hosting - we choose and configure it
- TLS/SSL certificates - we obtain and configure them

### Interaction Flow

```plaintext
┌─────────────────────┐
│                     │
│  Quicksilver UI     │  ← We Build This
│  (React Frontend)   │
│                     │
└──────────┬──────────┘
           │
           │ HTTPS/WebSocket
           │
┌──────────▼──────────┐
│                     │
│  Quicksilver API    │  ← We Build This
│  (Node.js Backend)  │
│                     │
└──────────┬──────────┘
           │
           │ Uses NPM Libraries ← Third-Party Code
           │ (imap, nodemailer, googleapis, etc.)
           │
           │ IMAP/SMTP/HTTPS
           │
┌──────────▼──────────┐
│                     │
│  Email Providers    │  ← Third-Party Services
│  (Gmail, Outlook,   │     (We Don't Control)
│   ProtonMail, etc.) │
│                     │
└─────────────────────┘
```

### Division of Responsibilities

| Component | Who Builds/Maintains | Our Responsibility |
|-----------|---------------------|-------------------|
| Frontend UI | Quicksilver Team | Design, implement, and maintain all React components |
| Backend API | Quicksilver Team | Implement all endpoints, business logic, and data models |
| Database Schema | Quicksilver Team | Design and manage schema, migrations, and queries |
| OAuth Implementation | Quicksilver Team | Implement OAuth flows using provider documentation |
| IMAP/SMTP Connections | NPM Libraries + Our Config | Configure connections, handle errors, manage sessions |
| Email Protocol | Standard (IETF) | Follow standards; use libraries for implementation |
| Gmail/Outlook APIs | Google/Microsoft | Use their SDKs; implement error handling and retries |
| Email Servers | Email Providers | They host and maintain; we just connect to them |
| User Authentication | Quicksilver Team | Implement our own user auth (separate from email OAuth) |
| Token Storage/Refresh | Quicksilver Team | Securely store and automatically refresh provider tokens |

## Standard Email Protocols

### IMAP (Internet Message Access Protocol)

IMAP is used for retrieving and managing emails from the server.

**Standard Operations**:

- Connect to IMAP server with TLS/SSL
- Authenticate using app-specific passwords
- List mailboxes/folders
- Fetch email messages and metadata
- Search emails
- Mark messages as read/unread, flagged, etc.
- Move messages between folders
- Delete messages

**Configuration Requirements**:

- IMAP server hostname and port (typically 993 for SSL)
- Authentication credentials (app passwords)
- TLS/SSL certificate validation

### SMTP (Simple Mail Transfer Protocol)

SMTP is used for sending emails.

**Standard Operations**:

- Connect to SMTP server with TLS/SSL
- Authenticate using app-specific passwords
- Send email messages
- Handle attachments
- Manage delivery status notifications

**Configuration Requirements**:

- SMTP server hostname and port (typically 587 for STARTTLS or 465 for SSL)
- Authentication credentials (app passwords)
- TLS/SSL configuration

## Authentication Architecture

Quicksilver uses direct IMAP/SMTP connections with user-provided app-specific passwords. This approach provides immediate functionality, maximum compatibility, and works with any standard email provider without requiring OAuth app registration.

### Direct IMAP/SMTP Authentication

**Purpose**: Direct connection to email servers using username/password  
**Requires**: User provides email address, password, and server settings during registration  
**Advantages**: Simple, works with any IMAP/SMTP provider, no OAuth setup required

#### User-Level Configuration (Stored in Profile)

Collected during registration/profile setup:

- **Email Address**: <user@example.com>
- **Email Password**: App-specific password or regular password
- **IMAP Settings**: Host, port, security (auto-populated for Gmail/Outlook/Yahoo)
- **SMTP Settings**: Host, port, security (auto-populated for Gmail/Outlook/Yahoo)

**Pre-configured Providers**: Gmail, Outlook, Yahoo (server settings auto-populated)  
**Custom Provider**: User manually enters IMAP/SMTP server details

#### Supported Authentication Methods

| Provider | Authentication Method | User Experience |
|----------|----------------------|-----------------|
| Gmail | App Password + IMAP/SMTP | Enter 16-char app password |
| Outlook | App Password + IMAP/SMTP | Enter app-specific password |
| Yahoo | IMAP/SMTP with App Password | Enter Yahoo app password |
| Custom | IMAP/SMTP with credentials | Enter server details and password |

## Gmail Integration

**Implementation**: Direct IMAP/SMTP using app-specific passwords

**User Setup Steps**:

1. Enable 2-Factor Authentication on Gmail account
2. Generate app-specific password at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Enter app password in Quicksilver registration form

### IMAP/SMTP Configuration

**IMAP Settings**:

- Server: `imap.gmail.com`
- Port: `993`
- Security: SSL/TLS
- Authentication: App-specific password

**SMTP Settings**:

- Server: `smtp.gmail.com`
- Port: `587` (STARTTLS) or `465` (SSL)
- Security: TLS/SSL
- Authentication: App-specific password

### Implementation Tasks

1. **IMAP Connection** ✅
   - Connect to `imap.gmail.com:993` with TLS
   - Authenticate using app-specific password
   - List folders/labels
   - Fetch email messages

2. **SMTP Connection** ✅
   - Connect to `smtp.gmail.com:587` with STARTTLS
   - Authenticate using app-specific password
   - Send emails with attachments

3. **Label Mapping** 🔄
   - Map Gmail labels to standard folders (INBOX, SENT, DRAFTS, TRASH)
   - Handle Gmail's "All Mail" folder

4. **Error Handling** 🔄
   - Handle authentication failures
   - Detect invalid app passwords
   - Display helpful error messages

## Outlook/Hotmail Integration

**Implementation**: Direct IMAP/SMTP using app-specific passwords

**User Setup Steps**:

1. Enable 2-Factor Authentication on Microsoft account
2. Generate app password in Microsoft account security settings
3. Enter app password in Quicksilver registration form

### IMAP/SMTP Configuration

**IMAP Settings**:

- Server: `outlook.office365.com`
- Port: `993`
- Security: SSL/TLS
- Authentication: App-specific password

**SMTP Settings**:

- Server: `smtp.office365.com`
- Port: `587`
- Security: STARTTLS
- Authentication: App-specific password

### Implementation Tasks

1. **IMAP Connection** ✅
   - Connect to `outlook.office365.com:993` with TLS
   - Authenticate using app-specific password
   - List folders
   - Fetch email messages
   - Support both personal and organizational accounts

2. **SMTP Connection** ✅
   - Connect to `smtp.office365.com:587` with STARTTLS
   - Authenticate using app-specific password
   - Send emails with attachments

3. **Folder Management** 🔄
   - Support Outlook folder hierarchy
   - Map to standard folder names

4. **Error Handling** 🔄
   - Handle authentication failures
   - Detect invalid app passwords
   - Display helpful error messages

## Server-Side Implementation

### Technology Stack

**Backend Framework**: Node.js with Express

**Email Libraries**:

- `imap`: For IMAP connections
- `nodemailer`: For SMTP sending
- `mailparser`: For parsing email content

### Database Schema

User profiles include authentication credentials and email service configuration collected during registration:

```javascript
{
  // User Authentication (for Quicksilver app)
  id: String,
  name: String,
  email: String,              // Quicksilver account email
  password: String,           // Encrypted - for Quicksilver login
  
  // Email Service Configuration (collected at registration)
  emailServiceProvider: String, // 'gmail', 'outlook', 'yahoo', 'custom'
  emailAddress: String,         // Actual email address (e.g., user@gmail.com)
  
  // Direct IMAP/SMTP Credentials
  credentials: {
    emailPassword: String,     // Encrypted - app-specific or email password
  },
  
  // IMAP Configuration (auto-populated for known providers, customizable for 'custom')
  imapConfig: {
    host: String,              // e.g., 'imap.gmail.com'
    port: Number,              // e.g., 993
    secure: Boolean            // true for SSL/TLS
  },
  
  // SMTP Configuration (auto-populated for known providers, customizable for 'custom')
  smtpConfig: {
    host: String,              // e.g., 'smtp.gmail.com'
    port: Number,              // e.g., 587
    secure: Boolean            // true for STARTTLS/SSL
  },
  
  // Sync and Status
  lastSync: Date,
  status: String,              // 'active', 'auth_error', 'disconnected'
  createdAt: Date,
  updatedAt: Date
}
```

**Pre-configured Provider Settings:**

- **Gmail**: `imap.gmail.com:993`, `smtp.gmail.com:587`
- **Outlook**: `outlook.office365.com:993`, `smtp.office365.com:587`
- **Yahoo**: `imap.mail.yahoo.com:993`, `smtp.mail.yahoo.com:587`
- **Custom**: User-defined IMAP/SMTP settings

### API Endpoints

```javascript
// User Registration & Profile (includes email configuration)
POST   /auth/register                // Register new user with email config
POST   /auth/login                   // Login to Quicksilver
POST   /auth/logout                  // Logout from Quicksilver
GET    /profile                      // Get user profile
PUT    /profile                      // Update profile & email settings

// Email Service Testing
POST   /emails/test-connection       // Test IMAP/SMTP connection
GET    /emails/connection-status     // Check email service status

// Email operations
GET    /emails/folders               // List folders
GET    /emails/:folderId             // List emails in folder  
GET    /emails/:id                   // Get single email
POST   /emails/send                  // Send email
POST   /emails/:id/reply             // Reply to email
POST   /emails/:id/forward           // Forward email
PUT    /emails/:id/flag              // Update flags (read/unread)
DELETE /emails/:id                   // Delete email
```

GET    /emails/connection-status     // Check email service status

// Email operations
GET    /emails/folders               // List folders
GET    /emails/:folderId             // List emails in folder
GET    /emails/:id                   // Get single email
POST   /emails/send                  // Send email
POST   /emails/:id/reply             // Reply to email
POST   /emails/:id/forward           // Forward email
PUT    /emails/:id/flag              // Update flags (read/unread)
DELETE /emails/:id                   // Delete email

```

### Security Considerations

1. **Credential Storage**
   - Encrypt user credentials at rest
   - Use environment-specific encryption keys
   - Store credentials in secure database (not localStorage)

2. **Data in Transit**
   - Enforce HTTPS for all API communications
   - Use TLS 1.2 or higher for email server connections
   - Validate SSL certificates

3. **Session Management**
   - Implement session timeouts
   - Use HTTP-only cookies for session tokens
   - Implement CSRF protection

4. **Rate Limiting**
   - Implement per-user rate limiting
   - Monitor and prevent abuse
   - Implement request queuing for bulk operations

## Configuration Management

### Environment Variables

```env
# Application Security
ENCRYPTION_KEY=your_32_byte_encryption_key   # For encrypting user credentials
SESSION_SECRET=your_session_secret            # For session management
DATABASE_URL=mongodb://localhost:27017/quicksilver

# Server Configuration
PORT=3001
NODE_ENV=development
```

### User-Level Configuration (Stored in Database)

These are **per-user** settings collected during registration or profile setup:

```javascript
// Collected in RegistrationForm/ProfileForm
{
  emailServiceProvider: "gmail" | "outlook" | "yahoo" | "custom",
  emailAddress: "user@gmail.com",
  
  // Direct IMAP/SMTP credentials
  credentials: {
    emailPassword: "user_encrypted_app_password"
  },
  
  // Auto-populated based on provider, or user-entered for custom
  imapConfig: { host: "imap.gmail.com", port: 993, secure: true },
  smtpConfig: { host: "smtp.gmail.com", port: 587, secure: true }
}
```

### Configuration Summary

| Setting | Scope | Where Stored | Purpose |
|---------|-------|--------------|----------|
| `emailAddress` | User-level | User profile (database) | User's actual email address |
| `emailPassword` | User-level | User profile (encrypted) | User's app password or credentials |
| `imapConfig` | User-level | User profile | User's IMAP server settings |
| `smtpConfig` | User-level | User profile | User's SMTP server settings |
| `ENCRYPTION_KEY` | App-level | Environment variables | Encrypts user credentials |
| `SESSION_SECRET` | App-level | Environment variables | Session management |
| `DATABASE_URL` | App-level | Environment variables | Database connection |

### Provider Setup Resources

- **Gmail App Passwords**: [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
- **Microsoft App Passwords**: Microsoft Account Security Settings
- **Yahoo App Passwords**: Yahoo Account Security Settings

## User Registration & Profile Management

### Registration Flow

When users register for Quicksilver, they provide both account credentials (for Quicksilver itself) and email service configuration (for connecting to their email provider).

#### Registration Form Fields

**Quicksilver Account Information:**

- Full Name
- Email Address (for Quicksilver account - can be different from email service)
- Password (for Quicksilver login)
- Confirm Password

**Email Service Configuration:**

- Email Service Provider (dropdown: Gmail, Outlook, Yahoo, Custom)
- Email Address (actual email to connect to, e.g., <user@gmail.com>)
- Email Password / App Password
- IMAP/SMTP Settings (auto-populated for Gmail/Outlook/Yahoo, manual for Custom)

#### Auto-Configuration by Provider

When a user selects a known provider, IMAP/SMTP settings are automatically populated:

**Gmail:**

```
IMAP: imap.gmail.com:993 (SSL)
SMTP: smtp.gmail.com:587 (STARTTLS)
```

**Outlook:**

```
IMAP: outlook.office365.com:993 (SSL)
SMTP: smtp.office365.com:587 (STARTTLS)
```

**Yahoo:**

```
IMAP: imap.mail.yahoo.com:993 (SSL)
SMTP: smtp.mail.yahoo.com:587 (STARTTLS)
```

**Custom:**

- User manually enters IMAP host, port, and security settings
- User manually enters SMTP host, port, and security settings

#### Validation

Registration validates:

- All required fields are filled
- Email formats are valid
- Password meets minimum length requirements (6+ characters)
- Passwords match
- Email service configuration is complete

#### Backend Processing

On registration submission:

1. Validate all input data
2. Encrypt sensitive data:
   - User password (for Quicksilver login) - bcrypt/argon2
   - Email password/app password - AES encryption with `ENCRYPTION_KEY`
3. Store user profile in database with all configuration
4. Optionally: Test IMAP/SMTP connection before completing registration
5. Create user session
6. Redirect to inbox

### Profile Management

Users can update their email service configuration after registration via the Profile page:

- Change email service provider
- Update email address and password
- Modify IMAP/SMTP settings (for custom configurations)
- Test connection before saving changes
- Change Quicksilver account password

### Milestone 1: Direct Credentials Approach

Milestone 1 implements **direct IMAP/SMTP** connections with user credentials (app passwords).

**Why This Approach for Milestone 1:**

✅ **Advantages:**

- Simpler implementation - get working system faster
- No OAuth app registration required with Google/Microsoft
- Works immediately for development and testing
- User has full control over credentials
- Supports any IMAP/SMTP provider (maximum compatibility)
- Easier debugging during development

⚠️ **Trade-offs:**

- Requires app-specific passwords for Gmail/Outlook (extra user setup step)
- No access to provider-specific APIs (Gmail API, Graph API)
- Cannot leverage advanced features (push notifications, delta queries)
- IMAP/SMTP may be slower than REST APIs for large mailboxes

**Milestone 2 Enhancement: OAuth 2.0**

OAuth 2.0 will be added as an alternative authentication method:

- Users choose between "OAuth" or "App Password" during registration
- OAuth: Redirect to provider, obtain tokens, store encrypted tokens in profile
- App Password: Enter password directly (Milestone 1 implementation remains available)

## Testing Strategy

### Milestone 1 Testing

1. **Unit Tests**
   - User registration validation
   - Credential encryption/decryption
   - Email address validation
   - IMAP/SMTP configuration logic
   - Database model validation

2. **Integration Tests**
   - IMAP connections with Gmail/Outlook/Yahoo app passwords
   - SMTP sending via Gmail/Outlook/Yahoo
   - Custom IMAP/SMTP server connections
   - Authentication flow (register/login/logout)
   - Email operations (fetch, send, reply, forward)

3. **End-to-End Tests**
   - Complete registration flow with email configuration
   - Login and view inbox
   - Compose and send email
   - Reply to and forward emails
   - Move and delete emails
   - Update profile and email settings

4. **Security Tests**
   - Verify credentials are encrypted at rest
   - Verify TLS/SSL connections to email servers
   - Verify session management
   - Test input validation and sanitization

### Milestone 2+ Testing Additions

1. **OAuth Flow Tests** (Milestone 2)
   - OAuth authorization flow
   - Token refresh mechanisms
   - API integrations with provider sandboxes

2. **Performance Tests** (Milestone 3)
   - Background sync operations
   - Real-time update delivery
   - Large mailbox handling

3. **Multi-Account Tests** (Milestone 4)
   - Multiple accounts per user
   - Account switching
   - Unified inbox

## Implementation Plan

### Milestone 1: Foundation & Basic Email Access 🎯 CURRENT

**Goal**: Get a working email client with IMAP/SMTP support

#### M1.1: Frontend Foundation ✅ COMPLETED

- ✅ Set up React frontend with Material-UI
- ✅ Implement user registration with email service configuration
- ✅ Create profile management forms
- ✅ Implement basic authentication framework (AuthContext)
- ✅ Auto-populate IMAP/SMTP settings for Gmail, Outlook, Yahoo
- ✅ Support custom IMAP/SMTP configuration

#### M1.2: Backend Infrastructure 🔄 IN PROGRESS

- 🔄 Set up Node.js/Express backend server
- 🔄 Implement database models (MongoDB/PostgreSQL)
- 🔄 Create user authentication API endpoints
- 🔄 Implement credential encryption (AES with ENCRYPTION_KEY)
- 🔄 Set up session management
- 🔄 Create basic API error handling

#### M1.3: IMAP Integration 📋 TODO

- 📋 Implement IMAP connection manager
- 📋 Connect to Gmail/Outlook/Yahoo using app passwords
- 📋 List folders/mailboxes
- 📋 Fetch email messages and metadata
- 📋 Mark emails as read/unread
- 📋 Move emails between folders
- 📋 Delete emails
- 📋 Handle IMAP errors gracefully

#### M1.4: SMTP Integration 📋 TODO

- 📋 Implement SMTP connection manager
- 📋 Send new emails
- 📋 Reply to emails
- 📋 Forward emails
- 📋 Handle attachments
- 📋 Handle SMTP errors gracefully

#### M1.5: UI Email Operations 📋 TODO

- 📋 Inbox view with email list
- 📋 Email detail/reading view
- 📋 Compose email interface
- 📋 Reply/forward interface
- 📋 Folder navigation
- 📋 Basic error messages and loading states

#### M1.6: Testing & Validation ✅ TODO

- ✅ Test with Gmail app passwords
- ✅ Test with Outlook app passwords
- ✅ Test with Yahoo app passwords
- ✅ Test with custom IMAP/SMTP servers
- ✅ Verify credential encryption
- ✅ Test error handling flows

**Milestone 1 Success Criteria:**

- Users can register and configure email accounts
- Users can view their inbox and read emails
- Users can compose and send new emails
- Users can reply to and forward emails
- All credentials are encrypted at rest
- All connections use TLS/SSL

---

### Milestone 2: OAuth & Provider APIs 🚀 PLANNED

**Goal**: Add OAuth 2.0 support and provider-specific APIs for better performance

#### M2.1: OAuth 2.0 Framework

- Implement OAuth 2.0 authorization flow
- Create provider redirect handlers
- Implement token storage and refresh logic
- Add OAuth vs App Password selection in UI

#### M2.2: Gmail API Integration

- Register OAuth app with Google Cloud Console
- Implement Gmail REST API client
- Use batch requests for efficiency
- Implement token refresh
- Migrate Gmail users to API (optional upgrade path)

#### M2.3: Microsoft Graph Integration

- Register OAuth app with Azure Portal
- Implement Microsoft Graph API client
- Use delta queries for synchronization
- Implement token refresh
- Support personal and organizational accounts

**Milestone 2 Success Criteria:**

- Users can choose OAuth or App Password authentication
- Gmail users can authenticate via Google OAuth
- Outlook users can authenticate via Microsoft OAuth
- API-based access is faster than IMAP for large mailboxes

---

### Milestone 3: Real-Time Sync & Advanced Features 🎨 PLANNED

**Goal**: Add real-time updates, background sync, and advanced features

#### M3.1: Background Synchronization

- Implement background workers for email fetching
- Add email caching in database
- Implement incremental sync
- Add sync status indicators in UI

#### M3.2: Real-Time Updates

- Implement WebSocket server
- Add Gmail Pub/Sub push notifications
- Add Microsoft Graph webhooks
- Real-time UI updates for new emails

#### M3.3: ProtonMail Bridge Support

- Implement ProtonMail Bridge detection
- Configure local IMAP/SMTP for Bridge
- Add ProtonMail-specific UI elements
- Create Bridge setup documentation

#### M3.4: Advanced Search

- Implement server-side search
- Add search UI components
- Support provider-specific search syntax
- Add search filters and date ranges

**Milestone 3 Success Criteria:**

- Emails sync automatically in background
- New emails appear in real-time without refresh
- ProtonMail users can connect via Bridge
- Users can search across all emails

---

### Milestone 4: Polish & Scale 💎 PLANNED

**Goal**: Production-ready features and optimizations

#### M4.1: Multi-Account Support

- Support multiple email accounts per user
- Unified inbox view
- Account switcher in UI

#### M4.2: Performance Optimization

- Implement aggressive caching
- Optimize database queries
- Add pagination for large mailboxes
- Lazy loading for attachments

#### M4.3: Production Deployment

- Set up production environment
- Implement monitoring and logging
- Add rate limiting
- Security audit and hardening

**Milestone 4 Success Criteria:**

- Users can manage multiple email accounts
- Application handles large mailboxes (10,000+ emails)
- Production deployment is stable and secure
- System is ready for public beta
