import React, { ChangeEvent, useEffect, useState } from "react";
import { useMap } from "react-kakao-maps-sdk";

const SearchAddressBar = () => {
  const [info, setInfo] = useState<string>("");
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    // if (info) {
    console.log("info", info);
    ps.keywordSearch("석촌", (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];

        for (let i = 0; i < data.length; i++) {
          // @ts-ignore
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
          });
          // @ts-ignore
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    });
    // }
  }, [map]);

  const handleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    const keyword = e.target.value;
    if (keyword) setInfo(keyword);
  };

  return (
    <>
      주소 검색 :
      <input onChange={handleSearchKeyword} />
    </>
  );
};

export default SearchAddressBar;