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