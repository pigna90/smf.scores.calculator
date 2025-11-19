function isNumber(n) {
    return n != "";
}

function isBool(n) {
    return typeof n === 'boolean';
}



function getRadioButtonStatus(name) {
    if (document.getElementById(name + "-yes").checked)
        return true;
    else if (document.getElementById(name + "-no").checked)
        return false;
    else
        return NaN;
}

function calculateBothScores() {
    // Get input values
    const age = document.getElementById("age").value;
    const constitutionalSymptoms = getRadioButtonStatus("cs");
    const hemoglobinLow = getRadioButtonStatus("hb");
    const plateletsLow = getRadioButtonStatus("plt");
    const blastsHigh = getRadioButtonStatus("blasts");
    const calrWildtype = getRadioButtonStatus("calr");
    const asxl1Mutated = getRadioButtonStatus("asxl1");
    const utsMutations = getRadioButtonStatus("uts");
    
    // Calculate MYSEC-PM score once
    const pmScoreResult = calculateMysecPmScore(age, constitutionalSymptoms, hemoglobinLow, plateletsLow, blastsHigh, calrWildtype);
    
    // Calculate MYSEC-mPM score once
    const pmMolScoreResult = calculateMYSECmPMScore(age, constitutionalSymptoms, hemoglobinLow, plateletsLow, blastsHigh, calrWildtype, asxl1Mutated, utsMutations);
    
    // Show the results section
    document.getElementById("results-form").style.display = "block";
    
    // Scroll to the results section
    document.getElementById("results-form").scrollIntoView({ behavior: "smooth", block: "start" });
    
    // Display results
    document.getElementById("myssec-pm").innerHTML = pmScoreResult.riskCategory;
    document.getElementById("myssec-pm-mol").innerHTML = pmMolScoreResult.riskCategory;
    
    // Disable the Calculate Scores button
    const calculateButton = document.querySelector('.button-container button');
    calculateButton.disabled = true;
    calculateButton.style.opacity = '0.5';
    calculateButton.style.cursor = 'not-allowed';
}

function calculateMysecPmScore(age, constitutionalSymptoms, hemoglobinLow, plateletsLow, blastsHigh, calrWildtype) {
    let score = 0;
    const missingValues = (age === "" || isNaN(constitutionalSymptoms) || isNaN(hemoglobinLow) || isNaN(plateletsLow) || isNaN(blastsHigh) || isNaN(calrWildtype));
    console.log("age", age);
    console.log("constitutionalSymptoms", constitutionalSymptoms);
    console.log("hemoglobinLow", hemoglobinLow);
    console.log("plateletsLow", plateletsLow);
    console.log("blastsHigh", blastsHigh);
    console.log("calrWildtype", calrWildtype);
    console.log("missingValues", missingValues);
    console.log("age === ''", age === "");
    console.log("isNaN(constitutionalSymptoms)", isNaN(constitutionalSymptoms));
    console.log("isNaN(hemoglobinLow)", isNaN(hemoglobinLow));
    console.log("isNaN(plateletsLow)", isNaN(plateletsLow));
    console.log("isNaN(blastsHigh)", isNaN(blastsHigh));
    console.log("isNaN(calrWildtype)", isNaN(calrWildtype));
    if (isNumber(age)) {
        score += parseFloat(age) * 0.15;
    }
    if (isBool(constitutionalSymptoms) && constitutionalSymptoms) {
        score += 1;
    }
    if (isBool(hemoglobinLow) && hemoglobinLow) {
        score += 2;
    }
    if (isBool(plateletsLow) && plateletsLow) {
        score += 1;
    }
    if (isBool(blastsHigh) && blastsHigh) {
        score += 2;
    }
    if (isBool(calrWildtype) && calrWildtype) {
        score += 2;
    }
    console.log("score", score);
    console.log("expression", score >= 14 && score <= 15 && !missingValues);
    console.log("score >= 14", score >= 14);
    // Return both risk category and median OS based on the same score
    if (score < 11 && !missingValues) {
        return {
            riskCategory: "Low risk (< 11), median survival NR"
        };
    } else if (score >= 11 && score < 14 && !missingValues) {
        return {
            riskCategory: "Intermediate-1 risk (11-13), median survival 9.3 years"
        };
    } else if (score >= 14 && score < 16 && !missingValues) {
        return {
            riskCategory: "Intermediate-2 risk (14-15), median survival 4.4 years"
        };
    } else if (score >= 16 && !missingValues) {
        return {
            riskCategory: "High risk (≥ 16), median survival 2.0 years"
        };
    } else {
        return {
            riskCategory: "Can't be calculated (MISSING VALUES)"
        };
    }
}

