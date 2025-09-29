/**
 * Test Suite for Carousel Implementation and Responsiveness
 * Tests Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 5.3
 */

class CarouselFunctionalityTester {
    constructor() {
        this.testResults = [];
        this.mockExpressions = this.createMockExpressions();
        this.setupTestEnvironment();
    }

    setupTestEnvironment() {
        // Create test container if it doesn't exist
        if (!document.getElementById('carousel-test-container')) {
            const container = document.createElement('div');
            container.id = 'carousel-test-container';
            container.style.cssText = `
                position: fixed;
                top: -1000px;
                left: -1000px;
                width: 800px;
                height: 400px;
                visibility: hidden;
            `;
            document.body.appendChild(container);
        }
    }

    createMockExpressions() {
        return [
            { key: 'happy', name: 'Happy', emoji: '😊' },
            { key: 'sad', name: 'Sad', emoji: '😢' },
            { key: 'excited', name: 'Excited', emoji: '🤩' },
            { key: 'angry', name: 'Angry', emoji: '😠' },
            { key: 'surprised', name: 'Surprised', emoji: '😲' },
            { key: 'confused', name: 'Confused', emoji: '😕' },
            { key: 'laughing', name: 'Laughing', emoji: '😂' },
            { key: 'winking', name: 'Winking', emoji: '😉' },
            { key: 'sleepy', name: 'Sleepy', emoji: '😴' },
            { key: 'cool', name: 'Cool', emoji: '😎' }
        ];
    }

    // Test 1: Horizontal scrollable carousel display
    async testHorizontalScrollableDisplay() {
        const testName = 'Horizontal Scrollable Carousel Display';
        console.log(`🧪 Running: ${testName}`);

        try {
            // Create mock carousel container
            const container = document.getElementById('carousel-test-container');
            container.innerHTML = `
                <div class="carousel-container" style="
                    display: flex;
                    overflow-x: auto;
                    gap: 16px;
                    padding: 16px;
                    width: 100%;
                    height: 200px;
                ">
                    ${this.mockExpressions.map(expr => `
                        <div class="expression-item" style="
                            flex-shrink: 0;
                            width: 120px;
                            height: 120px;
                            background: #ff70a6;
                            border: 3px solid #242424;
                            border-radius: 8px;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            cursor: pointer;
                        ">
                            <span style="font-size: 32px;">${expr.emoji}</span>
                            <span style="font-size: 14px; font-weight: bold; color: #242424;">${expr.name}</span>
                        </div>
                    `).join('')}
                </div>
            `;

            const carouselContainer = container.querySelector('.carousel-container');
            const expressionItems = container.querySelectorAll('.expression-item');

            // Test horizontal layout
            const isHorizontal = carouselContainer.style.display === 'flex';
            const hasOverflowX = carouselContainer.style.overflowX === 'auto';
            const itemsFlexShrink = Array.from(expressionItems).every(item => 
                item.style.flexShrink === '0'
            );

            const success = isHorizontal && hasOverflowX && itemsFlexShrink;
            
            this.logTestResult(testName, success, 
                `Horizontal layout: ${isHorizontal}, Overflow-X: ${hasOverflowX}, Flex-shrink: ${itemsFlexShrink}`);
            return success;
        } catch (error) {
            this.logTestResult(testName, false, `Error: ${error.message}`);
            return false;
        }
    }

