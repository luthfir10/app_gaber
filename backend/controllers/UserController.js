import UserModel from "../models/UserModel.js";
import argon2 from "argon2";
import { Op } from "sequelize";

export const getUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const search = req.query.search_query || "";
  const totalRows = await UserModel.count({
    where: {
      [Op.or]: [
        {
          uuid: {
            [Op.like]: "%" + search + "%",
          },
        },
        {
          username: {
            [Op.like]: "%" + search + "%",
          },
        },
        {
          namauser: {
            [Op.like]: "%" + search + "%",
          },
        },
      ],
    },
  });

  const limit = parseInt(req.query.limit) || totalRows;
  const offset = limit * page;
  const totalpage = Math.ceil(totalRows / limit);
  const result = await UserModel.findAll({
    attributes: ["uuid", "namauser", "username", "role"],
    where: {
      [Op.or]: [
        {
          uuid: {
            [Op.like]: "%" + search + "%",
          },
        },
        {
          username: {
            [Op.like]: "%" + search + "%",
          },
        },
        {
          namauser: {
            [Op.like]: "%" + search + "%",
          },
        },
      ],
    },
    offset: offset,
    limit: limit,
    order: [["id", "ASC"]],
  });
  res.json({
    result: result,
    page: page,
    limit: limit,
    totalRows: totalRows,
    totalpage: totalpage,
  });
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
  const totalRows = await UserModel.count({
    where: {
      username: username,
    },
  });
  if (totalRows > 0)
    return res.status(400).json({ message: "Username Sudah digunakan.!" });
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
    res.status(200).json({ message: "Data berhasil diupdate." });
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
    res.status(200).json({ message: "Data berhasil dihapus." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
