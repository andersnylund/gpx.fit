import { equals } from 'remeda';
import { getDistanceBetweenTwoPoints } from './distance';
import { Coordinate } from './features/route';

export const smoothen = (route: Coordinate[], threshold: number) => {
  const stack: Coordinate[] = [];
  const firstPoint = route[0];
  if (firstPoint) {
    stack.push(firstPoint);
  }

  for (let i = 1; i < route.length; i++) {
    const point = route[i];
    const lastPoint = stack[stack.length - 1];
    if (point && lastPoint && getDistanceBetweenTwoPoints(lastPoint, point) > threshold) {
      stack.push(point);
    }
  }

  // Add the last coordinate if it's not already in the stack
  const lastPoint = route[route.length - 1];
  if (lastPoint && !equals(lastPoint, stack[stack.length - 1])) {
    stack.push(lastPoint);
  }

  return stack;
};
