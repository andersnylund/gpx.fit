import { readFile } from 'fs/promises';
import { parseGpx } from './strava-parser';
import { ZodError } from 'zod';

let xmlContent: string;

beforeAll(async () => {
  xmlContent = await readFile('src/test/strava-test.xml', 'utf-8');
});

describe('Strava parser', () => {
  it('should fail if no gpx data', () => {
    expect(() => parseGpx(`<?xml version="1.0" encoding="UTF-8" standalone="no"?>`)).toThrowError(
      new ZodError([
        {
          code: 'invalid_type',
          expected: 'object',
          received: 'undefined',
          path: ['gpx'],
          message: 'Required',
        },
      ])
    );
  });

  it('should parse empty gpx file', () => {
    expect(parseGpx(`<?xml version="1.0" encoding="UTF-8" standalone="no"?><gpx></gpx>`).toObject())
      .toMatchInlineSnapshot(`
      {
        "attributes": {
          "creator": "fabulator:gpx-builder",
          "version": "1.1",
          "xmlns": "http://www.topografix.com/GPX/1/1",
          "xmlns:gpxtpx": "http://www.garmin.com/xmlschemas/TrackPointExtension/v1",
          "xmlns:gpxx": "http://www.garmin.com/xmlschemas/GpxExtensions/v3",
          "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
          "xsi:schemaLocation": "http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd http://www.garmin.com/xmlschemas/TrackPointExtension/v1 http://www.garmin.com/xmlschemas/TrackPointExtensionv1.xsd http://www.garmin.com/xmlschemas/GpxExtensions/v3 http://www.garmin.com/xmlschemas/GpxExtensionsv3.xsd",
        },
      }
    `);
  });

  it('should parse a Strava activity', () => {
    const result = parseGpx(xmlContent);
    expect(result.toObject()).toMatchInlineSnapshot(`
      {
        "attributes": {
          "creator": "fabulator:gpx-builder",
          "version": "1.1",
          "xmlns": "http://www.topografix.com/GPX/1/1",
          "xmlns:gpxtpx": "http://www.garmin.com/xmlschemas/TrackPointExtension/v1",
          "xmlns:gpxx": "http://www.garmin.com/xmlschemas/GpxExtensions/v3",
          "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
          "xsi:schemaLocation": "http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd http://www.garmin.com/xmlschemas/TrackPointExtension/v1 http://www.garmin.com/xmlschemas/TrackPointExtensionv1.xsd http://www.garmin.com/xmlschemas/GpxExtensions/v3 http://www.garmin.com/xmlschemas/GpxExtensionsv3.xsd",
        },
        "rte": [
          {
            "name": "My Route",
            "rtept": [
              {
                "attributes": {
                  "lat": 37.123456,
                  "lon": -122.123456,
                },
                "desc": "The starting point",
                "ele": 100,
                "name": "Start",
                "sym": "Flag, Red",
                "time": 2023-04-06T12:34:56.000Z,
                "type": "Waypoint",
              },
              {
                "attributes": {
                  "lat": 37.123457,
                  "lon": -122.123457,
                },
                "desc": "A scenic viewpoint",
                "ele": 110,
                "name": "Checkpoint 1",
                "sym": "Waypoint, Green",
                "time": 2023-04-06T12:35:00.000Z,
                "type": "Waypoint",
              },
            ],
          },
        ],
        "trk": [
          {
            "name": "My Ride",
            "trkseg": [
              {
                "trkpt": [
                  {
                    "attributes": {
                      "lat": 37.123456,
                      "lon": -122.123456,
                    },
                    "ele": 100,
                    "extensions": {
                      "gpxtpx:TrackPointExtension": {
                        "gpxtpx:hr": 160,
                      },
                    },
                    "time": 2023-04-06T12:34:56.000Z,
                  },
                  {
                    "attributes": {
                      "lat": 37.123457,
                      "lon": -122.123457,
                    },
                    "ele": 110,
                    "extensions": {
                      "gpxtpx:TrackPointExtension": {
                        "gpxtpx:hr": 165,
                      },
                    },
                    "time": 2023-04-06T12:35:00.000Z,
                  },
                ],
              },
            ],
          },
        ],
        "wpt": [
          {
            "attributes": {
              "lat": 37.123456,
              "lon": -122.123456,
            },
            "desc": "The starting point",
            "name": "Start",
            "sym": "Flag, Red",
          },
          {
            "attributes": {
              "lat": 37.123457,
              "lon": -122.123457,
            },
            "desc": "A scenic viewpoint",
            "name": "Checkpoint 1",
            "sym": "Waypoint, Green",
          },
          {
            "attributes": {
              "lat": 37.123458,
              "lon": -122.123458,
            },
            "desc": "A rest stop with snacks",
            "name": "Checkpoint 2",
            "sym": "Waypoint, Blue",
          },
          {
            "attributes": {
              "lat": 37.123459,
              "lon": -122.123459,
            },
            "desc": "The end of the activity",
            "name": "Finish",
            "sym": "Flag, Finish",
          },
        ],
      }
    `);
  });
});
