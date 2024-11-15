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

    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (!passwordMatch) {
      return res
        .status(401)
        .json(createResponse(null, true, "Niepoprawne hasło."));
    }

    // Usunięcie użytkownika z bazy danych
    await sql`delete from users where id = ${sql(id)}`;

    // Usunięcie sesji
    req.cookies = null;
    return res.status(200).json(createResponse("Usunięto użytkownika."));
  } catch (err) {
    console.error(err);
    return res.status(500).json(createResponse(null, true, "Błąd serwera."));
  }
}

export default remove;
