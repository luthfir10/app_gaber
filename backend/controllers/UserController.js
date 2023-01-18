import UserModel from "../models/UserModel.js";
import argon2 from "argon2";

export const getUsers = async (req, res) => {
  try {
    const response = await UserModel.findAll({
      attributes: ["uuid", "namauser", "username", "role"],
    });
    res.status(200).json({
      result: response,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await UserModel.findOne({
      attributes: ["uuid", "namauser", "username", "role"],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json({
      result: response,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUsers = async (req, res) => {
  const { namauser, username, password, confPassword, role } = req.body;
  if (password !== confPassword)
    return res
      .status(400)
      .json({ message: "Password dan Confirm Password tidak cocok" });
  const hashPassword = await argon2.hash(password);
  try {
    await UserModel.create({
      namauser: namauser,
      username: username,
      password: hashPassword,
      role: role,
    });
    res.status(201).json({ message: "Register Berhasil" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateUsers = async (req, res) => {
  const user = await UserModel.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
  const { namauser, username, password, confPassword, role } = req.body;
  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await argon2.hash(password);
  }
  if (password !== confPassword)
    return res
      .status(400)
      .json({ message: "Password dan Confirm Password tidak cocok" });
  try {
    await UserModel.update(
      {
        namauser: namauser,
        username: username,
        password: hashPassword,
        role: role,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(200).json({ message: "User Update" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUsers = async (req, res) => {
  const user = await UserModel.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
  try {
    await UserModel.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(200).json({ message: "User Deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
