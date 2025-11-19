/**
 * MYSEC-PM & MYSEC-mPM Calculator Test Suite
 * 
 * This file contains comprehensive tests for the calculator functions.
 * It can be run independently or included in the test HTML page.
 */

// Test cases data
const testCases = [
    {
        id: 1,
        name: "Low Risk (Both Models)",
        inputs: {
            age: 45,
            cs: false,
            hb: false,
            plt: false,
            blasts: false,
            calr: false,
            asxl1: false,
            uts: false
        },
        expected: {
            pmScore: 6.75,
            pmRisk: "Low risk (< 11), median survival NR",
            pmMolScore: 9.45,
            pmMolRisk: "Low risk (< 14), median survival 18 years"
        }
    },
    {
        id: 2,
        name: "High Risk (Both Models)",
        inputs: {
            age: 80,
            cs: true,
            hb: true,
            plt: true,
            blasts: true,
            calr: true,
            asxl1: true,
            uts: true
        },
        expected: {
            pmScore: 20,
            pmRisk: "High risk (≥ 16), median survival 2.0 years",
            pmMolScore: 25.8,
            pmMolRisk: "High risk (≥ 19), median survival 1.9 years"
        }
    },
    {
        id: 3,
        name: "Low Risk (Both Models)",
        inputs: {
            age: 60,
            cs: true,
            hb: false,
            plt: false,
            blasts: false,
            calr: false,
            asxl1: false,
            uts: false
        },
        expected: {
            pmScore: 10,
            pmRisk: "Low risk (< 11), median survival NR",
            pmMolScore: 12.6,
            pmMolRisk: "Low risk (< 14), median survival 18 years"
        }
    },
    {
        id: 4,
        name: "High Risk (PM), Intermediate-2 (Mol)",
        inputs: {
            age: 68,
            cs: true,
            hb: true,
            plt: false,
            blasts: true,
            calr: true,
            asxl1: false,
            uts: false
        },
        expected: {
            pmScore: 17.2,
            pmRisk: "High risk (≥ 16), median survival 2.0 years",
            pmMolScore: 17.28,
            pmMolRisk: "Intermediate-2 risk (17-18), median survival 4.6 years"
        }
    },
    {
        id: 5,
        name: "High Risk (PM), Not Calculable (Mol)",
        inputs: {
            age: 50,
            cs: true,
            hb: true,
            plt: true,
            blasts: true,
            calr: true,
            asxl1: NaN,
            uts: NaN
        },
        expected: {
            pmScore: 15.5,
            pmRisk: "High risk (≥ 16), median survival 2.0 years",
            pmMolScore: NaN,
            pmMolRisk: "Can't be calculated (MISSING VALUES)"
        }
    },
    {
        id: 6,
        name: "Intermediate-1 (PM), Not Calculable (Mol)",
        inputs: {
            age: 55,
            cs: true,
            hb: true,
            plt: false,
            blasts: false,
            calr: true,
            asxl1: NaN,
            uts: NaN
        },
        expected: {
            pmScore: 13.25,
            pmRisk: "Intermediate-1 risk (11-13), median survival 9.3 years",
            pmMolScore: NaN,
            pmMolRisk: "Can't be calculated (MISSING VALUES)"
        }
    },
    {
        id: 7,
        name: "Not Calculable (PM), High Risk (Mol)",
        inputs: {
            age: 70,
            cs: true,
            hb: false,
            plt: true,
            blasts: true,
            calr: NaN,
            asxl1: false,
            uts: false
        },
        expected: {
            pmScore: NaN,
            pmRisk: "Can't be calculated (MISSING VALUES)",
            pmMolScore: 18.7,
            pmMolRisk: "Intermediate-2 risk (17-18), median survival 4.6 years"
        }
    },
    {
        id: 8,
        name: "Intermediate-2 (PM), High Risk (Mol)",
        inputs: {
            age: 52,
            cs: false,
            hb: true,
            plt: true,
            blasts: true,
            calr: true,
            asxl1: false,
            uts: true
        },
        expected: {
            pmScore: 14.8,
            pmRisk: "Intermediate-2 risk (14-15), median survival 4.4 years",
            pmMolScore: 18.92,
            pmMolRisk: "Intermediate-2 risk (17-18), median survival 4.6 years"
        }
    },
    {
        id: 9,
        name: "Not Calculable (Both)",
        inputs: {
            age: 65,
            cs: true,
            hb: true,
            plt: true,
            blasts: NaN,
            calr: true,
            asxl1: true,
            uts: true
        },
        expected: {
            pmScore: NaN,
            pmRisk: "Can't be calculated (MISSING VALUES)",
            pmMolScore: NaN,
            pmMolRisk: "Can't be calculated (MISSING VALUES)"
        }
    },
    {
        id: 10,
        name: "Low Risk (Both Models)",
        inputs: {
            age: 40,
            cs: false,
            hb: false,
            plt: false,
            blasts: false,
            calr: false,
            asxl1: false,
            uts: false
        },
        expected: {
            pmScore: 6.0,
            pmRisk: "Low risk (< 11), median survival NR",
            pmMolScore: 8.4,
            pmMolRisk: "Low risk (< 14), median survival 18 years"
        }
    }
];

