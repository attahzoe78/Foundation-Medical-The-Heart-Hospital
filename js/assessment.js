/**
 * Heart Health Risk Assessment Logic
 * Foundation Medical - The Heart Hospital
 */

function calculateHeartRisk(data) {
    let score = 0;

    // Age factor
    if (data.age > 50) score += 2;
    if (data.age > 65) score += 2;

    // Blood Pressure factor
    if (data.trestbps > 130) score += 2;
    if (data.trestbps > 150) score += 3;

    // Cholesterol factor
    if (data.chol > 200) score += 1;
    if (data.chol > 240) score += 2;

    // Max Heart Rate factor (lower is higher risk in some contexts, but here we use it as stress indicator)
    if (data.thalach < 100) score += 2;

    // Angina factor
    if (data.exang === "1") score += 4;

    // Fasting blood sugar
    if (data.fbs === "1") score += 1;

    let riskLevel = "Low";
    let alertClass = "success";
    let advice = "Your cardiovascular health indicators look stable. Continue with a balanced diet and regular exercise.";

    if (score >= 5 && score < 10) {
        riskLevel = "Moderate";
        alertClass = "warning";
        advice = "Some indicators are elevated. We recommend scheduling a routine check-up with a cardiologist.";
    } else if (score >= 10) {
        riskLevel = "High";
        alertClass = "alert";
        advice = "Several high-risk factors detected. Please consult a medical professional immediately for a comprehensive evaluation.";
    }

    return {
        score: score,
        riskLevel: riskLevel,
        alertClass: alertClass,
        advice: advice
    };
}

// Browser implementation
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('assessment-form');
        const resultDiv = document.getElementById('risk-result');
        const resultTitle = document.getElementById('result-title');
        const resultText = document.getElementById('result-text');
        const resultAdvice = document.getElementById('result-advice');

        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();

                const formData = {
                    age: parseInt(document.getElementById('age').value),
                    sex: document.getElementById('sex').value,
                    trestbps: parseInt(document.getElementById('trestbps').value),
                    chol: parseInt(document.getElementById('chol').value),
                    fbs: document.getElementById('fbs').value,
                    thalach: parseInt(document.getElementById('thalach').value),
                    exang: document.getElementById('exang').value
                };

                const result = calculateHeartRisk(formData);

                resultDiv.className = 'callout ' + result.alertClass;
                resultDiv.style.display = 'block';
                resultTitle.innerText = 'Risk Level: ' + result.riskLevel;
                resultText.innerText = result.advice;
                resultAdvice.innerText = 'Risk Score: ' + result.score;
                resultAdvice.className = 'label ' + result.alertClass;

                resultDiv.scrollIntoView({ behavior: 'smooth' });
            });
        }
    });
}

// Export for Node.js testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calculateHeartRisk };
}
