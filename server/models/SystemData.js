const mongoose = require('mongoose');

const systemDataSchema = new mongoose.Schema(
  {
    deviceId: String,

    timestamp: Date,

    os: String,

    battery: {
      percent: Number,

      plugged: Boolean,
    },

    cpu: {
      usage: Number,

      temperature: Number,
    },

    memory: {
      total: Number,

      used: Number,

      percent: Number,
    },

    disk: {
      total: Number,

      used: Number,

      percent: Number,
    },

    uptime: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model('SystemData', systemDataSchema);
