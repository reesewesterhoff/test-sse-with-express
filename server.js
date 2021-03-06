const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
let obj = {};
let number = 0;
let globalRandomNumber = 0;

app.use(express.static('public'));

app.get('/', (req, res) => {
  console.log('hello!');
  res.send('Hello world!');
});

app.get('/events/:uuid', async (req, res) => {
  console.log('SSE uuid', req.params.uuid);
  globalRandomNumber = req.params.uuid
  // SSE Setup
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });
  
  const startTime = new Date().getTime();
  setTimeout(() => {
    console.log('10 seconds elapsed')
    res.write(`data: ${new Date().getTime() - startTime}ms has elapsed\n`);
    res.write(`data: Here is a large number that was calculated by node: ${number}\n\n`)
    res.end();
  }, 25000)

  // doProcess();

  // setTimeout(() => { 
  //   res.write(`data: 25 seconds passed\n\n`);
  //   res.end();
  // }, 25000);

  req.on('close', (event) => {
    console.log('SSE connection closed', event)
  });
});

app.listen(port, () => {
  console.log('App listening on port:', port);
});

function doProcess() {
  for (let i = 0; i < 100000; i++) {
    obj['i' + i] = 'i' + i;
    for (let j = 0; j < 700; j++) {
      obj['j' + j] = 'j' + j;
      number = i * (j - 1) * globalRandomNumber - 28876 / 3
    }
  }
}

// async function sseDemo(req, res) {
//   let messageId = 0;

//   setTimeout(() => {
//     res.write(`id: 2\n`)
//     res.write(`data: 75 seconds passed\n\n`);
//     res.end();
//   }, 75000);

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
// }