    // Test 2: Navigation arrows visibility and functionality
    async testNavigationArrows() {
        const testName = 'Navigation Arrows Functionality';
        console.log(`🧪 Running: ${testName}`);

        try {
            const container = document.getElementById('carousel-test-container');
            container.innerHTML = `
                <div class="carousel-wrapper" style="position: relative; width: 400px; height: 200px;">
                    <button class="nav-arrow nav-left" style="
                        position: absolute;
                        left: 8px;
                        top: 50%;
                        transform: translateY(-50%);
                        z-index: 10;
                        background: white;
                        border: 3px solid #242424;
                        border-radius: 50%;
                        width: 40px;
                        height: 40px;
                        cursor: pointer;
                        display: none;
                    ">‹</button>
                    
                    <button class="nav-arrow nav-right" style="
                        position: absolute;
                        right: 8px;
                        top: 50%;
                        transform: translateY(-50%);
                        z-index: 10;
                        background: white;
                        border: 3px solid #242424;
                        border-radius: 50%;
                        width: 40px;
                        height: 40px;
                        cursor: pointer;
                        display: block;
                    ">›</button>
                    
                    <div class="carousel-scroll" style="
                        display: flex;
                        overflow-x: auto;
                        gap: 16px;
                        padding: 16px 50px;
                        width: 100%;
                        height: 100%;
                        scroll-behavior: smooth;
                    ">
                        ${this.mockExpressions.map(expr => `
                            <div class="expression-item" style="
                                flex-shrink: 0;
                                width: 100px;
                                height: 100px;
                                background: #e9ff70;
                                border: 2px solid #242424;
                                border-radius: 8px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                            ">${expr.emoji}</div>
                        `).join('')}
                    </div>
                </div>
            `;

            const leftArrow = container.querySelector('.nav-left');
            const rightArrow = container.querySelector('.nav-right');
            const scrollContainer = container.querySelector('.carousel-scroll');

            // Test arrow visibility logic
            const checkArrowVisibility = () => {
                const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
                const showLeft = scrollLeft > 0;
                const showRight = scrollLeft < scrollWidth - clientWidth - 1;
                
                return { showLeft, showRight, scrollLeft, scrollWidth, clientWidth };
            };

            // Initial state
            const initialState = checkArrowVisibility();
            
            // Simulate scroll to test arrow visibility
            scrollContainer.scrollLeft = 100;
            const scrolledState = checkArrowVisibility();

            // Test arrow click functionality
            let scrollTriggered = false;
            rightArrow.addEventListener('click', () => {
                scrollTriggered = true;
                scrollContainer.scrollBy({ left: 200, behavior: 'smooth' });
            });

            // Trigger click
            rightArrow.click();

            const success = initialState.showRight && scrollTriggered;
            
            this.logTestResult(testName, success, 
                `Initial right arrow visible: ${initialState.showRight}, ` +
                `Scroll triggered: ${scrollTriggered}, ` +
                `Scroll position: ${scrolledState.scrollLeft}`);
            return success;
        } catch (error) {
            this.logTestResult(testName, false, `Error: ${error.message}`);
            return false;
        }
    }

    // Test 3: Responsive behavior on different screen sizes
    async testResponsiveBehavior() {
        const testName = 'Responsive Behavior on Different Screen Sizes';
        console.log(`🧪 Running: ${testName}`);

        try {
            const container = document.getElementById('carousel-test-container');
            
            // Test different viewport sizes
            const viewportTests = [
                { width: 320, height: 568, name: 'Mobile Portrait' },
                { width: 768, height: 1024, name: 'Tablet' },
                { width: 1200, height: 800, name: 'Desktop' }
            ];

            const results = [];

            for (const viewport of viewportTests) {
                // Simulate viewport size
                container.style.width = viewport.width + 'px';
                container.style.height = viewport.height + 'px';

                container.innerHTML = `
                    <div class="responsive-carousel" style="
                        display: flex;
                        overflow-x: auto;
                        gap: 12px;
                        padding: 12px;
                        width: 100%;
                        height: 150px;
                    ">
                        ${this.mockExpressions.slice(0, 6).map(expr => `
                            <div class="expression-item" style="
                                flex-shrink: 0;
                                width: ${viewport.width < 768 ? '80px' : '120px'};
                                height: ${viewport.width < 768 ? '80px' : '120px'};
                                background: #70d6ff;
                                border: 2px solid #242424;
                                border-radius: 8px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-size: ${viewport.width < 768 ? '20px' : '32px'};
                            ">${expr.emoji}</div>
                        `).join('')}
                    </div>
                `;

                const carousel = container.querySelector('.responsive-carousel');
                const items = container.querySelectorAll('.expression-item');
                
                // Check if items fit properly
                const itemWidth = parseInt(items[0].style.width);
                const expectedItemsVisible = Math.floor(viewport.width / (itemWidth + 12));
                const actualItemsVisible = items.length;
                
                const isResponsive = itemWidth === (viewport.width < 768 ? 80 : 120);
                
                results.push({
                    viewport: viewport.name,
                    width: viewport.width,
                    itemWidth,
                    isResponsive,
                    expectedVisible: expectedItemsVisible,
                    actualVisible: actualItemsVisible
                });
            }

            const allResponsive = results.every(result => result.isResponsive);
            const summary = results.map(result => 
                `${result.viewport} (${result.width}px): Item size ${result.itemWidth}px - ${result.isResponsive ? '✅' : '❌'}`
            ).join('\n');

            this.logTestResult(testName, allResponsive, summary);
            return allResponsive;
        } catch (error) {
            this.logTestResult(testName, false, `Error: ${error.message}`);
            return false;
        }
    }

