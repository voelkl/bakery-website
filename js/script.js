// Load News from JSON
async function loadNews() {
    const newsContainer = document.getElementById('newsContainer');

    if (!newsContainer) return; // Only run on pages with news container

    // Show loading message
    newsContainer.innerHTML = '<div class="news-loading">News werden geladen...</div>';

    try {
        const response = await fetch('news.json');
        console.log(response)

        if (!response.ok) {
            throw new Error('News konnten nicht geladen werden');
        }

        const newsData = await response.json();

        // Clear loading message
        newsContainer.innerHTML = '';

        // Sort news by date (newest first)
        newsData.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Display news items
        newsData.forEach(news => {
            const newsItem = document.createElement('div');
            newsItem.className = 'news-item';

            // Format date
            const date = new Date(news.date);
            const formattedDate = date.toLocaleDateString('de-DE', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            newsItem.innerHTML = `
                <div class="news-item-date">${formattedDate}</div>
                <h3>${news.title}</h3>
                <p>${news.content}</p>
            `;

            // Set initial animation state
            newsItem.style.opacity = '0';
            newsItem.style.transform = 'translateY(20px)';
            newsItem.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

            newsContainer.appendChild(newsItem);
        });

        // If no news items
        if (newsData.length === 0) {
            newsContainer.innerHTML = '<div class="news-loading">Aktuell keine Neuigkeiten verfügbar.</div>';
        } else {
            // Trigger animation for news items using IntersectionObserver
            const newsItems = newsContainer.querySelectorAll('.news-item');
            newsItems.forEach(item => {
                observer.observe(item);
            });
        }

    } catch (error) {
        newsContainer.innerHTML = '<div class="news-error">Fehler beim Laden der Neuigkeiten. Bitte versuchen Sie es später erneut.</div>';
        console.error('Error loading news:', error);
    }
}

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Load news on homepage
    loadNews();

    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');

            // Animate hamburger icon
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);

            if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add animation on scroll (optional enhancement)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards and team members for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.feature-card, .team-member, .bread-item');

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});
