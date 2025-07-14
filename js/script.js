document.addEventListener('DOMContentLoaded', () => {

    AOS.init({
        duration: 1000, 
        once: true, 
        offset: 100, 
    });

    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.navbar');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    const monthlyBtn = document.getElementById('monthly-toggle');
    const yearlyBtn = document.getElementById('yearly-toggle');
    const pricingCards = document.querySelectorAll('.plan-card');

    if (monthlyBtn && yearlyBtn && pricingCards.length > 0) {
        function updatePricing(isYearly) {
            pricingCards.forEach(card => {
                const monthlyPriceElement = card.querySelector('.price-monthly');
                const yearlyPriceElement = card.querySelector('.price-yearly');
                const periodText = card.querySelector('.plan-price span:last-child'); // Selects the /month span

                if (monthlyPriceElement && yearlyPriceElement && periodText) {
                    if (isYearly) {
                        monthlyPriceElement.style.display = 'none';
                        yearlyPriceElement.style.display = 'inline';
                        periodText.textContent = '/year';
                    } else {
                        monthlyPriceElement.style.display = 'inline';
                        yearlyPriceElement.style.display = 'none';
                        periodText.textContent = '/month';
                    }
                }
            });
        }

        monthlyBtn.addEventListener('click', () => {
            monthlyBtn.classList.add('active');
            yearlyBtn.classList.remove('active');
            updatePricing(false);
        });

        yearlyBtn.addEventListener('click', () => {
            yearlyBtn.classList.add('active');
            monthlyBtn.classList.remove('active');
            updatePricing(true);
        });

        const initialActiveButton = document.querySelector('.pricing-toggle button.active');
        if (initialActiveButton) {
            updatePricing(initialActiveButton.id === 'yearly-toggle');
        } else {
            monthlyBtn.classList.add('active');
            updatePricing(false);
        }
    }


    document.querySelectorAll('.navbar a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetHref = this.getAttribute('href');
            const currentPath = window.location.pathname.split('/').pop();
            if (targetHref.startsWith('#') && (currentPath === '' || currentPath === 'index.html')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetHref);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            } else if (targetHref.includes('.html') && targetHref.split('/').pop() === currentPath) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });

    const navLinks = document.querySelectorAll('.navbar a');

    function setActiveLink() {
        const path = window.location.pathname;
        let currentPage = path.split('/').pop();

        if (currentPage === '' || currentPage === '/') {
            currentPage = 'index.html';
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href').split('/').pop();
            if (linkHref === currentPage) {
                link.classList.add('active');
            }
        });

        if (currentPage === 'index.html') {
            const sections = document.querySelectorAll('section');
            window.addEventListener('scroll', () => {
                let currentSectionId = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    // Adjusted offset for fixed header
                    if (pageYOffset >= sectionTop - document.querySelector('.header').offsetHeight - 50 &&
                        pageYOffset < sectionTop + sectionHeight - document.querySelector('.header').offsetHeight - 50) {
                        currentSectionId = section.getAttribute('id');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === 'index.html') { // Keep home active by default on index
                         link.classList.add('active');
                    }
                    if (currentSectionId && link.getAttribute('href').includes(currentSectionId)) {
                        link.classList.add('active');
                    }
                });
            });
        }
    }

    setActiveLink();

    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});