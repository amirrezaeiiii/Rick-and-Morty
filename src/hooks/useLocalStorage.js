import { useEffect, useState } from "react";

export default function useLocalStorage(key, initialState) {
  const [value, setVlaue] = useState(
    () => JSON.parse(localStorage.getItem(key)) || initialState
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setVlaue];
}
