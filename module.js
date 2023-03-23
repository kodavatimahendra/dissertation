// Add this function at the beginning of your JavaScript code
function init(moduleId) {
    const textArea = document.getElementById('text-area');
    const submitBtn = document.getElementById('submit-btn');
    var timer = document.querySelector('.timer');
    var typedText = document.querySelector('.typedText');
    var isSubmitted = true;
  
    const storageKey = moduleId + '_text';
  
    // Retrieve the text from Local Storage and display it if it exists
    const savedText = localStorage.getItem(storageKey);
    if (savedText) {
      isSubmitted = false;
      textArea.style.display = 'none';
      typedText.innerHTML = savedText;
      submitBtn.disabled = false;
    }
    else{
    // if (isSubmitted) {
      var minutes = 0;
      var seconds = 2;
  
      var interval = setInterval(function () {
        if (minutes == 0 && seconds == 0) {
          timer.innerHTML = "Time's up!";
          clearInterval(interval);
          submitBtn.disabled = false;
        } else {
          if (seconds == 0) {
            minutes--;
            seconds = 59;
          } else {
            seconds--;
          }
  
          timer.innerHTML = ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);
        }
      }, 1000);
    }
  
    submitBtn.addEventListener('click', function () {
      const savedText = localStorage.getItem(storageKey);
      if (savedText) {
        typedText.innerHTML = savedText;
        isSubmitted = true;
      }
      else{
        const text = textArea.value;
        localStorage.setItem(storageKey, text);
        textArea.style.display = 'none';
      }
      window.location.href = "modules.html";
    });
}

function finish() {
  window.close();
}
