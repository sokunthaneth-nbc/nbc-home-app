import { registerPasskey } from "@/hooks/createPasskey";
import { checkPasskeySilent } from "@/hooks/verifyPasskey";
import { useLayoutEffect, useState } from "react";

export default function RegisterBiometric() {
  const [enabled, setEnabled] = useState(false);

  useLayoutEffect(() => {
    const saved = localStorage.getItem("biometric-enabled");
    if (saved === "true") {
      setEnabled(true);
    }
  }, []);

  const handleToggle = async () => {
    const newValue = !enabled;
    setEnabled(newValue);
    localStorage.setItem("biometric-enabled", newValue.toString());

    if (newValue) {
      await registerPasskey();
    }
  };
  
  return (
    <label className="inline-flex items-center cursor-pointer relative">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={enabled}
        onChange={handleToggle}
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-400 peer-checked:bg-blue-600"></div>
    </label>
  );

  
};
