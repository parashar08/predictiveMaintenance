const SystemData = require('../models/SystemData');

exports.receiveData = async (req, res) => {
  try {
    const data = new SystemData(req.body);
    await data.save();

    res.status(200).json({ message: 'Data saved successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save system data' });
  }
};
