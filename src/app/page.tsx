"use client";
import ThreeDemo1 from "@/components/ThreeDemo1";
import { Leva } from "leva";

export default function Home() {
  return (
    <div className="text-4xl flex flex-col text-center pt-6 px-4">
      <div className="fixed z-50 top-0 right-0 w-[21.875rem]">
        <Leva fill />
      </div>
      COS Three Demos
      <ThreeDemo1 />
    </div>
  );
}
