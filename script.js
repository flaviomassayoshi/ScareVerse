// ScareVerse JavaScript

// Enter Verse function
function enterVerse() {
    // Create a spooky entrance effect
    const hero = document.querySelector('.hero');
    hero.style.opacity = '0';
    
    setTimeout(() => {
        // Scroll to stories section
        document.getElementById('stories').scrollIntoView({ 
            behavior: 'smooth' 
        });
        hero.style.opacity = '1';
    }, 500);
    
    // Display welcome message
    showNotification('Welcome to the ScareVerse... 👻');
}

// Read More functionality for story cards
document.addEventListener('DOMContentLoaded', () => {
    const readMoreButtons = document.querySelectorAll('.read-more');
    
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const storyCard = this.closest('.story-card');
            const storyTitle = storyCard.querySelector('h3').textContent;
            showNotification(`Loading "${storyTitle}"... Coming soon! 🎃`);
        });
    });
    
    // Add hover effect sound (visual feedback)
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.transform = 'scale(1.2) rotate(360deg)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 500);
        });
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add creepy cursor trail effect
    createCursorTrail();
    
    // Random scary quote generator
    setInterval(() => {
        if (Math.random() > 0.95) { // 5% chance every interval
            showRandomScaryQuote();
        }
    }, 10000); // Check every 10 seconds
});

// Notification system
function showNotification(message) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: #1a1a1a;
        color: #ff0000;
        padding: 1rem 2rem;
        border: 2px solid #ff0000;
        border-radius: 5px;
        box-shadow: 0 0 20px rgba(255, 0, 0, 0.5);
        z-index: 2000;
        animation: slideIn 0.5s ease-out;
        font-weight: bold;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// Cursor trail effect
function createCursorTrail() {
    let cursorTrail = [];
    const trailLength = 10;
    
    document.addEventListener('mousemove', (e) => {
        // Only create trail occasionally to reduce performance impact
        if (Math.random() > 0.7) {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.cssText = `
                position: fixed;
                width: 5px;
                height: 5px;
                background-color: #ff0000;
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                opacity: 0.6;
                transition: opacity 0.5s;
            `;
            
            document.body.appendChild(trail);
            cursorTrail.push(trail);
            
            // Remove old trails
            if (cursorTrail.length > trailLength) {
                const oldTrail = cursorTrail.shift();
                oldTrail.style.opacity = '0';
                setTimeout(() => {
                    oldTrail.remove();
                }, 500);
            }
        }
    });
}

// Random scary quotes
function showRandomScaryQuote() {
    const scaryQuotes = [
        "Did you hear that? 🎃",
        "Something's watching... 👁️",
        "The shadows are moving... 🌑",
        "Are you alone? 👻",
        "Don't look behind you... 🦇"
    ];
    
    const randomQuote = scaryQuotes[Math.floor(Math.random() * scaryQuotes.length)];
    showNotification(randomQuote);
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    
    if (hero && scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add typing effect to tagline
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const tagline = document.querySelector('.tagline');
    if (tagline) {
        const originalText = tagline.textContent;
        typeWriter(tagline, originalText, 80);
    }
});
