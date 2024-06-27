"use client";
import React, { useEffect, useState } from "react";
import {
  Map as KakaoMap,
  MapMarker,
  useKakaoLoader,
} from "react-kakao-maps-sdk";
import useCoords, { ICoordsState } from "@/src/hooks/useCoords";
import SearchAddressBar from "@/src/components/map/search-address-bar";
import useModal from "@/src/hooks/useModal";
import PinModal from "@/src/components/main/pin-modal";
import NavBar from "@/src/components/nav-bar/nav-bar";
import { BASIC_COORDS } from "@/src/constants/basic-coords";
import Warning from "../common/warning";
import Toast from "@/src/components/map/toast";
import PrimaryButton from "@/src/components/button/primary-button";
import Image from "next/image";
import LatLng = kakao.maps.LatLng;
import CurrentMarker from "@/src/components/map/current-marker";

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
  const [loading] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_APP_KEY!,
    libraries: ["clusterer", "drawing", "services"],
  });
  const curCoords = useCoords("waring");
  const [coords, setCoords] = useState<ICoordsState>(curCoords);
  const [changedCoords, setChangedCoords] = useState<LatLng | ICoordsState>(
    curCoords,
  );
  const [linePath, setLinePath] = useState<any[]>([]);
  const [isDragged, setIsDragged] = useState(false);
  const [detailData, setDetailData] = useState<DetailData | undefined>(
    undefined,
  );
  const { openModal, onModalOpen, onModalClose } = useModal();

  useEffect(() => {
    if (curCoords) {
      setCoords(curCoords);
    }
  }, [curCoords]);

  const handleOnDragEnd = (data: kakao.maps.Map) => {
    setChangedCoords(data.getCenter());
    setIsDragged(true);
  };

  const handleMarkerClick = (marker: kakao.maps.Marker, data: DetailData) => {
    onModalOpen();
    setDetailData(data);
    console.log("marker", marker);
  };

  const handleRefreshData = () => {
    console.log("changedCoords", changedCoords);
    setIsDragged(false);
  };

  return (
    <>
      {loading ? (
        <div className={"flex h-[100%] items-center"}>Loading...</div>
      ) : (
        <div className="w-[100%] z-10 relative">
          <KakaoMap
            center={{
              lat: coords.latitude ?? BASIC_COORDS.latitude,
              lng: coords.longitude ?? BASIC_COORDS.longitude,
            }}
            className={"w-[100%] h-[100%]"}
            level={3}
            onDragEnd={(data) => handleOnDragEnd(data)}
          >
            <SearchAddressBar />
            <NavBar setLinePath={setLinePath} linePath={!!linePath.length} />
            {isDragged && (
              <Toast
                message={
                  <PrimaryButton
                    title={"현 지도에서 수거함 검색"}
                    icon={
                      <Image
                        src={"/assets/icons/refresh.png"}
                        width={16}
                        height={16}
                        alt={"현 지도에서 수거함 검색"}
                      />
                    }
                    onClick={handleRefreshData}
                    className={"px-[12px] py-[8px]"}
                  />
                }
              />
            )}
            {curCoords.latitude === BASIC_COORDS.latitude && (
              <Warning message={"현재 위치와 다를 수 있습니다!"} />
            )}

            <CurrentMarker />

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
        </div>
      )}
    </>
  );
};

export default Map;
