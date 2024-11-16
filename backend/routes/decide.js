import createResponse from "../utils/createResponse.js";
import getUser from "../utils/getUser.js";
import sql from "../db/Client.js";

async function decide(req, res) {
  try {
    const { email } = JSON.parse(req.cookies.user);
    const user = await getUser(email);
    if (!user) {
      throw new Error("Niepoprawne dane logowania.");
    }

    const { asset_id, value } = req.body;

    const decision = {
      user_id: user.id,
      asset_id,
      value,
    };

    await sql`insert into decisions ${sql(decision)}`;

    res.status(200).json(createResponse());
  } catch (err) {
    console.log(err);
    res.status(200).json(createResponse(null, true, "Wystąpił błąd."));
  }
}

export default decide;
