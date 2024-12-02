"use client";

import { useState } from "react";

export default function Join() {
  const [formData, setFormData] = useState({
    userid: "",
    name: "",
    password: "",
    email: "",
    contact: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    console.log(success);

    try {
      const response = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("회원가입 성공:", data.message);
        // window.location.href = "/";
        setSuccess(data.message);
      } else {
        console.error("회원가입 실패:", data.error);
        setError(data.error);
      }
    } catch (error) {
      console.error("서버 요청 오류:", error);
      setError(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} method="POST">
        <div className="flex flex-col w-1/2 items-center gap-4">
          <input
            type="text"
            className="bg-gray-100 p-4 rounded-sm"
            placeholder="아이디"
            name="userid"
            onChange={handleChange}
          ></input>

          <input
            type="text"
            className="bg-gray-100 p-4 rounded-sm"
            placeholder="이름"
            name="name"
            onChange={handleChange}
          ></input>

          <input
            type="password"
            className="bg-gray-100 p-4 rounded-sm"
            placeholder="패스워드"
            name="password"
            onChange={handleChange}
          ></input>

          <input
            type="text"
            className="bg-gray-100 p-4 rounded-sm"
            placeholder="이메일"
            name="email"
            onChange={handleChange}
          ></input>

          <input
            type="text"
            className="bg-gray-100 p-4 rounded-sm"
            placeholder="연락처"
            name="contact"
            onChange={handleChange}
          ></input>

          <button
            type="submit"
            className="bg-gray-800 text-white p-4 rounded-sm"
          >
            가입
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
      </form>
    </div>
  );
}
