const form = document.querySelector('form');
const heightInput = document.querySelector('#height');
const weightInput = document.querySelector('#weight');
const results = document.querySelector('#results');
const fill = document.querySelector('.bmi-fill');
const resetBtn = document.querySelector('#reset');
const toggleBtn = document.querySelector('#toggleTheme');

// Theme toggle
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
});

// Animated BMI
function animateBMI(finalBMI, category, color) {
  let start = 0;
  const duration = 800;
  const increment = finalBMI / (duration / 16);

  const counter = setInterval(() => {
    start += increment;

    if (start >= finalBMI) {
      start = finalBMI;
      clearInterval(counter);
    }

    results.innerHTML = `
      <p>Your BMI</p>
      <h2>${start.toFixed(2)}</h2>
      <p>${category}</p>
    `;
    results.style.color = color;
  }, 16);
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const height = parseFloat(heightInput.value);
  const weight = parseFloat(weightInput.value);

  if (isNaN(height) || height <= 0) {
    results.innerHTML = "Invalid height";
    results.classList.add('show');
    return;
  }

  if (isNaN(weight) || weight <= 0) {
    results.innerHTML = "Invalid weight";
    results.classList.add('show');
    return;
  }

  const bmi = (weight / ((height * height) / 10000)).toFixed(2);

  let category = '';
  let color = '';

  if (bmi < 18.6) {
    category = 'Underweight';
    color = 'blue';
  } else if (bmi <= 24.9) {
    category = 'Normal';
    color = 'green';
  } else {
    category = 'Overweight';
    color = 'red';
  }

  results.classList.add('show');
  animateBMI(parseFloat(bmi), category, color);

  let percent = Math.min((bmi / 40) * 100, 100);
  fill.style.width = percent + "%";
  fill.style.background = color;
});

// Reset
resetBtn.addEventListener('click', () => {
  heightInput.value = '';
  weightInput.value = '';
  results.innerHTML = '';
  results.classList.remove('show');
  fill.style.width = '0%';
});