import { produce } from 'immer';
import { equals, uniqWith } from 'remeda';
import { getDistanceBetweenTwoPoints } from './distance';
import { Coordinate } from './features/route';

export const smoothen = (route: Coordinate[], treshold: number) => {
  const result = recursively([], route, treshold);
  const lastPoint = route[route.length - 1];
  return uniqWith([...result, ...(lastPoint ? [lastPoint] : [])], equals);
};

function toEntries<T>(a: T[]) {
  return a.map((value, index) => [value, index] as const);
}

const recursively = (previouslySmoothened: Coordinate[], remainder: Coordinate[], treshold: number): Coordinate[] => {
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
