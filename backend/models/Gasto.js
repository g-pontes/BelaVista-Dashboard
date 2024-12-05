const mongoose = require("mongoose");

const GastoSchema = new mongoose.Schema(
  {
    categoria: {
      type: String,
      enum: ["racao", "mao-de-obra", "limpeza", "pasto", "medicamento"],
      required: true,
    },
    valor: { type: Number, required: true },
    data: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gasto", GastoSchema);
