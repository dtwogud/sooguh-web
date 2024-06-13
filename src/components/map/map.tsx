"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Map as KakaoMap,
  MapMarker,
  useKakaoLoader,
} from "react-kakao-maps-sdk";
import useCoords, { ICoordsState } from "@/src/hooks/useCoords";
import SearchAddressBar from "@/src/components/map/search-address-bar";
import useModal from "@/src/hooks/useModal";
import PinModal from "@/src/components/main/pin-modal";
import useResize from "@/src/hooks/useResize";
import NavBar from "@/src/components/nav-bar/nav-bar";
import CoordsContext from "@/src/context/coords.context";

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
    libraries: ["clusterer", "drawing", "services"],
  });
  const curCoords = useCoords("waring");
  const [coord, setCoord] = useState<ICoordsState>(curCoords);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [linePath, setLinePath] = useState<any[]>([]);
  const [detailData, setDetailData] = useState<DetailData | undefined>(
    undefined,
  );
  const { openModal, onModalOpen, onModalClose } = useModal();

  // TODO coords context 사용
  const {
    state: { coords },
  } = useContext(CoordsContext);
  console.log("coords", coords);

  useResize(() => {
    if (window.innerWidth > 640) setIsMobile(false);
    else if (window.innerWidth < 640) setIsMobile(true);
  });

  useEffect(() => {
    if (!curCoords) setIsLoading(true);
    if (curCoords) {
      setCoord(curCoords);
      setIsLoading(false);
    }
  }, [curCoords]);

  const handleOnBoundsChange = useCallback((data: kakao.maps.Map) => {
    console.log("data", data);
  }, []);

  const handleMarkerClick = (marker: kakao.maps.Marker, data: DetailData) => {
    onModalOpen();
    setDetailData(data);
  };

  return (
    <>
      {isLoading ? (
        <div className={"flex h-[100%] items-center"}>Loading...</div>
      ) : (
        <div className="w-[100%] h-[70vh] z-10">
          {coord.latitude && coord.longitude && (
            <KakaoMap
              center={{
                lat: coord.latitude,
                lng: coord.longitude,
              }}
              className={"w-[100%] h-[100%]"}
              level={3}
              //TODO onBoundsChanged={(data) => handleOnBoundsChange(data)}
            >
              <NavBar setLinePath={setLinePath} />
              <SearchAddressBar />
              {coord.latitude && coord.longitude && (
                <MapMarker
                  key={`${coord.latitude ?? 37.5664056}-${coord.longitude ?? 126.9778222}`}
                  position={{
                    lat: coord.latitude,
                    lng: coord.longitude,
                  }}
                  image={{
                    src: "/assets/icons/location.png",
                    size: {
                      width: isMobile ? 32 : 64,
                      height: isMobile ? 32 : 64,
                    },
                  }}
                />
              )}
              {dummyData.info.map((data) => {
                return (
                  <MapMarker
                    key={`${data.lat}-${data.lon}`}
                    position={{ lat: data.lat, lng: data.lon }}
                    onClick={(marker) => handleMarkerClick(marker, data)}
                  />
                );
              })}
              <PinModal
                data={detailData}
                openModal={openModal}
                onModalClose={onModalClose}
                linePath={linePath}
                setLinePath={setLinePath}
              />
            </KakaoMap>
          )}
        </div>
      )}
    </>
  );
};

export default Map;
