import bcrypt from "bcryptjs";
import createResponse from "../utils/createResponse.js";
import getUser from "../utils/getUser.js";
import getUserPassword from "../utils/getUserPassword.js";
import cookieOptions from "../utils/cookieOptions.js";
import sql from "../db/Client.js";

async function review(req, res) {
  try {
    const { email } = JSON.parse(req.cookies.user);
    const user = await getUser(email);
    if (!user) {
      throw new Error("Niepoprawne dane logowania.");
    }

    const { asset_id, values } = req.body;

    const review = {
      user_id: user.id,
      asset_id,
      ...values,
    };

    await sql`insert into reviews ${sql(review)}`;

    res.status(200).json(createResponse());
  } catch (err) {
    res.status(200).json(createResponse(null, true, "Wystąpił błąd."));
  }
}

export default review;
