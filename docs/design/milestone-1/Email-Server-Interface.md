# Email Server Interface

## Introduction

Quicksilver is designed as a unified email client that provides a consistent, modern interface across multiple email providers. Rather than being tied to a single service, Quicksilver can connect to any email service, including Gmail, Outlook, Hotmail, ProtonMail, and many others.

This design document outlines the technical architecture and implementation details for integrating with various email providers. The goal is to create a flexible, extensible system that abstracts away the complexities of different email protocols and provider-specific APIs, presenting a unified experience to the end user.

### Key Design Principles

1. **Provider Agnostic**: Users should be able to use any email provider without changing their workflow
2. **Standard Protocols First**: Leverage IMAP/SMTP where possible for maximum compatibility
3. **Modern APIs When Available**: Use provider-specific APIs (Gmail API, Microsoft Graph) for enhanced features and performance
4. **Security by Default**: Implement OAuth 2.0, encrypt credentials at rest, and use TLS for all communications
5. **Progressive Enhancement**: Basic features work everywhere, advanced features leverage provider capabilities

### Scope

This document covers:

- Authentication mechanisms for different providers
- Email protocol implementation (IMAP, SMTP, REST APIs)
- Provider-specific integration requirements
- Security and data protection strategies
- Implementation roadmap

### Why Multiple Providers?

Supporting multiple email providers allows Quicksilver to:

- Give users freedom to choose their preferred email service based on privacy, features, or cost
- Enable users to manage multiple email accounts from different providers in one interface
- Ensure the application remains valuable even if a user switches providers
- Take advantage of provider-specific features while maintaining a consistent user experience

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

- Node.js/Express API server
- OAuth 2.0 authentication handlers for each provider
- Email synchronization engine
- Protocol abstraction layer (unified interface for IMAP, SMTP, and REST APIs)
- Database models for users, accounts, emails, and settings
- Token management and refresh logic
- Request routing and middleware
- WebSocket server for real-time updates
- Background workers for email fetching and sync

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

Quicksilver supports two authentication approaches for email services:

### 1. App-Level OAuth 2.0 (Recommended for Gmail/Outlook)

**Purpose**: Allows Quicksilver to access user emails via modern OAuth 2.0 flow  
**Requires**: Application-level credentials (Client ID/Secret) configured in environment variables

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

### 2. Direct IMAP/SMTP with Credentials (For Yahoo/Custom/App Passwords)

**Purpose**: Direct connection to email servers using username/password  
**Requires**: User provides email address, password, and server settings during registration

#### User-Level Configuration (Stored in Profile)

Collected during registration/profile setup:

- **Email Address**: <user@example.com>
- **Email Password**: App-specific password or regular password
- **IMAP Settings**: Host, port, security (auto-populated for Gmail/Outlook/Yahoo)
- **SMTP Settings**: Host, port, security (auto-populated for Gmail/Outlook/Yahoo)

**Pre-configured Providers**: Gmail, Outlook, Yahoo (server settings auto-populated)  
**Custom Provider**: User manually enters IMAP/SMTP server details

#### When to Use Each Approach

| Provider | Recommended Auth | User Experience |
|----------|-----------------|------------------|
| Gmail | OAuth 2.0 (if app credentials configured) OR App Password + IMAP/SMTP | OAuth: Click "Allow" on Google page<br>App Password: Enter 16-char app password |
| Outlook | OAuth 2.0 (if app credentials configured) OR App Password + IMAP/SMTP | OAuth: Click "Allow" on Microsoft page<br>App Password: Enter app-specific password |
| Yahoo | IMAP/SMTP with App Password | User enters Yahoo app password |
| Custom | IMAP/SMTP with credentials | User enters server details and password |
| ProtonMail | ProtonMail Bridge (IMAP/SMTP) | User runs Bridge locally, enters Bridge password |

## Gmail Integration

### Prerequisites

