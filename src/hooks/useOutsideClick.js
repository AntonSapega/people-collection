import { useEffect, useState } from "react";

export default function useOutsideAlerter(ref) {
  const [isOutsideClick, setOutsideClick] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOutsideClick(true);
      } else setOutsideClick(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return isOutsideClick;
}