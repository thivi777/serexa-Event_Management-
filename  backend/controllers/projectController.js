const ProjectModel = require('../models/projectModel');

const getAllProjects = (req, res) => {
    try {
        const projects = ProjectModel.getProjects();
        res.status(200).json(projects);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

const remixProject = (req, res) => {
    // Dummy remix action
    res.status(200).json({ message: "Project remixed!", newProjectId: Math.floor(Math.random() * 1000) });
};

const sendChatMessage = (req, res) => {
    const { message } = req.body;
    console.log(`[AGENT CHAT] User: ${message}`);
    
    // Simple mock logic for specific keywords
    let response = "I'm on it! I'll analyze your request and update the prototype.";
    if (message.toLowerCase().includes('dark mode')) {
        response = "Switching to dark mode palette. One moment...";
    } else if (message.toLowerCase().includes('sidebar')) {
        response = "Adjusting sidebar layout and navigation items.";
    }

    res.status(200).json({ 
        agentResponse: response,
        timestamp: new Date().toISOString()
    });
};

module.exports = { getAllProjects, remixProject, sendChatMessage };