1. **Google Cloud Console Project**
   - Create project at [console.cloud.google.com](https://console.cloud.google.com)
   - Enable Gmail API
   - Configure OAuth 2.0 consent screen

2. **OAuth 2.0 Credentials**
   - Create OAuth 2.0 Client ID (Web application)
   - Add authorized redirect URIs (e.g., `https://yourdomain.com/auth/gmail/callback`)
   - Obtain Client ID and Client Secret

### OAuth 2.0 Scopes

Required scopes for full functionality:

```
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

### Additional Work Required

1. **Gmail API Integration**
   - Implement Gmail REST API as an alternative to IMAP/SMTP for better performance
   - Use batch requests to reduce API calls
   - Implement push notifications using Gmail Pub/Sub
   - Handle Gmail-specific features (labels, categories, importance markers)

2. **Rate Limiting**
   - Implement exponential backoff for API rate limits
   - Gmail API quota: 1 billion quota units per day
   - Monitor quota usage and implement user-level throttling

3. **Error Handling**
   - Handle Gmail-specific error codes (401, 403, 429, 500)
   - Implement token refresh on 401 errors
   - Graceful degradation for quota exceeded errors

4. **Special Considerations**
   - Handle Gmail's conversation threading model
   - Map Gmail labels to standard folders (INBOX, SENT, DRAFTS, TRASH)
   - Support Gmail-specific search syntax
   - Handle large attachment downloads (chunked transfer)

## Outlook/Hotmail Integration

### Prerequisites

1. **Microsoft Azure Portal**
   - Register application at [portal.azure.com](https://portal.azure.com)
   - Navigate to Azure Active Directory > App registrations
   - Create new registration

2. **Microsoft Graph API Configuration**
   - Add Microsoft Graph API permissions
   - Configure redirect URIs
   - Obtain Application (client) ID and Client secret

### OAuth 2.0 Scopes

Required Microsoft Graph permissions:

```
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

### Additional Work Required

1. **Microsoft Graph API Integration**
   - Implement REST API calls for email operations
   - Use `$select` and `$expand` query parameters to optimize data transfer
   - Implement delta queries for efficient synchronization
   - Handle pagination with `@odata.nextLink`

2. **Authentication Flows**
   - Implement Microsoft Identity Platform OAuth 2.0 flow
   - Use MSAL (Microsoft Authentication Library) for token management
   - Handle tenant-specific endpoints
   - Support both personal (hotmail.com) and organizational (outlook.com) accounts

3. **Special Features**
   - Support Outlook-specific folder hierarchy
   - Handle Focused Inbox vs Other categories
   - Implement flag colors and importance levels
   - Support @mentions and inline replies

4. **Rate Limiting**
   - Microsoft Graph throttling limits: 10,000 requests per 10 minutes per user
   - Implement retry-after header handling
   - Use batch requests to combine operations

## ProtonMail Integration

### Prerequisites

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

```javascript
// User Registration & Profile (includes email configuration)
POST   /auth/register                // Register new user with email config
POST   /auth/login                   // Login to Quicksilver
POST   /auth/logout                  // Logout from Quicksilver
GET    /profile                      // Get user profile
PUT    /profile                      // Update profile & email settings

// OAuth Flow (for Gmail/Outlook if using OAuth)
GET    /auth/:provider/initiate      // Start OAuth flow (redirects to provider)
GET    /auth/:provider/callback      // OAuth callback (receives tokens)
POST   /auth/:provider/disconnect    // Remove OAuth tokens

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
PUT    /emails/:id/flag              // Update flags
DELETE /emails/:id                   // Delete email
POST   /emails/search                // Search emails

// Sync operations
POST   /sync/start                   // Start email synchronization
GET    /sync/status                  // Get sync status
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

### Environment Variables (Application-Level)

These are **application-level** settings that identify your Quicksilver instance. They are NOT user-specific.

```env
# OAuth 2.0 App Credentials (Optional - only if using OAuth flow)
# Gmail - Register at console.cloud.google.com
GMAIL_CLIENT_ID=your_app_client_id           # Identifies YOUR app to Google
GMAIL_CLIENT_SECRET=your_app_client_secret   # Secret for YOUR app
GMAIL_REDIRECT_URI=https://yourdomain.com/auth/gmail/callback

# Outlook - Register at portal.azure.com
OUTLOOK_CLIENT_ID=your_app_client_id         # Identifies YOUR app to Microsoft
OUTLOOK_CLIENT_SECRET=your_app_client_secret # Secret for YOUR app
OUTLOOK_REDIRECT_URI=https://yourdomain.com/auth/outlook/callback

# Application Security
ENCRYPTION_KEY=your_32_byte_encryption_key   # For encrypting user credentials/tokens
SESSION_SECRET=your_session_secret           # For session management
DATABASE_URL=mongodb://localhost:27017/quicksilver

# Server
PORT=3001
NODE_ENV=production
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

| Setting | Scope | Where Stored | Purpose |
|---------|-------|--------------|----------|
| `GMAIL_CLIENT_ID` | App-level | Environment variables | Identifies Quicksilver app to Google |
| `GMAIL_CLIENT_SECRET` | App-level | Environment variables | Authenticates Quicksilver app to Google |
| `emailAddress` | User-level | User profile (database) | User's actual email address |
| `emailPassword` | User-level | User profile (encrypted) | User's app password or credentials |
| `oauth.accessToken` | User-level | User profile (encrypted) | User's access token from OAuth flow |
| `imapConfig` | User-level | User profile | User's IMAP server settings |
| `ENCRYPTION_KEY` | App-level | Environment variables | Encrypts user credentials/tokens |

### Provider Registration URLs

- **Gmail**: [https://console.cloud.google.com](https://console.cloud.google.com)
- **Outlook**: [https://portal.azure.com](https://portal.azure.com)
- **ProtonMail**: [https://protonmail.com/bridge](https://protonmail.com/bridge)

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

### OAuth 2.0 vs Direct Credentials

The current implementation supports **direct IMAP/SMTP** connections with user credentials (app passwords). This approach:

**Advantages:**

- Simpler implementation - no OAuth flow needed
- Works immediately without app registration
- User has full control over credentials
- Supports any IMAP/SMTP provider

**Limitations:**

- Requires app-specific passwords for Gmail/Outlook (less convenient)
- No access to provider-specific APIs (Gmail API, Graph API)
- Cannot leverage advanced features (push notifications via Pub/Sub, delta queries)

**Future Enhancement:** OAuth 2.0 flow can be added as an alternative authentication method:

- Users choose between "OAuth" or "App Password" during registration
- OAuth: Redirect to provider, obtain tokens, store encrypted tokens in profile
- App Password: Enter password directly (current implementation)

## Testing Strategy

1. **Unit Tests**
   - Test OAuth flow handlers
   - Test email parsing and formatting
   - Test encryption/decryption utilities

2. **Integration Tests**
   - Test IMAP/SMTP connections with test accounts
   - Test API integrations with provider sandboxs
   - Test token refresh mechanisms

3. **End-to-End Tests**
   - Test complete email send/receive flows
   - Test multi-account management
   - Test sync operations

## Implementation Phases

### Phase 1: Core Infrastructure ✅ COMPLETED

- ✅ Set up React frontend with Material-UI
- ✅ Implement user registration with email service configuration
- ✅ Create profile management forms
- ✅ Implement basic authentication framework (AuthContext)
- ✅ Auto-populate IMAP/SMTP settings for Gmail, Outlook, Yahoo
- ✅ Support custom IMAP/SMTP configuration
- 🔄 Set up backend server with Express (TODO)
- 🔄 Implement database models (TODO)
- 🔄 Implement credential encryption (TODO)

### Phase 2: Direct IMAP/SMTP Integration

- Implement IMAP connection using user credentials
- Implement SMTP sending using user credentials
- Test with Gmail/Outlook app passwords
- Test with Yahoo Mail
- Test with custom IMAP/SMTP servers
- Implement connection testing endpoint
- Handle authentication errors gracefully

### Phase 3: Email Operations

- List mailboxes/folders via IMAP
- Fetch and display emails
- Compose and send emails via SMTP
- Implement reply and forward functionality
- Mark emails as read/unread
- Move emails between folders
- Delete emails

### Phase 4: Optional OAuth 2.0 Enhancement

- Implement Gmail OAuth flow (if app credentials configured)
- Set up Gmail API integration
- Implement Outlook OAuth flow (if app credentials configured)
- Set up Microsoft Graph API integration
- Add OAuth vs App Password selection in UI
- Test email send/receive operations via APIs

### Phase 5: ProtonMail Integration

- Implement ProtonMail Bridge detection and configuration
- Test IMAP/SMTP via Bridge
- Create user documentation for Bridge setup

### Phase 6: Optimization & Polish

- Implement caching strategies
- Add background sync workers
- Implement push notifications (for OAuth providers)
- Performance optimization
- Add multi-account support
- Implement search functionality
