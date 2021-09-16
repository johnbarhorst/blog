import { motion, PanInfo } from 'framer-motion';
import { ReactElement, useState, useRef } from 'react';
import style from './AnimatedDial.module.css';

interface CenterArgs {
  offsetTop: number,
  offsetLeft: number,
  clientWidth: number,
  clientHeight: number
}

interface GetAngleArgs {
  centerX: number,
  centerY: number,
  oldX: number,
  oldY: number,
  mouseX: number,
  mouseY: number
}


function getElementCenter({ offsetTop, offsetLeft, clientWidth, clientHeight }: CenterArgs) {
  const centerX = offsetLeft + clientWidth / 2;
  const centerY = offsetTop + clientHeight / 2;
  return {
    centerX,
    centerY
  };
}

function getAngle({  centerX, centerY, oldX, oldY, mouseX, mouseY }: GetAngleArgs){
  const x1 = oldX - centerX;
  const y1 = oldY - centerY;
  const x2 = mouseX - centerX;
  const y2 = mouseY - centerY;
  const d1 = Math.sqrt(x1 * x1 + y1 * y1);
  const d2 = Math.sqrt(x2 * x2 + y2 * y2);

  return Math.asin((x1 / d1) * (y2 / d2) - (y1 / d1) * (x2 / d2));
}

export function AnimatedDial():ReactElement {
  const [value, setValue] = useState(0);
  const dialRef = useRef<HTMLDivElement>(null);

  function onPan(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo):void {
    const {
      offsetTop,
      offsetLeft,
      clientWidth,
      clientHeight, 
    } = dialRef.current;
    const { centerX, centerY } = getElementCenter({ offsetTop, offsetLeft, clientWidth, clientHeight });
    const oldX = info.point.x - info.delta.x;
    const oldY = info.point.y - info.delta.y;
    const mouseX = info.point.x;
    const mouseY = info.point.y;
    // 1 = clockwise, -1 = counter clockwise, 0 = no movement (but mouse is still down and event is firing)
    const direction = Math.sign(getAngle({ centerX, centerY, oldX, oldY, mouseX, mouseY }));

    if(direction > 0) {
      setValue(prev => prev + 1);
    }
    if(direction < 0) {
      setValue(prev => prev - 1);
    }
    
  }


  return (
    <motion.div
      ref={dialRef}
      className={style.dial}
      onPan={onPan}  
    >
      <motion.div
        className={style.innerDial}
      >
        {value}
      </motion.div>
    </motion.div>
  );
}