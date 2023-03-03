import { Button } from '@mui/joy';
import { BaseBuilder, buildGPX } from 'gpx-builder';
import produce from 'immer';
import { equals } from 'remeda';
import { useAppSelector } from '~/hooks';

const { Point } = BaseBuilder.MODELS;

const downloadFile = (file: File) => {
  // Create a link and set the URL using `createObjectURL`
  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = URL.createObjectURL(file);
  link.download = file.name;

  // It needs to be added to the DOM so it can be clicked
  document.body.appendChild(link);
  link.click();

  // To make this work on Firefox we need to wait
  // a little while before removing it.
  setTimeout(() => {
    URL.revokeObjectURL(link.href);
    link.parentNode?.removeChild(link);
  }, 0);
};

export const ExportButton = () => {
  const { route, selectedRoute, smoothenedRoute } = useAppSelector((state) => state.routes);

  const onExport = () => {
    if (route && selectedRoute && smoothenedRoute) {
      const firstSelectedPoint = selectedRoute.at(0);
      const lastSelectedPoint = selectedRoute.at(selectedRoute.length - 1);

      const startIndex = route.findIndex((point) => equals(point, firstSelectedPoint));
      const endIndex = route.findIndex((point) => equals(point, lastSelectedPoint));

      const startPart = produce(route, (draft) => draft.slice(0, startIndex));
      const endPart = produce(route, (draft) => draft.slice(endIndex, route.length - 1));

      const final = [...startPart, ...smoothenedRoute, ...endPart].map(
        ({ elevation, latitude, longitude, timestamp }) =>
          new Point(latitude, longitude, { ele: elevation, time: new Date(timestamp) })
      );

      const gpxData = new BaseBuilder();
      gpxData.setSegmentPoints(final);

      const file = new File([buildGPX(gpxData.toObject())], 'smoothened.gpx');
      downloadFile(file);
    }
  };

  return (
    <Button variant="soft" onClick={onExport}>
      Export
    </Button>
  );
};
