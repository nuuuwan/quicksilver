# Email Server Interface - Milestone 1

## Introduction

Quicksilver is designed as a unified email client that provides a consistent, modern interface across multiple email providers. Rather than being tied to a single service, Quicksilver can connect to any email service, including Gmail, Outlook, Hotmail, ProtonMail, and many others.

**This document focuses on Milestone 1**, which establishes the foundational architecture for email provider integration. Milestone 1 prioritizes getting a working system with direct IMAP/SMTP connections, allowing users to connect their email accounts and view/send messages. Advanced features like OAuth 2.0, provider-specific APIs, and real-time synchronization are planned for future milestones.

### Milestone 1 Goals

1. **User Registration & Authentication**: Allow users to register and log in to Quicksilver
2. **Email Service Configuration**: Collect email provider credentials during registration
3. **IMAP/SMTP Support**: Enable direct connections using app-specific passwords
4. **Basic Email Operations**: Read emails, send emails, basic folder management
5. **Provider Auto-Configuration**: Pre-populate settings for Gmail, Outlook, Yahoo
6. **Security Foundation**: Encrypt credentials at rest, use TLS for all connections

### Milestone 1 Design Principles

1. **Simplicity First**: Get a working system with standard protocols (IMAP/SMTP)
2. **Provider Agnostic**: Support any email provider through standard protocols
3. **Security by Default**: Encrypt credentials at rest and use TLS for all communications
4. **User-Friendly Configuration**: Auto-populate settings for popular providers
5. **Foundation for Growth**: Build an extensible architecture that supports future enhancements

### Long-Term Design Principles (All Milestones)

1. **Provider Agnostic**: Users should be able to use any email provider without changing their workflow
2. **Standard Protocols First**: Leverage IMAP/SMTP where possible for maximum compatibility
3. **Modern APIs When Available**: Use provider-specific APIs (Gmail API, Microsoft Graph) for enhanced features and performance (Milestone 2+)
4. **Progressive Enhancement**: Basic features work everywhere, advanced features leverage provider capabilities (Milestone 2+)

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

- **Milestone 1**: Give users freedom to use Gmail, Outlook, Yahoo, or any custom IMAP/SMTP provider
- **Milestone 1**: Provide a unified interface regardless of email provider
- **Future**: Enable users to manage multiple email accounts from different providers in one interface (Milestone 4)
- **Future**: Take advantage of provider-specific features while maintaining a consistent user experience (Milestone 2+)

## Architecture Overview

Quicksilver's email server interface follows a modular architecture with three main layers:

1. **Frontend Layer**: React application that provides the user interface
2. **Backend Layer**: Node.js server that handles authentication, email operations, and protocol translation
3. **Email Provider Layer**: External email services (Gmail, Outlook, ProtonMail, etc.)

The backend server acts as a mediator between the frontend and email providers, handling protocol-specific operations, OAuth flows, and data transformation.

### What We Build

**Quicksilver Frontend** (Custom Implementation)

- React-based single-page application
- UI components for email viewing, composition, and management
- Authentication flows and account setup wizards
- State management for emails, threads, and user settings
- Real-time updates and notifications
- Responsive design for desktop and mobile

**Quicksilver Backend** (Custom Implementation)

**Milestone 1:**

- Node.js/Express API server
- User authentication and session management
- Database models for users and email configuration
- IMAP/SMTP connection management
- Basic request routing and middleware
- Credential encryption utilities

**Future Milestones:**

- OAuth 2.0 authentication handlers (Milestone 2)
- Protocol abstraction layer for REST APIs (Milestone 2)
- Token management and refresh logic (Milestone 2)
- WebSocket server for real-time updates (Milestone 3)
- Background workers for email sync (Milestone 3)
- Email caching and synchronization engine (Milestone 3)

**Database** (Custom Schema, Standard Technology)

- MongoDB or PostgreSQL for storing user data, account credentials, and cached emails
- We design the schema; we use standard database software

### What We Use (Third-Party)

**Email Providers** (External Services)

- Gmail, Outlook, Hotmail, ProtonMail, etc.
- We connect to these; we don't build or control them
- Each provider has its own servers, APIs, and infrastructure

**NPM Libraries** (Open Source Dependencies)

