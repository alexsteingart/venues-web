'use client';
import {APIProvider, Map, MapCameraChangedEvent} from '@vis.gl/react-google-maps';

export default function VenuesMap() {
  return (
    <APIProvider
        apiKey={'Google Maps API Key here'}
        onLoad={() => console.log('Maps API has loaded.')}>
      <Map
         defaultZoom={13}
         defaultCenter={ { lat: 40.727094, lng: -73.946729 } }
         onCameraChanged={ (ev: MapCameraChangedEvent) =>
           console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
         }>
      </Map>
    </APIProvider>
  )
}
