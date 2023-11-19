import express from "express";
import http from "http";
import bodyParser from "body-parser";
import reserveMasterkey from "./src/masterkey/run.js";

const app = express();
app.use(express.json({ extended: true }));

app.use(bodyParser.urlencoded({ extended: false }));

const server = http.createServer(app);
const PORT = 3000;

app.post("/reserve/masterkey", async (req, res) => {
  const info = req.body;
  const response = await reserveMasterkey(info);

  res.json({
    isSucceed: response,
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

/**
info 객체 예시

{
    "targetUrl": "https://www.master-key.co.kr/booking/bk_detail?bid=11",
    "themeTitle": "연애조작단",
    "targetDate": "2023-11-25",
    "targetTime": "99:05",
    "bookerName": "이남곤",
    "bookerPhoneNumber": "01012345678"
}
 */
