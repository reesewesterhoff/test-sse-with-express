const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  console.log('hello!');
  res.send('Hello world!');
});

app.get('/events/:uuid', (req, res) => {
  console.log('Events hit', req.params.uuid);
  // SSE Setup
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });
  res.write('\n');

  sseDemo(req, res);
});

app.listen(port, () => {
  console.log('App listening on port:', port);
});


async function sseDemo(req, res) {
  let messageId = 0;

  setTimeout(() => {
    res.write(`id: 2\n`)
    res.write(`data: 37 seconds passed\n\n`);
    res.end();
  }, 37000);

  // const intervalId = setTimeout(() => {
  //   // if (messageId > 10) {
  //   //   res.end();
  //   //   clearInterval(intervalId);
  //   // } else {
  //     // res.write(`id: ${messageId}\n`);
  //     res.write(`data: Test Message -- ${Date.now()}\n\n`);
  //     res.end();
  //     // messageId += 1;
  //   // }
  // }, 1000);

  // req.on('close', () => {
  //   console.log('closed')
  //     clearInterval(intervalId);
  // });
}