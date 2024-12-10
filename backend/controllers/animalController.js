const Animal = require("../models/Animal");

exports.getAnimais = async (req, res) => {
  try {
    const animais = await Animal.find();
    res.json(animais);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createAnimal = async (req, res) => {
  try {
    const novoAnimal = new Animal(req.body);
    const savedAnimal = await novoAnimal.save();
    res.status(201).json(savedAnimal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAnimal = async (req, res) => {
  try {
    const animalAtualizado = await Animal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(animalAtualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAnimal = async (req, res) => {
  try {
    await Animal.findByIdAndDelete(req.params.id);
    res.json({ message: "Animal deletado com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

