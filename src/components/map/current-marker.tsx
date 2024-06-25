"use client";

import React, { useEffect } from "react";
import { BASIC_COORDS } from "@/src/constants/basic-coords";
import { MapMarker } from "react-kakao-maps-sdk";
import useCoords, { ICoordsState } from "@/src/hooks/useCoords";

const CurrentMarker = () => {
  const curCoords = useCoords("waring");
  const [coords, setCoords] = React.useState<ICoordsState>();

  const onSuccessDetectCoords = (data: GeolocationPosition) => {
    setCoords({
      latitude: data.coords.latitude,
      longitude: data.coords.longitude,
    });
  };

  const onFailDetectCoords = (error: GeolocationPositionError) => {
    console.error(error, "위치 설정을 허용해 주세요.");
  };

  const detectCoords = () => {
    navigator.geolocation.watchPosition(
      onSuccessDetectCoords,
      onFailDetectCoords,
      { enableHighAccuracy: true, timeout: 5000 },
    );
    console.log("coords", coords);
  };

  useEffect(() => {
    detectCoords();
    if (curCoords) setCoords(curCoords);
  }, [curCoords]);

  if (coords && coords.latitude && coords.longitude) {
    return (
      <MapMarker
        key={`${coords.latitude ?? BASIC_COORDS.latitude}-${coords.longitude ?? BASIC_COORDS.longitude}`}
        position={{
          lat: coords.latitude,
          lng: coords.longitude,
        }}
        image={{
          src: "/assets/icons/location.png",
          size: {
            width: 41,
            height: 64,
          },
        }}
      />
    );
  } else {
    return <></>;
  }
};

export default CurrentMarker;
