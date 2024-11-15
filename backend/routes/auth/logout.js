import createResponse from "../../utils/createResponse.js";

async function logout(req, res) {
  if (req.session) {
    req.session = null;
    res.status(200).json(createResponse());
  } else {
    res.status(500).json(createResponse(null, true, "Nie jesteś zalogowany."));
  }
}

export default logout;
