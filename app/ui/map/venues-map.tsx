'use client';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef
} from '@vis.gl/react-google-maps';
import { useState, useCallback } from 'react';

const MarkerWithInfoWindow = ({ venue }) => {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoWindowShown, setInfoWindowShown] = useState(false);

  const handleMarkerClick = useCallback(
    () => setInfoWindowShown(isShown => !isShown),
    []
  );

  const handleClose = useCallback(() => setInfoWindowShown(false), []);

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={{lat: venue.lat, lng: venue.lng}}
        title={venue.venue_name}
        onClick={handleMarkerClick}
      />
      {infoWindowShown && (
        <InfoWindow anchor={marker}>
          <div className='text-black'>
            <h3>{venue.venue_name}</h3>
            <p>
              {venue.description}
            </p>
          </div>
        </InfoWindow>
      )}
    </>
  )
}

export default function VenuesMap({ gapi_key, gmap_id, venues }) {
  return (
    <APIProvider
        apiKey={gapi_key}
        onLoad={() => console.log('Maps API has loaded.')}>
      <Map
        mapId={gmap_id}
         defaultZoom={13}
         defaultCenter={ { lat: 40.727094, lng: -73.946729 } }>
         {venues.map( (venue, index) => (
            <MarkerWithInfoWindow
              key={index}
              venue={venue}
            />
         ))}
      </Map>
    </APIProvider>
  )
}
