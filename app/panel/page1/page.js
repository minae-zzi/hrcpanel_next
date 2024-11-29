"use client";

import { useState, useEffect } from "react";

export default function PanelSearch() {
  const [tableData, setTableData] = useState([]); // 전체 데이터
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const itemsPerPage = 5; // 한 페이지에 표시할 항목 수

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/dummyData.json"); // 데이터 가져오기
      const data = await res.json();
      setTableData(data);
    }
    fetchData();
  }, []);

  // 현재 페이지에 해당하는 데이터 계산
  const paginatedData = tableData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 총 페이지 수 계산
  const totalPages = Math.ceil(tableData.length / itemsPerPage);

  // 페이지 변경 함수
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const [formData, setFormData] = useState({
    path: "",
    name: "",
    phone: "",
    start_date: "",
    end_date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // 여기서 API 요청을 보내거나 검색 로직 추가 가능
  };

  return (
    <div>
      {/* 검색 폼 */}
      <div className="flex w-full bg-white rounded-xl rounded-t-none p-8">
        <form className="w-full" onSubmit={handleSubmit}>
          <label
            htmlFor="path"
            className="block text-base pb-2 font-medium text-gray-950"
          >
            가입경로
          </label>
          <select
            id="path"
            name="path"
            className="block w-full p-3 bg-gray-100 rounded-lg"
            value={formData.path}
            onChange={handleChange}
          >
            <option value="">가입경로를 선택해 주세요.</option>
            <option value="online">온라인</option>
            <option value="offline">오프라인</option>
          </select>

          <div className="w-full grid grid-cols-1 gap-4 pt-6 lg:grid lg:grid-cols-3 justify-center">
            {/* 가입자 이름 */}
            <div>
              <label
                htmlFor="name"
                className="block text-base pb-2 font-medium text-gray-950"
              >
                가입자 이름
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="block w-full p-3 bg-gray-100 rounded-lg"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* 휴대폰 번호 */}
            <div>
              <label
                htmlFor="phone"
                className="block text-base pb-2 font-medium text-gray-950"
              >
                휴대폰 번호
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                className="block w-full p-3 bg-gray-100 rounded-lg"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {/* 가입일자 */}
            <div className="flex flex-col">
              <label
                htmlFor="start_date"
                className="block text-base font-medium text-gray-950 mb-2"
              >
                가입일자
              </label>
              <div className="flex justify-between w-full gap-2">
                <div className="flex w-[80%] justify-between items-center">
                  <input
                    id="start_date"
                    name="start_date"
                    type="date"
                    className="w-[45%] bg-gray-100 rounded-lg p-3"
                    value={formData.start_date}
                    onChange={handleChange}
                  />
                  <span className="text-gray-700 font-medium">~</span>
                  <label htmlFor="end_date" className="sr-only">
                    가입일자 종료
                  </label>
                  <input
                    id="end_date"
                    name="end_date"
                    type="date"
                    className="w-[45%] bg-gray-100 rounded-lg p-3"
                    value={formData.end_date}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="text-white rounded-lg bg-mcolor w-[20%]"
                >
                  검색
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* 검색 결과 테이블 */}
      <div className="flex flex-col pt-10">
        <h2 className="text-2xl pb-4 font-bold">가입자 패널 검색</h2>
        <div className="overflow-x-auto">
          <table
            id="data-table"
            className="border-t-2 w-full border-t-mcolor text-center [&_th]:p-4 [&_td]:p-4"
          >
            <thead className="bg-white border-b border-b-gray-200">
              <tr>
                <th>이름</th>
                <th>휴대폰 번호</th>
                <th>상태</th>
                <th>가입일자</th>
                <th>가입경로</th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody className="text-gray-500 bg-none [&_td]:border-b border-b-gray-200">
              {paginatedData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.company}</td>
                  <td>{item.path}</td>
                  <td>{item.type}</td>
                  <td>{item.uniqueId}</td>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        <div className="flex justify-center space-x-2 mt-4">
          <button
            id="prev"
            className={`pagination-btn ${currentPage === 1 ? "disabled" : ""}`}
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <img src="/images/cal_prev.png" alt="이전" />
          </button>

          <div id="pagination" className="flex space-x-2 text-sm text-gray-500">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`pagination-btn ${
                  currentPage === index + 1 ? "text-mcolor font-bold" : ""
                }`}
                onClick={() => goToPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            id="next"
            className={`pagination-btn ${
              currentPage === totalPages ? "disabled" : ""
            }`}
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <img src="/images/cal_next.png" alt="다음" />
          </button>
        </div>
      </div>
    </div>
  );
}
