import { isArray } from 'remeda';
import { StravaBuilder } from 'gpx-builder';
import { create } from 'xmlbuilder2';
import { z } from 'zod';
import CustomStravaBuilder from './CustomStravaBuilder';

const { Point, Route, Segment, Track, Link } = StravaBuilder.MODELS;

const getArrayOrNothing = <T>(source: T): T[] | undefined => {
  if (Array.isArray(source)) {
    return source;
  }
  if (source) {
    return [source];
  }
  return undefined;
};

const getPoints = (source: any) => {
  return (
    getArrayOrNothing(source)?.map((item) => {
      let hr: number;
      if (isArray(item.extensions)) {
        hr = item?.extensions?.find((extension: any) => extension['gpxtpx:TrackPointExtension'])?.[
          'gpxtpx:TrackPointExtension'
        ]?.['gpxtpx:hr'];
      } else {
        hr = item?.extensions?.['gpxtpx:TrackPointExtension']?.['gpxtpx:hr'];
      }

      return new Point(Number(item['@lat']), Number(item['@lon']), {
        ele: item.ele ? Number(item.ele) : undefined,
        time: item.time ? new Date(item.time) : undefined,
        name: item.name,
        sym: item.sym,
        type: item.type,
        fix: item.fix ? Number(item.fix) : undefined,
        cmt: item.cmt,
        desc: item.desc,
        src: item.src,
        dgpsid: item.dgpsid ? Number(item.dgpsid) : undefined,
        ageofdgpsdata: item.ageofdgpsdata ? Number(item.ageofdgpsdata) : undefined,
        hdop: item.hdop ? Number(item.hdop) : undefined,
        sat: item.sat ? Number(item.sat) : undefined,
        pdop: item.pdop ? Number(item.pdop) : undefined,
        magvar: item.magvar ? Number(item.magvar) : undefined,
        vdop: item.vdop ? Number(item.vdop) : undefined,
        geoidheight: item.geoidheight ? Number(item.geoidheight) : undefined,
        link: item.link ? new Link(item.link['@href']) : undefined,
        hr: hr ? Number(hr) : undefined,
      });
    }) || []
  );
};

const getRoutes = (source: any) => {
  return getArrayOrNothing(source)?.map((item) => {
    return new Route({
      name: item.name,
      rtept: getPoints(item.rtept),
    });
  });
};

const getSegments = (source: any) => {
  return getArrayOrNothing(source)?.map((item) => {
    return new Segment(getPoints(item.trkpt));
  });
};

const getTracks = (source: any) => {
  return getArrayOrNothing(source)?.map((item) => {
    return new Track(getSegments(item.trkseg), {
      name: item.name,
    });
  });
};

export const parseGpx = (gpx: string): CustomStravaBuilder => {
  const parsed = z
    .object({
      gpx: z.object({
        rte: z.any(),
        wpt: z.any(),
        trk: z.any(),
      }),
    })
    .parse(create(gpx).toObject());

  if (!parsed.gpx) {
    throw new Error('Invalid format.');
  }

  const gpxData = new StravaBuilder();

  const routes = getRoutes(parsed.gpx.rte);

  if (routes) {
    gpxData.setRoutes(routes);
  }

  const waypoints = getPoints(parsed.gpx.wpt);

  if (waypoints && waypoints.length) {
    gpxData.setWayPoints(waypoints);
  }

  const tracks = getTracks(parsed.gpx.trk);

  if (tracks) {
    gpxData.setTracks(tracks);
  }

  return gpxData;
};
