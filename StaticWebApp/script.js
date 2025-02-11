// Scroll to Top Functionality
const scrollToTopBtn = document.getElementById('scrollToTop');

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
