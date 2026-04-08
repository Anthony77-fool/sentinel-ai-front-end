import { useEffect, useState } from "react";
import { Map, MapControls, useMap, MapMarker } from "./ui/map"; // Added MapMarker

function ClickListener({ onLocationSelect }) {
  const { map, isLoaded } = useMap();

  useEffect(() => {
    // Debug log to see if the map is actually loading
    if (!map || !isLoaded) {
      console.log("Waiting for map to load...");
      return;
    }

    // console.log("Map is fully loaded! Click anywhere.");

    const handleMapClick = (e) => {
      const coords = { lat: e.lngLat.lat, lng: e.lngLat.lng };
      console.log("MapLibre caught a click!", coords);
      if (onLocationSelect) onLocationSelect(coords);
    };

    map.on("click", handleMapClick);
    return () => map.off("click", handleMapClick);
  }, [map, isLoaded, onLocationSelect]);

  return null;
}

export function MapControlsExample({ onLocationSelect }) {
  // Store the clicked coordinates so we can draw the pin
  const [markerPos, setMarkerPos] = useState(null);

  const handleLocationSelect = (coords) => {
    setMarkerPos(coords); // Update the visual pin
    if (onLocationSelect) onLocationSelect(coords); // Send data to MapCDN
  };

  return (
    <div className="h-[400px] w-full">
      {/* Centered on the Philippines */}
      <Map center={[120.9842, 14.5995]} zoom={5}>
        
        <ClickListener onLocationSelect={handleLocationSelect} />

        {/* If the user clicked, draw the marker! */}
        {markerPos && (
          <MapMarker longitude={markerPos.lng} latitude={markerPos.lat} />
        )}

        <MapControls position="bottom-right" showZoom showLocate />
      </Map>
    </div>
  );
}