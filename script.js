// Mobile menu toggle
document.getElementById('menu-toggle').addEventListener('click', function() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});

// Terminal typing effect
const terminalLines = [
    "> Currently working with:",
    "- JavaScript",
    "- Django",
    "> Looking for new opportunities",
    "> Available for freelance work"
];

let currentLine = 0;
let currentChar = 0;
const terminalContent = document.querySelector('.terminal-body');
const cursor = document.querySelector('.cursor');

function typeTerminal() {
    if (currentLine < terminalLines.length) {
        if (currentChar < terminalLines[currentLine].length) {
            const lineElement = terminalContent.children[currentLine + 3] || document.createElement('p');
            if (currentChar === 0 && !lineElement.textContent) {
                terminalContent.appendChild(lineElement);
            }
            lineElement.textContent = terminalLines[currentLine].substring(0, currentChar + 1);
            currentChar++;
            setTimeout(typeTerminal, Math.random() * 50 + 50);
        } else {
            currentLine++;
            currentChar = 0;
            setTimeout(typeTerminal, 500);
        }
    } else {
        cursor.style.display = 'inline-block';
    }
}

// Start typing effect after a delay
setTimeout(typeTerminal, 2000);

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// Add scroll animation
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.tech-card, .terminal, [class*="hover:"]');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate__animated', 'animate__fadeInUp');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Back to top button functionality
const backToTopButton = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) { // Show button when scrolled down 300px
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});