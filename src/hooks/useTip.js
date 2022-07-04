import { useEffect } from "react";

export default function useTip(ref, text, horizontalShift, parent = null) {
  let tip = null;
  let stillInside = false;

  const on = () => {
    stillInside = true;
    setTimeout(() => {
      tip = document.createElement('div');
      if (!ref.current) return
      const {height: refHeight, top: refTop, bottom: refBottom, left: refLeft, right: refRight} = ref.current.getBoundingClientRect();

      if (parent) {
        const {height: mainHeight, top: mainTop, bottom: mainBottom} = parent?.getBoundingClientRect();
        const pos = refTop >=( mainHeight / 2 + mainTop);

        if (pos) {
          tip.style.top = `${refTop - 10}px`;
          tip.style.left = `${refLeft + horizontalShift}px`;
          tip.style.transform = 'translateY(-100%)';
        } else {
          tip.style.top = `${refHeight + refTop + 10}px`;
          tip.style.left = `${refLeft + horizontalShift}px`;
        }
      } else {
        tip.style.top = `${refTop - 10}px`;
        tip.style.left = `${refLeft + horizontalShift}px`;
        tip.style.transform = 'translateY(-100%)';
      }

      tip.style.position = 'absolute';
      tip.id = 'tip';
      tip.style.zIndex = '1000';
      tip.style.padding = '10px';
      tip.style.borderRadius = '4px';
      tip.style.backgroundColor = '#272727';
      tip.style.color = '#ffffff';
      tip.style.fontSize = '14px';
      tip.innerText = `${text}`;

      if (!document.getElementById('tip') && stillInside) {
        appendNode();
        return
      }
      if (document.getElementById('tip')) {
        document.getElementById('tip').remove();
      }
    }, 1000);
  };

  const off = () => {
    stillInside = false;
    if (tip) {
      tip.remove();
    }
    tip = null;
  };

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const node = ref.current;
    node.addEventListener('mouseenter', on);
    node.addEventListener('mouseleave', off);

    return function() {
      node.removeEventListener('mouseenter', on);
      node.removeEventListener('mouseleave', off);
    }
  });

  function appendNode() {
    ref.current.appendChild(tip);
  }
}