import bcrypt from "bcryptjs";
import createResponse from "../utils/createResponse.js";
import getUser from "../utils/getUser.js";
import getUserPassword from "../utils/getUserPassword.js";
import cookieOptions from "../utils/cookieOptions.js";
import sql from "../db/Client.js";

async function averageReview(req, res) {
  try {
    const { email } = JSON.parse(req.cookies.user);
    const user = await getUser(email);
    if (!user) {
      throw new Error("Niepoprawne dane logowania.");
    }

    const [asset] = await sql`With assets_classification AS (
        Select asset_id, avg(angry) angry, avg(disgust) disgust, avg(fear) fear, avg(happy) happy, avg(neutral) neutral, avg(sad) sad, avg(surprise) surprise
        From reviews
        Group By asset_id
        Having asset_id = (
            Select asset_id
            From reviews
            Order By random()
            Limit 1
        )
    )
    Select a.extension, ac.*
    From assets a
    Join assets_classification ac On a.id = ac.asset_id;`;

    asset.src =
      process.env.APP_URL + "/data/" + asset.asset_id + asset.extension;

    console.log(asset);

    res.status(200).json(createResponse({ asset }));
  } catch (err) {
    console.log(err);
    res.status(200).json(createResponse(null, true, "Wystąpił błąd."));
  }
}

export default averageReview;
