import createResponse from "../utils/createResponse.js";
import getUser from "../utils/getUser.js";
import path from "path";
import fs from "fs";
import sql from "../db/Client.js";

async function upload(req, res) {
  try {
    const { email } = JSON.parse(req.cookies.user);

    const user = await getUser(email);
    if (!user) {
      throw new Error("User not found");
    }

    if (!req.files || Object.keys(req.files).length === 0) {
      throw new Error("No files were uploaded.");
    }
    const uploadedFile = req.files.file;
    const extension = path.extname(uploadedFile.name);
    const uploadPath = path.join("./public/tmp", uploadedFile.name);
    uploadedFile.mv(uploadPath, (err) => {
      if (err) {
        console.error(err);
        throw new Error();
      }
    });

    // quality check
    const qualRes = await fetch(process.env.STACH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: "img_qual",
        img_url: process.env.APP_URL + "/tmp/" + uploadedFile.name,
      }),
    });
    const qual = await qualRes.json();
    if (!qual.response.resolution_passed || qual.response.quality_score < 0.5) {
      // remove file
      fs.unlinkSync(uploadPath);
      return res.status(200).json(createResponse({ passed: false }));
    }

    // labeling
    const labelRes = await fetch(process.env.STACH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: "img_em",
        img_url: process.env.APP_URL + "/tmp/" + uploadedFile.name,
      }),
    });
    const label = (await labelRes.json()).response;

    // move from tmp to data folder
    const asset = {
      type: "image",
      quality: qual.response.tests_passed / qual.response.total_tests,
      prediction: label?.emotion | null,
      user_id: user.id,
      extension,
    };
    const [inserted] = await sql`insert into assets ${sql(asset)} RETURNING *`;
    const dataPath = path.join(
      "./public/data",
      inserted.id.toString() + extension
    );
    fs.renameSync(uploadPath, dataPath);

    res
      .status(200)
      .json(
        createResponse({
          emotion: label?.emotion || null,
          quality: qual.response.quality_score,
          passed: true,
        })
      );
  } catch (err) {
    console.error(err);
    res.status(200).json(createResponse(null, true, "Wystąpił błąd"));
  }
}

export default upload;
