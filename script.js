document.addEventListener("DOMContentLoaded", function () {
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl)
    })
    const popoverButton = document.querySelectorAll('[data-bs-toggle="popover"][data-bs-content="Please Enter Numbers Only"]');

    // Trigger the click event on the popover button
    Array.from(popoverButton).forEach(function(button) {
        // console.log(button)
        // button.addEventListener('click', function() {
        //     if (button.style.display === 'none') {
        //         // Hide the popover manually
        //         const popover = new bootstrap.Popover(button);
        //         popover.hide();
        //     }
        // });
    });
    const grossIncomeInput = document.getElementById('grossIncome');
    const extraIncomeInput = document.getElementById('extraIncome');
    const deductionsInput = document.getElementById('deductions');
    const ageInput = document.getElementById('age');

    const errorIcons = document.querySelectorAll('.error-icon');

    const taxForm = document.getElementById('taxForm');
    const modal = document.getElementById('modal');
    const taxResultElement = document.getElementById('taxResult');

    taxForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Reset errors
        errorIcons.forEach(icon => icon.style.display = 'none');

        // Get input values
        const grossIncome = parseFloat(grossIncomeInput.value);
        const extraIncome = parseFloat(extraIncomeInput.value);
        const deductions = parseFloat(deductionsInput.value);

        // Validate inputs
        if (isNaN(grossIncome) || isNaN(extraIncome) || isNaN(deductions)) {
            showError('Please enter valid numerical values.');
            return;
        }

        // Get the age input value
        const ageGroup = ageInput.value;

        // Validate if age is provided
        if (ageGroup==="") {
            showError('Please select an age group.');
            return;
        }
        
        // Calculate tax
        let tax = 0;
        const taxableIncome = grossIncome + extraIncome - deductions;
        if (taxableIncome > 8) {
            if (ageGroup === '<40') {
                tax = 0.3 * (taxableIncome - 8);
            } else if (ageGroup === '≥40 & <60') {
                tax = 0.4 * (taxableIncome - 8);
            } else if (ageGroup === '≥60') {
                tax = 0.1 * (taxableIncome - 8);
            } else {
                showError('Invalid age group selected.'+ageGroup);
                return;
            }
        }


        // Display result
        showModal('Tax to pay: ' + tax.toFixed(2) + ' Lakhs' + '<br><h3>Your overall income will be</h3>' + (taxableIncome - tax).toFixed(2) + ' Lakhs After tax deduction');
    });

    function showError(message) {
        alert(message); // You can replace this with a more elegant error display
    }

    function showModal(message) {
        taxResultElement.innerHTML = message;
        modal.style.display = 'block';
    }

    // Close the modal when the close button is clicked
    document.querySelector('.close').addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Add event listeners to input fields for error icon and tooltip
    [grossIncomeInput, extraIncomeInput, deductionsInput].forEach(input => {
        input.addEventListener('input', function () {
            if (isNaN(this.value)) {
                showErrorIcon(this);
            } else {
                hideErrorIcon(this);
            }
        });
    });

    // Function to show error icon and tooltip
   
});
function showErrorIcon(input) {
    const errorIcon = input.nextElementSibling;
    const tooltip = errorIcon.nextElementSibling;
    errorIcon.style.display = 'inline-block';
    tooltip.style.visibility = 'visible';
}

// Function to hide error icon and tooltip
function hideErrorIcon(input) {
    const errorIcon = input.nextElementSibling;
    const tooltip = errorIcon.nextElementSibling;
    errorIcon.style.display = 'none';
    tooltip.style.visibility = 'hidden';
}