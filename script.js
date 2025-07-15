// Section navigation
let currentSection = 0;
const sections = ['landing', 'memories', 'feelings', 'question', 'yes-response'];

function nextSection() {
    if (currentSection < sections.length - 1) {
        // Hide current section
        document.getElementById(sections[currentSection]).classList.remove('active');
        
        // Show next section
        currentSection++;
        document.getElementById(sections[currentSection]).classList.add('active');
        
        // Add entrance animation
        const currentElement = document.getElementById(sections[currentSection]);
        currentElement.style.animation = 'fadeInUp 0.8s ease-out';
        
        // Trigger special animations for specific sections
        if (sections[currentSection] === 'memories') {
            animateMemoryCards();
        } else if (sections[currentSection] === 'feelings') {
            startTypingAnimation();
        }
    }
}

// Make functions globally available
window.nextSection = nextSection;
window.showYes = showYes;
window.moveNoButton = moveNoButton;
window.restart = restart;

// Memory cards animation
function animateMemoryCards() {
    const cards = document.querySelectorAll('.memory-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = 'fadeInUp 0.8s ease-out';
        }, index * 200);
    });
}

// Typing animation for feelings
function startTypingAnimation() {
    const typingTexts = document.querySelectorAll('.typing-text');
    typingTexts.forEach((text, index) => {
        setTimeout(() => {
            text.style.animation = 'typeWriter 3s ease-out forwards';
        }, index * 1000);
    });
}

// Move the "No" button randomly when hovered
async function moveNoButton() {
    console.log('😢 SHE SAID NO 😢');
    console.log('Time:', new Date().toLocaleString());
    console.log('Button pressed: NO 😢');
    
    // Save to Firebase
    await saveResponseToFirebase('NO 😢');
    
    const noButton = document.querySelector('.btn-no');
    const container = document.querySelector('.question-box');
    const containerRect = container.getBoundingClientRect();
    
    const maxX = containerRect.width - noButton.offsetWidth;
    const maxY = containerRect.height - noButton.offsetHeight;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    noButton.style.position = 'absolute';
    noButton.style.left = randomX + 'px';
    noButton.style.top = randomY + 'px';
    noButton.style.transition = 'all 0.3s ease';
    
    // Add a fun message
    noButton.textContent = 'Try again! 😄';
    
    // Reset text after a delay
    setTimeout(() => {
        noButton.textContent = 'No 😢';
    }, 1000);
}

// Show celebration when "Yes" is clicked
async function showYes() {
    console.log('🎉 SHE SAID YES! 🎉');
    console.log('Time:', new Date().toLocaleString());
    console.log('Button pressed: YES 💖');
    
    // Save to Firebase
    await saveResponseToFirebase('YES 💖');
    
    // Hide question section
    document.getElementById('question').classList.remove('active');
    
    // Show celebration section
    document.getElementById('yes-response').classList.add('active');
    
    // Add extra celebration effects
    createExtraConfetti();
    playCelebrationSound();
    
    // Show response info on the celebration page
    showResponseInfo('YES 💖');
}

// Function to show response information
function showResponseInfo(response) {
    const responseInfo = document.getElementById('response-info');
    if (responseInfo) {
        responseInfo.innerHTML = `
            <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 15px; margin: 20px 0;">
                <h3 style="color: #fff; margin-bottom: 10px;">📊 Response Details</h3>
                <p style="color: #fff; margin: 5px 0;">Response: ${response}</p>
                <p style="color: #fff; margin: 5px 0;">Time: ${new Date().toLocaleString()}</p>
                <p style="color: #fff; margin: 5px 0;">Date: ${new Date().toDateString()}</p>
            </div>
        `;
    }
}

