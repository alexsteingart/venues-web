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
        <InfoWindow anchor={marker} onClose={handleClose}>
          <div className='text-black'>
            <h3 className='text-lg text-blue-600'>
              <a
                  href={`https://www.google.com/maps/place/?q=${venue.place_id}`}
                  target='_blank'
              >
                {venue.venue_name}
              </a>
            </h3>
            <p className='mb-1'>
              {venue.description}
            </p>
            <p>
              source:&nbsp;
              {venue.site}&nbsp;
              <a
                  href={venue.site_url}
                  className='text-blue-600'
                  target='_blank'>
                {venue.site_title}
              </a>
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
        apiKey={gapi_key}>
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
