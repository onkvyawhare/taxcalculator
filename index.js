
  document.addEventListener('DOMContentLoaded', function() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    });

    document.querySelector('.btn').addEventListener('click', function() {
      // Reset error states
      resetErrors();

      // Fetch input values
      const grossIncome = parseFloat(document.getElementById('grossincome').value);
      const extraIncome = parseFloat(document.getElementById('othincome').value);
      const age = document.getElementById('age').value;
      const deductions = parseFloat(document.getElementById('deduction').value);

      // Validate inputs
      let isValid = true;
      if (isNaN(grossIncome)) {
        isValid = false;
        displayError('grossincome');
      }
      if (isNaN(extraIncome)) {
        isValid = false;
        displayError('othincome');
      }
      if (!age) {
        isValid = false;
        displayError('age');
      }
      if (isNaN(deductions)) {
        isValid = false;
        displayError('deduction');
      }

      if (isValid) {
        // Calculate tax
        let taxableIncome = grossIncome + extraIncome - deductions;
        let taxRate;
        if (age === '<40') {
          taxRate = 0.3;
        } else if (age === '≥ 40 & < 60') {
          taxRate = 0.4;
        } else {
          taxRate = 0.1;
        }
        let tax = (taxableIncome > 800000 ? (taxableIncome - 800000) * taxRate : 0);

        // Display tax result in modal
        document.querySelector('.modal-title').textContent = "Tax Calculation Result";
        document.querySelector('.modal-body').innerHTML = "<p>Tax to be paid: " + tax.toFixed(2) + " Lakhs</p>";

        // Show the modal
        var myModal = new bootstrap.Modal(document.getElementById('modal'));
        myModal.show();
      }
    });
  });

  function displayError(fieldId) {
    document.querySelector("#grosser").style.display = 'none';
  }

  function resetErrors() {
    document.querySelectorAll('.bi-exclamation-circle').forEach(function(element) {
      element.style.display = 'none';
    });
  }

