import React, { useContext } from "react";
import { cva } from "class-variance-authority";
import { ICoordsState } from "@/src/hooks/useCoords";
import { useMap } from "react-kakao-maps-sdk";
import CoordsContext from "@/src/context/coords.context";

export interface NavBarProps {
  setLinePath: (linePath: any) => void;
}

const NavBar = ({ setLinePath }: NavBarProps) => {
  const map = useMap();
  const {
    state: { coords },
  } = useContext(CoordsContext);

  const handleResetPath = () => {
    setLinePath([]);
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
      <button onClick={handleToCurCoords}>현위치</button>
      &nbsp; &nbsp;
      <button onClick={handleResetPath}>| &nbsp;초기화</button>
    </div>
  );
};

export default NavBar;

const wrapper = cva([
  "z-[80]",
  "absolute",
  "flex items-center",
  "fixed sm:inset-x-[8px] lg:inset-x-[16px] lg:top-[12px] sm:top-[8px]",
  "lg:ml-[30%]",
  "text-[16px]",
  "font-[500]",
  "leading-[20px]",
  "h-[50px]",
  "sm:p-[8px] lg:p-[16px]",
  "rounded-[12px]",
  "border-[2px]",
  "border-key-color",
  "bg-[white]",
  "lg:mt-[12px] sm:mt-[8px]",
]);
