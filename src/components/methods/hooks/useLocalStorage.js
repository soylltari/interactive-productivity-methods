import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    let currentValue;
    try {
      if (window === "undefined") return initialValue;

      const item = window.localStorage.getItem(key);
      currentValue = JSON.parse(item) || initialValue;
    } catch (error) {
      console.log(error);
      currentValue = initialValue;
    }
    return currentValue;
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      if (window !== "undefined")
        return window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.log(error);
        }
      }
    };
    if (window !== "undefined") {
      window.addEventListener("storage", handleStorageChange);
      return window.removeEventListener("storage", handleStorageChange);
    }
  }, [key]);
  return [storedValue, setValue];
}
