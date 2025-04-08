const express = require('express');
const path = require('path');
const {Version3Client} = require("jira.js");
const app = express();
const port = 3000;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Middleware per servire file statici
app.use(express.static(path.join(__dirname, 'public')));

// Middleware per parsare il corpo delle richieste JSON
app.use(express.json());

// Endpoint per le richieste API a Jira
app.post('/api/jira/users', async (req, res) => {
    const { jiraBaseUrl, jiraApiToken, jiraEmail } = req.body;
    console.log(req);

    const client = new Version3Client({
        host: jiraBaseUrl,
        authentication: {
            basic: {
                email: jiraEmail,
                apiToken: jiraApiToken,
            },
        },
    });

    try {
        const users = await client.users.getAllUsers({
            includeInactive: false, // Imposta a false per ottenere solo gli utenti attivi
        });
        console.log(users);

        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error('Error details:', error.response ? error.response.data : error.message);
    }
});

// Avvia il server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
