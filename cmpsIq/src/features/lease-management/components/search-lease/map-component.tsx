import {styled} from '@mui/material/styles';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {useEffect, useRef, useState} from 'react';
mapboxgl.accessToken = "pk.eyJ1IjoibGlua2xvZ2lzdGljcyIsImEiOiJjbDI1OTIxYTIyMXF3M2RtaWF4MXFkeDk1In0.YHsTHxbIXloF6C_PwMrjgQ";
// mapboxgl.accessToken = "";

const LatLongDiv = styled('div')(({theme}) => ({
  backgroundColor: 'rgba(35, 55, 75, 0.9)',
  color: '#fff',
  padding: '6px 12px',
  display: 'flex',
  fontFamily: 'monospace',
  zIndex: 10000,
  top: 0,
  left: 0,
  marginBottom: '-5px',
  borderRadius: '4px',
}));
type Props = {latitude?: number; longitude?: number};
const MapComponent = ({latitude, longitude}: Props) => {
  const mapNode = useRef(null);
  const [map, setMap] = useState<mapboxgl.Map>();
  const [lng, setLng] = useState<number>(longitude || -70.9);
  const [lat, setLat] = useState<number>(latitude || 42.35);
  const [zoom, setZoom] = useState<number>(10);

  useEffect(() => {
    const node = mapNode.current;
    // if the window object is not found, that means
    // the component is rendered on the server
    // or the dom node is not initialized, then return early
    if (typeof window === 'undefined' || node === null) return;

    const mapboxMap = new mapboxgl.Map({
      container: node,
      // accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });
    setMap(mapboxMap);
    mapboxMap.on('move', () => {
      setLng(mapboxMap.getCenter().lng || 0);
      setLat(mapboxMap.getCenter().lat);
      setZoom(mapboxMap.getZoom());
    });
    return () => {
      mapboxMap.remove();
    };
  }, []);

  return (
    <>
      {/* <LatLongDiv>
        Longitude: {lng.toFixed(2)} | Latitude: {lat.toFixed(2)} | Zoom: {zoom.toFixed(2)}
      </LatLongDiv> */}
      <div ref={mapNode} style={{flex: '1'}} />
    </>
  );
};

export  {MapComponent};
