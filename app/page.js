"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const handleJoinClick = () => {
    router.push("/join");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        // 로그인 성공 시 다른 페이지로 이동
        window.location.href = "/panel/page1";
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError("서버 요청 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {/* 로고 섹션 */}
      <h1 className="pb-8">
        <Image
          src="/images/logo.png" // public 폴더 기준 경로
          alt="한국리서치"
          width={200} // 원하는 로고 크기
          height={50}
        />
      </h1>

      {/* 제목 섹션 */}
      <h2 className="text-6xl text-mcolor text-center font-extrabold">
        관리자 로그인
        <p className="text-lg text-slate-600 font-medium pt-2 pb-10">
          한국리서치 광고사 관리자 사이트
        </p>
      </h2>

      {/* 로그인 폼 */}
      <div
        id="login"
        className="flex flex-col w-4/5 md:w-[485px] bg-white rounded-3xl shadow-xl items-center h-auto p-6 md:p-8"
      >
        <form
          className="flex flex-col gap-2 w-full"
          onSubmit={handleSubmit}
          method="POST"
        >
          <p>
            <input
              type="text"
              placeholder="아이디"
              value={formData.username}
              onChange={handleChange}
              name="username"
              className="w-full text-gray-800 text-base rounded-xl bg-gray-100 p-3"
              required
            />
          </p>
          <p>
            <input
              type="password"
              placeholder="비밀번호"
              value={formData.password}
              onChange={handleChange}
              name="password"
              className="w-full text-gray-800 text-base rounded-xl bg-gray-100 p-3"
              required
            />
          </p>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <button
            type="submit"
            value="로그인"
            className="bg-mcolor text-white font-bold text-xl p-5 rounded-xl"
          >
            로그인
          </button>

          <button
            type="button"
            value="회원가입"
            onClick={handleJoinClick}
            className="bg-gray-600 rounded-xl text-xl p-5 text-white"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}
