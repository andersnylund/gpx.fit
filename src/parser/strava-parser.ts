import { StravaBuilder } from 'gpx-builder';
import { create } from 'xmlbuilder2';
import { z } from 'zod';
import CustomStravaBuilder from './CustomStravaBuilder';

const { Point, Route, Segment, Track, Link } = StravaBuilder.MODELS;

const trackPoint = z.object({
  '@lat': z.string(),
  '@lon': z.string(),
  ele: z.string().optional(),
  time: z.string().optional(),
  desc: z.string().optional(),
  name: z.string().optional(),
  sym: z.string().optional(),
  type: z.string().optional(),
  fix: z.string().optional(),
  cmt: z.string().optional(),
  src: z.string().optional(),
  dgpsid: z.string().optional(),
  ageofdgpsdata: z.string().optional(),
  hdop: z.string().optional(),
  sat: z.string().optional(),
  pdop: z.string().optional(),
  magvar: z.string().optional(),
  vdop: z.string().optional(),
  geoidheight: z.string().optional(),
  link: z
    .object({
      '@href': z.string(),
    })
    .optional(),
  extensions: z
    .object({
      'gpxtpx:TrackPointExtension': z
        .object({
          'gpxtpx:hr': z.string().optional(),
        })
        .optional(),
      'strava:activity_id': z.string().optional(),
      'strava:activity_type': z.string().optional(),
    })
    .optional(),
});

const segmentSchema = z.object({
  trkpt: z.array(trackPoint),
});
type Segment = z.infer<typeof segmentSchema>;

const routeSchema = z.object({
  name: z.string(),
  rtept: z.array(trackPoint),
});
type Route = z.infer<typeof routeSchema>;

const getArrayOrNothing = <T>(source: T | T[]): T[] | undefined => {
  if (Array.isArray(source)) {
    return source;
  }
  if (source) {
    return [source];
  }
  return undefined;
};

const getPoints = (source: unknown) => {
  const points = trackPoint.or(z.array(trackPoint)).optional().parse(source);

  const array = getArrayOrNothing(points)?.filter(Boolean);

  return (
    array?.map((item) => {
      const hr = item?.extensions?.['gpxtpx:TrackPointExtension']?.['gpxtpx:hr'];

      return new Point(Number(item['@lat']), Number(item['@lon']), {
        ele: item.ele ? Number(item.ele) : undefined,
        time: item.time ? new Date(item.time) : undefined,
        name: item.name,
        sym: item.sym,
        type: item.type,
        hr: hr ? Number(hr) : undefined,
        /* c8 ignore start */
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
        /* c8 ignore stop */
      });
    }) || []
  );
};

const getRoutes = (source: unknown) => {
  const routes = routeSchema.or(z.array(routeSchema).optional()).parse(source);

  const result = getArrayOrNothing(routes);
  if (result) {
    return result?.filter(Boolean).map((item) => {
      return new Route({
        name: item.name,
        rtept: getPoints(item.rtept),
      });
    });
  }
};

const getSegments = (source: unknown) => {
  const segments = segmentSchema.or(z.array(segmentSchema)).optional().parse(source);

  const result = getArrayOrNothing(segments);
  if (result) {
    return result?.filter(Boolean).map((item) => {
      return new Segment(getPoints(item.trkpt));
    });
  }
};

const getTracks = (source: unknown) => {
  const trackSchema = z
    .object({
      name: z.string(),
      trkseg: segmentSchema.or(z.array(segmentSchema)),
    })
    .optional();
  const tracks = trackSchema.or(z.array(trackSchema)).optional().parse(source);

  const result = getArrayOrNothing(tracks);

  if (result) {
    return result.map((item) => {
      return new Track(getSegments(item?.trkseg), {
        name: item?.name,
      });
    });
  }
};

export const parseGpx = (gpx: string): CustomStravaBuilder => {
  const parsed = z
    .object({
      gpx: z.object({
        rte: z.unknown(),
        wpt: z.unknown(),
        trk: z.unknown(),
      }),
    })
    .parse(create(gpx).toObject());

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
