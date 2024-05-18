import List from "../models/list.js";

export const createList = async(req, res) => {
  try {
    const { title, customProperties } = req.body;
    const list = new List({ title, customProperties });
    await list.save();
    res.status(200).json(list);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}