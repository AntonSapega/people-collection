import { useEffect, useState } from "react";

export default function useOutsideAlerter(ref) {
  const [isOutsideClick, setOutsideClick] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOutsideClick(true);
      } else setOutsideClick(false);
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return isOutsideClick;
}