document.addEventListener('DOMContentLoaded', () => {
    const timeDisplay = document.getElementById('timeDisplay');
    const secondsDisplay = document.getElementById('secondsDisplay');
    const dateDisplay = document.getElementById('dateDisplay');
    
    function updateClock() {
        const now = new Date();
        
        let hours = now.getHours();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        timeDisplay.textContent = `${hours}:${minutes}`;
        secondsDisplay.textContent = seconds;
        
        const options = { weekday: 'long', month: 'short', day: 'numeric' };
        dateDisplay.textContent = now.toLocaleDateString('en-US', options);
    }
    
    // Initial call
    updateClock();
    
    // Update every second
    setInterval(updateClock, 1000);
    
    // Add particle effect on button click
    const downloadBtn = document.getElementById('downloadBtn');
    
    downloadBtn.addEventListener('click', function(e) {
        // Only run animation, the actual download will still happen via the href
        createParticles(e.clientX, e.clientY);
    });
    
    function createParticles(x, y) {
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            
            // Random styling
            const size = Math.random() * 8 + 4;
            const color = Math.random() > 0.5 ? '#3b82f6' : '#8b5cf6';
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.background = color;
            particle.style.position = 'fixed';
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            
            document.body.appendChild(particle);
            
            // Animation
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 60 + 20;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            
            particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
            ], {
                duration: Math.random() * 500 + 500,
                easing: 'cubic-bezier(0, .9, .57, 1)',
                fill: 'forwards'
            });
            
            // Cleanup
            setTimeout(() => {
                particle.remove();
            }, 1000);
        }
    }
});
