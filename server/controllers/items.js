import Item from "../models/items.js";

export const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message:error.message });
  }
}

export const addItems = async (req, res) => {
  const data = req.body;
  const newItem = new Item(data);
  try {
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message : error.message })
  }
}

