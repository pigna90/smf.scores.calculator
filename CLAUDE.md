# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **static web application** for calculating MYSEC-PM and MYSEC-mPM prognostic scores used in Secondary Myelofibrosis (SMF) risk assessment. It's a client-side medical calculator that helps healthcare professionals assess patient outcomes based on clinical and molecular parameters.

The application is built as a **Progressive Web App (PWA)** with offline capabilities and PDF export functionality.

## Architecture

### Technology Stack
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **PWA Features**: Service Worker, Web App Manifest
- **External Libraries**: jsPDF for PDF generation
- **Hosting**: Static site (deployed to GitHub Pages with custom domain)

### File Structure
```
/
├── index.html          # Main calculator interface
├── about.html          # Information about the project
├── references.html     # Scientific references
├── style.css          # Global styles
├── manifest.json      # PWA manifest
├── js/
│   ├── script.js      # Core calculator logic
│   ├── test-suite.js  # Comprehensive test suite
│   └── service-worker.js # PWA offline functionality
└── imgs/icons/        # App icons and favicons
```

### Core Components

#### Calculator Logic (`js/script.js`)
- **Main Functions**:
  - `calculateMysecPmScore()` - Calculates MYSEC-PM risk scores
  - `calculateMYSECmPMScore()` - Calculates MYSEC-mPM molecular scores
  - `calculateBothScores()` - Main entry point that calculates both scores
  - `exportToPDF()` - Generates PDF reports using jsPDF

#### Form Handling
- Uses radio button groups for clinical parameters (Yes/No/N/A)
- Age input as number field
- Real-time form validation and button state management
- Results displayed in a table format with risk categories and survival estimates

#### Scoring Algorithms
The calculator implements two validated prognostic models:

**MYSEC-PM**: Based on age, constitutional symptoms, hemoglobin, platelets, blasts, and CALR status
**MYSEC-mPM**: Enhanced molecular model adding ASXL1 and UTS mutations (U2AF1, TP53, SRSF2)

## Development Commands

### Testing
Run the comprehensive test suite by opening the browser console on any page and executing:
```javascript
printTestResults()
```

The test suite (`js/test-suite.js`) includes 10 test cases covering various risk scenarios and validates both scoring algorithms.

### Local Development
Since this is a static site, you can serve it locally using any HTTP server:
```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve .

# VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

### Deployment
The site is configured for GitHub Pages deployment with:
- Custom domain via `CNAME` file
- PWA manifest for mobile app installation
- Service worker for offline functionality

## Code Organization

### Calculation Functions
- All scoring logic is contained in `calculateMysecPmScore()` and `calculateMYSECmPMScore()`
- These functions return objects with `riskCategory` containing both risk level and median survival
- Missing value handling returns "Can't be calculated (MISSING VALUES)"

### Form State Management
- Button state management prevents multiple calculations
- Real-time enabling/disabling of Calculate button based on form changes
- Results section dynamically shows/hides based on calculation status

### PDF Export
- Uses jsPDF library loaded from CDN
- Generates structured PDF with patient data and calculated results
- Includes all form inputs and risk assessments in tabular format

## Medical Context

This calculator implements validated prognostic models for Secondary Myelofibrosis patients. The scoring considers:

- **Clinical factors**: Age, constitutional symptoms
- **Laboratory values**: Hemoglobin, platelet count, blast percentage
- **Molecular markers**: CALR wildtype status, ASXL1 mutations, UTS mutations

Risk categories provide median survival estimates to guide clinical decision-making.

## Testing Strategy

The test suite validates:
- Scoring algorithm accuracy across risk categories
- Missing value handling
- Edge cases and boundary conditions
- Both MYSEC-PM and MYSEC-mPM calculations

All test cases include expected scores and risk categories for regression testing.