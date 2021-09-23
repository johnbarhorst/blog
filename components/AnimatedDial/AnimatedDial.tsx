import { motion, PanInfo, Variants } from 'framer-motion';
import { useElementCenter } from 'hooks/useElementCenter';
import { ReactElement, useState, ReactNode } from 'react';
import style from './AnimatedDial.module.css';

interface Props {
  sensitivity?: number,
  handleClockwise: () => void,
  handleCounterClockwise: () => void,
  children?: ReactNode 
}

interface GetAngleArgs {
  centerX: number,
  centerY: number,
  lastX: number,
  lastY: number,
  mouseX: number,
  mouseY: number
}

function getAngle({  centerX, centerY, lastX, lastY, mouseX, mouseY }: GetAngleArgs){
  const x1 = lastX - centerX;
  const y1 = lastY - centerY;
  const x2 = mouseX - centerX;
  const y2 = mouseY - centerY;
  const d1 = Math.sqrt(x1 * x1 + y1 * y1);
  const d2 = Math.sqrt(x2 * x2 + y2 * y2);

  return Math.asin((x1 / d1) * (y2 / d2) - (y1 / d1) * (x2 / d2));
}


export function AnimatedDial({
  // roughly 6.6 sensitivity would be one full rotation
  sensitivity= .75,
  handleClockwise,
  handleCounterClockwise,
  children
}: Props):ReactElement {
  const [cumulativeDistance, setCumulativeDistance] = useState(0);
  const [lastDirection, setLastDirection] = useState(0);
  const [centerX, centerY, centerRef] = useElementCenter<HTMLDivElement>();
  // const dialRef = useRef<HTMLDivElement>(null);


  function onPan(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo):void {
    const lastX = info.point.x - info.delta.x;
    const lastY = info.point.y - info.delta.y;
    const mouseX = info.point.x;
    const mouseY = info.point.y;
    
    const angle = getAngle({ centerX, centerY, lastX, lastY, mouseX, mouseY });
    // 1 = clockwise, -1 = counter clockwise, 0 = no movement (but mouse is still down and event is firing)
    const direction = Math.sign(angle);

    if(direction === 0) return;

    if(direction !== lastDirection) {
      setCumulativeDistance(0);
      return setLastDirection(direction);
    }

    if(cumulativeDistance > sensitivity) {
      setCumulativeDistance(0);
      return direction > 0 ? handleClockwise() : handleCounterClockwise();
    }

    setCumulativeDistance(prev => prev + Math.abs(angle));
  }


  return (
    <motion.div
      ref={centerRef}
      className={style.dial}
      onPan={onPan}
      variants={variants}
      animate='animate'
    >
      {children}
    </motion.div>
  );
}

const variants: Variants = {
  animate: rotation => ({
    rotate: rotation
  })
};