- `imap`: IMAP protocol implementation (we configure and use it)
- `nodemailer`: SMTP client for sending emails (we configure and use it)
- `mailparser`: Email parsing utilities (we use its parsing logic)
- `googleapis`: Google's official API client (we use their SDK)
- `@microsoft/microsoft-graph-client`: Microsoft's official API client (we use their SDK)
- `express`: Web framework (we build our API on top of it)
- `mongoose` or `sequelize`: Database ORM (we use it for data modeling)
- OAuth libraries for authentication flows

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
- Authenticate using OAuth 2.0 or app-specific passwords
- List mailboxes/folders
- Fetch email messages and metadata
- Search emails
- Mark messages as read/unread, flagged, etc.
- Move messages between folders
- Delete messages

**Configuration Requirements**:

- IMAP server hostname and port (typically 993 for SSL)
- Authentication credentials (OAuth tokens or app passwords)
- TLS/SSL certificate validation

### SMTP (Simple Mail Transfer Protocol)

SMTP is used for sending emails.

**Standard Operations**:

- Connect to SMTP server with TLS/SSL
- Authenticate using OAuth 2.0 or app-specific passwords
- Send email messages
- Handle attachments
- Manage delivery status notifications

**Configuration Requirements**:

- SMTP server hostname and port (typically 587 for STARTTLS or 465 for SSL)
- Authentication credentials (OAuth tokens or app passwords)
- TLS/SSL configuration

## Authentication Architecture

### Milestone 1: Direct IMAP/SMTP Authentication

Milestone 1 implements direct IMAP/SMTP connections using user-provided credentials (app-specific passwords). This approach provides immediate functionality without requiring OAuth app registration.

**Implementation Status**: ✅ Active in Milestone 1

### Future: App-Level OAuth 2.0 (Milestone 2)

**Purpose**: Allows Quicksilver to access user emails via modern OAuth 2.0 flow  
**Requires**: Application-level credentials (Client ID/Secret) configured in environment variables  
**Status**: 🔄 Planned for Milestone 2

#### Environment Variables (App-Level)

These identify **your Quicksilver application** to email providers:

```env
# Gmail - Register at console.cloud.google.com
GMAIL_CLIENT_ID=your_app_client_id
GMAIL_CLIENT_SECRET=your_app_client_secret
GMAIL_REDIRECT_URI=https://yourdomain.com/auth/gmail/callback

# Outlook - Register at portal.azure.com  
OUTLOOK_CLIENT_ID=your_app_client_id
OUTLOOK_CLIENT_SECRET=your_app_client_secret
OUTLOOK_REDIRECT_URI=https://yourdomain.com/auth/outlook/callback
```

#### OAuth 2.0 Flow

1. **Authorization Request**: User clicks "Connect Gmail" → redirects to Google with your app's Client ID
2. **User Consent**: User grants permission to **Quicksilver app**
3. **Authorization Code**: Google redirects back with authorization code
4. **Token Exchange**: Server uses app credentials to exchange code for user-specific access/refresh tokens
5. **Token Storage**: Store user's tokens (encrypted) in their profile
6. **Token Refresh**: Automatically refresh access tokens when they expire using refresh token

**Key Concept**: App credentials (environment variables) are shared across all users. User-specific tokens are stored per-user in their profile.

### Milestone 1 Implementation: Direct IMAP/SMTP with Credentials

**Purpose**: Direct connection to email servers using username/password  
**Requires**: User provides email address, password, and server settings during registration  
**Implementation Status**: ✅ Implemented in Milestone 1

#### User-Level Configuration (Stored in Profile)

Collected during registration/profile setup:

- **Email Address**: <user@example.com>
- **Email Password**: App-specific password or regular password
- **IMAP Settings**: Host, port, security (auto-populated for Gmail/Outlook/Yahoo)
- **SMTP Settings**: Host, port, security (auto-populated for Gmail/Outlook/Yahoo)

**Pre-configured Providers**: Gmail, Outlook, Yahoo (server settings auto-populated)  
**Custom Provider**: User manually enters IMAP/SMTP server details

#### Milestone 1: Supported Authentication Methods

| Provider | Milestone 1 Auth | User Experience | Future (Milestone 2+) |
|----------|-----------------|-----------------|------------------------|
| Gmail | App Password + IMAP/SMTP | Enter 16-char app password | OAuth 2.0 option |
| Outlook | App Password + IMAP/SMTP | Enter app-specific password | OAuth 2.0 option |
| Yahoo | IMAP/SMTP with App Password | Enter Yahoo app password | - |
| Custom | IMAP/SMTP with credentials | Enter server details and password | - |
| ProtonMail | Not supported in M1 | - | Bridge support (M3) |

## Gmail Integration

### Milestone 1: IMAP/SMTP Access

**Implementation**: Direct IMAP/SMTP using app-specific passwords

