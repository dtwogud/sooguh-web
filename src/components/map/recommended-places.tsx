import React, { useContext, useState } from "react";
import { cva } from "class-variance-authority";
import { MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import CoordsContext from "@/src/context/coords.context";
import Modal from "@/src/components/modal/modal";
import useModal from "@/src/hooks/useModal";

export interface RecommendedPlacesProps {
  data: kakao.maps.services.PlacesSearchResult;
}

const RecommendedPlaces = ({ data }: RecommendedPlacesProps) => {
  const { openModal, onModalOpen, onModalClose } = useModal();
  const [clickedData, setClickedData] = useState<{
    id: string;
    x: string;
    y: string;
    place_name: string;
    address_name: string;
    road_address_name: string;
  }>({
    id: "",
    x: "",
    y: "",
    place_name: "",
    address_name: "",
    road_address_name: "",
  });
  const { dispatch } = useContext(CoordsContext);

  const setStartCoords = () => {
    dispatch({
      type: "UPDATE_COORDS",
      payload: {
        coords: {
          latitude: Number(clickedData.y),
          longitude: Number(clickedData.x),
        },
      },
    });
    onModalClose();
  };

  const onRecommendedPlaceMouseOver = (
    item: kakao.maps.services.PlacesSearchResultItem,
  ) => {
    setClickedData({
      id: item.id,
      x: item.x,
      y: item.y,
      place_name: item.place_name,
      address_name: item.address_name,
      road_address_name: item.road_address_name,
    });
  };

  const onMarkerMouseClick = (
    e: kakao.maps.Marker,
    item: kakao.maps.services.PlacesSearchResultItem,
  ) => {
    setClickedData({
      id: item.id,
      x: item.x,
      y: item.y,
      place_name: item.place_name,
      address_name: item.address_name,
      road_address_name: item.road_address_name,
    });
    onModalOpen();
  };

  const onRecommendedPlaceClicked = (
    id: string,
    x: string,
    y: string,
    place_name: string,
    address_name: string,
    road_address_name: string,
  ) => {
    setClickedData({
      id: id,
      x: x,
      y: y,
      place_name: place_name,
      address_name: address_name,
      road_address_name: road_address_name,
    });
    onModalOpen();
  };

  return (
    <>
      <div className={wrapper()}>
        {data.map((item) => (
          <div
            className={place({ active: clickedData.id === item.id })}
            key={`${item.id}-${item.x}-${item.y}`}
            onMouseOver={() => onRecommendedPlaceMouseOver(item)}
            onClick={() =>
              onRecommendedPlaceClicked(
                item.id,
                item.x,
                item.y,
                item.place_name,
                item.road_address_name,
                item.address_name,
              )
            }
          >
            <p>{item.place_name}</p>
            <p>{item.road_address_name}</p>
            <p>지번: {item.address_name}</p>
          </div>
        ))}
      </div>
      <MarkerClusterer
        averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        minLevel={5} // 클러스터 할 최소 지도 레벨
      >
        {data.map((item) => (
          <MapMarker
            key={`${item.x}-${item.y}`}
            position={{
              lat: Number(item.y),
              lng: Number(item.x),
            }}
            onClick={(marker) => onMarkerMouseClick(marker, item)}
            image={
              item.id === clickedData.id
                ? {
                    src: "/assets/icons/marker.png",
                    size: { width: 41, height: 64 },
                  }
                : {
                    src: "/assets/icons/marker.png",
                    size: { width: 20, height: 32 },
                  }
            }
          />
        ))}
      </MarkerClusterer>
      {/*TODO modal 컴포넌트 분리*/}
      <Modal isOpen={openModal} onClose={onModalClose}>
        <Modal.Content
          className={
            "bg-[white] text-[black] fixed top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[12px]"
          }
        >
          <div className={"px-[12px] my-[24px]"}>
            해당 장소를 출발지로 설정하시겠습니까?
          </div>
          <div className={"grid gap-[4px] px-[12px] my-[24px]"}>
            <p>{clickedData.place_name}</p>
            <p>{clickedData.road_address_name}</p>
            <p>지번: {clickedData.address_name}</p>
          </div>
          <div className={"bg-[white] text-[black] grid grid-cols-2"}>
            <button
              type={"button"}
              onClick={setStartCoords}
              title={"확인"}
              className={"bg-[yellowgreen] p-[12px]"}
            >
              확인
            </button>
            <button onClick={onModalClose}>취소</button>
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default RecommendedPlaces;

const wrapper = cva([
  "bg-white lg:rounded-[8px]",
  "lg:px-[12px] lg:py-[8px]",
  "lg:h-[80vh] sm:h-[200px]",
  "overflow-scroll",
  "lg:absolute",
]);

const place = cva(
  [
    "p-[8px]",
    "even:border-t-[1px]",
    "even:border-b-[1px]",
    "grid",
    "lg:gap-[8px] sm:gap-[4px]",
    "hover:bg-[--color-key-color-alpha-80] hover:cursor-pointer",
    "hover:scale-[1.02] transition-transform duration-300 ease-in-out",
  ],
  {
    variants: {
      active: {
        true: "bg-[--color-key-color-alpha-80]",
        false: "bg-white",
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);
