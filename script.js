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

// EmailJS Configuration and Form Handling
(function() {
    // Initialize EmailJS with your public key
    emailjs.init("jmmSexwT-WKPoQ7Oe"); // Replace with your actual EmailJS public key
    
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    const errorText = document.getElementById('error-text');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        submitBtn.disabled = true;
        btnText.textContent = 'Đang gửi...';
        
        // Hide previous messages
        successMessage.classList.add('hidden');
        errorMessage.classList.add('hidden');
        
        // Get form data
        const formData = new FormData(contactForm);
        const templateParams = {
            from_name: formData.get('from_name'),
            from_email: formData.get('from_email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            to_email: 'tinhnd.gigamall@gmail.com'
        };
        
        // Send email using EmailJS
        emailjs.send('service_qpt6io5', 'template_3kq1mcu', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                
                // Show success message
                successMessage.classList.remove('hidden');
                
                // Reset form
                contactForm.reset();
                
                // Reset button state
                submitBtn.disabled = false;
                btnText.textContent = 'Send Message';
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
            }, function(error) {
                console.log('FAILED...', error);
                
                // Show error message
                errorText.textContent = 'Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau.';
                errorMessage.classList.remove('hidden');
                
                // Reset button state
                submitBtn.disabled = false;
                btnText.textContent = 'Send Message';
                
                // Scroll to error message
                errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
    });
})();