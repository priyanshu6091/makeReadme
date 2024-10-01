const axios = require('axios');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { fetchCommits, fetchContributors, fetchTraffic } = require('./githubDataFetchers');

// Initialize the Google Gemini AI model
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function generateReadme(repoInfo) {
  const owner = repoInfo.owner.login;  // Fetch owner from repoInfo
  const repo = repoInfo.name;  // Fetch repo name
  
  // Fetch GitHub-specific data (commits, contributors, traffic)
  const commits = await fetchCommits(owner, repo);
  const contributors = await fetchContributors(owner, repo);
  const traffic = await fetchTraffic(owner, repo);

  // Format the GitHub-specific data into sections
  const commitsSection = `### Recent Commits:\n${commits.map(commit => `- ${commit.message} by ${commit.author} on ${commit.date}`).join('\n')}\n\n`;
  const contributorsSection = `### Contributors:\n${contributors.map(contributor => `- ${contributor.login}: ${contributor.contributions} contributions`).join('\n')}\n\n`;
  const trafficSection = traffic.count
    ? `### Traffic Insights:\n- ${traffic.count} views in the last 14 days\n- ${traffic.uniques} unique visitors\n\n`
    : `### Traffic Insights:\n- No traffic data available.\n\n`;

  // Prepare the prompt for Google Gemini AI
  const prompt = `
  Generate a detailed README for the following GitHub repository based on the code and technologies used:
  - Repo name: ${repoInfo.name}
  - Description: ${repoInfo.description}
  - Main language: ${repoInfo.language}

  Please ensure to include the following sections with detailed content:

1. **Project Overview**: Summarize the project's purpose and target audience. 
2. **Installation Instructions**: Provide clear step-by-step instructions to install the project, including prerequisites (like Node.js, MongoDB, etc.).
3. **Usage**: Explain how to run the project, including:
   - How to start the server and frontend (e.g., npm start)
   - Environment variables that need to be set up
   - Example commands for testing or deploying
4. **Features**: Highlight key features with brief explanations and use cases.
5. **Technologies Used**: List technologies, frameworks, and libraries. Include version numbers where applicable.
6. **Contributing**: Provide guidelines for contributing, including:
   - How to fork the repository
   - Branching strategy
   - Code style guidelines
7. **License**: State the license under which the project is distributed, and any relevant links.
8. **Troubleshooting**: Common issues and how to resolve them.
9. **Further Reading/Resources**: Links to documentation or resources for further learning related to the technologies used.
10. **Contact Information**: How users can reach out for support or questions.
11. **Commits**: Provide a summary of recent commits. 
12. **Contributors**: List of contributors and their contribution counts.
13. **Traffic Insights**: Include GitHub traffic insights such as page views and unique visitors.

Make the README user-friendly and include markdown syntax for formatting.

${commitsSection}
${contributorsSection}
${trafficSection}
  `;

  // Generate the README using Google Gemini AI
  const result = await model.generateContent(prompt);

  // Log the AI's response to verify the content
  console.log(result.response.text());

  // Construct the final README by appending GitHub-specific sections
  const finalReadme = `
  ${result.response.text()}
  ${commitsSection}
  ${contributorsSection}
  ${trafficSection}
  `;

  return finalReadme;
}

module.exports = { generateReadme };
