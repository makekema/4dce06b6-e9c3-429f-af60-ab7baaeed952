import express from 'express';
import fs from 'fs';
import path from 'path';

import React from 'react';
import ReactDOMServer from 'react-dom/server'
import App from '../src/App.jsx'

const PORT = 3000;
const app = express();

// CORS headers middleware
app.use((req, res, next) => {
  // Set the Access-Control-Allow-Origin header to allow requests from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Set other CORS headers as needed
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Pass control to the next middleware
  next();
});

app.use(express.json());

// Proxy route
app.post('/api', async (req, res) => {
  console.log(req.body);
  const payload = req.body;

  try {
    // Make a request to the target server
    const response = await fetch('https://platform.laudostaging.com/items/submissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
    },
      body: JSON.stringify(payload),
    })

  console.log(response);

    // Return the response from the target server to the client
    res.status(response.status);
    res.json(response.data);
  } catch (error) {
    // Handle any errors that occurred during the request
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.use('^/$', (req, res) => {
  fs.readFile(path.resolve('./build/index.html'), 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send('An error occurred');
    }

  const html = ReactDOMServer.renderToString(<App/>);

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${html}</div>`)
    );
  });
});

app.use(express.static(path.resolve(__dirname, "..", "build")));

app.listen(PORT, () => {
  console.log('🎢 Server is listening on PORT 3000')
});