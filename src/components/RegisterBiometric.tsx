'use client';

import React from 'react';
import { registerPasskey } from '../hooks/createPasskey';

export default function RegisterBiometric() {
  const handleRegisterPasskey = async () => {
    const result = await registerPasskey();
    if (result) {
      alert("Passkey created successfully" + result);
    }
  };

  return (
    <div className="p-[10px]">
      {/* <h1 className="text-xl font-bold mb-4">Login Page</h1> */}
      <button
        onClick={handleRegisterPasskey}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Register with Passkey
      </button>
    </div>
  );
}