**User Setup Steps**:

1. Enable 2-Factor Authentication on Gmail account
2. Generate app-specific password at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Enter app password in Quicksilver registration form

**No Cloud Console Project Required for Milestone 1**

### Future (Milestone 2): OAuth 2.0 Integration

1. **Google Cloud Console Project**
   - Create project at [console.cloud.google.com](https://console.cloud.google.com)
   - Enable Gmail API
   - Configure OAuth 2.0 consent screen

2. **OAuth 2.0 Credentials**
   - Create OAuth 2.0 Client ID (Web application)
   - Add authorized redirect URIs (e.g., `https://yourdomain.com/auth/gmail/callback`)
   - Obtain Client ID and Client Secret

### OAuth 2.0 Scopes (Milestone 2)

**Note**: Not required for Milestone 1

Required scopes for full functionality when implementing OAuth 2.0:

```text
https://www.googleapis.com/auth/gmail.readonly        # Read emails
https://www.googleapis.com/auth/gmail.send            # Send emails
https://www.googleapis.com/auth/gmail.modify          # Modify labels, mark read/unread
https://www.googleapis.com/auth/gmail.compose         # Create drafts
```

### API Configuration

**IMAP Settings**:

- Server: `imap.gmail.com`
- Port: `993`
- Security: SSL/TLS
- Authentication: OAuth 2.0 (XOAUTH2)

**SMTP Settings**:

- Server: `smtp.gmail.com`
- Port: `587` (STARTTLS) or `465` (SSL)
- Security: TLS/SSL
- Authentication: OAuth 2.0 (XOAUTH2)

### Milestone 1 Implementation Tasks

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

### Future Enhancements (Milestone 2+)

1. **Gmail API Integration** (Milestone 2)
   - Implement Gmail REST API for better performance
   - Use batch requests to reduce API calls
   - OAuth 2.0 authentication

2. **Advanced Features** (Milestone 3)
   - Push notifications using Gmail Pub/Sub
   - Handle Gmail-specific features (categories, importance markers)
   - Gmail-specific search syntax
   - Conversation threading

## Outlook/Hotmail Integration

### Milestone 1: IMAP/SMTP Access

**Implementation**: Direct IMAP/SMTP using app-specific passwords

**User Setup Steps**:

1. Enable 2-Factor Authentication on Microsoft account
2. Generate app password in Microsoft account security settings
3. Enter app password in Quicksilver registration form

**No Azure Portal Registration Required for Milestone 1**

### Future (Milestone 2): Microsoft Graph API Integration

1. **Microsoft Azure Portal**
   - Register application at [portal.azure.com](https://portal.azure.com)
   - Navigate to Azure Active Directory > App registrations
   - Create new registration

2. **Microsoft Graph API Configuration**
   - Add Microsoft Graph API permissions
   - Configure redirect URIs
   - Obtain Application (client) ID and Client secret

### OAuth 2.0 Scopes (Milestone 2)

**Note**: Not required for Milestone 1

Required Microsoft Graph permissions when implementing OAuth 2.0:

```text
Mail.Read            # Read user's mail
Mail.ReadWrite       # Read and write user's mail
Mail.Send            # Send mail as user
User.Read            # Read user profile (for display name, email)
offline_access       # Maintain access when user is offline
```

### API Configuration

**Option 1: Microsoft Graph API (Recommended)**

- Endpoint: `https://graph.microsoft.com/v1.0/me/messages`
- Authentication: OAuth 2.0 Bearer tokens
- Better integration with Microsoft 365 features

**Option 2: Traditional IMAP/SMTP**

**IMAP Settings**:

- Server: `outlook.office365.com`
- Port: `993`
- Security: SSL/TLS
- Authentication: OAuth 2.0 (XOAUTH2)

**SMTP Settings**:

- Server: `smtp.office365.com`
- Port: `587`
- Security: STARTTLS
- Authentication: OAuth 2.0 (XOAUTH2)

### Milestone 1 Implementation Tasks

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

### Future Enhancements (Milestone 2+)

1. **Microsoft Graph API Integration** (Milestone 2)
   - Implement REST API calls for email operations
   - OAuth 2.0 authentication with MSAL
   - Use `$select` and `$expand` query parameters
   - Handle pagination with `@odata.nextLink`

2. **Advanced Features** (Milestone 3)
   - Delta queries for efficient synchronization
   - Focused Inbox vs Other categories
   - Flag colors and importance levels
   - @mentions and inline replies

## ProtonMail Integration

**Status**: 🚫 Not supported in Milestone 1  
**Planned**: Milestone 3

### Future Implementation (Milestone 3)

#### Prerequisites

ProtonMail is unique as it provides end-to-end encryption, requiring special handling.

1. **ProtonMail Bridge (Recommended for Desktop)**
   - Users must install and run ProtonMail Bridge locally
   - Bridge provides local IMAP/SMTP servers that handle encryption/decryption
   - Requires paid ProtonMail account

2. **ProtonMail API (Alternative)**
   - Request API access from ProtonMail
   - Implement ProtonMail's proprietary API
   - Handle ProtonMail's encryption scheme (OpenPGP.js)

### IMAP/SMTP Configuration (via Bridge)

**IMAP Settings**:

- Server: `127.0.0.1` (local Bridge)
- Port: `1143` (default, configurable)
- Security: STARTTLS
- Authentication: Bridge-generated password

**SMTP Settings**:

- Server: `127.0.0.1` (local Bridge)
- Port: `1025` (default, configurable)
- Security: STARTTLS
- Authentication: Bridge-generated password

### Additional Work Required

1. **ProtonMail Bridge Detection**
   - Auto-detect if Bridge is running locally
   - Provide setup instructions for users without Bridge
   - Handle Bridge connection errors gracefully
   - Validate Bridge version compatibility

2. **Encryption Handling**
   - Bridge handles encryption/decryption transparently
   - No need to implement OpenPGP in the application when using Bridge
   - Support reading encrypted emails from ProtonMail users

3. **ProtonMail API Integration (Advanced)**
   - Implement OpenPGP.js for client-side encryption/decryption
   - Handle ProtonMail's session management
   - Implement two-password authentication (login + mailbox password)
   - Handle encrypted contact keys

4. **Special Considerations**
   - Users need paid ProtonMail accounts for Bridge access
   - Bridge must be always running for email access
   - Limited to desktop/laptop usage (Bridge is not mobile)
   - Provide clear documentation for Bridge setup

5. **Fallback Options**
   - Offer web-based ProtonMail client redirection
   - Implement import/export functionality for offline access
   - Provide instructions for third-party IMAP bridge solutions

## Server-Side Implementation

### Technology Stack

**Backend Framework**: Node.js with Express
**Email Libraries**:

- `imap`: For IMAP connections
- `nodemailer`: For SMTP sending
- `mailparser`: For parsing email content
- `googleapis`: For Gmail API
- `@microsoft/microsoft-graph-client`: For Microsoft Graph API

### Database Schema

#### User Profile Schema

User profiles include authentication credentials and email service configuration collected during registration:

```javascript
{
  // User Authentication (for Quicksilver app)
  id: String,
  name: String,
  email: String,              // Quicksilver account email
  password: String,           // Encrypted - for Quicksilver login
  
  // Email Service Configuration (collected at registration)
  emailServiceProvider: String, // 'gmail', 'outlook', 'yahoo', 'protonmail', 'custom'
  emailAddress: String,         // Actual email address (e.g., user@gmail.com)
  
  // Authentication Type: OAuth2 vs Direct Credentials
  authType: String,            // 'oauth2', 'app_password', 'imap_smtp'
  
  // For OAuth2 providers (Gmail, Outlook) - tokens obtained via app-level OAuth flow
  oauth: {
    accessToken: String,       // Encrypted - user's access token
    refreshToken: String,      // Encrypted - user's refresh token
    tokenExpiry: Date,
    scopes: [String]
  },
  
  // For Direct IMAP/SMTP (Yahoo, Custom, or app-password-based Gmail/Outlook)
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
  status: String,              // 'active', 'token_expired', 'auth_error', 'disconnected'
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

#### Milestone 1 Implementation

```javascript
// User Registration & Profile (includes email configuration)
POST   /auth/register                // Register new user with email config
POST   /auth/login                   // Login to Quicksilver
POST   /auth/logout                  // Logout from Quicksilver
GET    /profile                      // Get user profile
PUT    /profile                      // Update profile & email settings

// Email Service Testing (Milestone 1)
POST   /emails/test-connection       // Test IMAP/SMTP connection
GET    /emails/connection-status     // Check email service status

// Email operations (Milestone 1)
GET    /emails/folders               // List folders
GET    /emails/:folderId             // List emails in folder
GET    /emails/:id                   // Get single email
POST   /emails/send                  // Send email
POST   /emails/:id/reply             // Reply to email
POST   /emails/:id/forward           // Forward email
PUT    /emails/:id/flag              // Update flags (read/unread)
DELETE /emails/:id                   // Delete email
```

#### Milestone 2+ Additions

```javascript
// OAuth Flow (Milestone 2)
GET    /auth/:provider/initiate      // Start OAuth flow (redirects to provider)
GET    /auth/:provider/callback      // OAuth callback (receives tokens)
POST   /auth/:provider/disconnect    // Remove OAuth tokens

// Advanced Operations (Milestone 3)
POST   /emails/search                // Search emails
POST   /sync/start                   // Start email synchronization
GET    /sync/status                  // Get sync status
GET    /sync/history                 // Get sync history
```

### Security Considerations

1. **Token Storage**
   - Encrypt OAuth tokens and credentials at rest
   - Use environment-specific encryption keys
   - Implement token rotation
   - Store tokens in secure database (not localStorage)

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

### Milestone 1: Environment Variables

Milestone 1 requires minimal environment variables (no OAuth credentials needed):

```env
# Application Security (Required for Milestone 1)
ENCRYPTION_KEY=your_32_byte_encryption_key   # For encrypting user credentials
SESSION_SECRET=your_session_secret           # For session management
DATABASE_URL=mongodb://localhost:27017/quicksilver

# Server Configuration (Required for Milestone 1)
PORT=3001
NODE_ENV=development

# Future: OAuth 2.0 App Credentials (Milestone 2)
# Uncomment when implementing OAuth flows
# GMAIL_CLIENT_ID=your_app_client_id
# GMAIL_CLIENT_SECRET=your_app_client_secret
# GMAIL_REDIRECT_URI=https://yourdomain.com/auth/gmail/callback
# OUTLOOK_CLIENT_ID=your_app_client_id
# OUTLOOK_CLIENT_SECRET=your_app_client_secret
# OUTLOOK_REDIRECT_URI=https://yourdomain.com/auth/outlook/callback
```

### User-Level Configuration (Stored in Database)

These are **per-user** settings collected during registration or profile setup:

```javascript
// Collected in RegistrationForm/ProfileForm
{
  emailServiceProvider: "gmail" | "outlook" | "yahoo" | "custom",
  emailAddress: "user@gmail.com",
  
  // For OAuth (if using Gmail/Outlook OAuth flow)
  oauth: {
    accessToken: "user_specific_encrypted_token",
    refreshToken: "user_specific_encrypted_token"
  },
  
  // For Direct IMAP/SMTP (or app passwords)
  credentials: {
    emailPassword: "user_encrypted_app_password"
  },
  
  // Auto-populated based on provider, or user-entered for custom
  imapConfig: { host: "imap.gmail.com", port: 993, secure: true },
  smtpConfig: { host: "smtp.gmail.com", port: 587, secure: true }
}
```

### Configuration Strategy Summary

#### Milestone 1

| Setting | Scope | Where Stored | Purpose |
|---------|-------|--------------|----------|
| `emailAddress` | User-level | User profile (database) | User's actual email address |
| `emailPassword` | User-level | User profile (encrypted) | User's app password or credentials |
| `imapConfig` | User-level | User profile | User's IMAP server settings |
| `smtpConfig` | User-level | User profile | User's SMTP server settings |
| `ENCRYPTION_KEY` | App-level | Environment variables | Encrypts user credentials |
| `SESSION_SECRET` | App-level | Environment variables | Session management |
| `DATABASE_URL` | App-level | Environment variables | Database connection |

#### Milestone 2+ (OAuth)

| Setting | Scope | Where Stored | Purpose |
|---------|-------|--------------|----------|
| `GMAIL_CLIENT_ID` | App-level | Environment variables | Identifies Quicksilver app to Google |
| `GMAIL_CLIENT_SECRET` | App-level | Environment variables | Authenticates Quicksilver app to Google |
| `oauth.accessToken` | User-level | User profile (encrypted) | User's access token from OAuth flow |
| `oauth.refreshToken` | User-level | User profile (encrypted) | User's refresh token from OAuth flow |

### Provider Setup Resources

#### Milestone 1 (App Passwords)

- **Gmail App Passwords**: [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
- **Microsoft App Passwords**: Microsoft Account Security Settings
- **Yahoo App Passwords**: Yahoo Account Security Settings

#### Milestone 2+ (OAuth Registration)

- **Gmail OAuth**: [console.cloud.google.com](https://console.cloud.google.com)
- **Outlook OAuth**: [portal.azure.com](https://portal.azure.com)

#### Milestone 3+ (Advanced)

- **ProtonMail Bridge**: [protonmail.com/bridge](https://protonmail.com/bridge)

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
