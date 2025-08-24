# MYSEC-PM & MYSEC-mPM Calculator Test Suite

This directory contains a comprehensive test suite for the MYSEC-PM and MYSEC-mPM calculator functions.

## Test Files

### 1. `test.html` - Visual Test Interface
A comprehensive web interface that displays all test cases with visual results, including:
- Input parameters for each test case
- Expected vs actual results
- Pass/fail status for each test
- Score calculation breakdowns
- Summary statistics

### 2. `test-runner.html` - Automated Test Runner
A simple interface for running tests automatically with console output capture.

### 3. `js/test-suite.js` - Standalone Test Suite
A JavaScript module containing all test logic that can be run independently.

## How to Run Tests

### Option 1: Visual Test Interface
1. Open `test.html` in a web browser
2. Click "Run All Tests" to execute all test cases
3. Review the visual results for each test case
4. Check the summary statistics at the top

### Option 2: Automated Test Runner
1. Open `test-runner.html` in a web browser
2. Click "Run Tests" to execute all test cases
3. View the console output in the embedded console
4. Check the status indicator for overall results

### Option 3: Browser Console
1. Open `index.html` in a web browser
2. Open browser developer tools (F12)
3. In the console, run: `printTestResults()`

## Test Cases Overview

The test suite includes 10 comprehensive test cases covering various scenarios:

### Test Case 1: Low Risk (Both Models)
- **Age:** 45
- **All parameters:** No/Negative
- **Expected MYSEC-PM:** 6.75 → Low risk → Median OS: Not reached
- **Expected MYSEC-mPM:** 11.25 → Low risk → Median OS: 14.5 years

### Test Case 2: High Risk (Both Models)
- **Age:** 80
- **All parameters:** Yes/Positive
- **Expected MYSEC-PM:** 20 → High risk → Median OS: 2 years
- **Expected MYSEC-mPM:** 34 → High risk → Median OS: 1.8 years

### Test Case 3: Low Risk (Both Models)
- **Age:** 60
- **Constitutional Symptoms:** Yes, others: No
- **Expected MYSEC-PM:** 10 → Low risk → Median OS: Not reached
- **Expected MYSEC-mPM:** 16 → Low risk → Median OS: 14.5 years

### Test Case 4: High Risk (PM), Intermediate-2 (Mol)
- **Age:** 68
- **Mixed parameters:** Some Yes, some No
- **Expected MYSEC-PM:** 17.2 → High risk → Median OS: 2 years
- **Expected MYSEC-mPM:** 23 → Intermediate-2 → Median OS: 4.2 years

### Test Case 5: Intermediate-2 (PM), Not Calculable (Mol)
- **Age:** 50
- **Molecular parameters:** N/A (missing values)
- **Expected MYSEC-PM:** 15.5 → Intermediate-2 → Median OS: 4.4 years
- **Expected MYSEC-mPM:** Not calculable

### Test Case 6: Intermediate-1 (PM), Not Calculable (Mol)
- **Age:** 55
- **Molecular parameters:** N/A (missing values)
- **Expected MYSEC-PM:** 13.25 → Intermediate-1 → Median OS: 9.3 years
- **Expected MYSEC-mPM:** Not calculable

### Test Case 7: Not Calculable (PM), High Risk (Mol)
- **Age:** 70
- **CALR parameter:** N/A (missing value)
- **Expected MYSEC-PM:** Not calculable
- **Expected MYSEC-mPM:** 24.5 → High risk → Median OS: 1.8 years

### Test Case 8: Intermediate-2 (PM), High Risk (Mol)
- **Age:** 52
- **U2AF1 and/or TP53 and/or SRSF2 (UTS) mutations:** Yes
- **Expected MYSEC-PM:** 14.8 → Intermediate-2 → Median OS: 4.4 years
- **Expected MYSEC-mPM:** 25 → High risk → Median OS: 1.8 years

### Test Case 9: Not Calculable (Both)
- **Age:** 65
- **Blasts parameter:** N/A (missing value)
- **Expected MYSEC-PM:** Not calculable
- **Expected MYSEC-mPM:** Not calculable

### Test Case 10: Low Risk (Both Models)
- **Age:** 40
- **All parameters:** No/Negative
- **Expected MYSEC-PM:** 6.0 → Low risk → Median OS: Not reached
- **Expected MYSEC-mPM:** 10.0 → Low risk → Median OS: 14.5 years

## Score Calculation Formulas

### MYSEC-PM Score
```
Score = (Age × 0.15) + Constitutional Symptoms + Hb + PLT + Blasts + CALR
```
Where:
- Constitutional Symptoms: 1 point if Yes
- Hb < 11 g/dL: 2 points if Yes
- PLT < 150 x10⁹/L: 1 point if Yes
- Blasts ≥ 3%: 2 points if Yes
- CALR wildtype: 2 points if Yes

### MYSEC-mPM Score
```
Score = (Age × 0.25) + Constitutional Symptoms + Hb + PLT + Blasts + HMR + VHMR
```
Where:
- Constitutional Symptoms: 1 point if Yes
- Hb < 11 g/dL: 2 points if Yes
- PLT < 150 x10⁹/L: 3 points if Yes
- Blasts ≥ 3%: 3 points if Yes
- ASXL1 mutated without UTS mutations: 1 point if Yes
- U2AF1 and/or TP53 and/or SRSF2 (UTS) mutations: 4 points if Yes

## Risk Categories

### MYSEC-PM Risk Categories
- **Low risk:** < 11 points
- **Intermediate-1 risk:** 11-13 points
- **Intermediate-2 risk:** 14-15 points
- **High risk:** ≥ 16 points

### MYSEC-mPM Risk Categories
- **Low risk:** < 18.6 points
- **Intermediate-1 risk:** 18.6-21.0 points
- **Intermediate-2 risk:** 21.1-23.5 points
- **High risk:** ≥ 23.6 points

## Expected Outcomes

When all tests pass, you should see:
- ✅ All 10 tests passed
- 100% pass rate
- Correct score calculations for all test cases
- Proper risk category assignments
- Accurate median OS predictions

## Troubleshooting

If tests fail:
1. Check that the calculator functions are properly loaded
2. Verify that the score calculation formulas are correct
3. Ensure risk category thresholds match the expected values
4. Confirm that missing value handling works correctly

## Adding New Test Cases

To add new test cases:
1. Add the test case to the `testCases` array in `js/test-suite.js`
2. Include all required input parameters
3. Specify expected scores, risk categories, and OS values
4. Run the test suite to verify the new case works correctly 