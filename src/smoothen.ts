import { produce } from 'immer';
import { equals, uniqWith } from 'remeda';
import { getDistanceBetweenTwoPoints } from './distance';
import { Coordinate } from './features/route';

export const smoothen = (route: Coordinate[], threshold: number): Coordinate[] => {
  const result = recursively([], route, threshold);
  const lastPoint = route[route.length - 1];
  return uniqWith([...result, ...(lastPoint ? [lastPoint] : [])], equals);
};

function toEntries<T>(a: T[]) {
  return a.map((value, index) => [value, index] as const);
}

const recursively = (previouslySmoothened: Coordinate[], remainder: Coordinate[], threshold: number): Coordinate[] => {
  const firstPoint = remainder[0];
  if (!firstPoint) return previouslySmoothened;

  const arrayToCheck = produce(remainder, (draftRoute) => {
    draftRoute.splice(0, 1);
  });

  let newSmoothened: Coordinate[] = [];

  for (const [point, index] of toEntries(arrayToCheck)) {
    if (getDistanceBetweenTwoPoints(firstPoint, point) > threshold) {
      const toContinueFrom = arrayToCheck.slice(index);
      newSmoothened = recursively(previouslySmoothened, toContinueFrom, threshold);
      break;
    }
  }

  return [...previouslySmoothened, firstPoint, ...newSmoothened];
};
