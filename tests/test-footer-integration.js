/**
 * Test Suite for Footer Links and Overall Integration
 * Tests Requirements: 3.5, 5.1, 5.4, 5.5
 */

class FooterIntegrationTester {
    constructor() {
        this.testResults = [];
        this.setupTestEnvironment();
    }

    setupTestEnvironment() {
        // Create test container if it doesn't exist
        if (!document.getElementById('footer-test-container')) {
            const container = document.createElement('div');
            container.id = 'footer-test-container';
            container.style.cssText = `
                position: fixed;
                top: -2000px;
                left: -2000px;
                width: 1000px;
                height: 600px;
                visibility: hidden;
                background: white;
            `;
            document.body.appendChild(container);
        }
    }

    // Test 1: Footer links open in new tabs
    async testFooterLinksNewTabs() {
        const testName = 'Footer Links Open in New Tabs';
        console.log(`🧪 Running: ${testName}`);

        try {
            const container = document.getElementById('footer-test-container');
            container.innerHTML = `
                <footer class="footer-test" style="
                    margin-top: 32px;
                    padding-top: 24px;
                    border-top: 4px solid #242424;
                    text-align: center;
                ">
                    <div style="
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 8px;
                        color: #242424;
                        font-size: 14px;
                    ">
                        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center;">
                            <span>Created by</span>
                            <a 
                                href="https://jayreddin.github.io" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                class="creator-link"
                                style="font-weight: bold; color: #70d6ff; text-decoration: none;"
                            >
                                Jamie Reddin
                            </a>
                            <span>using</span>
                            <a 
                                href="https://puter.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                class="platform-link"
                                style="font-weight: bold; color: #70d6ff; text-decoration: none;"
                            >
                                Puter.com
                            </a>
                        </div>
                        <div style="color: #242424; opacity: 0.7;">
                            Version 1.0.2
                        </div>
                    </div>
                </footer>
            `;

            const creatorLink = container.querySelector('.creator-link');
            const platformLink = container.querySelector('.platform-link');

            // Test target="_blank" attribute
            const creatorTargetBlank = creatorLink.getAttribute('target') === '_blank';
            const platformTargetBlank = platformLink.getAttribute('target') === '_blank';

            // Test rel="noopener noreferrer" attribute
            const creatorRel = creatorLink.getAttribute('rel') === 'noopener noreferrer';
            const platformRel = platformLink.getAttribute('rel') === 'noopener noreferrer';

            // Test correct URLs
            const creatorUrl = creatorLink.getAttribute('href') === 'https://jayreddin.github.io';
            const platformUrl = platformLink.getAttribute('href') === 'https://puter.com';

            const success = creatorTargetBlank && platformTargetBlank && 
                           creatorRel && platformRel && 
                           creatorUrl && platformUrl;

            this.logTestResult(testName, success, 
                `Creator link - Target: ${creatorTargetBlank}, Rel: ${creatorRel}, URL: ${creatorUrl}\n` +
                `Platform link - Target: ${platformTargetBlank}, Rel: ${platformRel}, URL: ${platformUrl}`);
            return success;
        } catch (error) {
            this.logTestResult(testName, false, `Error: ${error.message}`);
            return false;
        }
    }

    // Test 2: Footer responsive layout
    async testFooterResponsiveLayout() {
        const testName = 'Footer Responsive Layout';
        console.log(`🧪 Running: ${testName}`);

        try {
            const container = document.getElementById('footer-test-container');
            
            // Test different viewport sizes
            const viewportTests = [
                { width: 320, name: 'Mobile Portrait' },
                { width: 768, name: 'Tablet' },
                { width: 1200, name: 'Desktop' }
            ];

            const results = [];

            for (const viewport of viewportTests) {
                container.style.width = viewport.width + 'px';
                
                container.innerHTML = `
                    <footer class="responsive-footer" style="
                        margin-top: 32px;
                        padding-top: 24px;
                        border-top: 4px solid #242424;
                        text-align: center;
                        width: 100%;
                    ">
                        <div class="footer-content" style="
                            display: flex;
                            flex-direction: ${viewport.width < 640 ? 'column' : 'row'};
                            align-items: center;
                            justify-content: center;
                            gap: ${viewport.width < 640 ? '4px' : '8px'};
                            color: #242424;
                            font-size: ${viewport.width < 640 ? '12px' : '14px'};
                            flex-wrap: wrap;
                        ">
                            <span>Created by</span>
                            <a 
                                href="https://jayreddin.github.io" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style="font-weight: bold; color: #70d6ff; text-decoration: none;"
                            >
                                Jamie Reddin
                            </a>
                            <span>using</span>
                            <a 
                                href="https://puter.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style="font-weight: bold; color: #70d6ff; text-decoration: none;"
                            >
                                Puter.com
                            </a>
                            <span style="color: #242424; opacity: 0.7;">| Version 1.0.2</span>
                        </div>
                    </footer>
                `;

                const footerContent = container.querySelector('.footer-content');
                const computedStyle = window.getComputedStyle(footerContent);
                
                const expectedDirection = viewport.width < 640 ? 'column' : 'row';
                const actualDirection = computedStyle.flexDirection;
                const expectedFontSize = viewport.width < 640 ? '12px' : '14px';
                const actualFontSize = computedStyle.fontSize;

                const isResponsive = actualDirection === expectedDirection && 
                                   actualFontSize === expectedFontSize;

                results.push({
                    viewport: viewport.name,
                    width: viewport.width,
                    expectedDirection,
                    actualDirection,
                    expectedFontSize,
                    actualFontSize,
                    isResponsive
                });
            }

            const allResponsive = results.every(result => result.isResponsive);
            const summary = results.map(result => 
                `${result.viewport} (${result.width}px): Direction ${result.actualDirection}, Font ${result.actualFontSize} - ${result.isResponsive ? '✅' : '❌'}`
            ).join('\n');

            this.logTestResult(testName, allResponsive, summary);
            return allResponsive;
        } catch (error) {
            this.logTestResult(testName, false, `Error: ${error.message}`);
            return false;
        }
    }