// Create extra confetti
function createExtraConfetti() {
    const celebration = document.querySelector('.celebration');
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDelay = Math.random() * 2 + 's';
            confetti.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`;
            celebration.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 100);
    }
}

// Play celebration sound (optional)
function playCelebrationSound() {
    // Create a simple beep sound using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(1200, audioContext.currentTime + 0.2);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
        // Fallback if audio is not supported
        console.log('Audio not supported');
    }
}

// Restart the experience
function restart() {
    // Hide all sections
    sections.forEach(section => {
        document.getElementById(section).classList.remove('active');
    });
    
    // Reset to first section
    currentSection = 0;
    document.getElementById(sections[currentSection]).classList.add('active');
    
    // Reset button positions
    const noButton = document.querySelector('.btn-no');
    if (noButton) {
        noButton.style.position = '';
        noButton.style.left = '';
        noButton.style.top = '';
        noButton.textContent = 'No 😢';
    }
}

// Add interactive effects to memory cards
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    // Check for previous response
    checkPreviousResponse();
    
    // Ensure the first section is active
    const landingSection = document.getElementById('landing');
    if (landingSection) {
        landingSection.classList.add('active');
    }
    
    const memoryCards = document.querySelectorAll('.memory-card');
    
    memoryCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add a heart effect when clicked
            const heart = document.createElement('div');
            heart.innerHTML = '💖';
            heart.style.position = 'absolute';
            heart.style.fontSize = '2rem';
            heart.style.pointerEvents = 'none';
            heart.style.animation = 'fadeInUp 1s ease-out forwards';
            
            const rect = card.getBoundingClientRect();
            heart.style.left = (rect.width / 2) + 'px';
            heart.style.top = (rect.height / 2) + 'px';
            
            card.style.position = 'relative';
            card.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 1000);
        });
    });
    
    // Add floating animation to stars
    createFloatingStars();
    
    console.log('Initialization complete');
});

// Function to check for previous response
async function checkPreviousResponse() {
    try {
        // Try to get from Firebase first
        const latestResponse = await getLatestResponse();
        
        if (latestResponse) {
            console.log('📊 Previous response found in Firebase:');
            console.log('Response:', latestResponse.response);
            console.log('Time:', latestResponse.date);
            
            // Show previous response info
            const responseInfo = document.getElementById('response-info');
            if (responseInfo) {
                responseInfo.innerHTML = `
                    <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 15px; margin: 20px 0;">
                        <h3 style="color: #fff; margin-bottom: 10px;">📊 Previous Response (Firebase)</h3>
                        <p style="color: #fff; margin: 5px 0;">Response: ${latestResponse.response}</p>
                        <p style="color: #fff; margin: 5px 0;">Time: ${latestResponse.date}</p>
                        <p style="color: #fff; margin: 5px 0;">Device: ${latestResponse.userAgent}</p>
                        <p style="color: #fff; margin: 5px 0;">Screen: ${latestResponse.screenResolution}</p>
                    </div>
                `;
            }
        } else {
            // Fallback to localStorage
            const previousResponse = localStorage.getItem('herResponse');
            const responseTime = localStorage.getItem('responseTime');
            
            if (previousResponse) {
                console.log('📊 Previous response found in localStorage:');
                console.log('Response:', previousResponse);
                console.log('Time:', responseTime);
                
                // Show previous response info
                const responseInfo = document.getElementById('response-info');
                if (responseInfo) {
                    responseInfo.innerHTML = `
                        <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 15px; margin: 20px 0;">
                            <h3 style="color: #fff; margin-bottom: 10px;">📊 Previous Response (Local)</h3>
                            <p style="color: #fff; margin: 5px 0;">Response: ${previousResponse}</p>
                            <p style="color: #fff; margin: 5px 0;">Time: ${responseTime}</p>
                        </div>
                    `;
                }
            }
        }
    } catch (error) {
        console.error('❌ Error checking previous response:', error);
    }
}

// Create floating stars
function createFloatingStars() {
    const starsContainer = document.querySelector('.stars');
    if (!starsContainer) return;
    
    for (let i = 0; i < 20; i++) {
        const star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.width = '2px';
        star.style.height = '2px';
        star.style.background = 'white';
        star.style.borderRadius = '50%';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animation = `twinkle ${2 + Math.random() * 3}s infinite`;
        star.style.animationDelay = Math.random() * 2 + 's';
        
        starsContainer.appendChild(star);
    }
}

// Add smooth scroll effect
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        if (currentSection < sections.length - 1) {
            nextSection();
        }
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (currentSection > 0) {
            document.getElementById(sections[currentSection]).classList.remove('active');
            currentSection--;
            document.getElementById(sections[currentSection]).classList.add('active');
        }
    }
});

// Add touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next section
            if (currentSection < sections.length - 1) {
                nextSection();
            }
        } else {
            // Swipe right - previous section
            if (currentSection > 0) {
                document.getElementById(sections[currentSection]).classList.remove('active');
                currentSection--;
                document.getElementById(sections[currentSection]).classList.add('active');
            }
        }
    }
}

// Add loading animation
window.addEventListener('load', function() {
    const container = document.querySelector('.container');
    container.style.opacity = '0';
    container.style.transition = 'opacity 1s ease-in';
    
    setTimeout(() => {
        container.style.opacity = '1';
    }, 100);
}); 

function shareResponse() {
    const message = "I just said YES to a beautiful date proposal! 💖✨ #Love #SpecialMoment";
    navigator.clipboard.writeText(message).then(() => {
        alert("Message copied! Now paste it in your Instagram story, DM, or post.");
        window.open("https://www.instagram.com/", "_blank");
    }).catch(err => {
        alert("Could not copy message. Please copy it manually:\n\n" + message);
        window.open("https://www.instagram.com/", "_blank");
    });
}
window.shareResponse = shareResponse; 