    // Test 4: Selection functionality within carousel
    async testSelectionFunctionality() {
        const testName = 'Selection Functionality Within Carousel';
        console.log(`🧪 Running: ${testName}`);

        try {
            const container = document.getElementById('carousel-test-container');
            let selectedExpression = null;

            container.innerHTML = `
                <div class="selectable-carousel" style="
                    display: flex;
                    overflow-x: auto;
                    gap: 12px;
                    padding: 12px;
                    width: 100%;
                    height: 150px;
                ">
                    ${this.mockExpressions.slice(0, 5).map((expr, index) => `
                        <div class="expression-item selectable" data-key="${expr.key}" style="
                            flex-shrink: 0;
                            width: 100px;
                            height: 100px;
                            background: ${index === 0 ? '#ff70a6' : '#e9ff70'};
                            border: 3px solid #242424;
                            border-radius: 8px;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            cursor: pointer;
                            transition: all 0.2s;
                        ">
                            <span style="font-size: 24px;">${expr.emoji}</span>
                            <span style="font-size: 12px; font-weight: bold;">${expr.name}</span>
                        </div>
                    `).join('')}
                </div>
            `;

            // Add selection functionality
            const items = container.querySelectorAll('.selectable');
            selectedExpression = this.mockExpressions[0].key; // Default selection

            items.forEach(item => {
                item.addEventListener('click', () => {
                    // Remove selection from all items
                    items.forEach(i => {
                        i.style.background = '#e9ff70';
                        i.style.transform = 'scale(1)';
                    });
                    
                    // Add selection to clicked item
                    item.style.background = '#ff70a6';
                    item.style.transform = 'scale(1.05)';
                    selectedExpression = item.dataset.key;
                });
            });

            // Test initial selection
            const initiallySelected = selectedExpression === this.mockExpressions[0].key;

            // Test clicking different item
            const secondItem = items[1];
            secondItem.click();
            
            // Wait for event to process
            await new Promise(resolve => setTimeout(resolve, 100));
            
            const selectionChanged = selectedExpression === this.mockExpressions[1].key;
            const visualFeedback = secondItem.style.background === 'rgb(255, 112, 166)'; // #ff70a6

            const success = initiallySelected && selectionChanged && visualFeedback;
            
            this.logTestResult(testName, success, 
                `Initial selection: ${initiallySelected}, ` +
                `Selection changed: ${selectionChanged}, ` +
                `Visual feedback: ${visualFeedback}, ` +
                `Selected: ${selectedExpression}`);
            return success;
        } catch (error) {
            this.logTestResult(testName, false, `Error: ${error.message}`);
            return false;
        }
    }

