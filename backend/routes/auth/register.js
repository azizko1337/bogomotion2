import bcrypt from "bcryptjs";
import createResponse from "../../utils/createResponse.js";
import sql from "../../db/Client.js";
import getUser from "../../utils/getUser.js";

async function register(req, res) {
  try {
    const { email, password, birthDate, sex, region } = req.body;

    const hashed = bcrypt.hashSync(password, 10);

    const user = {
      email,
      password: hashed,
      birth_date: birthDate,
      sex,
      region,
    };

    await sql`insert into users ${sql(user)}`;

    const insertedUser = await getUser(email);

    req.session.id = insertedUser.id;
    req.session.email = insertedUser.email;

    console.log(insertedUser);

    res.status(200).json(createResponse());
  } catch (error) {
    console.log(error);
    res
      .status(200)
      .json(createResponse(null, true, "Niepoprawne dane rejestracji"));
  }
}

export default register;
