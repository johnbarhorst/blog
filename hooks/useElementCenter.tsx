import { RefObject, useEffect, useRef, useState } from 'react';

interface CenterArgs {
  offsetTop: number,
  offsetLeft: number,
  clientWidth: number,
  clientHeight: number
}

type UseElementCenterType<T extends HTMLElement> = [number, number, RefObject<T>]


function getElementCenter({ offsetTop, offsetLeft, clientWidth, clientHeight }: CenterArgs) {
  const centerX = offsetLeft + clientWidth / 2;
  const centerY = offsetTop + clientHeight / 2;
  return {
    centerX,
    centerY
  };
}


export function useElementCenter<T extends HTMLElement>(): UseElementCenterType<T> {
  const [centerX, setCenterX] = useState(0);
  const [centerY, setCenterY] = useState(0);
  const centerRef = useRef<T>(null);
  
  // Need useEffect here to account for initiating the ref as null.
  useEffect(() => {
    if(centerRef.current) {
      const {
        offsetTop,
        offsetLeft,
        clientWidth,
        clientHeight, 
      } = centerRef.current;
      const { centerX, centerY } = getElementCenter({ offsetTop, offsetLeft, clientWidth, clientHeight });
      setCenterX(centerX);
      setCenterY(centerY);
    }
  });
  
  return [ centerX, centerY, centerRef ];
}