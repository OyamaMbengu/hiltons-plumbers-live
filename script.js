document.addEventListener("DOMContentLoaded", function() {
    // Fade-in Logic
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                
                // Trigger counter animation if it's the stats section
                if (entry.target.classList.contains('stats-section')) {
                    runCounters();
                }
                
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Counter Animation Logic
    function runCounters() {
        const counters = document.querySelectorAll('.counter');
        const speed = 50; // The lower the number, the faster it counts

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                
                // Calculate increment speed
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20); // Update every 20ms
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }
});