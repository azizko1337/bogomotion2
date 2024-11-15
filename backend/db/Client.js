import postgres from "postgres";

const sql = postgres(process.env.DB_URL); // will use psql environment variables

export default sql;
