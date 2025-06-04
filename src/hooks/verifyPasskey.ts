export async function verifyPasskey() {

    // 1. Call your backend to get a login challenge for the user
    // const { challenge } = await getLoginChallengeFromBackend();
    const challenge = new Uint8Array([1, 2, 3, 4]); // mock up response

  const publicKeyRequestOptions: PublicKeyCredentialRequestOptions = {
    challenge, // From your server, base64url decoded to Uint8Array
    timeout: 60000,
    userVerification: "preferred",
    allowCredentials: [],
  };

  try {
    // 2. Prompt user to use fingerprint or face (this shows system prompt)
    const assertion = await navigator.credentials.get({
      publicKey: publicKeyRequestOptions,
    });

    console.log("Login assertion:", assertion);

    // 3. all api to verify this assertion
    // const result = await verifyAssertionWithBackend(assertion);
    const mockBackendResponse = {
      success: true,
      userId: "user123",
      token: "mock-jwt-token-abc123",
    };

    if (mockBackendResponse.success) {
      console.log("Login successful!");
      return "Login successful!"
    } else {
      console.log("Login failed!");
    }
  } catch (err) {
    console.error("Error during login:", err);
  }
}

// export async function getPasskeyOnDeice() {
//   const challenge = new Uint8Array([1, 2, 3, 4]);
//   const publicKeyRequestOptions: PublicKeyCredentialRequestOptions = {
//     challenge,
//     timeout: 60000,
//     userVerification: "preferred",
//     allowCredentials: [],
//   };

//   try {
//     const assertion = await navigator.credentials.get({
//       publicKey: publicKeyRequestOptions,
//       mediation: "silent",
//     });
//     console.log("getPasskeyOnDeice" + assertion);
//     return assertion;
//   } catch (err) {
//     console.error("Error during login:", err);
//   }
// }


export async function checkPasskeySilent() {
  const credentialIdBase64 = localStorage.getItem("passkeyCredentialId");
  if (!credentialIdBase64) return false;

  const credentialId = Uint8Array.from(atob(credentialIdBase64), c => c.charCodeAt(0)).buffer;

  try {
    const result = await navigator.credentials.get({
      publicKey: {
        challenge: new Uint8Array([1, 2, 3, 4]), // You can use a real challenge from backend
        allowCredentials: [{ id: credentialId, type: "public-key" }],
        userVerification: "preferred",
      },
      mediation: "silent",
    });

    return !!result;
  } catch (e) {
    // console.log("Silent check failed:", e.name);
    return false;
  }
}
