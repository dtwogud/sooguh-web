import React, { useContext } from "react";
import { cva } from "class-variance-authority";
import { useMap } from "react-kakao-maps-sdk";
import CoordsContext from "@/src/context/coords.context";
import Image from "next/image";

export interface NavBarProps {
  setLinePath: (linePath: any) => void;
  linePath: boolean;
}

const NavBar = ({ setLinePath, linePath }: NavBarProps) => {
  const map = useMap();
  const {
    state: { coords },
  } = useContext(CoordsContext);

  const handleResetPath = () => {
    if (linePath && window.confirm("경로 안내를 취소하시겠습니까?")) {
      setLinePath([]);
    } else {
      window.alert("안내 중인 길이 없습니다.");
    }
  };

  const handleToCurCoords = () => {
    const moveLatLon = new kakao.maps.LatLng(
      coords!.latitude!,
      coords!.longitude!,
    );
    map.setCenter(moveLatLon);
  };

  return (
    <div className={wrapper()}>
      <button className={button()} onClick={handleToCurCoords}>
        <Image
          src={"/assets/icons/target.jpeg"}
          width={28}
          height={28}
          alt="current position icon"
        />
      </button>
      <button className={button()} onClick={handleResetPath}>
        <Image
          src={"/assets/icons/reset.png"}
          width={28}
          height={28}
          alt="reset icon"
        />
      </button>
    </div>
  );
};

export default NavBar;

const wrapper = cva([
  "z-[80]",
  "-translate-x-1/2 -translate-y-1/2",
  "grid",
  "gap-[2px]",
  "items-center",
  "fixed bottom-[60px] right-0",
  "lg:ml-[30%]",
  "text-[16px]",
  "font-[500]",
  "leading-[20px]",
  "p-[8px]",
  "rounded-[12px]",
  "border-[2px]",
  "border-key-color",
  "bg-[white]",
  "lg:mt-[12px] sm:mt-[8px]",
]);

const button = cva(["even:border-t-[1px]", "flex", "py-[2px]"]);
