const mongoose = require('mongoose');
const Repo = require('../server/models/Repo');
const connectDB = require('../server/config/db');

const seedDB = async () => {
  await connectDB();
  // Sample repo data to seed
  const repo = new Repo({
    repoName: 'sample-repo',
    repoLink: 'https://github.com/user/sample-repo',
    readmeContent: 'This is a sample README.'
  });

  await repo.save();
  console.log('Sample data seeded');
  mongoose.connection.close();
};

seedDB();
