export default function Join() {
  return (
    <div>
      <form>
        <div className="flex flex-col w-1/2 items-center gap-4">
          <input
            type="text"
            className="bg-gray-100 p-4 rounded-sm"
            placeholder="아이디"
          ></input>

          <input
            type="password"
            className="bg-gray-100 p-4 rounded-sm"
            placeholder="패스워드"
          ></input>

          <input
            type="text"
            className="bg-gray-100 p-4 rounded-sm"
            placeholder="이메일"
          ></input>

          <button
            type="submit"
            className="bg-gray-800 text-white p-4 rounded-sm"
            value="가입"
          >
            가입
          </button>
        </div>
      </form>
    </div>
  );
}
