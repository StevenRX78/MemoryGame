import Database from "better-sqlite3";
const db = new Database("database.db");

db.exec("CREATE TABLE IF NOT EXISTS leaderboard(name TEXT, score TEXT)");

const insert = db.prepare("INSERT INTO leaderboard VALUES(?, ?)");

insert.run("Jim", "10");
insert.run("Riley", "1");
insert.run("Steven", "7");
insert.run("Danny", "8");
insert.run("Danny2", "8");
