import React from "react";
import { cva } from "class-variance-authority";
import { MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";

export interface RecommendedPlacesProps {
  data: kakao.maps.services.PlacesSearchResult;
}

const RecommendedPlaces = ({ data }: RecommendedPlacesProps) => {
  const onRecommendedPlaceMouseOver = (
    item: kakao.maps.services.PlacesSearchResultItem,
  ) => {
    console.log("item", item);
  };

  const onMarkerMouseOver = (
    e: kakao.maps.Marker,
    item: kakao.maps.services.PlacesSearchResultItem,
  ) => {
    console.log(e, item);
  };

  return (
    <>
      <div className={wrapper()}>
        {data.map((item) => (
          <div
            className={place()}
            key={`${item.id}-${item.x}-${item.y}`}
            onMouseOver={() => onRecommendedPlaceMouseOver(item)}
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
            onClick={(marker) => onMarkerMouseOver(marker, item)}
            image={{
              src: "/assets/icons/marker.png",
              size: { width: 41, height: 64 },
            }}
          />
        ))}
      </MarkerClusterer>
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

const place = cva([
  "p-[8px]",
  "even:border-t-[1px]",
  "even:border-b-[1px]",
  "grid",
  "lg:gap-[8px] sm:gap-[4px]",
  "hover:bg-[--color-key-color-alpha-80] hover:cursor-pointer",
  "hover:scale-[1.02] transition-transform duration-300 ease-in-out",
]);