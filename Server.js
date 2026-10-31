import express from 'express';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    status: "ONLINE",
    engine: "Autonomous x402 Revenue Receiver",
    network: "base-mainnet",
    asset: "USDC",
    timestamp: new Date().toISOString()
  });
});

app.post('/api/execute-task', (req, res) => {
  const { amountUsd, task } = req.body;
  console.log(`[EXECUTION] Task received: ${task || 'Automated Job'} | Target: $${amountUsd || '0.00'}`);
  res.json({
    success: true,
    message: "Execution complete. Revenue logged.",
    charged: amountUsd || "0.00",
    settledTo: process.env.USDC_SETTLEMENT_ADDRESS || "Pending Configuration"
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[READY] Money-making execution machine listening on port ${PORT}`);
});
