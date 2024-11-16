import bcrypt from "bcryptjs";
import createResponse from "../utils/createResponse.js";
import getUser from "../utils/getUser.js";
import getUserPassword from "../utils/getUserPassword.js";
import cookieOptions from "../utils/cookieOptions.js";
import sql from "../db/Client.js";

async function asset(req, res) {
  try {
    const { email } = JSON.parse(req.cookies.user);
    const user = await getUser(email);
    if (!user) {
      throw new Error("Niepoprawne dane logowania.");
    }

    console.log(user);

    const [asset] =
      await sql`SELECT * FROM assets WHERE (SELECT COUNT(*) FROM reviews WHERE reviews.asset_id = assets.id) < 3 ORDER BY RANDOM() LIMIT 1`;
    //   await sql`Select asset_id, avg(angry) angry, avg(disgust) disgust, avg(fear) fear, avg(happy) happy, avg(neutral) neutral, avg(sad) sad, avg(surprise) surprise
    // From Reviews
    // Group By asset_id
    // Having asset_id = (
    //     Select asset_id
    //     From reviews
    //     Order By random()
    //     Limit 1
    // )
    // AND ${user.id} NOT IN (
    //     Select deciding_user
    //     From decisions
    // )`;
    if (!asset) {
      throw new Error("Nie znaleziono żadnych aktywów do oceny.");
    }
    const [review] =
      (await sql`Select asset_id, avg(angry) angry, avg(disgust) disgust, avg(fear) fear, avg(happy) happy, avg(neutral) neutral, avg(sad) sad, avg(surprise) surprise
            From Reviews
            Group By asset_id
            Having asset_id = ${asset.id};
        `) || null;
    asset.src = process.env.APP_URL + "/data/" + asset.id + asset.extension;

    res.status(200).json(createResponse({ asset, review }));
  } catch (err) {
    console.log(err);
    res.status(200).json(createResponse(null, true, "Wystąpił błąd."));
  }
}

export default asset;
