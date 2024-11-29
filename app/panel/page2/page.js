"use client";

import { useState, useEffect } from "react";

export default function PerformanceSearch() {
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/dummyData.json"); // 데이터 가져오기
      const data = await res.json();
      setTableData(data.map((item) => ({ ...item, buttonStatus: "request" }))); // 초기 상태 추가
    }
    fetchData();
  }, []);

  const [tableData, setTableData] = useState([]); // 전체 데이터
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const itemsPerPage = 5; // 한 페이지에 표시할 항목 수

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
    start_date: "",
    end_date: "",
    keyvalue: "",
    checkboxState: {
      noIssues: true,
      requestCheck: true,
      resendComplete: false,
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevState) => ({
        ...prevState,
        checkboxState: {
          ...prevState.checkboxState,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSearch = () => {
    // 검색 로직 추가
    console.log("데이터:", formData);
  };

  const handleExcelDownload = () => {
    // 엑셀 다운로드 로직 추가
    console.log("엑셀 다운로드 실행");
  };

  // 상태 변경 함수 (드롭다운, 버튼)
  const handleSelectChange = (id, value) => {
    setTableData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, check: value } : item
      )
    );
  };

  const handleButtonClick = (id) => {
    setTableData((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? {
              ...item,
              buttonStatus:
                item.buttonStatus === "request" ? "complete" : "complete",
            }
          : item
      )
    );
  };

  return (
    <div>
      {/* 검색 폼 */}
      <div className="flex w-full bg-white rounded-xl rounded-t-none p-8">
        <form className="w-full">
          {/* 가입경로 */}
          <label
            htmlFor="path"
            className="block text-base pb-2 font-medium text-gray-950"
          >
            가입경로
          </label>
          <select
            id="path"
            name="path"
            value={formData.path}
            onChange={handleChange}
            className="block w-full p-3 bg-gray-100 rounded-lg"
          >
            <option value="">가입경로를 선택해 주세요.</option>
            <option value="online">온라인</option>
            <option value="offline">오프라인</option>
          </select>

          {/* 검색 폼 내용 */}

          <div className="flex gap-2 lg:flex-row flex-col">
            {/* 가입일자 및 keyvalue */}
            <div className="w-full grid grid-cols-1 gap-y-4 lg:w-1/2 lg:grid-cols-3 lg:gap-4 pt-4">
              {/* 가입일자 */}
              <div className="col-span-2">
                <label
                  htmlFor="start_date"
                  className="block text-base font-medium text-gray-950 mb-2"
                >
                  가입일자
                </label>
                <div className="flex w-full justify-between items-center gap-2">
                  <input
                    id="start_date"
                    name="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={handleChange}
                    className="w-[48%] bg-gray-100 rounded-lg p-3"
                  />
                  <span className="text-gray-700 font-medium">~</span>
                  <input
                    id="end_date"
                    name="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={handleChange}
                    className="w-[48%] bg-gray-100 rounded-lg p-3"
                  />
                </div>
              </div>

              {/* keyvalue */}
              <div>
                <label
                  htmlFor="keyvalue"
                  className="block text-base pb-2 font-medium text-gray-950"
                >
                  Key value
                </label>
                <input
                  id="keyvalue"
                  name="keyvalue"
                  type="text"
                  value={formData.keyvalue}
                  onChange={handleChange}
                  className="block p-3 bg-gray-100 rounded-lg w-full"
                />
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-y-4 lg:w-1/2 lg:grid-cols-7 lg:gap-4 lg:pt-4">
              {/* 체크박스 */}
              <div className="col-span-4 flex pt-2 lg:gap-4 lg:pt-7 justify-around">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="noIssues"
                    className="form-checkbox h-5 w-5 text-black rounded border-gray-300 focus:ring-0 focus:outline-none"
                    checked={formData.checkboxState.noIssues}
                    onChange={handleChange}
                  />
                  <span className="text-sm font-medium text-black">
                    실적이상없음
                  </span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="requestCheck"
                    className="form-checkbox h-5 w-5 text-black border-gray-300 focus:ring-0 focus:outline-none"
                    checked={formData.checkboxState.requestCheck}
                    onChange={handleChange}
                  />
                  <span className="text-sm font-medium text-black">
                    실적체크요청
                  </span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="resendComplete"
                    className="form-checkbox h-5 w-5 text-black rounded border-gray-300 focus:ring-0 focus:outline-none"
                    checked={formData.checkboxState.resendComplete}
                    onChange={handleChange}
                  />
                  <span className="text-sm font-medium text-black">
                    실적재전송완료
                  </span>
                </label>
              </div>

              {/* 버튼 */}
              <div className="col-span-3 flex justify-end gap-2 lg:pt-8">
                <button
                  type="button"
                  className="text-white rounded-lg bg-mcolor p-3 w-full"
                  onClick={handleSearch}
                >
                  검색하기
                </button>

                <button
                  type="button"
                  className="text-white rounded-lg bg-pcolor p-3 w-full"
                  onClick={handleExcelDownload}
                >
                  엑셀다운로드
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
          <table className="border-t-2 w-full border-t-mcolor text-center [&_th]:p-4 [&_td]:p-4">
            <thead className="bg-white border-b border-b-gray-200">
              <tr>
                <th>ID</th>
                <th>회사명</th>
                <th>가입경로</th>
                <th>가입구분</th>
                <th>유니크ID</th>
                <th>가입일자</th>
                <th>실적체크요청</th>
              </tr>
            </thead>
            <tbody className="text-gray-500 bg-none [&_td]:border-b border-b-gray-200">
              {paginatedData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.company}</td>
                  <td>{item.path}</td>
                  <td>{item.type}</td>
                  <td className="text-center align-middle">
                    <div className="relative group">
                      <span className="block truncate max-w-[120px] text-ellipsis text-center">
                        {item.uniqueId}
                      </span>
                      <div className="absolute left-0 mt-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded-md p-2 shadow-lg z-10">
                        {item.uniqueId}
                      </div>
                    </div>
                  </td>
                  <td>{item.date}</td>
                  <td>
                    <select
                      className="form-select border-gray-300 rounded-md p-2"
                      value={item.check}
                      onChange={(e) =>
                        handleSelectChange(item.id, e.target.value)
                      }
                    >
                      <option value="실적체크요청">실적체크요청</option>
                      <option value="실적재전송">실적재전송</option>
                      <option value="실적이상없음">실적이상없음</option>
                    </select>
                    <button
                      className={`status-btn ${
                        item.buttonStatus === "request"
                          ? "bg-blue-500"
                          : "bg-gray-500"
                      } text-white p-2 text-sm rounded-md mt-2`}
                      onClick={() => handleButtonClick(item.id)}
                    >
                      {item.buttonStatus === "request" ? "요청" : "완료"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        <div className="flex justify-center space-x-2 mt-4">
          <button
            className={`pagination-btn ${currentPage === 1 ? "disabled" : ""}`}
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            이전
          </button>

          <div className="flex space-x-2 text-sm text-gray-500">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
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
            className={`pagination-btn ${
              currentPage === totalPages ? "disabled" : ""
            }`}
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
