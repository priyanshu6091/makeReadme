const axios = require('axios');

async function fetchRepoData(repoLink) {
  const repoName = extractRepoName(repoLink);
  const apiUrl = `https://api.github.com/repos/${repoName}`;

  const response = await axios.get(apiUrl, {
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
    }
  });

  return response.data;
}

function extractRepoName(repoLink) {
  const match = repoLink.match(/github\.com\/([^\/]+\/[^\/]+)/);
  if (!match) throw new Error('Invalid GitHub URL');
  return match[1];
}

module.exports = { fetchRepoData };
