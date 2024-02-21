/**
 * Decodes a JWT token and returns the payload as JavaScript object.
 * @param {string} token - The JWT token to be decoded.
 * @returns {object|null} - The payload decoded as a JavaScript object or null if an error occurred.
 */
export default function decodeJWTToken(token: string): object | null {
  try {
    const base64Payload = token.split(".")[1];
    const decodedPayload = atob(base64Payload);

    const decodedPayloadUTF8 = decodeURIComponent(
      Array.prototype.map
        .call(decodedPayload, function (char) {
          return "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    const payloadObject = JSON.parse(decodedPayloadUTF8);

    return payloadObject;
  } catch (error) {
    console.error("Error decoding JWT token:", error);
    return null;
  }
}
