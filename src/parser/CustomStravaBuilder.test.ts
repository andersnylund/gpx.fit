import { Metadata } from 'gpx-builder/dist/builder/BaseBuilder/models';
import CustomerStravaBuilder from './CustomStravaBuilder';

describe('CustomStravaBuilder', () => {
  it('should build object', () => {
    const builder = new CustomerStravaBuilder();
    builder.setMetadata(new Metadata({ name: 'test' }));
    expect(builder.toObject()).toEqual({
      attributes: {
        creator: 'fabulator:gpx-builder',
        version: '1.1',
        xmlns: 'http://www.topografix.com/GPX/1/1',
        'xmlns:gpxtpx': 'http://www.garmin.com/xmlschemas/TrackPointExtension/v1',
        'xmlns:gpxx': 'http://www.garmin.com/xmlschemas/GpxExtensions/v3',
        'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
        'xsi:schemaLocation':
          'http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd http://www.garmin.com/xmlschemas/TrackPointExtension/v1 http://www.garmin.com/xmlschemas/TrackPointExtensionv1.xsd http://www.garmin.com/xmlschemas/GpxExtensions/v3 http://www.garmin.com/xmlschemas/GpxExtensionsv3.xsd',
      },
      metadata: {
        name: 'test',
      },
    });
  });
});
