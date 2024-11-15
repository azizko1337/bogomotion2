import bcrypt from "bcryptjs";
import createResponse from "../../utils/createResponse.js";
import getUser from "../../utils/getUser.js";
import getUserPassword from "../../utils/getUserPassword.js";

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await getUser(email);

    if (!user) {
      throw new Error("Niepoprawne dane logowania.");
    }

    if (!bcrypt.compareSync(password, await getUserPassword(email))) {
      throw new Error("Niepoprawne dane logowania.");
    }

    req.session.id = user.id;
    req.session.email = user.email;

    res.status(200).json(createResponse());
  } catch (err) {
    console.log(err);
    res
      .status(200)
      .json(createResponse(null, true, "Niepoprawne dane logowania."));
  }
}

export default login;
