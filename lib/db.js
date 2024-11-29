import sql from "mssql";

const config = {
  user: "sa", // MSSQL Docker 사용자
  password: "YourPassword123!", // Docker 컨테이너의 비밀번호
  server: "localhost", // 또는 Docker 컨테이너 IP
  database: "ProjectDB", // 사용할 데이터베이스 이름
  options: {
    encrypt: false,
    trustServerCertificate: true, // 로컬 개발용
  },
};

let pool;

export const getConnection = async () => {
  if (!pool) {
    pool = await sql.connect(config);
  }
  return pool;
};
