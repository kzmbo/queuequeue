const express = require('express');
const router = express.Router();

// Models
const User = require('../models/User');

const client_id = '103382d6342a44e3aeb5cfbdcbb18d3c';
const redirect_uri = 'http://localhost:3000/callback';

router.get('/login', async (req, res) => {
    const state = 'test';
    const scope = 'user-read-private user-read-email streaming user-read-email';

    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
})


router.post('/token', async (req, res) => {
    var code = req.query.code || null;
    var state = req.query.state || null;

    try {
        // Make a POST request to Spotify token endpoint
        const response = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: 'http://localhost:3000/callback', // Your redirect URI
            client_id: '103382d6342a44e3aeb5cfbdcbb18d3c',
            client_secret: '0c416e41790449148669e25d6b66a06c'
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        // Extract and send the access token in the response
        res.json({ access_token: response.data.access_token });
    } catch (error) {
        console.error('Error exchanging code for token:', error);
        res.status(500).json({ error: 'Failed to exchange code for token' });
    }
});


module.exports = router;


