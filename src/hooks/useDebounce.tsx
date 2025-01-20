import { useState, useEffect } from "react";

const useDebounce = (searchValue: string, delay: number) => {
  const [tempValue, setTempValue] = useState("");
  let a;

  useEffect(() => {
    a = setTimeout(() => {
      setTempValue(searchValue);
    }, delay);

    return () => {
      clearTimeout(a);
    };
  }, [searchValue]);

  return { debouncedValue: tempValue };
};

export default useDebounce;
