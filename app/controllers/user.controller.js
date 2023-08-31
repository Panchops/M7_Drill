const { User } = require("../models");

// Función para crear un nuevo usuario
const createUser = async (user) => {
  try {
    const usuario = await User.create({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });

    console.log(`Se ha creado el usuario:\n${JSON.stringify(usuario, null, 4)}`);
    return usuario;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Función para encontrar un usuario por su ID
const findUserById = async (userId) => {
  try {
    const usuario = await User.findByPk(userId, {
      include: ["bootcamp"],
    });

    console.log(`Se ha encontrado el usuario:\n${JSON.stringify(usuario, null, 4)}`);
    return usuario;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Función para encontrar todos los usuarios
const findAllUsers = async () => {
  try {
    const usuarios = await User.findAll({
      include: ["bootcamp"],
    });

    console.log(`Se han encontrado los usuarios:\n${JSON.stringify(usuarios, null, 4)}`);
    return usuarios;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Función para actualizar un usuario
const updateUser = async (userId, updatedUser) => {
  try {
    const usuario = await User.findByPk(userId);

    if (usuario) {
      if (usuario.firstName !== updatedUser.firstName) {
        await User.update(
          {
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
          },
          {
            where: { id: userId },
          }
        );

        console.log(`Se actualizó el usuario con id ${userId}`);
      } else {
        console.log(`No se realizaron cambios en el usuario con id ${userId}`);
      }
    } else {
      console.log(`No se encontró usuario con id ${userId}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Función para eliminar un usuario por su ID
const deleteUserById = async (id) => {
  try {
    await User.destroy({
      where: { id },
    });

    console.log(`Usuario con id ${id} fue borrado con éxito`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  createUser,
  findUserById,
  findAllUsers,
  updateUser,
  deleteUserById,
};

