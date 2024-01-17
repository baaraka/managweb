import jwt from "jsonwebtoken";
import { dbConnect } from "../dbConnect.js";
import bcrypt from "bcryptjs";

//register a  user
export const register = (req, res) => {
  //check the existing user
  const q = "SELECT * FROM users WHERE email = ? OR username = ?";

  dbConnect.query(q, [req.body.email, req.body.username], (error, data) => {
    if (error) return res.status(500).json(error);
    if (data.length) {
      return res.status(409).json("User already exists!");
    }

    //Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const insertQuery =
      "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";

    const values = [req.body.username, req.body.email, hash];
    dbConnect.query(insertQuery, [values], (error, data) => {
      if (error) {
        return res.status(500).json(error);
      }
      return res.status(200).json("User has been created!");
    });
  });
};

//login user
export const login = (req, res) => {
  //check if the user exist
  const q = "SELECT * FROM users WHERE email = ?";

  dbConnect.query(q, [req.body.email], (error, data) => {
    if (error) return res.status(500).json(error);
    if (data.length === 0) return res.status(404).json("user not found!");

    //check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordCorrect)
      return res.status(400).json("Wrong email or password!");

    const token = jwt.sign({ id: data[0].id }, "jwtkey");

    const { password, ...other } = data[0];

    res
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        path: "/",
      })
      .status(200)
      .json(other);
  });
};

//logout user
export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      path: "/",
      expires: new Date(0),
    })
    .status(200)
    .json("user has been logged out");
};
