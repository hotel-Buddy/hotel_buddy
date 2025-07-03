// Mobile Menu Toggle
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
    document.querySelector('.cta-buttons').classList.toggle('active');
});

// Tab Functionality
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabBtns.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        btn.classList.add('active');
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Sticky Header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// App Description Toggle
document.querySelectorAll('.learn-more-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const tabContent = this.closest('.tab-content');
        const description = tabContent.querySelector('.app-description');
        
        // Hide all descriptions first
        document.querySelectorAll('.app-description').forEach(desc => {
            desc.style.display = 'none';
        });
        
        // Show this description
        description.style.display = 'block';
        
        // Scroll to description
        description.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
});

// Close Description
document.querySelectorAll('.close-description').forEach(btn => {
    btn.addEventListener('click', function() {
        this.closest('.app-description').style.display = 'none';
    });
});

// Smart Download Buttons
document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const appType = this.getAttribute('data-app');
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        
        // Check device type
        if (/android/i.test(userAgent)) {
            // Android - redirect to Play Store
            window.location.href = appType === 'guest' 
                ? 'https://play.google.com/store/apps/details?id=com.hotelbuddy.guest' 
                : 'https://play.google.com/store/apps/details?id=com.hotelbuddy.admin';
        } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            // iOS - redirect to App Store
            window.location.href = appType === 'guest' 
                ? 'https://apps.apple.com/app/hotelbuddy-guest/id123456789' 
                : 'https://apps.apple.com/app/hotelbuddy-admin/id987654321';
        } else {
            // PC - show message or redirect to web version
            if (appType === 'guest') {
                alert('The HotelBuddy Guest app is only available on mobile devices. Please visit from your smartphone or tablet.');
            } else {
                // For admin app on PC, redirect to web dashboard
                window.location.href = 'https://admin.hotelbuddy.com';
            }
        }
    });
});

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Initialize Parallax
if (document.querySelector('[data-parallax="scroll"]')) {
    $('[data-parallax="scroll"]').parallax();
}
