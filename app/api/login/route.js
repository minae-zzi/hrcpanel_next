// app/api/login/route.js
import { getConnection } from "@/lib/db"; // DB 연결 함수
import sql from "mssql";
import bcrypt from "bcrypt"; // 비밀번호 검증

export async function POST(req) {
  const { userid, password } = await req.json();

  if (!userid || !password) {
    return new Response(
      JSON.stringify({ error: "아이디와 비밀번호를 입력해주세요." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const pool = await getConnection();

    // SQL 쿼리 및 입력 파라미터 수정
    const result = await pool
      .request()
      .input("userid", sql.NVarChar, userid)
      .query("SELECT * FROM Members WHERE userid = @userid");

    const user = result.recordset[0];

    if (!user) {
      return new Response(
        JSON.stringify({ error: "존재하지 않는 사용자입니다." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // 비밀번호 검증
    let isPasswordValid;
    try {
      isPasswordValid = await bcrypt.compare(password, user.password); // 대소문자 확인 필요
    } catch (error) {
      console.error("비밀번호 검증 오류:", error);
      return new Response(
        JSON.stringify({ error: "서버 오류가 발생했습니다." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ error: "비밀번호가 일치하지 않습니다." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // 로그인 성공
    return new Response(
      JSON.stringify({ message: "로그인 성공", userid12: user.id }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("로그인 오류:", error);
    return new Response(
      JSON.stringify({ error: "서버 오류가 발생했습니다." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
