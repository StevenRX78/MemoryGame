import Database from "better-sqlite3";
import express from "express";
import cors from "cors";
const app = express();
const db = new Database("database.db");
const upload = db.prepare(`INSERT INTO leaderboard VALUES (?, ?)`);
app.use(express.json());
app.use(cors());

app.listen(8080, function () {});

//post in form {name: jim, score: 10}
app.post("/leaderboard", function (req, res) {
  const scoreData = req.body;
  console.log(scoreData.name, scoreData.score);
  upload.run(scoreData.name, scoreData.score);
});
app.get("/leaderboard", function (req, res) {
  res.json(db.prepare("SELECT * FROM leaderboard").all());
  //returs database in form [{name:?, score:?}, {name:?, score:?}]
});
