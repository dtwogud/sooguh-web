import React, { useState } from "react";
import Modal from "@/src/components/modal/modal";
import { DetailData } from "@/src/components/map/map";
import useCoords from "@/src/hooks/useCoords";
import { Polyline, useMap } from "react-kakao-maps-sdk";

export interface PinModalProps {
  data?: DetailData;
  openModal: boolean;
  onModalClose: () => void;
}

const PinModal = ({ data, openModal, onModalClose }: PinModalProps) => {
  const curCoords = useCoords("waring");
  const kakaoUrl = "https://apis-navi.kakaomobility.com/v1/directions";
  const headers = {
    Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY!}`,
    "Content-Type": "application/json",
  };
  const [linePath, setLinePath] = useState<any[]>();

  const handleToNavigate = async () => {
    const queryParams = new URLSearchParams({
      origin: `${curCoords.longitude},${curCoords.latitude}`,
      destination: `${data?.lon},${data?.lat}`,
    });
    const requestUrl = `${kakaoUrl}?${queryParams}`;

    try {
      const res = await fetch(requestUrl, {
        method: "GET",
        headers: headers,
      });
      if (res) {
        const data = await res.json();
        let linePath: any[] = [];
        if (data) {
          data.routes[0].sections[0].roads.forEach((router: any) => {
            router.vertexes.forEach((vertex: any, index: any) => {
              // x,y 좌표가 우르르 들어옵니다. 그래서 인덱스가 짝수일 때만 linePath에 넣어봅시다.
              // lat이 y이고 lng이 x입니다.
              if (index % 2 === 0) {
                linePath.push(
                  new kakao.maps.LatLng(
                    router.vertexes[index + 1],
                    router.vertexes[index],
                  ),
                );
              }
            });
          });
          if (linePath.length > 0) {
            setLinePath(() =>
              linePath.map((item) => {
                return { lat: item.Ma, lng: item.La };
              }),
            );
          }
        }
      }
    } catch (e) {
      console.log("error", e);
    }
    onModalClose();
  };

  return (
    <>
      <Modal isOpen={openModal} onClose={onModalClose}>
        <Modal.Content
          className={
            "bg-[white] text-[black] fixed top-[40%] left-[50%] border border-[blue] translate-x-[-50%] translate-y-[-50%]"
          }
        >
          <p>{data?.dong}</p>
          <p>{data?.address}</p>
          <p>
            <button onClick={handleToNavigate} className={"border bg-[pink]"}>
              길 안내 받기
            </button>
          </p>
        </Modal.Content>
      </Modal>
      {linePath && (
        <Polyline
          path={[linePath]}
          strokeWeight={5} // 선의 두께 입니다
          strokeColor={"#fc0202"} // 선의 색깔입니다
          strokeOpacity={1} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
          strokeStyle={"solid"} // 선의 스타일입니다
        />
      )}
    </>
  );
};

export default PinModal;
