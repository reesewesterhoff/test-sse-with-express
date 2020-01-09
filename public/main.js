console.log('JS loaded!');

function hello (uuid) {
  const uuidParam = uuid;
  console.log('hello');
  let source = new EventSource(`events/${uuidParam}`);

  source.addEventListener('message', function (event) {
    console.log('Message received', event.data)
  });

  source.addEventListener('open', function (event) {
    console.log('Connection opened');
  });
  
  source.addEventListener('error', function (event) {
    if (event.eventPhase === EventSource.CLOSED) {
      source.close();
    }
    if (event.target.readyState === EventSource.CLOSED) {
      console.log('Disconnected')
    } else if (event.target.readyState === EventSource.CONNECTING) {
      console.log('Connecting...')
    }
  })
}