import React, { useEffect, useState } from "react";
import { useMap } from "react-kakao-maps-sdk";
import { FieldValues, useForm } from "react-hook-form";
import Form from "@/src/components/form/Form";
import FormItem from "@/src/components/form/FormItem";
import TextInput from "@/src/components/input/TextInput";
import { cva } from "class-variance-authority";
import PrimaryButton from "@/src/components/button/primary-button";
import RecommendedPlaces from "@/src/components/map/recommended-places";
import Image from "next/image";

const SearchAddressBar = () => {
  const form = useForm<FieldValues>();
  const [keyword, setKeyword] = useState<string>("");
  const [recommended, setRecommended] =
    useState<kakao.maps.services.PlacesSearchResult>([]);
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    if (keyword) {
      ps.keywordSearch(keyword, (data, status, _pagination) => {
        console.log("data", data);
        if (status === kakao.maps.services.Status.OK) {
          if (data) {
            setRecommended(data);
          }
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
  }, [map, keyword]);

  const handleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    const keyword = e.target.value;
    if (keyword) setKeyword(keyword);
  };

  const handleResetKeyword = () => {
    setKeyword("");
  };

  const handleSubmit = (values: any) => {
    if (values) setKeyword(values.search);
  };

  return (
    <section className={Wrapper()}>
      <Form form={form} handleSubmit={handleSubmit}>
        <FormItem name={"search"} label={""}>
          <TextInput
            placeHolder={"주소를 검색해 주세요."}
            rightIcon={
              <>
                <button
                  onClick={handleResetKeyword}
                  className={resetButton()}
                  type={"reset"}
                >
                  <Image
                    src={"/assets/icons/clear.svg"}
                    alt={"clear"}
                    width={32}
                    height={32}
                  />
                </button>
                <PrimaryButton
                  type="submit"
                  onClick={handleSubmit}
                  className={"border w-[100px]"}
                  size={"small"}
                  title={"검색"}
                />
              </>
            }
          />
        </FormItem>
      </Form>
      {recommended.length && <RecommendedPlaces data={recommended} />}
    </section>
  );
};

export default SearchAddressBar;

const Wrapper = cva([
  // "w-[30%]",
  "sm:w-[100%]",
  "absolute",
  "lg:top-0",
  "z-[81]",
  "mt-[12px]",
  "sm:bottom-[0px]",
  "sm:bg-white",
  "lg:inset-x-[16px]",
]);

const resetButton = cva(["mx-[16px]"]);
