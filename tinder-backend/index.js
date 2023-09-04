const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const users = require("./data/users.json");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/users", (req, res) => {
  const usersResponse = users.map(user => {
    const u = {...user};
    delete u.matches;
    delete u.likes;
    delete u.intereses;
    delete u.edad;
    return u;
  })
  res.send(usersResponse);
});

app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).send("User not found");
  }
  res.send(user);
});

app.post("/users", (req, res) => {
  const user = req.body;
  user.id = users.length + 1;
  users.push(user);
  res.send(user);
});

app.put("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).send("User not found");
  }
  user.nombre = req.body.nombre;
  user.genero = req.body.genero;
  user.verificado = req.body.verificado;
  user.edad = req.body.edad;
  user.imagenPerfil = req.body.imagenPerfil;
  user.imagenPortada = req.body.imagenPortada;
  user.ocupacion = req.body.ocupacion;
  user.ciudad = req.body.ciudad;
  user.intereses = req.body.intereses;
  user.matches = req.body.matches;
  user.likes = req.body.likes;
  user.generoInteres = req.body.generoInteres;
  res.send(user);
});

app.delete("/users/:id", (req, res) => {
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex === -1) {
    return res.status(404).send("User not found");
  }
  users.splice(userIndex, 1);
  res.send(`User with id ${req.params.id} deleted`);
});

// endpoint to get matches based on ID
app.get("/users/:id/matches", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((user) => user.id === id);

  if (user) {
    let matches = users.filter((user) => user.matches.includes(id));
    matches = matches.map(item => {
      const u = {...item};
      delete u.matches;
      delete u.likes;
      delete u.intereses;
      return u;
    });
    res.json(matches);
  } else {
    res.status(404).send("User not found");
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