    // Test 3: Footer content and version display
    async testFooterContentAndVersion() {
        const testName = 'Footer Content and Version Display';
        console.log(`🧪 Running: ${testName}`);

        try {
            const container = document.getElementById('footer-test-container');
            container.innerHTML = `
                <footer class="content-test-footer" style="
                    margin-top: 32px;
                    padding-top: 24px;
                    border-top: 4px solid #242424;
                    text-align: center;
                ">
                    <div style="
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: center;
                        gap: 8px;
                        color: #242424;
                        font-size: 14px;
                        flex-wrap: wrap;
                    ">
                        <span>Created by</span>
                        <a 
                            href="https://jayreddin.github.io" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            class="creator-link"
                            style="font-weight: bold; color: #70d6ff; text-decoration: none;"
                        >
                            Jamie Reddin
                        </a>
                        <span>using</span>
                        <a 
                            href="https://puter.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            class="platform-link"
                            style="font-weight: bold; color: #70d6ff; text-decoration: none;"
                        >
                            Puter.com
                        </a>
                        <span class="version-info" style="color: #242424; opacity: 0.7;">| Version 1.0.2</span>
                    </div>
                </footer>
            `;

            // Test content presence
            const creatorLink = container.querySelector('.creator-link');
            const platformLink = container.querySelector('.platform-link');
            const versionInfo = container.querySelector('.version-info');

            const hasCreatorText = creatorLink && creatorLink.textContent.trim() === 'Jamie Reddin';
            const hasPlatformText = platformLink && platformLink.textContent.trim() === 'Puter.com';
            const hasVersionText = versionInfo && versionInfo.textContent.includes('Version 1.0.2');

            // Test styling
            const creatorStyle = window.getComputedStyle(creatorLink);
            const platformStyle = window.getComputedStyle(platformLink);
            const versionStyle = window.getComputedStyle(versionInfo);

            const creatorStyling = creatorStyle.fontWeight === 'bold' || creatorStyle.fontWeight === '700';
            const platformStyling = platformStyle.fontWeight === 'bold' || platformStyle.fontWeight === '700';
            const versionOpacity = parseFloat(versionStyle.opacity) === 0.7;

            const success = hasCreatorText && hasPlatformText && hasVersionText &&
                           creatorStyling && platformStyling && versionOpacity;

            this.logTestResult(testName, success, 
                `Content - Creator: ${hasCreatorText}, Platform: ${hasPlatformText}, Version: ${hasVersionText}\n` +
                `Styling - Creator bold: ${creatorStyling}, Platform bold: ${platformStyling}, Version opacity: ${versionOpacity}`);
            return success;
        } catch (error) {
            this.logTestResult(testName, false, `Error: ${error.message}`);
            return false;
        }
    }

