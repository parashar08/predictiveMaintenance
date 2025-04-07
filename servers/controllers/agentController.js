// server/controllers/agentController.js
const { execFile } = require('child_process');
const path = require('path');

let intervalId = null;

const startAgent = (req, res) => {
  if (intervalId) {
    return res.status(200).json({ message: '✅ Agent is already running' });
  }

  const scriptPath = path.join(__dirname, '../../python-agent/collect_data.py');

  const runAgent = () => {
    execFile('python3', [scriptPath], (err, stdout, stderr) => {
      if (err) {
        console.error('Agent error:', err.message);
        return;
      }
      if (stderr) console.error('Agent stderr:', stderr);
      console.log('✅ Agent ran successfully:', stdout.trim());
    });
  };

  runAgent(); // Run once immediately
  intervalId = setInterval(runAgent, 60000); // Repeat every 1 min

  res
    .status(200)
    .json({ message: '🚀 Agent started and will run every 1 minute' });
};

module.exports = { startAgent };
