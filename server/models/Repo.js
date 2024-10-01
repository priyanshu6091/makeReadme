const mongoose = require('mongoose');

const repoSchema = new mongoose.Schema({
  repoName: {
    type: String,
    required: true
  },
  repoLink: {
    type: String,
    required: true
  },
  readmeContent: {
    type: String,
    required: true
  },
}, { timestamps: true });

const Repo = mongoose.model('Repo', repoSchema);

module.exports = Repo;
