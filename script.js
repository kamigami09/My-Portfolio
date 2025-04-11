document.addEventListener('DOMContentLoaded', function() {
    // Navigation toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-item');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a nav item
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Add scrolled class to navbar on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Scroll to section on nav link click
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Highlight active nav item based on scroll position
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // Scroll to top button
    const scrollTopBtn = document.getElementById('scrollToTop');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 700) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.fade-in, .reveal-text');
    
    const revealOnScroll = function() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 50) {
                element.classList.add('appear');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);

    // Animate skill bars when skill card is flipped
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const skillLevels = this.querySelectorAll('.skill-level');
            
            // Add a small delay to ensure the animation starts after the flip begins
            setTimeout(() => {
                skillLevels.forEach(skill => {
                    const level = skill.getAttribute('data-level');
                    skill.style.width = `${level}%`;
                });
            }, 400);
        });
        
        // Reset skill bars when moving away
        card.addEventListener('mouseleave', function() {
            const skillLevels = this.querySelectorAll('.skill-level');
            skillLevels.forEach(skill => {
                skill.style.width = '0';
            });
        });
    });

        // Projects filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            const filterValue = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.classList.add('appear');
                    }, 100);
                } else {
                    card.classList.remove('appear');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // contactForm.addEventListener('submit', function(e) {
        //     e.preventDefault();
            
        //     // Get form values (for future implementation with a backend)
        //     const name = document.getElementById('name').value;
        //     const email = document.getElementById('email').value;
        //     const subject = document.getElementById('subject').value;
        //     const message = document.getElementById('message').value;
            
        //     // You would typically send this data to a server
        //     // For now, just show a success message and reset form
        //     alert('Thank you for your message! I will get back to you soon.');
        //     contactForm.reset();
        // });
    }
    
    // Prevent the project cards from flipping on touch devices
    // This ensures better mobile experience
    if ('ontouchstart' in window) {
        document.querySelectorAll('.project-card, .skill-card').forEach(card => {
            card.addEventListener('touchstart', function(e) {
                this.classList.toggle('touch-flip');
            });
        });
    }
});