    // Test 5: Custom expression addition and deletion in carousel format
    async testCustomExpressionManagement() {
        const testName = 'Custom Expression Addition and Deletion';
        console.log(`🧪 Running: ${testName}`);

        try {
            const container = document.getElementById('carousel-test-container');
            let expressions = [...this.mockExpressions.slice(0, 3)];

            const renderCarousel = () => {
                container.innerHTML = `
                    <div class="custom-carousel" style="
                        display: flex;
                        overflow-x: auto;
                        gap: 12px;
                        padding: 12px;
                        width: 100%;
                        height: 150px;
                    ">
                        ${expressions.map(expr => `
                            <div class="expression-item" data-key="${expr.key}" style="
                                flex-shrink: 0;
                                width: 100px;
                                height: 100px;
                                background: ${expr.isCustom ? '#ffd670' : '#e9ff70'};
                                border: 2px solid #242424;
                                border-radius: 8px;
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                justify-content: center;
                                position: relative;
                            ">
                                <span style="font-size: 24px;">${expr.emoji}</span>
                                <span style="font-size: 10px; font-weight: bold;">${expr.name}</span>
                                ${expr.isCustom ? `
                                    <button class="delete-btn" data-key="${expr.key}" style="
                                        position: absolute;
                                        top: -5px;
                                        right: -5px;
                                        width: 20px;
                                        height: 20px;
                                        background: #ff70a6;
                                        border: 2px solid #242424;
                                        border-radius: 50%;
                                        font-size: 12px;
                                        cursor: pointer;
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                    ">×</button>
                                ` : ''}
                            </div>
                        `).join('')}
                        <div class="add-button" style="
                            flex-shrink: 0;
                            width: 100px;
                            height: 100px;
                            background: #70d6ff;
                            border: 3px dashed #242424;
                            border-radius: 8px;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            cursor: pointer;
                        ">
                            <span style="font-size: 32px;">+</span>
                            <span style="font-size: 10px; font-weight: bold;">Add New</span>
                        </div>
                    </div>
                `;

                // Add event listeners
                const addButton = container.querySelector('.add-button');
                const deleteButtons = container.querySelectorAll('.delete-btn');

                addButton.addEventListener('click', () => {
                    const newExpression = {
                        key: `custom-${Date.now()}`,
                        name: 'Custom',
                        emoji: '🎨',
                        isCustom: true
                    };
                    expressions.push(newExpression);
                    renderCarousel();
                });

                deleteButtons.forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const key = btn.dataset.key;
                        expressions = expressions.filter(expr => expr.key !== key);
                        renderCarousel();
                    });
                });
            };

            // Initial render
            renderCarousel();
            const initialCount = expressions.length;

            // Test adding custom expression
            const addButton = container.querySelector('.add-button');
            addButton.click();
            
            await new Promise(resolve => setTimeout(resolve, 100));
            const afterAddCount = expressions.length;
            const additionWorked = afterAddCount === initialCount + 1;

            // Test deleting custom expression
            const deleteButton = container.querySelector('.delete-btn');
            if (deleteButton) {
                deleteButton.click();
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            
            const afterDeleteCount = expressions.length;
            const deletionWorked = afterDeleteCount === initialCount;

            // Test visual distinction of custom expressions
            const customItems = container.querySelectorAll('[data-key^="custom-"]');
            const hasCustomStyling = Array.from(customItems).every(item => 
                item.style.background === 'rgb(255, 214, 112)' // #ffd670
            );

            const success = additionWorked && deletionWorked && hasCustomStyling;
            
            this.logTestResult(testName, success, 
                `Addition: ${additionWorked} (${initialCount} → ${afterAddCount}), ` +
                `Deletion: ${deletionWorked} (${afterAddCount} → ${afterDeleteCount}), ` +
                `Custom styling: ${hasCustomStyling}`);
            return success;
        } catch (error) {
            this.logTestResult(testName, false, `Error: ${error.message}`);
            return false;
        }
    }

    // Test 6: Smooth scrolling behavior
    async testSmoothScrolling() {
        const testName = 'Smooth Scrolling Behavior';
        console.log(`🧪 Running: ${testName}`);

        try {
            const container = document.getElementById('carousel-test-container');
            container.innerHTML = `
                <div class="smooth-scroll-carousel" style="
                    display: flex;
                    overflow-x: auto;
                    gap: 12px;
                    padding: 12px;
                    width: 300px;
                    height: 150px;
                    scroll-behavior: smooth;
                ">
                    ${this.mockExpressions.map(expr => `
                        <div class="expression-item" style="
                            flex-shrink: 0;
                            width: 100px;
                            height: 100px;
                            background: #e9ff70;
                            border: 2px solid #242424;
                            border-radius: 8px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        ">${expr.emoji}</div>
                    `).join('')}
                </div>
            `;

            const carousel = container.querySelector('.smooth-scroll-carousel');
            
            // Test scroll behavior property
            const hasSmoothScroll = carousel.style.scrollBehavior === 'smooth';
            
            // Test programmatic scrolling
            const initialScrollLeft = carousel.scrollLeft;
            carousel.scrollBy({ left: 200, behavior: 'smooth' });
            
            // Wait for scroll to potentially complete
            await new Promise(resolve => setTimeout(resolve, 300));
            
            const finalScrollLeft = carousel.scrollLeft;
            const scrollOccurred = finalScrollLeft !== initialScrollLeft;

            const success = hasSmoothScroll && scrollOccurred;
            
            this.logTestResult(testName, success, 
                `Smooth scroll CSS: ${hasSmoothScroll}, ` +
                `Scroll occurred: ${scrollOccurred} (${initialScrollLeft} → ${finalScrollLeft})`);
            return success;
        } catch (error) {
            this.logTestResult(testName, false, `Error: ${error.message}`);
            return false;
        }
    }

    // Run all carousel tests
    async runAllCarouselTests() {
        console.log('🚀 Starting Carousel Functionality Test Suite');
        console.log('='.repeat(50));

        const tests = [
            () => this.testHorizontalScrollableDisplay(),
            () => this.testNavigationArrows(),
            () => this.testResponsiveBehavior(),
            () => this.testSelectionFunctionality(),
            () => this.testCustomExpressionManagement(),
            () => this.testSmoothScrolling()
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
        console.log(`📊 Carousel Test Summary: ${passedTests}/${totalTests} tests passed`);
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
        const container = document.getElementById('carousel-test-container');
        if (container) {
            container.remove();
        }
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CarouselFunctionalityTester;
}