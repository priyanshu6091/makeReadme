const express = require('express');
const { fetchRepoData } = require('../utils/githubAPI');
const { generateReadme } = require('../utils/googleGeminiAPI');
const Repo = require('../models/Repo');

const router = express.Router();

router.post('/generate-readme', async (req, res) => {
  const { repoLink } = req.body;

  try {
    const repoInfo = await fetchRepoData(repoLink);
    const readmeContent = await generateReadme(repoInfo);

    const repo = new Repo({
      repoName: repoInfo.name,
      repoLink: repoInfo.html_url,
      readmeContent
    });
    await repo.save();

    res.json({ readme: readmeContent });
  } catch (err) {
    console.error('Error generating README:', err);
    res.status(500).json({ error: 'Error generating README' });
  }
});

module.exports = router;
