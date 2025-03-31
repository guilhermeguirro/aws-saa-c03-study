// Navigation handling
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.sidebar a');
    const navToggle = document.querySelector('.nav-toggle');
    const searchContainer = document.querySelector('.search-container');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const downloadButtons = document.querySelectorAll('.download-btn');
    const modal = document.getElementById('modal');
    const closeModal = document.querySelector('.close');
    const domainFilter = document.getElementById('domainFilter');
    const difficultyFilter = document.getElementById('difficultyFilter');

    console.log('Elements initialized:', {
        sections: sections.length,
        navLinks: navLinks.length,
        searchContainer: !!searchContainer,
        modal: !!modal
    });

    // Initialize interactive features
    try {
        initializeProgressBar();
        initializeQuickQuiz();
        initializeFlashcards();
        initializeTimeline();
        initializeChecklist();
        initializeExamTips();
        console.log('Interactive features initialized');
    } catch (error) {
        console.error('Error initializing interactive features:', error);
    }

    // Handle navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            console.log('Navigating to section:', targetId);
            
            // Update active section
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId) {
                    section.classList.add('active');
                }
            });

            // Update active nav link
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
                if (navLink.getAttribute('href') === `#${targetId}`) {
                    navLink.classList.add('active');
                }
            });

            // Load section-specific content
            loadSectionContent(targetId);
        });
    });

    // Mobile navigation toggle
    navToggle.addEventListener('click', () => {
        searchContainer.classList.toggle('active');
    });

    // Search functionality
    searchButton.addEventListener('click', () => {
        performSearch(searchInput.value);
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch(searchInput.value);
        }
    });

    // Download functionality
    downloadButtons.forEach(button => {
        button.addEventListener('click', () => {
            const section = button.closest('.section');
            const sectionId = section.id;
            downloadContent(sectionId);
        });
    });

    // Modal handling
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Filter handling
    domainFilter.addEventListener('change', filterQuestions);
    difficultyFilter.addEventListener('change', filterQuestions);

    // Load initial content
    console.log('Loading initial content...');
    loadContent('study-guide');
});

// Progress Bar
function initializeProgressBar() {
    const progress = document.getElementById('studyProgress');
    let scrollProgress = 0;
    
    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        scrollProgress = (window.scrollY / scrollHeight) * 100;
        progress.style.width = `${scrollProgress}%`;
    });
}

// Quick Quiz
function initializeQuickQuiz() {
    const quizContainer = document.getElementById('quizContainer');
    const quizData = [
        {
            question: "What is the primary purpose of AWS Auto Scaling?",
            options: [
                "To reduce costs",
                "To automatically adjust capacity",
                "To improve security",
                "To manage backups"
            ],
            correct: 1
        },
        {
            question: "Which AWS service is used for serverless computing?",
            options: [
                "EC2",
                "Lambda",
                "S3",
                "RDS"
            ],
            correct: 1
        },
        {
            question: "What is the main benefit of using Amazon S3?",
            options: [
                "Real-time data processing",
                "Scalable object storage",
                "Database management",
                "Load balancing"
            ],
            correct: 1
        }
    ];

    quizData.forEach((quiz, index) => {
        const quizElement = createQuizElement(quiz, index);
        quizContainer.appendChild(quizElement);
    });
}

function createQuizElement(quiz, index) {
    const div = document.createElement('div');
    div.className = 'quiz-question';
    div.innerHTML = `
        <p>${index + 1}. ${quiz.question}</p>
        <div class="quiz-options">
            ${quiz.options.map((option, i) => `
                <div class="quiz-option" data-index="${i}">${option}</div>
            `).join('')}
        </div>
    `;

    div.querySelectorAll('.quiz-option').forEach(option => {
        option.addEventListener('click', () => {
            const selectedIndex = parseInt(option.dataset.index);
            const isCorrect = selectedIndex === quiz.correct;
            
            option.classList.add(isCorrect ? 'correct' : 'incorrect');
            
            if (!isCorrect) {
                const correctOption = div.querySelector(`[data-index="${quiz.correct}"]`);
                correctOption.classList.add('correct');
            }
        });
    });

    return div;
}

