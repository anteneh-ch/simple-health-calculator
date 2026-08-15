/* ===== TAB SWITCHING ===== */
const tabButtons = document.querySelectorAll('.tab-btn');
const panels = document.querySelectorAll('.panel');

tabButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.target;

    tabButtons.forEach((b) => b.classList.remove('active'));
    panels.forEach((p) => p.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById(targetId).classList.add('active');
  });
});

/* ===== SHARED HELPERS ===== */
function readNumber(id) {
  const raw = document.getElementById(id).value;
  const num = parseFloat(raw);
  if (raw === '' || isNaN(num) || num < 0) return null;
  return num;
}

function showError(message) {
  alert(message);
}

/* ===== 01 — BMI CALCULATOR ===== */
document.getElementById('bmi-calc').addEventListener('click', () => {
  const weight = readNumber('bmi-weight');
  const heightCm = readNumber('bmi-height');

  if (weight === null || heightCm === null || heightCm === 0) {
    showError('Enter a valid weight and height first.');
    return;
  }

  const heightM = heightCm / 100;
  const bmi = weight / (heightM * heightM);

  let tag = '';
  let flagClass = 'flag-ok';
  if (bmi < 18.5) { tag = 'Underweight'; flagClass = 'flag-warn'; }
  else if (bmi < 25) { tag = 'Normal weight'; flagClass = 'flag-ok'; }
  else if (bmi < 30) { tag = 'Overweight'; flagClass = 'flag-warn'; }
  else { tag = 'Obese'; flagClass = 'flag-danger'; }

  document.getElementById('bmi-value').textContent = bmi.toFixed(1);
  const tagEl = document.getElementById('bmi-tag');
  tagEl.textContent = tag;
  tagEl.className = 'result-tag ' + flagClass;

  document.getElementById('bmi-result').hidden = false;
});

/* ===== 02 — DOSAGE CALCULATOR (mg/kg) ===== */
document.getElementById('dose-calc').addEventListener('click', () => {
  const weight = readNumber('dose-weight');
  const orderedDose = readNumber('dose-order');
  const strength = readNumber('dose-strength');

  if (weight === null || orderedDose === null || strength === null || strength === 0) {
    showError('Enter a valid weight, ordered dose, and available strength.');
    return;
  }

  const totalDose = weight * orderedDose;
  const units = totalDose / strength;

  document.getElementById('dose-total').textContent = totalDose.toFixed(2);
  document.getElementById('dose-units').textContent =
    `= ${units.toFixed(2)} unit(s) at ${strength} mg each`;

  document.getElementById('dose-result').hidden = false;
});

/* ===== 03 — HEART RATE TRAINING ZONES (Karvonen method) ===== */
document.getElementById('hr-calc').addEventListener('click', () => {
  const age = readNumber('hr-age');
  const resting = readNumber('hr-resting');

  if (age === null || resting === null) {
    showError('Enter a valid age and resting heart rate.');
    return;
  }

  const maxHR = 220 - age;
  const hrr = maxHR - resting;

  const zoneRanges = [
    [0.50, 0.60],
    [0.60, 0.70],
    [0.70, 0.80],
    [0.80, 0.90],
    [0.90, 1.00],
  ];

  zoneRanges.forEach(([low, high], i) => {
    const lowBpm = Math.round(hrr * low + resting);
    const highBpm = Math.round(hrr * high + resting);
    document.getElementById(`zone-${i + 1}`).textContent = `${lowBpm}–${highBpm} bpm`;
  });

  document.getElementById('hr-result').hidden = false;
});

/* ===== 04 — IV DRIP RATE ===== */
document.getElementById('iv-calc').addEventListener('click', () => {
  const volume = readNumber('iv-volume');
  const timeHours = readNumber('iv-time');
  const dropFactor = parseFloat(document.getElementById('iv-factor').value);

  if (volume === null || timeHours === null || timeHours === 0) {
    showError('Enter a valid volume and time.');
    return;
  }

  const dropsPerMin = (volume * dropFactor) / (timeHours * 60);
  const mlPerHour = volume / timeHours;

  document.getElementById('iv-rate').textContent = Math.round(dropsPerMin);
  document.getElementById('iv-mlhr').textContent = `≈ ${mlPerHour.toFixed(1)} mL/hr on a pump`;

  document.getElementById('iv-result').hidden = false;
});