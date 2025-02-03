// Populate the dropdowns with months and days
window.onload = () => {
  const monthSelect = document.getElementById('monthSelect');
  const daySelect = document.getElementById('daySelect');

  // Populate months
  const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
  ];
  months.forEach((month, index) => {
      const option = document.createElement('option');
      option.value = (index + 1).toString().padStart(2, '0'); // Format as 01, 02, etc.
      option.textContent = month;
      monthSelect.appendChild(option);
  });

  // Populate days (1-31)
  for (let i = 1; i <= 31; i++) {
      const option = document.createElement('option');
      option.value = i.toString().padStart(2, '0'); // Format as 01, 02, etc.
      option.textContent = i;
      daySelect.appendChild(option);
  }
};

function checkBirthday() {
  const month = document.getElementById('monthSelect').value;
  const day = document.getElementById('daySelect').value;
  const inputScreen = document.querySelector('.firstScreen');
  const resultScreen = document.getElementById('loadingScreen');
  const result = document.getElementById('resultText');

  if (!month || !day) {
      alert("Please select both a month and a day!");
      return;
  }

  // Switch to result screen
  inputScreen.style.display = 'none';
  resultScreen.style.display = 'flex';

  // Simulate a 5-second delay
  setTimeout(() => {
      // Get today's date in Mountain Time
      const formatter = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Denver' });
      const parts = formatter.formatToParts(new Date());
      const todayMonthDay =
          parts.find(p => p.type === 'month').value.padStart(2, '0') +
          '-' +
          parts.find(p => p.type === 'day').value.padStart(2, '0');

      const birthdayMonthDay = `${month}-${day}`;

      // Compare and display the result
      if (birthdayMonthDay === todayMonthDay) {
          result.textContent = "🎉 Happy Birthday! 🎂";
      } else {
          result.textContent = "Awe, it's not your birthday.";
      }

      // Show candles animation
      candles.style.display = 'flex';
  }, 1000); // 3-second delay
}

function goBack() {
  // Show the input screen
  document.querySelector('.firstScreen').style.display = 'block';

  // Hide the result screen
  document.getElementById('loadingScreen').style.display = 'none';

  // Clear the result text
  document.getElementById('resultText').textContent = '';

  // Reset the dropdowns
  document.getElementById('monthSelect').value = '';
  document.getElementById('daySelect').value = '';
}