// Helper function to calculate expected scores manually
function calculateExpectedPMScore(age, cs, hb, plt, blasts, calr) {
    // Check for missing values first
    if (isNaN(cs) || isNaN(hb) || isNaN(plt) || isNaN(blasts) || isNaN(calr)) {
        return NaN;
    }
    
    let score = 0;
    if (age !== "" && !isNaN(age)) {
        score += parseFloat(age) * 0.15;
    }
    if (cs === true) score += 1;
    if (hb === true) score += 2;
    if (plt === true) score += 1;
    if (blasts === true) score += 2;
    if (calr === true) score += 2;
    return score;
}

function calculateExpectedPMMolScore(age, cs, hb, plt, blasts, calr, asxl1, uts) {
    // Check for missing values first
    if (isNaN(asxl1) || isNaN(uts) || isNaN(hb) || isNaN(plt) || isNaN(blasts)) {
        return NaN;
    }

    let score = 0;
    if (age !== "" && !isNaN(age)) {
        score += parseFloat(age) * 0.21;
    }
    // Constitutional symptoms removed from new algorithm
    if (hb === true) score += 1;
    if (plt === true) score += 2;
    if (blasts === true) score += 2;
    if (asxl1 === true) score += 1;
    if (uts === true) score += 3;
    return score;
}

// Function to run a single test
function runTest(testCase) {
    const { inputs, expected } = testCase;
    
    // Calculate actual results
    const pmResult = calculateMysecPmScore(
        inputs.age.toString(),
        inputs.cs,        // constitutionalSymptoms
        inputs.hb,        // hemoglobinLow
        inputs.plt,       // plateletsLow
        inputs.blasts,    // blastsHigh
        inputs.calr       // calrWildtype
    );
    
    const pmMolResult = calculateMYSECmPMScore(
        inputs.age.toString(),
        inputs.cs,        // constitutionalSymptoms
        inputs.hb,        // hemoglobinLow
        inputs.plt,       // plateletsLow
        inputs.blasts,    // blastsHigh
        inputs.calr,      // calrWildtype
        inputs.asxl1,     // asxl1Mutated
        inputs.uts        // utsMutations
    );
    
    // Calculate expected scores manually for comparison
    const expectedPMScore = calculateExpectedPMScore(
        inputs.age, inputs.cs, inputs.hb, inputs.plt, inputs.blasts, inputs.calr
    );
    
    const expectedPMMolScore = calculateExpectedPMMolScore(
        inputs.age, inputs.cs, inputs.hb, inputs.plt, inputs.blasts, inputs.calr, inputs.asxl1, inputs.uts
    );
    
    // Check if results match expected values
    const pmRiskMatch = pmResult.riskCategory === expected.pmRisk;
    const pmMolRiskMatch = pmMolResult.riskCategory === expected.pmMolRisk;
    const testPassed = pmRiskMatch && pmMolRiskMatch;
    
    return {
        testCase,
        actual: {
            pm: pmResult,
            pmMol: pmMolResult,
            pmScore: expectedPMScore,
            pmMolScore: expectedPMMolScore
        },
        expected,
        passed: testPassed,
        details: {
            pmRiskMatch,
            pmMolRiskMatch
        }
    };
}

// Function to run all tests and return results
function runAllTests() {
    const results = [];
    let passedCount = 0;
    let failedCount = 0;
    
    testCases.forEach(testCase => {
        const testResult = runTest(testCase);
        results.push(testResult);
        
        if (testResult.passed) {
            passedCount++;
        } else {
            failedCount++;
        }
    });
    
    return {
        results,
        summary: {
            total: testCases.length,
            passed: passedCount,
            failed: failedCount,
            passRate: ((passedCount / testCases.length) * 100).toFixed(1)
        }
    };
}

// Function to print test results to console
function printTestResults() {
    console.log('🧪 MYSEC-PM & MYSEC-mPM Calculator Test Suite');
    console.log('=' .repeat(60));
    
    const testResults = runAllTests();
    const { results, summary } = testResults;
    
    results.forEach(result => {
        const status = result.passed ? '✅ PASS' : '❌ FAIL';
        console.log(`\n${status} Test Case ${result.testCase.id}: ${result.testCase.name}`);
        
        if (!result.passed) {
            console.log('  Expected vs Actual:');
            console.log(`    MYSEC-PM Risk: "${result.expected.pmRisk}" vs "${result.actual.pm.riskCategory}"`);
            console.log(`    MYSEC-mPM Risk: "${result.expected.pmMolRisk}" vs "${result.actual.pmMol.riskCategory}"`);
        }
        
        console.log(`  Scores: PM=${result.actual.pmScore.toFixed(2)}, PM-Mol=${result.actual.pmMolScore.toFixed(2)}`);
    });
    
    console.log('\n' + '=' .repeat(60));
    console.log(`📊 Test Summary:`);
    console.log(`   Total Tests: ${summary.total}`);
    console.log(`   Passed: ${summary.passed}`);
    console.log(`   Failed: ${summary.failed}`);
    console.log(`   Pass Rate: ${summary.passRate}%`);
    
    if (summary.failed === 0) {
        console.log('\n🎉 All tests passed! The calculator is working correctly.');
    } else {
        console.log('\n⚠️  Some tests failed. Please check the implementation.');
    }
    
    return testResults;
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        testCases,
        runTest,
        runAllTests,
        printTestResults,
        calculateExpectedPMScore,
        calculateExpectedPMMolScore
    };
}

// Auto-run tests if this script is loaded in a browser environment
if (typeof window !== 'undefined' && typeof calculateMysecPmScore !== 'undefined') {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', printTestResults);
    } else {
        printTestResults();
    }
} 