// Flashcards
function initializeFlashcards() {
    const flashcardsContainer = document.getElementById('flashcardsContainer');
    const flashcardData = [
        {
            front: "What is AWS Lambda?",
            back: "A serverless compute service that runs code in response to events"
        },
        {
            front: "What is Amazon S3?",
            back: "A scalable object storage service for storing and retrieving data"
        },
        {
            front: "What is Amazon EC2?",
            back: "A web service that provides resizable compute capacity in the cloud"
        },
        {
            front: "What is Amazon RDS?",
            back: "A managed relational database service that supports multiple database engines"
        }
    ];

    flashcardData.forEach(card => {
        const flashcard = createFlashcard(card);
        flashcardsContainer.appendChild(flashcard);
    });
}

function createFlashcard(card) {
    const div = document.createElement('div');
    div.className = 'flashcard';
    div.innerHTML = `
        <div class="flashcard-inner">
            <div class="flashcard-front">${card.front}</div>
            <div class="flashcard-back">${card.back}</div>
        </div>
    `;

    div.addEventListener('click', () => {
        div.classList.toggle('flipped');
    });

    return div;
}

// Timeline
function initializeTimeline() {
    const container = document.getElementById('timelineContainer');
    if (!container) return;

    const timelineData = [
        {
            title: "Read the Question",
            description: "Carefully read the entire question and identify key requirements"
        },
        {
            title: "Identify AWS Services",
            description: "List all AWS services mentioned or implied in the question"
        }
        // Add more timeline items as needed
    ];

    container.innerHTML = timelineData.map(item => `
        <div class="timeline-item">
            <h4>${item.title}</h4>
            <p>${item.description}</p>
        </div>
    `).join('');
}

// Checklist
function initializeChecklist() {
    const container = document.getElementById('checklistContainer');
    if (!container) return;

    const checklistItems = [
        "Bring government-issued ID",
        "Arrive 30 minutes early",
        "Review key services before exam",
        "Take practice questions"
    ];

    container.innerHTML = checklistItems.map(item => `
        <div class="checklist-item">
            <input type="checkbox" id="${item.toLowerCase().replace(/\s+/g, '-')}">
            <label for="${item.toLowerCase().replace(/\s+/g, '-')}">${item}</label>
        </div>
    `).join('');
}

// Exam Tips
function initializeExamTips() {
    const container = document.getElementById('examTipsContainer');
    if (!container) return;

    const tips = [
        {
            title: "Time Management",
            description: "Allocate approximately 2 minutes per question"
        },
        {
            title: "Read Carefully",
            description: "Pay attention to keywords and requirements"
        }
        // Add more tips as needed
    ];

    container.innerHTML = tips.map(tip => `
        <div class="exam-tip">
            <h4>${tip.title}</h4>
            <p>${tip.description}</p>
        </div>
    `).join('');
}

// Filter Questions
function filterQuestions() {
    const domain = document.getElementById('domainFilter').value;
    const difficulty = document.getElementById('difficultyFilter').value;
    
    const questions = document.querySelectorAll('.question-card');
    questions.forEach(question => {
        const questionDomain = question.dataset.domain;
        const questionDifficulty = question.dataset.difficulty;
        
        const domainMatch = !domain || questionDomain === domain;
        const difficultyMatch = !difficulty || questionDifficulty === difficulty;
        
        question.style.display = domainMatch && difficultyMatch ? 'block' : 'none';
    });
}

// Section Content Loading
async function loadSectionContent(sectionId) {
    try {
        const response = await fetch(`/content/${sectionId}.md`);
        if (!response.ok) throw new Error('Content not found');
        
        const markdown = await response.text();
        const content = document.querySelector(`#${sectionId} .markdown-content`);
        
        // Convert markdown to HTML using marked library
        content.innerHTML = marked.parse(markdown);

        // Initialize section-specific features
        switch(sectionId) {
            case 'practice-questions':
                loadPracticeQuestions();
                break;
            case 'tricky-questions':
                loadTrickyQuestions();
                break;
        }
    } catch (error) {
        console.error('Error loading content:', error);
        const content = document.querySelector(`#${sectionId} .markdown-content`);
        if (content) {
            content.innerHTML = '<p>Error loading content. Please try again later.</p>';
        }
    }
}

