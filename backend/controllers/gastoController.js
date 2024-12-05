const Gasto = require("../models/Gasto");

exports.getGastos = async (req, res) => {
  try {
    const { categoria, dataInicio, dataFim } = req.query;
    const filtro = {};
    if (categoria) filtro.categoria = categoria;
    if (dataInicio || dataFim) {
      filtro.data = {};
      if (dataInicio) filtro.data.$gte = new Date(dataInicio);
      if (dataFim) filtro.data.$lte = new Date(dataFim);
    }
    const gastos = await Gasto.find(filtro);
    res.json(gastos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createGasto = async (req, res) => {
  try {
    const novoGasto = new Gasto(req.body);
    const savedGasto = await novoGasto.save();
    res.status(201).json(savedGasto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateGasto = async (req, res) => {
  try {
    const gastoAtualizado = await Gasto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(gastoAtualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteGasto = async (req, res) => {
  try {
    await Gasto.findByIdAndDelete(req.params.id);
    res.json({ message: "Gasto deletado com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
