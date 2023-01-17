const textArea = document.getElementById('textarea');
const button = document.getElementById('button');

textArea.addEventListener('input', (e) => {
  console.log(textArea.value);
});

textArea.addEventListener('keydown', function (e) {
  if (e.key == 'Tab') {
    e.preventDefault();
    var start = this.selectionStart;
    var end = this.selectionEnd;

    // set textarea value to: text before caret + tab + text after caret
    this.value =
      this.value.substring(0, start) + '  ' + this.value.substring(end);

    // put caret at right position again
    this.selectionStart = this.selectionEnd = start + 2;
  }
});

button.addEventListener('click', (e) => {
  fetch('/ws', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: textArea.value,
  });
});
