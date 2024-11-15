import createResponse from "../../utils/createResponse.js";

async function user(req, res) {
  const id = req.session.userId;

  // res.status(200).json(createResponse(null));
  setTimeout(() => {
    res.status(200).json(createResponse({ email: "emailik@mail.com" }));
  }, 2000);
}

export default user;
