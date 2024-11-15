import createResponse from "../../utils/createResponse.js";

async function logout(req, res) {
  req.session = null;
  res.status(200).json(createResponse());
}

export default logout;
