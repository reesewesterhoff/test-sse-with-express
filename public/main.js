console.log('JS loaded!');

function hello () {
  const uuidParam = Math.floor((Math.random() * 100) + 1);
  console.log('Report uuid:', uuidParam);
  let source = new EventSource(`events/${uuidParam}`);

  source.onmessage = function(event) {
    console.log(event.data);
    source.close();
  }
}

function getTextAreaValue() {
  const textAreaValue = document.getElementById('textArea').value;
  console.log('The value you typed in is:', textAreaValue);
}
