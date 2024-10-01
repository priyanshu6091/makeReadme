const axios = require('axios');

// Fetch commits
async function fetchCommits(owner, repo) {
    const url = `https://api.github.com/repos/${owner}/${repo}/commits`;
    try {
        const response = await axios.get(url);
        return response.data.map(commit => ({
            message: commit.commit.message,
            author: commit.commit.author.name,
            date: commit.commit.author.date,
        }));
    } catch (error) {
        console.error('Error fetching commits:', error);
        return [];
    }
}

// Fetch contributions
async function fetchContributors(owner, repo) {
    const url = `https://api.github.com/repos/${owner}/${repo}/contributors`;
    try {
        const response = await axios.get(url);
        return response.data.map(contributor => ({
            login: contributor.login,
            contributions: contributor.contributions,
        }));
    } catch (error) {
        console.error('Error fetching contributors:', error);
        return [];
    }
}

// Fetch traffic insights (note: requires authentication)
async function fetchTraffic(owner, repo) {
    const url = `https://api.github.com/repos/${owner}/${repo}/traffic/views`;
    try {
        const response = await axios.get(url, { headers: { Authorization: `token YOUR_GITHUB_TOKEN` } });
        return response.data;
    } catch (error) {
        console.error('Error fetching traffic data:', error);
        return {};
    }
}

module.exports = { fetchCommits, fetchContributors, fetchTraffic };
