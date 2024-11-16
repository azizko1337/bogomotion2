import createResponse from "../utils/createResponse.js";
import getUser from "../utils/getUser.js";

async function query(req, res) {
  try {
    const { query } = req.body;
    if (!query || query.split(" ").length < 5) {
      res.status(200).json(createResponse("Za krótka treść zapytania."));
      return;
    }

    const r = await fetch(process.env.STACH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key: "llm", prompt: query }),
    });
    const data = await r.json();

    res.status(200).json(createResponse(data));
  } catch (err) {
    console.log(err);
    res.status(200).json(createResponse(null, true, "Wystąpił błąd."));
  }
}

export default query;
