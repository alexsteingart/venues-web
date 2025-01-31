'use client';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef
} from '@vis.gl/react-google-maps';
import { useState, useCallback } from 'react';
import { kebabCase } from 'lodash';


const MarkerWithInfoWindow = (
  { venue, visible }: Readonly<{ venue: Record<string, any>, visible: boolean }>
) => {
  if(!venue.lat || !venue.lng) return;

  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoWindowShown, setInfoWindowShown] = useState(false);

  const handleMarkerClick = useCallback(
    () => setInfoWindowShown(isShown => !isShown),
    []
  );

  const handleClose = useCallback(() => setInfoWindowShown(false), []);

  return (
    <>
      {visible && <AdvancedMarker
        ref={markerRef}
        position={{lat: venue.lat, lng: venue.lng}}
        title={venue.venue_name}
        onClick={handleMarkerClick}
      />}
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
                  href={`${venue.site_url}/${kebabCase(venue.venue_name)}`}
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

export default function VenuesMap({
  gapi_key,
  gmap_id,
  venues
}: Readonly<{
  gapi_key: string | undefined,
  gmap_id: string | undefined,
  venues: Record<string, any>[]
}>) {

  const siteSet = new Set()
  venues.forEach((venue) => {
    siteSet.add(venue.site)
  })
  const [sites, setSites] = useState(siteSet)

  return (
    <APIProvider
        apiKey={gapi_key || ''}>
      <Map
        mapId={gmap_id}
         defaultZoom={13}
         defaultCenter={ { lat: 40.727094, lng: -73.946729 } }>
         {venues.map( (venue, index) => (
             <MarkerWithInfoWindow
                key={index}
                venue={venue}
                visible={sites.has(venue.site)}
              />
         ))}
      </Map>
      <div className='fixed left-0 top-0 bg-white p-2'>
        {Array.from(siteSet).sort().map((site, index) => (
          <div key={index}>
            <input
              type='checkbox'
              name='sites'
              value={site}
              onChange={(e) => {
                const newSites = new Set(sites)
                if(e.target.checked) {
                  newSites.add(e.target.value)
                } else {
                  newSites.delete(e.target.value)
                }
                setSites(newSites)
              }}
              defaultChecked='true' />
            &nbsp;
            {site}
          </div>
        ))}
      </div>
    </APIProvider>
  )
}
