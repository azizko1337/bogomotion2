import sql from "../db/Client.js";

async function getUser(email) {
  const [user] =
    await sql`select id, email, birth_date, sex, region from users where email = ${email}`;
  return user;
}

export default getUser;
