# Partnership proposal form

The site currently uses client-side email and WhatsApp composers, not a server-side contact endpoint. The partnership form follows this mechanism.

## Current behaviour

- Validate required fields, email syntax, phone format, optional HTTP(S) website, partnership area, a description of at least 30 characters, and explicit consent.
- Prepare encoded email and WhatsApp links using CONTACT.emailHref and CONTACT.whatsappHref from content/site.js.
- Display confirmation of message preparation only. The visitor must open the chosen application and send the message there.
- Do not report successful delivery, receipt, storage, or management approval.
- Invalidate prepared links when a field changes.
- Keep the form disabled until JavaScript is available. Without JavaScript, show official email and WhatsApp links.
- Do not store proposal data in local storage or send it to an API.

## Spam controls and their limits

A client-side honeypot, field length limits and a five-second interval between preparations discourage simple automated use and repeated clicks. These controls are bypassable; they are not server-side spam protection. The site has no proposal submission endpoint to protect. Sending takes place through the visitor's email or WhatsApp service.

## Automatic collection requires separate configuration

No Netlify Forms integration, SMTP credentials or other submission provider is configured by this change. A future automatic collection flow requires:

1. Configure and verify a real recipient or protected form inbox owned by the relevant company.
2. Implement the provider's supported Next.js integration, with server-side validation and abuse controls.
3. Configure data retention, access permissions and an accurate privacy notice.
4. Test accepted submissions, provider errors and actual receipt in an authorised environment.
5. Show a received/sent confirmation only after the receiving endpoint acknowledges the submission.

Local tests validate the generated recipient links and messages without sending email or WhatsApp messages.
