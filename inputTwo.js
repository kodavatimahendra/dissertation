// Get references to the HTML elements
const textArea = document.getElementById('text-area');
const submitBtn = document.getElementById('submit-btn');
var timer = document.querySelector('.timer');
var typedText = document.querySelector('.typedText');
var isSubmitted = true;

// Retrieve the text from Local Storage and display it if it exists
const savedText = localStorage.getItem('textTwo');
if (savedText) {
  isSubmitted=false;
  textArea.style.display = 'none';
  typedText.innerHTML = savedText;
  submitBtn.disabled = false;
}

if(isSubmitted){
		var minutes = 0;
		var seconds = 5;

		var interval = setInterval(function() {
			if (minutes == 0 && seconds == 0) {
				timer.innerHTML = "Time's up!";
				clearInterval(interval);
                submitBtn.disabled = false;
                  }
			 else {
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

// Start the timer interval
const intervalId = setInterval(updateTimer(), 1000);

// Add an event listener to the submit button

function clickedSubmit(){
    const textTwo = textArea.value;
  localStorage.setItem('textTwo', textTwo);
    textArea.style.display = 'none';
    const savedText = localStorage.getItem('textTwo');
    if (savedText) {
        typedText.innerHTML = savedText;
        isSubmitted = true;
    }
    window.location.href = "modules.html";
}


