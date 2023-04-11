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

    // Call the generateQuestions() function when the page loads
    window.addEventListener('DOMContentLoaded', generateQuestions(moduleId));
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
function generateQuestions(moduleId) {
  const questions = [
      "Repeated, disturbing, and unwanted memories of the stressful experience?",
      "Repeated, disturbing dreams of the stressful experience?",
      "Suddenly feeling or acting as if the stressful experience were actually happening again (as if you were actually back there reliving it)?",
      "Feeling very upset when something reminded you of the stressful experience?",
      "Having strong physical reactions when something reminded you of the stressful experience (for example, heart pounding, trouble breathing, sweating)?",
      "Avoiding memories, thoughts, or feelings related to the stressful experience?",
      "Avoiding external reminders of the stressful experience (for example, people, places, conversations, activities, objects, or situations)?",
      "Trouble remembering important parts of the stressful experience?",
      "Having strong negative beliefs about yourself, other people, or the world (for example, having thoughts such as: I am bad, there is something seriously wrong with me, no one can be trusted, the world is completely dangerous)?",
      "Blaming yourself or someone else for the stressful experience or what happened after it?",
      "Having strong negative feelings such as fear, horror, anger, guilt, or shame?",
      "Loss of interest in activities that you used to enjoy?",
      "Feeling distant or cut off from other people?",
      "Trouble experiencing positive feelings (for example, being unable to feel happiness or have loving feelings for people close to you)?",
      "Irritable behavior, angry outbursts, or acting aggressively?",
      "Taking too many risks or doing things that could cause you harm?",
      "Being “superalert” or watchful or on guard?",
      "Feeling jumpy or easily startled?",
      "Having difficulty concentrating?",
      "Trouble falling or staying asleep?",
];

  const questionnaire1Element = document.getElementById('questionnaire1');
  const tbodyElement = questionnaire1Element.querySelector('tbody');

  questions.forEach((question, index) => {
      const questionId = `q${index + 1}`;
      const trElement = document.createElement('tr');
      const tdQuestionElement = document.createElement('td');
      const tdOptionAElement = document.createElement('td');
      const tdOptionBElement = document.createElement('td');
      const tdOptionCElement = document.createElement('td');
      const tdOptionDElement = document.createElement('td');
      const tdOptionEElement = document.createElement('td');
      const inputOptionAElement = document.createElement('input');
      const inputOptionBElement = document.createElement('input');
      const inputOptionCElement = document.createElement('input');
      const inputOptionDElement = document.createElement('input');
      const inputOptionEElement = document.createElement('input');

      tdQuestionElement.textContent = question;
      inputOptionAElement.setAttribute('name', questionId);
      inputOptionAElement.setAttribute('type', 'radio');
      inputOptionAElement.setAttribute('value', 'A');
      inputOptionBElement.setAttribute('name', questionId);
      inputOptionBElement.setAttribute('type', 'radio');
      inputOptionBElement.setAttribute('value', 'B');
      inputOptionCElement.setAttribute('name', questionId);
      inputOptionCElement.setAttribute('type', 'radio');
      inputOptionCElement.setAttribute('value', 'C');
      inputOptionDElement.setAttribute('name', questionId);
      inputOptionDElement.setAttribute('type', 'radio');
      inputOptionDElement.setAttribute('value', 'D');
      inputOptionEElement.setAttribute('name', questionId);
      inputOptionEElement.setAttribute('type', 'radio');
      inputOptionEElement.setAttribute('value', 'E');

      tdOptionAElement.appendChild(inputOptionAElement);
      tdOptionBElement.appendChild(inputOptionBElement);
      tdOptionCElement.appendChild(inputOptionCElement);
      tdOptionDElement.appendChild(inputOptionDElement);
      tdOptionEElement.appendChild(inputOptionEElement);
      trElement.appendChild(tdQuestionElement);
      trElement.appendChild(tdOptionAElement);
      trElement.appendChild(tdOptionBElement);
      trElement.appendChild(tdOptionCElement);
      trElement.appendChild(tdOptionDElement);
      trElement.appendChild(tdOptionEElement);

      tbodyElement.appendChild(trElement);
  });
  // Load form data for each step
  for (let i = 0; i < steps.length; i++) {
    loadFormData(moduleId, i);
  }
}