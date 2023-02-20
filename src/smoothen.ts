import { Coordinate } from './features/route';
import { produce } from 'immer';
import { getDistanceBetweenTwoPoints } from './distance';

export const smoothen = (route: Coordinate[], treshold: number) => {
  const result = recursively([], route, treshold);
  const lastPoint = route[route.length - 1];
  return [...result, ...(lastPoint ? [lastPoint] : [])];
};

function toEntries<T>(a: T[]) {
  return a.map((value, index) => [value, index] as const);
}

const recursively = (previouslySmoothened: Coordinate[], remainder: Coordinate[], treshold: number): Coordinate[] => {
  if (remainder.length === 0) {
    return previouslySmoothened;
  }

  const firstPoint = remainder[0];
  if (!firstPoint) return previouslySmoothened;

  const arrayToCheck = produce(remainder, (draftRoute) => {
    draftRoute.splice(0, 1);
  });

  let newSmoothened: Coordinate[] = [];

  for (const [point, index] of toEntries(arrayToCheck)) {
    if (getDistanceBetweenTwoPoints(firstPoint, point) > treshold) {
      const toContinueFrom = arrayToCheck.slice(index);
      newSmoothened = recursively(previouslySmoothened, toContinueFrom, treshold);
      break;
    }
  }

  return [...previouslySmoothened, firstPoint, ...newSmoothened];
};
