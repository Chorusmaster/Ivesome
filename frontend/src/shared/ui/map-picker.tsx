import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

export type Location = {
  latitude: number;
  longitude: number;
};

function LocationPicker({
  onSelect,
  location,
}: {
  onSelect: (location: Location) => void;
  location: Location | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.setView(
        [location.latitude, location.longitude],
        Math.max(map.getZoom(), 8),
      );
    }
  }, [location, map]);

  useMapEvents({
    click(event) {
      onSelect({
        latitude: event.latlng.lat,
        longitude: event.latlng.lng,
      });
    },
  });

  return location ? (
    <Marker position={[location.latitude, location.longitude]} />
  ) : null;
}

export interface MapPickerProps {
  location: Location | null;
  setLocation: (location: Location) => void;
}

export default function MapPicker({ location, setLocation }: MapPickerProps) {
  return (
    <div>
      <MapContainer
        center={[0, 0]}
        zoom={1}
        style={{ height: 400, width: "100%", zIndex: 40 }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationPicker onSelect={setLocation} location={location} />
      </MapContainer>
    </div>
  );
}