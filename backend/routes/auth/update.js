import bcrypt from "bcryptjs";
import createResponse from "../../utils/createResponse.js";

async function update(req, res) {
  const { email, password } = req.body;
  const id = req.cookies.id;

  const hashed = bcrypt.hashSync(password, 10);

  res.status(200).json(createResponse());
}

export default update;
