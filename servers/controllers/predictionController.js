const predictSystem = (req, res) => {
  const inputData = req.body;

  const python = spawn('python3', ['server/ml-model/predict.py']);

  let result = '';

  python.stdout.on('data', (data) => {
    result += data.toString();
  });

  python.stdout.on('end', () => {
    try {
      const predictionOutput = JSON.parse(result);

      const fullResponse = {
        systemInfo: inputData, // what we gave to model

        predictionResult: predictionOutput, // what model returned
      };

      // Save to latest.json (optional)

      fs.writeFileSync(dataFilePath, JSON.stringify(fullResponse, null, 2));

      res.json(fullResponse);
    } catch (e) {
      res.status(500).json({ error: 'Invalid response from Python script' });
    }
  });

  python.stdin.write(JSON.stringify(inputData));

  python.stdin.end();
};

module.exports = predictSystem;
