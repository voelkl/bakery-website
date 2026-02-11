// Load News from Google Sheets via JSONP (avoids CORS)
const SHEET_ID = '1ttaGMZtYAw1ptIaRGjyqsW9lyZ1fiBrKCMMOJ4YaThw';

function hideNewsSection() {
    const section = document.getElementById('neuigkeiten');
    if (section) section.style.display = 'none';
    const navLink = document.querySelector('a[href="#neuigkeiten"]');
    if (navLink) navLink.style.display = 'none';
}

function handleNewsData(response) {
    const container = document.getElementById('newsContainer');
    if (!container) return;

    try {
        const rows = response.table.rows;

        // Skip header row if present
        const dataRows = rows.filter(row => {
            const title = row.c[1] ? row.c[1].v : '';
            return title && title !== 'Titel';
        });

        if (dataRows.length === 0) {
            hideNewsSection();
            return;
        }

        // Sort by date descending (newest first)
        dataRows.sort((a, b) => {
            const dateA = a.c[0] ? a.c[0].f : '';
            const dateB = b.c[0] ? b.c[0].f : '';
            return dateB.localeCompare(dateA);
        });

        container.innerHTML = '';
        dataRows.forEach(row => {
            const date = row.c[0] ? row.c[0].f : '';
            const title = row.c[1] ? row.c[1].v : '';
            const content = row.c[2] ? row.c[2].v : '';

            const item = document.createElement('div');
            item.className = 'news-item';
            item.innerHTML = `
                <div class="news-item-date">${date}</div>
                <h3>${title}</h3>
                <p>${content}</p>
            `;
            container.appendChild(item);
        });
    } catch (error) {
        hideNewsSection();
        console.error('News loading error:', error);
    }
}

function loadNews() {
    if (!document.getElementById('newsContainer')) return;

    const script = document.createElement('script');
    script.src = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=responseHandler:handleNewsData`;
    script.onerror = hideNewsSection;
    document.head.appendChild(script);
}

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    loadNews();
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
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
            if (!navMenu.contains(event.target) && !hamburger.contains(event.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navbar = document.querySelector('.navbar');
                const offset = navbar ? navbar.offsetHeight : 0;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        }
    });
});
