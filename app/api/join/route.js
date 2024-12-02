import { getConnection } from "@/lib/db";
import bcrypt from "bcrypt";
import sql from "mssql";

export async function POST(req) {
  const { userid, name, password, email, contact } = await req.json();

  if (!userid || !password) {
    return new Response(
      JSON.stringify({ error: "아이디, 비밀번호는 필수입니다." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const pool = await getConnection();

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10); // 10은 라운드 수 (권장값)

    // 데이터 삽입
    await pool
      .request()
      .input("userid", sql.NVarChar, userid)
      .input("name", sql.NVarChar, name)
      .input("password", sql.NVarChar, hashedPassword) // 해시된 비밀번호 저장
      .input("email", sql.NVarChar, email)
      .input("contact", sql.NVarChar, contact)
      .query(
        "INSERT INTO Members (userid, name, password, email, contact, created_at) VALUES (@userid, @name, @password, @email, @contact, GETDATE())"
      );

    return new Response(JSON.stringify({ message: "회원가입 성공" }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("회원가입 오류:", error);
    return new Response(
      JSON.stringify({ error: "서버 오류가 발생했습니다." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
