import { GarminBuilder, StravaBuilder } from 'gpx-builder';
import { GPXBuildData, Track, TrackSegment, WayPoint } from 'gpx-builder/dist/types';

const { Bounds, Copyright, Link, Metadata, Person, Point: StravaPoint, Route, Segment, Track } = StravaBuilder.MODELS;

export default class CustomStravaBuilder extends GarminBuilder {
  static MODELS: {
    Point: typeof StravaPoint;
    Bounds: typeof Bounds;
    Link: typeof Link;
    Copyright: typeof Copyright;
    Person: typeof Person;
    Metadata: typeof Metadata;
    Route: typeof Route;
    Track: typeof Track;
    Segment: typeof Segment;
  };

  /**
   * Object that can be used to build XML file.
   *
   * @returns {GPXBuildData}
   */
  public toObject(): StravaGPXBuildData {
    return {
      ...this.data,
      attributes: {
        creator: 'fabulator:gpx-builder',
        version: '1.1',
        xmlns: 'http://www.topografix.com/GPX/1/1',
        'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
        'xsi:schemaLocation': this.schemaLocation.join(' '),
        ...this.data.attributes,
      },
    };
  }
}

export interface StravaGPXBuildData extends GPXBuildData {
  trk?: (Omit<Track, 'trkseg'> & {
    trkseg?: (Omit<TrackSegment, 'trkpt'> & {
      trkpt: (WayPoint & {
        extensions?: {
          'gpxtpx:TrackPointExtension'?: {
            'gpxtpx:hr'?: number;
          };
        };
      })[];
    })[];
  })[];
}
