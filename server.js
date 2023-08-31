const express = require("express");
const app = express();
require("dotenv").config();
const { StatusCodes } = require("http-status-codes");
const {
  createUser,
  findUserById,
  findAllUsers,
  updateUser,
  deleteUserById,
} = require("./app/controllers/user.controller");
const {
  createBootcamp,
  addUserToBootcamp,
  findById,
  findAll,
} = require("./app/controllers/bootcamp.controller");

const PORT = process.env.PORT;

app.get("/user/create/:firstname/:lastname/:email", async (req, res) => {
  const firstName = req.params.firstname;
  const lastName = req.params.lastname;
  const email = req.params.email;

  try {
    const usuario = await createUser({ firstName, lastName, email });
    res.status(StatusCodes.CREATED).json({
      message: `Usuario ${usuario.firstName} fue creado con éxito`,
      user: usuario,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
});

app.get("/user/findById/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    const usuario = await findUserById(id);

    if (usuario) {
      res.status(StatusCodes.OK).json({
        message: `Usuario ${usuario.firstName} encontrado con éxito`,
        user: usuario,
      });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({
        message: `Usuario con ID ${id} no fue encontrado`,
      });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
});

// Resto de las rutas...

app.listen(PORT, () => console.log(`Iniciando en puerto ${PORT}`));

