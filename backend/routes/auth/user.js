import createResponse from "../../utils/createResponse.js";
import getUser from "../../utils/getUser.js";

async function user(req, res) {
  try {
    const { email } = JSON.parse(req.cookies.user);
    const user = await getUser(email);
    res.status(200).json(createResponse(user));
  } catch (error) {
    res.status(200).json(createResponse(null, true, "Nie jesteś zalogowany"));
  }
}

export default user;
