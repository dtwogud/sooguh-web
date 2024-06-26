import React, { useContext } from "react";
import Modal from "@/src/components/modal/modal";
import { DetailData } from "@/src/components/map/map";
import { Polyline } from "react-kakao-maps-sdk";
import CoordsContext from "@/src/context/coords.context";

export interface PinModalProps {
  data?: DetailData;
  openModal: boolean;
  onModalClose: () => void;
  linePath: any[];
  setLinePath: (linePath: () => { lng: any; lat: any }[]) => void;
}

const PinModal = ({
  data,
  openModal,
  onModalClose,
  linePath,
  setLinePath,
}: PinModalProps) => {
  const kakaoUrl = "https://apis-navi.kakaomobility.com/v1/directions";
  const headers = {
    Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY!}`,
    "Content-Type": "application/json",
  };
  const {
    state: { coords },
  } = useContext(CoordsContext);

  const handleToNavigate = async () => {
    const queryParams = new URLSearchParams({
      origin: `${coords?.longitude!},${coords?.latitude!}`,
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
              linePath.map((item: any) => {
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
            "bg-[white] text-[black] fixed top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[12px]"
          }
        >
          <div
            className={
              "sm:px-[12px] lg:px-[24px] sm:pt-[12px] lg:pt-[24px] sm:gap-[8px] lg:gap-[12px] whitespace-nowrap"
            }
          >
            <div>{data?.dong}</div>
            <div className={"mb-[12px]"}>{data?.address}</div>
          </div>
          <div className={"bg-[white] text-[black] grid grid-cols-2"}>
            <button
              onClick={handleToNavigate}
              className={"bg-[yellowgreen] p-[12px]"}
            >
              길 안내 받기
            </button>
            <button onClick={onModalClose} className={"p-[12px]"}>
              확인
            </button>
          </div>
        </Modal.Content>
      </Modal>
      {linePath && (
        <Polyline
          path={[linePath]}
          strokeWeight={5} // 선의 두께
          strokeColor={"#fc0202"} // 선의 색
          strokeOpacity={1} // 선의 불투명
          strokeStyle={"solid"} // 선의 스타일
        />
      )}
    </>
  );
};

export default PinModal;
