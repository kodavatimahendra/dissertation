// Add this function at the beginning of your JavaScript code
function init(moduleId) {
    const storageKey = moduleId + '_text';
  
    // submit buttons listeners
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

    // prev/next buttons listeners
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    prevBtn.addEventListener('click', function () {
        changeStep(moduleId, -1);
    });

    nextBtn.addEventListener('click', function () {
        changeStep(moduleId, 1);
    });

    // Load form data for each step
    for (let i = 0; i < steps.length; i++) {
      loadFormData(moduleId, i);
    }
}

function finish() {
  window.close();
}

// global variables to keep track of the current step
let currentStep = 0;
const steps = document.getElementsByClassName("step");
var timer = document.querySelector('.timer');
const textArea = document.getElementById('text-area');
const submitBtn = document.getElementById('submit-btn');
var typedText = document.querySelector('.typedText');
var isSubmitted = true;

// Initialize the first step
steps[currentStep].style.display = "block";

// function to save the q1/q2 answers
function saveFormData(moduleId, stepIndex) {
  const step = steps[stepIndex];
  const inputs = step.querySelectorAll("input, textarea, select");
  const formData = {};

  for (const input of inputs) {
      if (input.type === "radio" && !input.checked) continue;
      formData[input.name] = input.value;
  }

  const storageKey = moduleId + "_step" + stepIndex;
  localStorage.setItem(storageKey, JSON.stringify(formData));
}

// function to load the q1/q2 answers if they were already saved
function loadFormData(moduleId, stepIndex) {
  const step = steps[stepIndex];
  const inputs = step.querySelectorAll("input, textarea, select");
  const storageKey = moduleId + "_step" + stepIndex;
  const savedData = localStorage.getItem(storageKey);

  if (savedData) {
      const formData = JSON.parse(savedData);

      for (const input of inputs) {
          if (input.type === "radio") {
              input.checked = formData[input.name] === input.value;
          } else {
              input.value = formData[input.name];
          }
      }
  }
}

// prev/next functionality
function changeStep(moduleId, direction) {
  // Save the current step's data before changing the step
  saveFormData(moduleId, currentStep);

  steps[currentStep].style.display = "none";
  currentStep += direction;

  if (currentStep === steps.length - 1) { // last step, form submission
      const savedText = localStorage.getItem(moduleId + '_text');
      if (savedText) {  // load the saved text and be done with it.
          isSubmitted = false;
          textArea.style.display = 'none';
          typedText.innerHTML = savedText;
          submitBtn.disabled = false;
      }
      else{ // run timer
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
  }

  steps[currentStep].style.display = "block";

  document.getElementById("prevBtn").disabled = currentStep === 0;
  document.getElementById("nextBtn").disabled = currentStep === steps.length - 1;
}
