import express from "express";
import {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} from "../controller/item.controller.js";

const router = express.Router();

router.get("/", getItems);
router.post("/", createItem);

router.get("/:id", getItem)
router.put("/:id", updateItem)
router.delete("/:id", deleteItem);

export default router;