function myssecPm(age, constitutionalSymptoms, hemoglobinLow, plateletsLow, blastsHigh, calrWildtype) {
    // This function is now deprecated - use calculateMysecPmScore instead
    const result = calculateMysecPmScore(age, constitutionalSymptoms, hemoglobinLow, plateletsLow, blastsHigh, calrWildtype);
    return result.riskCategory;
}

function myssecPmMedianOS(age, constitutionalSymptoms, hemoglobinLow, plateletsLow, blastsHigh, calrWildtype) {
    // This function is now deprecated - use calculateMysecPmScore instead
    const result = calculateMysecPmScore(age, constitutionalSymptoms, hemoglobinLow, plateletsLow, blastsHigh, calrWildtype);
    return result.medianOS;
}

function myssecMYSECmPM(age, constitutionalSymptoms, hemoglobinLow, plateletsLow, blastsHigh, calrWildtype, asxl1Mutated, utsMutations) {
    // This function is now deprecated - use calculateMYSECmPMScore instead
    const result = calculateMYSECmPMScore(age, constitutionalSymptoms, hemoglobinLow, plateletsLow, blastsHigh, calrWildtype, asxl1Mutated, utsMutations);
    return result.riskCategory;
}

function calculateMYSECmPMScore(age, constitutionalSymptoms, hemoglobinLow, plateletsLow, blastsHigh, calrWildtype, asxl1Mutated, utsMutations) {
    let score = 0;
    const missingValues = (age === "" || isNaN(hemoglobinLow) || isNaN(plateletsLow) || isNaN(blastsHigh) || isNaN(asxl1Mutated) || isNaN(utsMutations));
    
    if (isNumber(age)) {
        score += parseFloat(age) * 0.21;
    }
    if (isBool(hemoglobinLow) && hemoglobinLow) {
        score += 1;
    }
    if (isBool(plateletsLow) && plateletsLow) {
        score += 2;
    }
    if (isBool(blastsHigh) && blastsHigh) {
        score += 2;
    }
    if (isBool(asxl1Mutated) && asxl1Mutated) {
        score += 1;
    }
    if (isBool(utsMutations) && utsMutations) {
        score += 3;
    }
    console.log("score", score);
    console.log("missingValues", missingValues);
    // Return both risk category and median OS based on the same score
    if (score < 14 && !missingValues) {
        return {
            riskCategory: "Low risk (< 14), median survival 18 years"
        };
    } else if (score >= 14 && score < 17 && !missingValues) {
        return {
            riskCategory: "Intermediate-1 risk (14-16), median survival 8.8 years"
        };
    } else if (score >= 17 && score < 19 && !missingValues) {
        return {
            riskCategory: "Intermediate-2 risk (17-18), median survival 4.6 years"
        };
    } else if (score >= 19 && !missingValues) {
        return {
            riskCategory: "High risk (≥ 19), median survival 1.9 years"
        };
    } else {
        return {
            riskCategory: "Can't be calculated (MISSING VALUES)"
        };
    }
}

// Function to re-enable the Calculate Scores button
function enableCalculateButton() {
    const calculateButton = document.querySelector('.button-container button');
    calculateButton.disabled = false;
    calculateButton.style.opacity = '1';
    calculateButton.style.cursor = 'pointer';
}

// Add event listeners to all form inputs when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners to all number inputs
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => {
        input.addEventListener('input', enableCalculateButton);
    });
    
    // Add event listeners to all radio buttons
    const radioGroups = document.querySelectorAll('.radio-group');
    radioGroups.forEach(group => {
        const radioButtons = group.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(radio => {
            radio.addEventListener('change', enableCalculateButton);
        });
    });
});

function clearForm() {
    // Clear all number inputs
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => {
        input.value = '';
    });
    
    // Reset all radio buttons to N/A
    const radioGroups = document.querySelectorAll('.radio-group');
    radioGroups.forEach(group => {
        const naRadio = group.querySelector('input[type="radio"][id$="-na"]');
        if (naRadio) {
            naRadio.checked = true;
        }
    });
    
    // Hide results
    document.getElementById("results-form").style.display = "none";
}

 

