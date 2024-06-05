import { useCallback, useEffect, useState } from "react";

export interface ICoordsState {
  latitude: number | null;
  longitude: number | null;
}

const useCoords = (warningText: string) => {
  const [coords, setCoords] = useState<ICoordsState>({
    latitude: null,
    longitude: null,
  });

  // 위치 허용 시 실행
  const onSuccess = useCallback(
    ({ coords: { latitude, longitude } }: GeolocationPosition) =>
      setCoords({ latitude, longitude }),
    [],
  );

  // 위치 미허용 시 실행
  const onFailure = useCallback(
    (error: GeolocationPositionError) =>
      console.log(`${warningText} >> ${error}`),
    [warningText],
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess, onFailure);
  }, [onSuccess, onFailure]);

  return coords;
};

export default useCoords;
