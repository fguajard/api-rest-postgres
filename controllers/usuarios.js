const express = require("express");
const router = express.Router();
const Users = require("../models/Usuario");

const Usuarios = new Users();

router.get("/", async (req, res) => {
  const users = await Usuarios.all();
  res.send(users);
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Usuarios.findOne(id);
    res.json(doc);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const usuarioAgregado = await Usuarios.addOne(req.body);
    res.json(usuarioAgregado);
  } catch (error) {
    res.send(error.message || "Error al crear un usuario");
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const usuario = req.body;
  try {
    const doc = await Usuarios.updateOne(usuario, id);
    res.json(doc);
  } catch (e) {
    res.json(e);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const doc = await Usuarios.deleteOne(id);
  res.json(doc);
});

module.exports = router;
