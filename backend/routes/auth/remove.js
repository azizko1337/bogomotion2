import bcrypt from "bcryptjs";
import createResponse from "../../utils/createResponse.js";
import sql from "../../db/Client.js";

async function remove(req, res) {
  const { password } = req.body;
  const id = req.cookies.id;

  try {
    const result = await sql`select password from users where id = ${sql(id)}`;
    const hashedPassword = result[0]?.password;

    if (!hashedPassword) {
      return res
        .status(404)
        .json(createResponse(null, true, "Użytkownik nie znaleziony."));
    }

    if (bcrypt.compare(password, hashedPassword)) {
      return res
        .status(200)
        .json(createResponse(null, true, "Niepoprawne hasło."));
    }

    // Usunięcie użytkownika z bazy danych
    await sql`delete from users where id = ${sql(id)}`;

    // Usunięcie sesji
    req.cookie("user", null);

    return res.status(200).json(createResponse());
  } catch (err) {
    return res.status(500).json(createResponse(null, true, "Błędne hasło."));
  }
}

export default remove;
