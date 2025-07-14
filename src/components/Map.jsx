import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";

import { useEffect, useState } from "react";
import { useCities } from "../context/CitiesContext";
import useGeolocation from "../hooks/UseGeoLocation";

import Button from "./Button";
import UseUrlLocation from "../hooks/UseUrlLocation";

function Map() {
  const { cities } = useCities();

  const [mapPosition, setMapPosition] = useState([40, 0]);

  const [hasInitialPosition, setHasInitialPosition] = useState(false);

  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();

  const { mapLat, mapLng } = UseUrlLocation();

  useEffect(() => {
    if (geoLocationPosition && !hasInitialPosition) {
      setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
      setHasInitialPosition(true);
    }
  }, [geoLocationPosition, hasInitialPosition]);

  useEffect(() => {
    if (mapLat && mapLng && !hasInitialPosition) {
      setMapPosition([mapLat, mapLng]);
      setHasInitialPosition(true);
    }
  }, [mapLat, mapLng, hasInitialPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Laddong..." : "Use your location"}
        </Button>
      )}
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();

  useEffect(() => {
    map.setView(position);
  }, [position, map]);

  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvent({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
