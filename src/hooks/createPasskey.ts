export const defaultUser = {
    id: "1234",
    name: "user@example.com",
    displayName: "User Example",
  };
  
  // this function to call api to getChallenge by userId or staffId
  export async function getChallengeFromBackend() {
    return {
      challenge: new Uint8Array([1, 2, 3, 4]), // simulate challenge from backend
      user: defaultUser,
    };
  }
  
  export async function registerPasskey() {
    const { challenge, user } = await getChallengeFromBackend();
  
    const publicKeyOptions: PublicKeyCredentialCreationOptions = {
      challenge,
      rp: { name: 'Your App Name' },
      user: {
        id: new TextEncoder().encode(user.id),
        name: user.name,
        displayName: user.displayName,
      },
      pubKeyCredParams: [
        { type: "public-key", alg: -7 }, // ES256
        { type: "public-key", alg: -257 }, // RS256
      ],
      timeout: 60000,
      authenticatorSelection: {
        authenticatorAttachment: "platform",
        residentKey: "required",
        userVerification: "preferred",
      },
      attestation: "none",
    };
  
    try {
      const credential = await navigator.credentials.create({
        publicKey: publicKeyOptions,
      });
  
      // console.log("Passkey credential created:", credential);
      // call api send passkey credential created
      //   await registerCredentialToBackend(credential);
      
      // if (credential) {
      //   const publicKeyCredential = credential as PublicKeyCredential;
      //   const rawId = publicKeyCredential.rawId;
      //   const base64Id = btoa(String.fromCharCode(...new Uint8Array(rawId)));
      //   localStorage.setItem("credentialId", base64Id);
      // }
      return credential;

      
    } catch (err) {
      console.error("Error creating credential:", err);
      return null;
    }
  }

//   async function registerCredentialToBackend(credential: any) {
//     const response = await fetch("/api/webauthn/register", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         id: credential.id,
//         rawId: arrayBufferToBase64(credential.rawId),
//         type: credential.type,
//         response: {
//           clientDataJSON: arrayBufferToBase64(credential.response.clientDataJSON),
//           attestationObject: arrayBufferToBase64(credential.response.attestationObject),
//         },
//       }),
//     });
  
//     const result = await response.json();
//     console.log("Backend registration result:", result);
//   }


  