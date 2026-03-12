// ==========================================
// TMAVÝ / SVĚTLÝ REŽIM
// ==========================================
// Téma se aplikuje okamžitě přes inline <script> v <head> každé stránky.
// Zde jen obsluhujeme kliknutí na tlačítko přepínače.

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('theme-toggle');
    if (btn) {
        btn.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            if (isDark) {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    }
});

// ==========================================
// DROPDOWN MENU V NAVBARU
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const dropdownButtons = document.querySelectorAll('.nav-dropdown > button');

    dropdownButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const dropdown = btn.closest('.nav-dropdown');
            const isActive = btn.classList.toggle('active');

            // Zavři ostatní dropdowny
            dropdownButtons.forEach(otherBtn => {
                if (otherBtn !== btn) otherBtn.classList.remove('active');
            });
        });
    });

    // Zavři dropdown když se klikne mimo něj
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-dropdown')) {
            dropdownButtons.forEach(btn => btn.classList.remove('active'));
        }
    });

    // Zavři dropdown když se klikne na odkaz v něm
    document.querySelectorAll('.nav-dropdown-menu a').forEach(link => {
        link.addEventListener('click', () => {
            dropdownButtons.forEach(btn => btn.classList.remove('active'));
        });
    });
});

// ==========================================

// ==========================================
// VYHLEDÁVÁNÍ V MATERIÁLECH
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('material-search');
    const clearBtn = document.getElementById('search-clear');
    const noResults = document.getElementById('search-no-results');
    if (!input) return;

    const categories = Array.from(document.querySelectorAll('.subject-category'));
    const originals = categories.map(c => c.innerHTML);

    function highlight(text, query) {
        if (!query) return text;
        const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return text.replace(new RegExp(`(${escaped})`, 'gi'),
            '<mark class="search-highlight">$1</mark>');
    }

    function doSearch(query) {
        const q = query.trim().toLowerCase();
        clearBtn.classList.toggle('visible', q.length > 0);
        let anyVisible = false;

        categories.forEach((cat, i) => {
            cat.innerHTML = originals[i];

            if (!q) {
                cat.style.display = '';
                anyVisible = true;
                return;
            }

            const summarySpan = cat.querySelector('.summary-content span');
            const fileSpans = Array.from(cat.querySelectorAll('.file-list span, .sub-category h4'));
            const summaryText = summarySpan ? summarySpan.textContent.toLowerCase() : '';
            const fileTexts = fileSpans.map(s => s.textContent.toLowerCase());
            const matches = summaryText.includes(q) || fileTexts.some(t => t.includes(q));

            if (matches) {
                cat.style.display = '';
                anyVisible = true;
                if (summarySpan) summarySpan.innerHTML = highlight(summarySpan.textContent, query.trim());
                fileSpans.forEach(s => { s.innerHTML = highlight(s.textContent, query.trim()); });
                const details = cat.querySelector('details');
                if (details) details.open = true;
            } else {
                cat.style.display = 'none';
            }
        });

        noResults.style.display = (!anyVisible && q.length > 0) ? 'block' : 'none';
    }

    input.addEventListener('input', () => doSearch(input.value));
    clearBtn.addEventListener('click', () => { input.value = ''; doSearch(''); input.focus(); });
});

// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. MOBILNÍ MENU (Hamburger)
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Animace ikony (volitelné: změna z barů na křížek)
            const icon = hamburger.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        });
    }

    // 2. AKORDEONY (Pro stránku materiály)
    // Funguje to tak, že hledá všechny hlavičky, na které se dá kliknout
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            
            // Zavře ostatní otevřené sekce (volitelné - pokud chceš mít vždy jen jednu otevřenou)
            /*
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            */

            item.classList.toggle('active');
        });
    });
});
