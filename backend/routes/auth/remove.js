import bcrypt from "bcryptjs";
import createResponse from "../../utils/createResponse.js";

async function remove(req, res) {
  const { password } = req.body;
  const id = req.session.userId;

  req.session = null;
  res.status(200).json(createResponse());
}

export default remove;
