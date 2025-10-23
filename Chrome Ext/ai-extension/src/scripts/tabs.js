// Tab switching logic
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
      // Update button states
      document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Update tab content
      document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
      document.getElementById(button.dataset.tab + 'Tab').classList.add('active');
    });
  });

  // Test Data Generator logic
  const testdataTab = document.getElementById('testdataTab');
  if (testdataTab) {
    const typeInput = document.getElementById('testdataTypeInput');
    const countInput = document.getElementById('testdataCountInput');
    const generateBtn = document.getElementById('testdataGenerateBtn');
    const resultDiv = document.getElementById('testdataResult');
    const copyBtn = document.getElementById('testdataCopyBtn');
    const resetBtn = document.getElementById('testdataResetBtn');
    let lastResults = [];

    function generateTestData(type, count) {
      const results = [];
      for (let i = 0; i < count; i++) {
        let result = '';
        switch(type) {
          case 'email':
            result = 'user' + Math.floor(Math.random()*10000) + '@example.com';
            break;
          case 'name':
            result = ['John Doe','Jane Smith','Alice Brown','Bob Lee','Charlie Kim'][Math.floor(Math.random()*5)];
            break;
          case 'phone':
            result = '+1-555-' + Math.floor(1000000 + Math.random()*9000000);
            break;
          case 'address':
            result = Math.floor(Math.random()*9999) + ' Main St, City';
            break;
          default:
            result = 'SampleData_' + Math.random().toString(36).substring(2,10);
        }
        results.push(result);
      }
      return results;
    }

    if (generateBtn && typeInput && countInput && resultDiv) {
      generateBtn.addEventListener('click', () => {
        const type = typeInput.value.trim().toLowerCase();
        let count = parseInt(countInput.value, 10);
        if (isNaN(count) || count < 1) count = 1;
        if (count > 100) count = 100;
        lastResults = generateTestData(type, count);
        resultDiv.innerHTML = '<ul style="text-align:left;max-width:400px;margin:0 auto;">' + lastResults.map(r => `<li>${r}</li>`).join('') + '</ul>';
        // Show Reset Chat button
        if (resetBtn) resetBtn.style.display = '';
      });
    }

    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        if (lastResults.length === 0) return;
        const text = lastResults.join('\n');
        navigator.clipboard.writeText(text).then(() => {
          copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
          setTimeout(() => { copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy'; }, 1500);
        });
      });
    }

    if (resetBtn) {
      // Hide Reset Chat button initially
      resetBtn.style.display = 'none';
      resetBtn.addEventListener('click', () => {
        typeInput.value = '';
        countInput.value = 1;
        resultDiv.innerHTML = '';
        lastResults = [];
        resetBtn.style.display = 'none';
      });
    }
  }
});