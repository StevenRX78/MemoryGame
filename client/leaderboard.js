const lb = document.getElementById("leaderBoard");
let highscores = [];

async function displayScores() {
  const values = await fetch("http://localhost:8080/leaderboard");
  let json = await values.json();
  lb.style.gridTemplateRows = `repeat(${json.length + 1},1fr)`;
  let names = [];
  json.forEach((value) => {
    names.push(value.name);
    highscores.push(value.score);
  });
  highscores.sort(function (a, b) {
    return a - b;
  });
  highscores.forEach((score) => {
    json.forEach((value) => {
      if (score == value.score && names.includes(value.name)) {
        names.splice(names.indexOf(value.name), 1);
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let name = document.createElement("h2");
        let score = document.createElement("h2");
        name.textContent = value.name;
        score.textContent = `${value.score}s`;
        td1.appendChild(name);
        td2.appendChild(score);
        lb.appendChild(td1);
        lb.appendChild(td2);
      }
    });
  });
}

displayScores();
