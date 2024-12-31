import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

const db = new pg.Client({
  user : process.env.user,
  host: process.env.host,
  database : process.env.database,
  password : process.env.password,
  port : process.env.port,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

let users = [
  { id: 1, name: "Vaibhav", color: "teal" },
  { id: 2, name: "Rajani", color: "powderblue" },
];

async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_countries JOIN users ON users.id = user_id WHERE user_id = $1;", [currentUserId]);

  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

async function getCurrentUser(){
  const result = await db.query("SELECT * FROM users");
  users = result.rows;

  return users.find((user) => user.id == currentUserId);
}


app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  const currentUser = await getCurrentUser();

  console.log(countries);

  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: currentUser.color,
  });
});
app.post("/add", async (req, res) => {
  const input = req.body["country"];
  const countries = await checkVisisted();
  const currentUser = await getCurrentUser();


  const capitalized = input
  .split(' ')  // Split into array ["south", "africa"]
  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())  // ["South", "Africa"]
  .join(' ');  // Join back with spaces -> "South Africa"

  console.log(capitalized);

console.log(capitalized);

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE country_name  like  $1 || '%' ",
      [capitalized]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
        [countryCode,currentUserId ]
      );
      res.redirect("/");
    } catch (error) {
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        users: users,
        color: currentUser.color,
        error: "Country is already Visited"
      })
    }
  } catch (err) {
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      users: users,
      color: currentUser.color,
      error: "Country does not exist"
  })
}

});
app.post("/user", async (req, res) => {

  if(req.body.add == "new"){
    res.render("new.ejs");
  }else{
    currentUserId = req.body.user;
    res.redirect("/");
  }


});

app.post("/new", async (req, res) => {

  const name = req.body.name;
  const color = req.body.color;

  const result = await db.query(
    "INSERT INTO users (name, color) VALUES ($1, $2) RETURNING *;", [name, color]
  )

  const id = result.rows[0].id;
  currentUserId = id;

  res.redirect("/");

});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
