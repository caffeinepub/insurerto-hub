# InsureRTO Hub

## Current State
- Backend stores inquiries and user profiles with admin auth
- LandingPage has hardcoded contact details (phone, email, address) and a Shield icon as logo
- AdminPage shows inquiries table with login

## Requested Changes (Diff)

### Add
- Backend: `SiteSettings` type storing logoUrl, phone, email, address, businessName
- Backend: `getSiteSettings` (public query) and `saveSiteSettings` (admin-only update)
- Admin panel: "Settings" tab alongside "Inquiries" tab
- Settings tab: form to update phone, email, address, businessName; logo upload via blob-storage or URL input
- LandingPage: fetch site settings and display them dynamically (contact section, footer, navbar brand name)

### Modify
- AdminPage: add tab navigation between Inquiries and Settings
- LandingPage: contact details in footer and contact section read from backend settings

### Remove
- Nothing removed

## Implementation Plan
1. Add `SiteSettings` type and stable var to backend
2. Add `getSiteSettings` public query
3. Add `saveSiteSettings` admin-only update function
4. Regenerate frontend bindings
5. Add Settings tab to AdminPage with form fields
6. LandingPage fetches and renders dynamic contact info
