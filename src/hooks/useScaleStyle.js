import { useEffect, useState } from "react";

export default function useScaleStyle(ref) {
  const [isScaling, setScaling] = useState(false);

  const on = () => setScaling(true);
  const off = () => setScaling(false);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const node = ref.current;
    node.addEventListener('mouseenter', on);
    node.addEventListener('mousemove', on);
    node.addEventListener('mouseleave', off);

    return function() {
      node.removeEventListener('mouseenter', on);
      node.removeEventListener('mousemove', on);
      node.removeEventListener('mouseleave', off);
    }
  }, []);

  return isScaling ? {transform: 'scale(1.01)', transition: 'transform 140ms ease'} : '';
}