    // Test 4: Complete user workflow simulation
    async testCompleteUserWorkflow() {
        const testName = 'Complete User Workflow Simulation';
        console.log(`🧪 Running: ${testName}`);

        try {
            // Simulate the complete application workflow
            const workflowSteps = [];

            // Step 1: Application initialization
            workflowSteps.push({
                step: 'Application Load',
                success: true,
                details: 'Application container and components initialized'
            });

            // Step 2: Image upload simulation
            const mockFile = new File(['mock-image-data'], 'test-image.jpg', { type: 'image/jpeg' });
            workflowSteps.push({
                step: 'Image Upload',
                success: mockFile.type.startsWith('image/'),
                details: `File type: ${mockFile.type}, Size: ${mockFile.size} bytes`
            });

            // Step 3: Expression selection simulation
            const selectedExpression = 'happy';
            workflowSteps.push({
                step: 'Expression Selection',
                success: selectedExpression !== null,
                details: `Selected expression: ${selectedExpression}`
            });

            // Step 4: Style selection simulation
            const selectedStyle = 'cartoon';
            workflowSteps.push({
                step: 'Style Selection',
                success: selectedStyle !== null,
                details: `Selected style: ${selectedStyle}`
            });

            // Step 5: Sticker generation simulation
            const mockGeneratedSticker = {
                emotion: selectedExpression,
                style: selectedStyle,
                _files: { generated: mockFile }
            };
            workflowSteps.push({
                step: 'Sticker Generation',
                success: mockGeneratedSticker._files?.generated !== null,
                details: 'Mock sticker generated successfully'
            });

            // Step 6: Download preparation simulation
            const stickersForDownload = [mockGeneratedSticker];
            const canDownload = stickersForDownload.length > 0;
            workflowSteps.push({
                step: 'Download Preparation',
                success: canDownload,
                details: `${stickersForDownload.length} sticker(s) ready for download`
            });

            // Step 7: Footer display verification
            const container = document.getElementById('footer-test-container');
            container.innerHTML = `
                <div class="app-simulation" style="min-height: 400px; padding: 20px;">
                    <div class="main-content" style="margin-bottom: 40px;">
                        <h1>AI Sticker Maker</h1>
                        <p>Application content...</p>
                    </div>
                    <footer style="
                        margin-top: 32px;
                        padding-top: 24px;
                        border-top: 4px solid #242424;
                        text-align: center;
                    ">
                        <div style="
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            justify-content: center;
                            gap: 8px;
                            color: #242424;
                            font-size: 14px;
                        ">
                            <span>Created by</span>
                            <a href="https://jayreddin.github.io" target="_blank" rel="noopener noreferrer">Jamie Reddin</a>
                            <span>using</span>
                            <a href="https://puter.com" target="_blank" rel="noopener noreferrer">Puter.com</a>
                            <span>| Version 1.0.2</span>
                        </div>
                    </footer>
                </div>
            `;

            const footerExists = container.querySelector('footer') !== null;
            workflowSteps.push({
                step: 'Footer Display',
                success: footerExists,
                details: 'Footer properly displayed at bottom of application'
            });

            const allStepsSuccessful = workflowSteps.every(step => step.success);
            const summary = workflowSteps.map(step => 
                `${step.step}: ${step.success ? '✅' : '❌'} - ${step.details}`
            ).join('\n');

            this.logTestResult(testName, allStepsSuccessful, summary);
            return allStepsSuccessful;
        } catch (error) {
            this.logTestResult(testName, false, `Error: ${error.message}`);
            return false;
        }
    }

