console.log('JS loaded!');

function hello () {
  const uuidParam = Math.floor((Math.random() * 100) + 1);
  console.log('hello');
  let source = new EventSource(`events/${uuidParam}`);

  source.onmessage = function(event) {
    console.log(event.data);
    source.close();
  }
}