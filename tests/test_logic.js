const { calculateHeartRisk } = require('../js/assessment.js');

function runTests() {
    console.log("Running Heart Health Risk Assessment Logic Tests...");

    const testCases = [
        {
            name: "Low Risk Case",
            data: { age: 30, trestbps: 110, chol: 180, thalach: 160, exang: "0", fbs: "0" },
            expectedRisk: "Low"
        },
        {
            name: "Moderate Risk Case (High Age + High BP)",
            data: { age: 70, trestbps: 160, chol: 190, thalach: 140, exang: "0", fbs: "0" },
            expectedRisk: "Moderate"
        },
        {
            name: "High Risk Case (Angina + High Chol + High BP)",
            data: { age: 60, trestbps: 160, chol: 250, thalach: 130, exang: "1", fbs: "1" },
            expectedRisk: "High"
        }
    ];

    let passed = 0;
    testCases.forEach(test => {
        const result = calculateHeartRisk(test.data);
        if (result.riskLevel === test.expectedRisk) {
            console.log(`✅ PASS: ${test.name}`);
            passed++;
        } else {
            console.error(`❌ FAIL: ${test.name}. Expected ${test.expectedRisk}, got ${result.riskLevel} (Score: ${result.score})`);
        }
    });

    console.log(`\nTests Completed: ${passed}/${testCases.length} Passed.`);

    if (passed !== testCases.length) {
        process.exit(1);
    }
}

runTests();