function exportToPDF() {
    try {
        // Check if jsPDF is available
        if (typeof window.jsPDF === 'undefined') {
            throw new Error('jsPDF library not loaded. Please refresh the page and try again.');
        }

        // Initialize jsPDF with portrait orientation
        const doc = new window.jsPDF('p', 'mm', 'a4');
        
        // Set font
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        doc.setTextColor(37, 99, 235); // Blue color
        doc.text('MYSEC-PM & MYSEC-mPM Calculator Results', 105, 10, { align: 'center' });
        
        // Add date
        doc.setFontSize(7);
        doc.setTextColor(102, 102, 102); // Gray color
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 15, { align: 'center' });
        
        // Add website link
        doc.text('https://myssec-pm-mol.calculator', 105, 20, { align: 'center' });

        let startY = 25;

        // Clinical Features Section
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(31, 41, 55);
        doc.text('Clinical Features', 105, startY, { align: 'center' });
        doc.setFont('helvetica', 'normal');

        const clinicalFeatures = [
            ["Age at SMF diagnosis (years)", document.getElementById("age").value || "N/A"],
            ["Constitutional Symptoms", getRadioButtonStatus("cs") === true ? "Yes" : 
                                     getRadioButtonStatus("cs") === false ? "No" : "N/A"]
        ];

        doc.autoTable({
            startY: startY + 4,
            body: clinicalFeatures,
            theme: 'grid',
            styles: { 
                fontSize: 7,
                cellPadding: 1.5,
                lineWidth: 0.1,
                halign: 'center'
            },
            columnStyles: { 
                0: { cellWidth: 100, halign: 'left' },
                1: { cellWidth: 50, halign: 'center' }
            },
            margin: { left: 27.5, right: 27.5 }
        });

        // Complete Blood Count Section
        startY = doc.autoTable.previous.finalY + 6;
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('Complete Blood Count', 105, startY, { align: 'center' });
        doc.setFont('helvetica', 'normal');

        const bloodCount = [
            ["Hb < 11 g/dL", getRadioButtonStatus("hb") === true ? "Yes" : 
                           getRadioButtonStatus("hb") === false ? "No" : "N/A"],
            ["PLT < 150 x10⁹/L", getRadioButtonStatus("plt") === true ? "Yes" : 
                              getRadioButtonStatus("plt") === false ? "No" : "N/A"],
            ["Blasts ≥ 3%", getRadioButtonStatus("blasts") === true ? "Yes" : 
                         getRadioButtonStatus("blasts") === false ? "No" : "N/A"]
        ];

        doc.autoTable({
            startY: startY + 4,
            body: bloodCount,
            theme: 'grid',
            styles: { 
                fontSize: 8,
                cellPadding: 2,
                lineWidth: 0.1,
                halign: 'center'
            },
            columnStyles: { 
                0: { cellWidth: 100, halign: 'left' },
                1: { cellWidth: 50, halign: 'center' }
            },
            margin: { left: 27.5, right: 27.5 }
        });

        // Driver Mutations Section
        startY = doc.autoTable.previous.finalY + 6;
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('Driver Mutations Status', 105, startY, { align: 'center' });
        doc.setFont('helvetica', 'normal');

        const driverMutations = [
            ["CALR wildtype", getRadioButtonStatus("calr") === true ? "Yes" : 
                           getRadioButtonStatus("calr") === false ? "No" : "N/A"]
        ];

        doc.autoTable({
            startY: startY + 4,
            body: driverMutations,
            theme: 'grid',
            styles: { 
                fontSize: 8,
                cellPadding: 2,
                lineWidth: 0.1,
                halign: 'center'
            },
            columnStyles: { 
                0: { cellWidth: 100, halign: 'left' },
                1: { cellWidth: 50, halign: 'center' }
            },
            margin: { left: 27.5, right: 27.5 }
        });

        // Additional Myeloid Mutations Section
        startY = doc.autoTable.previous.finalY + 6;
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('Additional Myeloid Mutations', 105, startY, { align: 'center' });
        doc.setFont('helvetica', 'normal');

        const myeloidMutations = [
            ["ASXL1 mutated without UTS mutations", getRadioButtonStatus("asxl1") === true ? "Yes" : 
                                                   getRadioButtonStatus("asxl1") === false ? "No" : "N/A"],
            ["U2AF1 and/or TP53 and/or SRSF2 (UTS) mutations", getRadioButtonStatus("uts") === true ? "Yes" : 
                                                               getRadioButtonStatus("uts") === false ? "No" : "N/A"]
        ];

        doc.autoTable({
            startY: startY + 4,
            body: myeloidMutations,
            theme: 'grid',
            styles: { 
                fontSize: 8,
                cellPadding: 2,
                lineWidth: 0.1,
                halign: 'center'
            },
            columnStyles: { 
                0: { cellWidth: 100, halign: 'left' },
                1: { cellWidth: 50, halign: 'center' }
            },
            margin: { left: 27.5, right: 27.5 }
        });

        // Results Section
        startY = doc.autoTable.previous.finalY + 10;
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(37, 99, 235);
        doc.text('Results', 105, startY, { align: 'center' });
        doc.setFont('helvetica', 'normal');

        const results = [
            ["MYSEC-PM", document.getElementById("myssec-pm").innerHTML],
            ["MYSEC-mPM", document.getElementById("myssec-pm-mol").innerHTML]
        ];

        doc.autoTable({
            startY: startY + 4,
            body: results,
            theme: 'grid',
            styles: { 
                fontSize: 8,
                cellPadding: 3,
                lineWidth: 0.1,
                halign: 'left'
            },
            columnStyles: { 
                0: { cellWidth: 50, halign: 'left', fontStyle: 'bold' },
                1: { cellWidth: 100, halign: 'left' }
            },
            margin: { left: 27.5, right: 27.5 }
        });

        // Save the PDF
        doc.save('myssec-pm-and-pm-mol-assessment.pdf');
        
    } catch (error) {
        console.error('PDF generation failed:', error);
        alert('PDF export failed: ' + error.message);
    }
} 

