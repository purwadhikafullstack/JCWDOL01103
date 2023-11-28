const { OAuth2Client } = require("google-auth-library");

async function verifyToken(token) {
  const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  const client = new OAuth2Client(CLIENT_ID);
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userid = payload["sub"];
    return payload
  } catch (error) {
    return null
  }
}

module.exports = verifyToken;
