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

### OAuth 2.0 Flow

Most modern email providers require OAuth 2.0 for third-party applications. The flow works as follows:

1. **Authorization Request**: Redirect user to provider's authorization page
2. **User Consent**: User grants permission to Quicksilver
3. **Authorization Code**: Provider redirects back with authorization code
4. **Token Exchange**: Server exchanges code for access and refresh tokens
5. **Token Storage**: Securely store tokens in the database
6. **Token Refresh**: Automatically refresh access tokens when they expire

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

Store email account configurations:

```javascript
{
  userId: ObjectId,
  provider: String, // 'gmail', 'outlook', 'protonmail'
  email: String,
  authType: String, // 'oauth2', 'app_password', 'bridge'
  credentials: {
    accessToken: String,      // Encrypted
    refreshToken: String,     // Encrypted
    tokenExpiry: Date,
    clientId: String,
    clientSecret: String      // Encrypted
  },
  imapConfig: {
    host: String,
    port: Number,
    secure: Boolean
  },
  smtpConfig: {
    host: String,
    port: Number,
    secure: Boolean
  },
  lastSync: Date,
  status: String // 'active', 'token_expired', 'error'
}
```

### API Endpoints

```javascript
// Authentication
POST   /auth/:provider/initiate      // Start OAuth flow
GET    /auth/:provider/callback      // OAuth callback
POST   /auth/:provider/disconnect    // Disconnect account

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

### Environment Variables

```env
# Gmail
GMAIL_CLIENT_ID=your_client_id
GMAIL_CLIENT_SECRET=your_client_secret
GMAIL_REDIRECT_URI=https://yourdomain.com/auth/gmail/callback

# Outlook
OUTLOOK_CLIENT_ID=your_client_id
OUTLOOK_CLIENT_SECRET=your_client_secret
OUTLOOK_REDIRECT_URI=https://yourdomain.com/auth/outlook/callback

# Application
ENCRYPTION_KEY=your_32_byte_encryption_key
SESSION_SECRET=your_session_secret
DATABASE_URL=mongodb://localhost:27017/quicksilver

# Server
PORT=3001
NODE_ENV=production
```

### Provider Registration URLs

- **Gmail**: [https://console.cloud.google.com](https://console.cloud.google.com)
- **Outlook**: [https://portal.azure.com](https://portal.azure.com)
- **ProtonMail**: [https://protonmail.com/bridge](https://protonmail.com/bridge)

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

### Phase 1: Core Infrastructure

- Set up backend server with Express
- Implement database models
- Create basic authentication framework

### Phase 2: Gmail Integration

- Implement Gmail OAuth flow
- Set up Gmail API integration
- Test email send/receive operations

### Phase 3: Outlook Integration

- Implement Microsoft Graph authentication
- Set up Graph API integration
- Test with both personal and organizational accounts

### Phase 4: ProtonMail Integration

- Implement Bridge detection and configuration
- Test IMAP/SMTP via Bridge
- Create user documentation

### Phase 5: Optimization & Polish

- Implement caching strategies
- Add background sync workers
- Implement push notifications
- Performance optimization

## Troubleshooting Common Issues

### Gmail

- **Issue**: "Less secure app access" error
  - **Solution**: Use OAuth 2.0, not password authentication
  
- **Issue**: Rate limiting errors
  - **Solution**: Implement exponential backoff and request batching

### Outlook

- **Issue**: Token expiration
  - **Solution**: Implement automatic token refresh using refresh tokens
  
- **Issue**: Tenant-specific endpoints
  - **Solution**: Use `/common` endpoint for multi-tenant support

### ProtonMail

- **Issue**: Bridge not detected
  - **Solution**: Provide clear setup instructions and diagnostics
  
- **Issue**: Connection refused
  - **Solution**: Verify Bridge is running and ports are correct