// Debug function to check parameter values
function debugParameters() {
    const age = document.getElementById("age").value;
    const constitutionalSymptoms = getRadioButtonStatus("cs");
    const hemoglobinLow = getRadioButtonStatus("hb");
    const plateletsLow = getRadioButtonStatus("plt");
    const blastsHigh = getRadioButtonStatus("blasts");
    const calrWildtype = getRadioButtonStatus("calr");
    const asxl1Mutated = getRadioButtonStatus("asxl1");
    const utsMutations = getRadioButtonStatus("uts");
    
    console.log("=== Parameter Debug ===");
    console.log("Age:", age, "isNaN:", isNaN(age));
    console.log("Constitutional Symptoms:", constitutionalSymptoms, "isNaN:", isNaN(constitutionalSymptoms));
    console.log("Hb < 11 g/dL:", hemoglobinLow, "isNaN:", isNaN(hemoglobinLow));
    console.log("PLT < 150 x10⁹/L:", plateletsLow, "isNaN:", isNaN(plateletsLow));
    console.log("Blasts ≥ 3%:", blastsHigh, "isNaN:", isNaN(blastsHigh));
    console.log("CALR wildtype:", calrWildtype, "isNaN:", isNaN(calrWildtype));
    console.log("ASXL1 mutated:", asxl1Mutated, "isNaN:", isNaN(asxl1Mutated));
    console.log("UTS mutations:", utsMutations, "isNaN:", isNaN(utsMutations));
    
    // Check which parameters are causing missing values for MYSEC-PM
    const pmMissingValues = (age === "" || isNaN(constitutionalSymptoms) || isNaN(hemoglobinLow) || isNaN(plateletsLow) || isNaN(blastsHigh) || isNaN(calrWildtype));
    console.log("MYSEC-PM Missing Values:", pmMissingValues);
    
    if (pmMissingValues) {
        console.log("MYSEC-PM Missing Values Breakdown:");
        console.log("- Age empty:", age === "");
        console.log("- Constitutional Symptoms NaN:", isNaN(constitutionalSymptoms));
        console.log("- Hb NaN:", isNaN(hemoglobinLow));
        console.log("- PLT NaN:", isNaN(plateletsLow));
        console.log("- Blasts NaN:", isNaN(blastsHigh));
        console.log("- CALR NaN:", isNaN(calrWildtype));
    }
    
    return {
        age, constitutionalSymptoms, hemoglobinLow, plateletsLow, blastsHigh, calrWildtype, asxl1Mutated, utsMutations
    };
} 