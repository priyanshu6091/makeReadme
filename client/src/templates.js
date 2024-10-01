const templates = {
    basic: `# Project Title\n\n## Description\nYour project description.`,
    advanced: `# Project Title\n\n## Description\nYour project description with detailed information.`
};

function generateReadme(templateKey) {
    return templates[templateKey] || templates.basic;
}

export { generateReadme };
