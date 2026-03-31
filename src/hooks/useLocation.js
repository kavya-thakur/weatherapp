import { useEffect, useState } from "react";

export const useLocation = () => {
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setError("Location permission denied");
        setLoading(false);
      },
    );
  }, []);

  return { coords, error, loading };
};
