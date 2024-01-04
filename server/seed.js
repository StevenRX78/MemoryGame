import Database from "better-sqlite3";
const db = new Database("database.db");

db.exec("CREATE TABLE IF NOT EXISTS leaderboard(name TEXT, score TEXT)");

const insert = db.prepare("INSERT INTO leaderboard VALUES(?, ?)");

insert.run("Jim", "23.0");
insert.run("Riley", "42.0");
insert.run("Steven", "19.0");
insert.run("Danny", "27.0");
insert.run("Danny2", "35.0");
