import { dbConnect } from "../dbConnect.js";
import jwt from "jsonwebtoken";

//create post item
export const addItem = (req, res) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json("Not authenticated!.");
  }

  jwt.verify(token, "jwtkey", (error, userInfo) => {
    console.error("Token verification error:", error);
    if (error) {
      return res.status(403).json("Token is not valid");
    }

    const q = "INSERT INTO items (`title`, `price`, `uid`) VALUES (?)";

    const values = [req.body.title, req.body.price, userInfo.id];

    dbConnect.query(q, [values], (error, data) => {
      if (error) return res.status(500).json(error);
      return res.status(200).json("post has been created");
    });
  });
};

//get all post items
export const getItems = (req, res) => {
  const q = "SELECT * FROM items";

  dbConnect.query(q, [], (error, data) => {
    if (error) {
      console.error("Error retrieving items:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.status(200).json(data);
  });
};
