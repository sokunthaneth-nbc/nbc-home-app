'use client';

import React from 'react';
import { verifyPasskey } from '../hooks/verifyPasskey';
import { useRouter } from "next/navigation";

export default function LoginBiometric() {
	const router = useRouter();

  const handleVerifyPasskey = async () => {
    const result = await verifyPasskey();
    if (result) {
      alert("Login successfully!");
      router.push("/home");
    }
  };

  return (
    <div className="p-[10px]">
      {/* <h1 className="text-xl font-bold mb-4">Login Page</h1> */}
      <button
        onClick={handleVerifyPasskey}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Login with biometric
      </button>
    </div>
  );
}
