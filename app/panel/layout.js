"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

export default function Layout({ children }) {
  const router = useRouter();
  const pathname = usePathname(); // 현재 경로 가져오기

  const handleTabClick = (path) => {
    router.push(path);
  };

  const tabstyle = (path) =>
    `w-1/2 text-center p-3 text-base lg:text-lg font-bold cursor-pointer rounded-xl rounded-b-none ${
      pathname === path
        ? "bg-white text-mcolor" // 활성화된 탭 스타일
        : "bg-[#121E32] text-slate-500 hover:bg-white hover:text-mcolor" // 비활성화 탭 스타일
    }`;

  return (
    <div>
      <div id="top" className="bg-mcolor p-4 pb-0 w-full">
        <div
          id="thead"
          className="flex lg:flex-row flex-col justify-between items-center"
        >
          <h1>
            <Image
              src="/images/logo_w.png"
              alt="한국리서치"
              width={160}
              height={60}
            />
          </h1>
          <div className="flex gap-4 text-sm">
            <p className="text-slate-50">관리자 님 안녕하세요</p>
            <a href="#" className="text-slate-500">
              로그아웃
            </a>
          </div>
        </div>

        <div id="gnb" className="flex pt-4">
          <p
            id="tab1"
            onClick={() => handleTabClick("/panel/page1")}
            className={tabstyle("/panel/page1")}
          >
            가입자 패널 검색
          </p>

          <p
            id="tab2"
            onClick={() => handleTabClick("/panel/page2")}
            className={tabstyle("/panel/page2")}
          >
            실적 데이터 검색
          </p>
        </div>
      </div>

      <div id="content" className="p-4 pt-0 bg-gray-100">
        {children}
      </div>
    </div>
  );
}
