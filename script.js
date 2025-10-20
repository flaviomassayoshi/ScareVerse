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
    const quoteInterval = setInterval(() => {
        if (Math.random() > 0.95) { // 5% chance every interval
            showRandomScaryQuote();
        }
    }, 10000); // Check every 10 seconds
    
    // Store interval ID for cleanup if needed
    window.scareVerseQuoteInterval = quoteInterval;
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
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('slide-out');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// Cursor trail effect (optimized)
function createCursorTrail() {
    let cursorTrail = [];
    const trailLength = 8;
    const createFrequency = 0.7; // 30% of mouse moves create trail
    
    document.addEventListener('mousemove', (e) => {
        // Only create trail occasionally to reduce performance impact
        if (Math.random() > createFrequency) {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.left = `${e.clientX}px`;
            trail.style.top = `${e.clientY}px`;
            
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