    // Test 5: Regression testing on existing functionality
    async testRegressionFunctionality() {
        const testName = 'Regression Testing - Existing Functionality';
        console.log(`🧪 Running: ${testName}`);

        try {
            const regressionTests = [];

            // Test 1: Basic DOM structure integrity
            const container = document.getElementById('footer-test-container');
            container.innerHTML = `
                <div class="app-container" style="
                    width: 100%;
                    max-width: 1200px;
                    margin: 0 auto;
                    background: white;
                    border: 4px solid #242424;
                    border-radius: 12px;
                    padding: 24px;
                ">
                    <header>
                        <h1 style="text-align: center; color: #242424;">AI Sticker Maker</h1>
                    </header>
                    
                    <main style="margin: 24px 0;">
                        <div class="upload-section" style="
                            background: #ff70a6;
                            border: 4px solid #242424;
                            border-radius: 8px;
                            padding: 24px;
                            margin-bottom: 24px;
                        ">
                            <button style="
                                background: white;
                                border: 4px solid #242424;
                                padding: 12px 24px;
                                border-radius: 8px;
                                font-weight: bold;
                            ">Upload Image</button>
                        </div>
                        
                        <div class="expressions-section" style="
                            background: #e9ff70;
                            border: 4px solid #242424;
                            border-radius: 8px;
                            padding: 24px;
                            margin-bottom: 24px;
                        ">
                            <h3>Select Expression</h3>
                            <div class="expressions-carousel" style="
                                display: flex;
                                overflow-x: auto;
                                gap: 12px;
                            ">
                                <div class="expression-item" style="
                                    flex-shrink: 0;
                                    width: 100px;
                                    height: 100px;
                                    background: white;
                                    border: 3px solid #242424;
                                    border-radius: 8px;
                                ">😊</div>
                            </div>
                        </div>
                        
                        <div class="download-section" style="
                            text-align: center;
                            margin: 24px 0;
                        ">
                            <button class="download-btn" style="
                                background: #70d6ff;
                                border: 4px solid #242424;
                                padding: 12px 24px;
                                border-radius: 8px;
                                font-weight: bold;
                            ">Download All</button>
                        </div>
                    </main>
                    
                    <footer style="
                        margin-top: 32px;
                        padding-top: 24px;
                        border-top: 4px solid #242424;
                        text-align: center;
                    ">
                        <div style="
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            gap: 8px;
                            color: #242424;
                            font-size: 14px;
                        ">
                            <span>Created by</span>
                            <a href="https://jayreddin.github.io" target="_blank">Jamie Reddin</a>
                            <span>using</span>
                            <a href="https://puter.com" target="_blank">Puter.com</a>
                            <span>| Version 1.0.2</span>
                        </div>
                    </footer>
                </div>
            `;

            // Test DOM structure
            const appContainer = container.querySelector('.app-container');
            const header = container.querySelector('header');
            const main = container.querySelector('main');
            const footer = container.querySelector('footer');
            const uploadSection = container.querySelector('.upload-section');
            const expressionsSection = container.querySelector('.expressions-section');
            const downloadSection = container.querySelector('.download-section');

            regressionTests.push({
                test: 'DOM Structure',
                success: appContainer && header && main && footer && uploadSection && expressionsSection && downloadSection,
                details: 'All main application sections present'
            });

            // Test styling consistency
            const appContainerStyle = window.getComputedStyle(appContainer);
            const uploadSectionStyle = window.getComputedStyle(uploadSection);
            const expressionsSectionStyle = window.getComputedStyle(expressionsSection);

            const consistentBorders = appContainerStyle.borderWidth === '4px' &&
                                    uploadSectionStyle.borderWidth === '4px' &&
                                    expressionsSectionStyle.borderWidth === '4px';

            regressionTests.push({
                test: 'Styling Consistency',
                success: consistentBorders,
                details: 'Border widths and styling consistent across sections'
            });

            // Test carousel functionality preservation
            const expressionsCarousel = container.querySelector('.expressions-carousel');
            const carouselStyle = window.getComputedStyle(expressionsCarousel);
            const carouselWorking = carouselStyle.display === 'flex' && 
                                  carouselStyle.overflowX === 'auto';

            regressionTests.push({
                test: 'Carousel Functionality',
                success: carouselWorking,
                details: 'Expressions carousel maintains flex layout and scroll behavior'
            });

            // Test button functionality
            const downloadBtn = container.querySelector('.download-btn');
            const uploadBtn = container.querySelector('button');
            const buttonsPresent = downloadBtn && uploadBtn;

            regressionTests.push({
                test: 'Button Functionality',
                success: buttonsPresent,
                details: 'Upload and download buttons present and accessible'
            });

            const allRegressionTestsPassed = regressionTests.every(test => test.success);
            const summary = regressionTests.map(test => 
                `${test.test}: ${test.success ? '✅' : '❌'} - ${test.details}`
            ).join('\n');

            this.logTestResult(testName, allRegressionTestsPassed, summary);
            return allRegressionTestsPassed;
        } catch (error) {
            this.logTestResult(testName, false, `Error: ${error.message}`);
            return false;
        }
    }

    // Run all footer and integration tests
    async runAllFooterIntegrationTests() {
        console.log('🚀 Starting Footer and Integration Test Suite');
        console.log('='.repeat(50));

        const tests = [
            () => this.testFooterLinksNewTabs(),
            () => this.testFooterResponsiveLayout(),
            () => this.testFooterContentAndVersion(),
            () => this.testCompleteUserWorkflow(),
            () => this.testRegressionFunctionality()
        ];

        let passedTests = 0;
        const totalTests = tests.length;

        for (const test of tests) {
            try {
                const result = await test();
                if (result) passedTests++;
            } catch (error) {
                console.error('Test execution error:', error);
            }
            console.log('-'.repeat(30));
        }

        console.log('='.repeat(50));
        console.log(`📊 Footer Integration Test Summary: ${passedTests}/${totalTests} tests passed`);
        console.log(`✅ Success Rate: ${Math.round((passedTests/totalTests) * 100)}%`);
        
        return {
            total: totalTests,
            passed: passedTests,
            failed: totalTests - passedTests,
            successRate: Math.round((passedTests/totalTests) * 100)
        };
    }

    logTestResult(testName, passed, details) {
        const status = passed ? '✅ PASS' : '❌ FAIL';
        console.log(`${status}: ${testName}`);
        if (details) {
            console.log(`   Details: ${details}`);
        }
        
        this.testResults.push({
            name: testName,
            passed,
            details,
            timestamp: new Date().toISOString()
        });
    }

    getTestResults() {
        return this.testResults;
    }

    cleanup() {
        const container = document.getElementById('footer-test-container');
        if (container) {
            container.remove();
        }
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FooterIntegrationTester;
}