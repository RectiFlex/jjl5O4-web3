export const TemplateInvitationToOrganization = `
<Card.Header>
  <h2>Welcome to web3</h2>
  <hr />
</Card.Header>

<Card.Body>
  <p>You have been invited to join.</p>
  <p>
    <a href="{{ url_invitation }}" target="_blank">Accept Invitation</a>
  </p>
</Card.Body>

<Card.Footer>
  <p>Sent by web3</p>
</Card.Footer>
  `.trim()