// Practice Questions
function loadPracticeQuestions() {
    const container = document.getElementById('practiceQuestionsContainer');
    if (!container) return;

    // Sample practice questions
    const questions = [
        {
            question: "What is the primary purpose of AWS Auto Scaling?",
            options: [
                "To reduce costs",
                "To automatically adjust capacity",
                "To improve security",
                "To manage backups"
            ],
            correct: 1,
            domain: "resilient",
            difficulty: "medium"
        }
        // Add more questions as needed
    ];

    displayQuestions(questions);
}

function loadTrickyQuestions() {
    const container = document.getElementById('mistakesContainer');
    if (!container) return;

    const commonMistakes = [
        {
            title: "Confusing High Availability with Fault Tolerance",
            description: "High Availability allows for degraded performance during failures, while Fault Tolerance maintains full performance."
        }
        // Add more mistakes as needed
    ];

    displayCommonMistakes(commonMistakes);
}

function displayQuestions(questions) {
    const container = document.getElementById('practiceQuestionsContainer');
    if (!container) return;

    container.innerHTML = questions.map((q, index) => `
        <div class="question-card">
            <h3>Question ${index + 1}</h3>
            <p>${q.question}</p>
            <div class="options">
                ${q.options.map((opt, i) => `
                    <div class="option" data-index="${i}">${opt}</div>
                `).join('')}
            </div>
        </div>
    `).join('');

    // Add event listeners to options
    container.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', () => {
            const questionCard = option.closest('.question-card');
            const options = questionCard.querySelectorAll('.option');
            options.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
        });
    });
}

function displayCommonMistakes(mistakes) {
    const container = document.getElementById('mistakesContainer');
    if (!container) return;

    container.innerHTML = mistakes.map(mistake => `
        <div class="mistake-card">
            <h4>${mistake.title}</h4>
            <p>${mistake.description}</p>
        </div>
    `).join('');
}

// Function to perform search
function performSearch(query) {
    if (!query.trim()) return;

    const searchResults = [];
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        const content = section.querySelector('.markdown-content').textContent;
        if (content.toLowerCase().includes(query.toLowerCase())) {
            searchResults.push({
                section: section.id,
                title: section.querySelector('h1').textContent
            });
        }
    });

    displaySearchResults(searchResults, query);
}

// Function to display search results
function displaySearchResults(results, query) {
    const content = document.querySelector('.content');
    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'search-results';
    
    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <h2>No results found for "${query}"</h2>
            <p>Try different keywords or check the spelling.</p>
        `;
    } else {
        resultsContainer.innerHTML = `
            <h2>Search Results for "${query}"</h2>
            <ul>
                ${results.map(result => `
                    <li>
                        <a href="#${result.section}">${result.title}</a>
                    </li>
                `).join('')}
            </ul>
        `;
    }

    // Store current content
    const currentContent = content.innerHTML;
    
    // Display results
    content.innerHTML = '';
    content.appendChild(resultsContainer);

    // Add back button
    const backButton = document.createElement('button');
    backButton.className = 'back-btn';
    backButton.innerHTML = '<i class="fas fa-arrow-left"></i> Back to Content';
    backButton.addEventListener('click', () => {
        content.innerHTML = currentContent;
    });
    resultsContainer.appendChild(backButton);
}

// Function to load content
async function loadContent(sectionId) {
    console.log('Loading content for section:', sectionId);
    try {
        const response = await fetch(`/content/${sectionId}.md`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log('Content fetched successfully');
        
        const markdown = await response.text();
        console.log('Markdown content loaded:', markdown.substring(0, 100) + '...');
        
        const content = document.querySelector(`#${sectionId} .markdown-content`);
        if (!content) {
            throw new Error(`Content element not found for section: ${sectionId}`);
        }
        
        // Convert markdown to HTML using marked library
        content.innerHTML = marked.parse(markdown);
        console.log('Content rendered successfully');
    } catch (error) {
        console.error('Error loading content:', error);
        const content = document.querySelector(`#${sectionId} .markdown-content`);
        if (content) {
            content.innerHTML = `<p>Error loading content: ${error.message}</p>`;
        }
    }
}

// Function to download content
async function downloadContent(sectionId) {
    try {
        const response = await fetch(`/content/${sectionId}.md`);
        if (!response.ok) throw new Error('Content not found');
        
        const markdown = await response.text();
        const blob = new Blob([markdown], { type: 'text/markdown' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${sectionId}.md`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    } catch (error) {
        console.error('Error downloading content:', error);
        alert('Error downloading content. Please try again later.');
    }
} 