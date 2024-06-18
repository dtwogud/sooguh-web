import React, { ChangeEvent, useEffect, useState } from "react";
import { useMap } from "react-kakao-maps-sdk";
import { FieldValues, useForm } from "react-hook-form";
import Form from "@/src/components/form/Form";
import FormItem from "@/src/components/form/FormItem";
import TextInput from "@/src/components/input/TextInput";
import { cva } from "class-variance-authority";
import PrimaryButton from "@/src/components/button/primary-button";
import useResize from "@/src/hooks/useResize";

const SearchAddressBar = () => {
  const form = useForm<FieldValues>();
  const [info, setInfo] = useState<string>("");
  const [isMobile, setIsMobile] = useState(false);
  const map = useMap();

  useResize(() => {
    if (window.innerWidth > 640) setIsMobile(false);
    else if (window.innerWidth < 640) setIsMobile(true);
  });

  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    if (info) {
      ps.keywordSearch(info, (data, status, _pagina원tion) => {
        if (status === kakao.maps.services.Status.OK) {
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가
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
          map.panTo(bounds);
        }
      });
    }
  }, [map, info]);

  const handleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    const keyword = e.target.value;
    if (keyword) setInfo(keyword);
  };

  const handleSubmit = (values: any) => {
    if (values) setInfo(values.search);
  };

  return (
    <section className={Wrapper()}>
      <Form form={form} handleSubmit={handleSubmit}>
        <FormItem name={"search"} label={""}>
          <TextInput
            placeHolder={"주소를 검색해 주세요."}
            // rightIcon={
            //   <PrimaryButton
            //     type="submit"
            //     onClick={handleSubmit}
            //     className={"border w-[100px] h-[40px]"}
            //     title={"검색"}
            //   />
            // }
          />
        </FormItem>
      </Form>
    </section>
  );
};

export default SearchAddressBar;

const Wrapper = cva([
  "w-[30%]",
  "sm:w-[100%]",
  "absolute",
  "lg:top-0",
  "z-[81]",
  "mt-[12px]",
  "sm:bottom-[0px]",
  "sm:bg-white",
]);
