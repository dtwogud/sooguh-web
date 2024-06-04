"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Map as KakaoMap,
  MapMarker,
  useKakaoLoader,
} from "react-kakao-maps-sdk";
import useCoords, { ICoordsState } from "@/src/hooks/useCoords";

export interface DetailData {
  id: number;
  dong: string;
  address: string;
  lat: number;
  lon: number;
}

const dummyData = {
  info: [
    {
      id: 1,
      dong: "송파구",
      address: "서울특별시 송파구 가락로7길 21",
      lat: 37.5018105,
      lon: 127.1027394,
    },
    {
      id: 2,
      dong: "송파구",
      address: "서울특별시 송파구 가락로11길 26",
      lat: 37.5027584,
      lon: 127.1048724,
    },
  ],
};

const Map = () => {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_APP_KEY!,
  });
  const curCoords = useCoords("waring");
  const [coords, setCoords] = useState<ICoordsState>(curCoords);

  useEffect(() => {
    if (curCoords) setCoords(curCoords);
  }, [curCoords]);

  const handleOnBoundsChange = useCallback((data: kakao.maps.Map) => {
    console.log("data", data);
  }, []);

  const handleMarkerClick = (marker: kakao.maps.Marker, data: DetailData) => {
    console.log("marker", marker);
    console.log("data", data);
  };

  return (
    <>
      <div className="w-[100%] h-[90vh]">
        <KakaoMap
          center={{
            lat: coords.latitude ?? 37.5664056,
            lng: coords.longitude ?? 126.9778222,
          }}
          className={"w-[100%] h-[100%]"}
          level={3}
          onBoundsChanged={(data) => handleOnBoundsChange(data)}
        >
          {dummyData.info.map((data) => {
            return (
              <MapMarker
                key={`${data.lat}-${data.lon}`}
                position={{ lat: data.lat, lng: data.lon }}
                onClick={(marker) => handleMarkerClick(marker, data)}
              />
            );
          })}
        </KakaoMap>
      </div>
    </>
  );
};

export default Map;
