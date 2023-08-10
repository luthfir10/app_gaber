import UserModel from "../models/UserModel.js";
import argon2 from "argon2";

export const Login = async (req, res) => {
  const user = await UserModel.findOne({
    where: {
      username: req.body.username,
    },
  });
  if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
  const match = await argon2.verify(user.password, req.body.password);
  if (!match) return res.status(400).json({ message: "Wrong Password" });
  req.session.userId = user.uuid;
  const uuid = user.uuid;
  const namauser = user.namauser;
  const username = user.username;
  const role = user.role;
  res.status(200).json({ uuid, namauser, username, role });
};

export const Me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Mohon login ke akun Anda!" });
  }
  const user = await UserModel.findOne({
    attributes: ["uuid", "namauser", "username", "role"],
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
  res.status(200).json(user);
};

export const logOut = async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ message: "Tidak dapat logout" });
    res
      .status(200)
      .clearCookie("connect.sid")
      .json({ message: "Anda Telah logout" });
  });
};
