import React, { useState, useCallback, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Map, { Source, Layer, Popup } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZmVydXphLWlldmEiLCJhIjoiY20wY3BpZDRlMDR2MzJtcXY1OWFueHRtNSJ9.a05yE1r4-I2Z1gCFvIOymA'; // Your Mapbox token
const TILESET_ID = 'feruza-ieva.cm0dr8ulo4m7d1unrtr6xtslf-7vd1x'; 
function App() {
  const [popupInfo, setPopupInfo] = useState(null);
  const [tableData, setTableData] = useState([]);

  const onHover = useCallback((event) => {
    const { features, lngLat } = event;
    const hoveredFeature = features && features[0];
    if (hoveredFeature) {
      setPopupInfo({
        longitude: lngLat.lng,
        latitude: lngLat.lat,
        name: hoveredFeature.properties.name,
        place_name: hoveredFeature.properties.place_name,
        website: hoveredFeature.properties.website,
      });
    } else {
      setPopupInfo(null);
    }
  }, []);

  useEffect(() => {
    const mockData = [
      { name: 'Cafe 1', place_name: 'Location 1', website: 'https://example.com' },
      { name: 'Cafe 2', place_name: 'Location 2', website: 'https://example.com' },
      { name: 'Cafe 3', place_name: 'Location 3', website: 'https://example.com' },
    ];
    setTableData(mockData);
  }, []);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {}
      <header style={{ padding: '20px', background: '#f4f4f4', textAlign: 'center' }}>
        <h1>🐈 Cat Cafes across the globe in just one interactive map 🐈‍⬛</h1>
      </header>

      <div style={{ flex: 1, display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <Map
            initialViewState={{
              latitude: 37.8,
              longitude: -122.4,
              zoom: 3 
            }}
            style={{ width: '100%', height: '100%' }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken={MAPBOX_TOKEN}
            projection="globe"  
            interactiveLayerIds={['catcafes-layer']} 
            onMouseMove={onHover} 
          >
            <Source id="catcafes-dataset" type="vector" url={`mapbox://${TILESET_ID}`}>
              <Layer
                id="catcafes-layer"
                type="circle"
                source="catcafes-dataset"
                source-layer="catcafes" 
                paint={{
                  'circle-radius': 6,
                  'circle-color': '#FF0000', 
                  'circle-opacity': 0.8
                }}
              />
            </Source>

            {popupInfo && (
              <Popup
                longitude={popupInfo.longitude}
                latitude={popupInfo.latitude}
                closeButton={false}
                anchor="top"
              >
                <div>
                  <strong>{popupInfo.name}</strong><br />
                  {popupInfo.place_name}<br />
                  {popupInfo.website && (
                    <div>
                      <a href={popupInfo.website} target="_blank" rel="noopener noreferrer">
                        Website
                      </a>
                    </div>
                  )}
                </div>
              </Popup>
            )}
          </Map>
        </div>

        {/* Right side for the table */}
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
          <h2>Dataset Points</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Location</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Website</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{item.name}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{item.place_name}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>
                    <a href={item.website} target="_blank" rel="noopener noreferrer">
                      {item.website}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const root = createRoot(document.body.appendChild(document.createElement('div')));
root.render(<App />);
