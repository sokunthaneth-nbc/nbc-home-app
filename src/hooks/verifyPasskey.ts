export async function verifyPasskey() {

    // 1. Call your backend to get a login challenge for the user
    // const { challenge } = await getLoginChallengeFromBackend();
    const challenge = new Uint8Array([1, 2, 3, 4]); // mock up response

  const publicKeyRequestOptions: PublicKeyCredentialRequestOptions = {
    challenge,
    timeout: 60000,
    userVerification: 'preferred',
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
