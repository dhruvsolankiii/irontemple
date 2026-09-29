/**
 * IronTemple — BMI Calculator JavaScript Module
 */

document.addEventListener("DOMContentLoaded", function () {
  const bmiForm = document.getElementById("bmiForm");
  if (!bmiForm) return;

  const weightInput = document.getElementById("bmi-weight");
  const heightInput = document.getElementById("bmi-height");
  const resultCard = document.getElementById("bmiResult");
  const bmiValueElem = document.getElementById("bmiValue");
  const bmiStatusElem = document.getElementById("bmiStatus");
  const bmiDescElem = document.getElementById("bmiDesc");
  const weightError = document.getElementById("bmiWeightError");
  const heightError = document.getElementById("bmiHeightError");

  bmiForm.addEventListener("submit", function (e) {
    e.preventDefault();
    
    let isValid = true;
    const weightVal = parseFloat(weightInput.value);
    const heightVal = parseFloat(heightInput.value);

    // Validate Weight
    if (!weightInput.value.trim() || isNaN(weightVal) || weightVal <= 0) {
      weightError.textContent = "Please enter a valid positive weight in kg.";
      weightError.style.display = "block";
      weightInput.classList.add("is-invalid");
      isValid = false;
    } else {
      weightError.style.display = "none";
      weightInput.classList.remove("is-invalid");
      weightInput.classList.add("is-valid");
    }

    // Validate Height
    if (!heightInput.value.trim() || isNaN(heightVal) || heightVal <= 0) {
      heightError.textContent = "Please enter a valid positive height in cm.";
      heightError.style.display = "block";
      heightInput.classList.add("is-invalid");
      isValid = false;
    } else {
      heightError.style.display = "none";
      heightInput.classList.remove("is-invalid");
      heightInput.classList.add("is-valid");
    }

    if (isValid) {
      const heightInMeters = heightVal / 100;
      const bmi = (weightVal / (heightInMeters * heightInMeters)).toFixed(1);
      
      bmiValueElem.textContent = bmi;

      let category = "";
      let categoryColor = "";
      let desc = "";

      if (bmi < 18.5) {
        category = "Underweight";
        categoryColor = "#f59e0b"; // Warning amber
        desc = "Your BMI suggests you are underweight. Consider consulting a trainer for a muscle-building plan.";
      } else if (bmi >= 18.5 && bmi <= 24.9) {
        category = "Normal Weight";
        categoryColor = "#10b981"; // Success green
        desc = "Congratulations! Your BMI falls within the healthy weight range. Keep up your fitness routine!";
      } else if (bmi >= 25 && bmi <= 29.9) {
        category = "Overweight";
        categoryColor = "#f97316"; // Orange
        desc = "Your BMI indicates you are overweight. A balanced cardio and strength regimen can help optimize health.";
      } else {
        category = "Obese";
        categoryColor = "#ef4444"; // Red
        desc = "Your BMI falls in the obese category. Our expert coaches can build a tailored, progressive wellness plan for you.";
      }

      bmiStatusElem.textContent = category;
      bmiStatusElem.style.color = categoryColor;
      if (bmiDescElem) {
        bmiDescElem.textContent = desc;
      }

      resultCard.style.display = "block";
      resultCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });
});
