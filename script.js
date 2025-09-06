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

// Generic copy function
function copyToClipboard(text, successMessage = 'Copied to clipboard!') {
    // Use the modern Clipboard API if available
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(function() {
            showCopyNotification(successMessage);
        }).catch(function(err) {
            console.error('Could not copy text: ', err);
            fallbackCopyTextToClipboard(text, successMessage);
        });
    } else {
        // Fallback for older browsers
        fallbackCopyTextToClipboard(text, successMessage);
    }
}

// Copy location function
function copyLocation() {
    copyToClipboard("Truong Thanh, HCMC", "Location copied to clipboard!");
}

// Copy phone function
function copyPhone() {
    copyToClipboard("0976905420", "Phone number copied to clipboard!");
}

// Copy email function
function copyEmail() {
    copyToClipboard("tinhnd.gigamall@gmail.com", "Email copied to clipboard!");
}

// Fallback copy function for older browsers
function fallbackCopyTextToClipboard(text, successMessage = 'Copied to clipboard!') {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopyNotification(successMessage);
        } else {
            showCopyNotification('Failed to copy', 'error');
        }
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
        showCopyNotification('Failed to copy', 'error');
    }
    
    document.body.removeChild(textArea);
}

// Show copy notification
function showCopyNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.copy-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `copy-notification fixed top-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg transition-all duration-300 ${
        type === 'success' 
            ? 'bg-green-600 text-white' 
            : 'bg-red-600 text-white'
    }`;
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}