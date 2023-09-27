import express, {Request, Response} from 'express';
import fs from 'fs';
import path from 'path';

import React from 'react';
import ReactDOMServer from 'react-dom/server'
import App from '../src/App'

const PORT = 3000;
const app = express();


app.use('^/$', (req: Request, res: Response) => {
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
