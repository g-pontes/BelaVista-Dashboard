const express = require("express");
const Gasto = require("../models/Gasto");
const Animal = require("../models/Animal");

const router = express.Router();

router.get("/stats", async (req, res) => {
  try {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const totalExpense = await Gasto.aggregate([
      { $group: { _id: null, total: { $sum: "$valor" } } },
    ]);

    const monthlyExpense = await Gasto.aggregate([
      {
        $match: {
          data: {
            $gte: new Date(currentYear, currentMonth, 1),
            $lt: new Date(currentYear, currentMonth + 1, 1),
          },
        },
      },
      { $group: { _id: null, total: { $sum: "$valor" } } },
    ]);

    const totalProfit = await Animal.aggregate([
      { $match: { vendido: true } },
      { $group: { _id: null, total: { $sum: "$valorVenda" } } },
    ]);

    const monthlyProfit = await Animal.aggregate([
      {
        $match: {
          vendido: true,
          dataVenda: {
            $gte: new Date(currentYear, currentMonth, 1),
            $lt: new Date(currentYear, currentMonth + 1, 1),
          },
        },
      },
      { $group: { _id: null, total: { $sum: "$valorVenda" } } },
    ]);

    const monthlyStats = await Promise.all(
        [...Array(12).keys()].map(async (i) => {
          const month = currentMonth - i >= 0 ? currentMonth - i : 12 + (currentMonth - i);
          const year = currentMonth - i >= 0 ? currentYear : currentYear - 1;
  
          const monthlyExpense = await Gasto.aggregate([
            {
              $match: {
                data: {
                  $gte: new Date(year, month, 1),
                  $lt: new Date(year, month + 1, 1),
                },
              },
            },
            { $group: { _id: null, total: { $sum: "$valor" } } },
          ]);
  
          const monthlyProfit = await Animal.aggregate([
            {
              $match: {
                vendido: true,
                dataVenda: {
                  $gte: new Date(year, month, 1),
                  $lt: new Date(year, month + 1, 1),
                },
              },
            },
            { $group: { _id: null, total: { $sum: "$valorVenda" } } },
          ]);
  
          return {
            month,
            year,
            expense: monthlyExpense[0]?.total || 0,
            profit: monthlyProfit[0]?.total || 0,
          };
        })
      );

    res.json({
      totalExpense: totalExpense[0]?.total || 0,
      monthlyExpense: monthlyExpense[0]?.total || 0,
      totalProfit: totalProfit[0]?.total || 0,
      monthlyProfit: monthlyProfit[0]?.total || 0,
      monthlyStats: monthlyStats.reverse(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao calcular estatísticas" });
  }
});

module.exports = router;

