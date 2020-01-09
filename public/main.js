console.log('JS loaded!');

function hello (uuid) {
  const uuidParam = uuid;
  console.log('hello');
  let source = new EventSource(`events/${uuidParam}`);

  source.onmessage = function(event) {
    console.log(event.data);
    source.close();
  }
}