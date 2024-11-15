import createResponse from "../../utils/createResponse.js";

async function login(req, res) {
  const { email, password } = req.body;

  const id = 1;

  req.session.userId = id;
  res.status(200).json(createResponse());
}

export default login;
