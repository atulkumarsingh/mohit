document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Header Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    });

    // 3. Modal / Popup Logic
    const modal = document.getElementById('contact-modal');
    const openModalButtons = document.querySelectorAll('.open-modal-btn');
    const closeModalButton = document.querySelector('.close-modal-btn');

    const openModal = () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scroll
    };

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scroll
    };

    openModalButtons.forEach(btn => btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    }));

    if (closeModalButton) closeModalButton.addEventListener('click', closeModal);
    
    // Close modal on escape or background click
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

    // 4. Typewriter effect
    const typewriterElement = document.getElementById('typewriter-text');
    if (typewriterElement) {
        const phrases = ["Performance Marketing Leader", "Growth Strategy Architect", "ROI Optimization Expert"];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function type() {
            const text = phrases[phraseIndex];
            if (isDeleting) {
                typewriterElement.textContent = text.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typewriterElement.textContent = text.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === text.length) {
                isDeleting = true;
                typeSpeed = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500;
            }
            setTimeout(type, typeSpeed);
        }
        type();
    }

    // 5. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // 6. Form Submission (Modal Form)
    const modalForm = document.getElementById('modal-contact-form');
    const modalResponse = document.getElementById('modal-response');

    if (modalForm) {
        modalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitButton = modalForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Submitting Proposal...';
            submitButton.disabled = true;

            // Simulate high-end backend processing
            setTimeout(() => {
                submitButton.textContent = 'Proposal Sent! ✨';
                submitButton.style.background = '#22c55e';
                
                modalResponse.innerHTML = `<p style="padding: 10px; border-radius: 8px; background: rgba(34, 197, 94, 0.1); font-weight: 600; text-align: center;">Success! I will reach out shortly to discuss your growth. 🚀</p>`;
                
                modalForm.reset();
                
                setTimeout(() => {
                    closeModal();
                    // Reset button after modal closes
                    setTimeout(() => {
                        submitButton.textContent = originalText;
                        submitButton.style.background = '';
                        modalResponse.innerHTML = '';
                        submitButton.disabled = false;
                    }, 500);
                }, 3000);
            }, 1500);
        });
    }
});
