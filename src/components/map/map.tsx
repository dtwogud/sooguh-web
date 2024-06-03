"use client";
import React from "react";
import {
  Map as KakaoMap,
  MapMarker,
  useKakaoLoader,
} from "react-kakao-maps-sdk";

const Map = () => {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_APP_KEY!,
  });

  return (
    <>
      <div className="w-[100%] h-[100vh]">
        test map
        <KakaoMap
          center={{ lat: 37.45857097793072, lng: 126.89738261529611 }}
          className={"w-[100%] h-[100%]"}
        >
          <MapMarker
            position={{ lat: 37.45857097793072, lng: 126.89738261529611 }}
          >
            <div className={"test"} style={{ backgroundColor: "pink" }}>
              test
            </div>
          </MapMarker>
          {/* TODO marker cluster 처리  <MarkerClusterer
        averageCenter={true}
        minLevel={10}
      >
        {clusterPositionsData.positions.map((pos) => (
          <MapMarker
            key={`${pos.lat}-${pos.lng}`}
            position={pos}
          />
        ))}
      </MarkerClusterer>*/}
        </KakaoMap>
      </div>
    </>
  );
};

export default Map;
