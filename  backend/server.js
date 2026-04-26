const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const apiKeyRoutes = require('./routes/apiKeyRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
    origin: '*', // Allow all origins for development
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
    console.log(`[API REQUEST] ${req.method} ${req.path}`);
    next();
});

// Domain-Specific Routes
app.use('/api/user', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/keys', apiKeyRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.listen(PORT, () => {
    console.log(`Serexa User Backend running on port ${PORT}`);
});
