import bcrypt from "bcryptjs";
import createResponse from "../../utils/createResponse.js";

async function register(req, res) {
  const { email, password } = req.body;

  const hashed = bcrypt.hashSync(password, 10);
  const id = 1;

  req.session.userId = id;
  res.status(200).json(createResponse());
}

export default register;
