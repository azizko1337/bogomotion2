import sql from "../db/Client.js";

async function getUser(email) {
  const [user] = await sql`select password from users where email = ${email}`;
  return user.password;
}

export default getUser;
