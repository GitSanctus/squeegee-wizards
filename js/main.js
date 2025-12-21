/**
 * SqueeGee Wizards - Main JavaScript File
 * Author: Your Name
 * Date: December 2024
 * Purpose: Interactive features for window cleaning business website
 */

// ==============================================
// MOBILE HAMBURGER MENU
// ==============================================

/**
 * Wait for the page to fully load before running JavaScript
 * This ensures all HTML elements exist before we try to interact with them
 */
document.addEventListener('DOMContentLoaded', function() {
    
    // Find the hamburger button (we'll create this in HTML)
    const hamburger = document.querySelector('.hamburger');
    
    // Find the navigation menu - target the nav element itself, not ul
    const nav = document.querySelector('nav');
    const navUl = document.querySelector('nav ul');
    
    // Find the body element (to prevent scrolling when menu is open)
    const body = document.body;
    
    // Debug logging
    console.log('Hamburger found:', hamburger);
    console.log('Nav found:', nav);
    console.log('Nav UL found:', navUl);
    
    /**
     * What happens when someone clicks the hamburger button
     */
    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            
            // Toggle the 'active' class on the hamburger (animates the icon)
            hamburger.classList.toggle('active');
            
            // Toggle the 'active' class on the nav (shows/hides menu)
            nav.classList.toggle('active');
            
            // Toggle 'menu-open' class on body (prevents background scrolling)
            body.classList.toggle('menu-open');
            
            // Log to console (useful for debugging)
            console.log('Menu toggled - nav active:', nav.classList.contains('active'));
        });
    } else {
        console.error('Hamburger or Nav element not found!');
        console.log('Hamburger:', hamburger);
        console.log('Nav:', nav);
    }
    
    /**
     * Close menu when clicking on a nav link (better UX on mobile)
     */
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Remove active classes to close menu
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });
    
    /**
     * Close menu when clicking outside of it
     */
    document.addEventListener('click', function(event) {
        // Check if click was outside nav and hamburger
        const isClickInsideNav = nav.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && nav.classList.contains('active')) {
            // Close the menu
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
    
    /**
     * Close menu when screen is resized to desktop size
     * Prevents menu staying open when rotating device or resizing browser
     */
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && nav.classList.contains('active')) {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
    
    console.log('Mobile menu initialized successfully!');
});


// ==============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==============================================

/**
 * Smooth scrolling when clicking internal links
 * Makes navigation feel more polished
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


// ==============================================
// SCROLL ANIMATIONS
// ==============================================

/**
 * Intersection Observer watches elements and triggers animations
 * when they scroll into view. More efficient than scroll events!
 */

// Wait for page to load
document.addEventListener('DOMContentLoaded', function() {
    
    /**
     * Step 1: Create the observer
     * 
     * This "watches" elements and runs a callback when they become visible
     * 
     * Options explained:
     * - threshold: 0.1 means trigger when 10% of element is visible
     * - rootMargin: Trigger slightly before element enters viewport
     */
    const observerOptions = {
        threshold: 0.1,          // Trigger when 10% visible
        rootMargin: '0px 0px -50px 0px'  // Trigger 50px before bottom of viewport
    };
    
    /**
     * The callback function runs when elements enter/leave viewport
     * 
     * @param {Array} entries - List of observed elements and their visibility status
     * @param {IntersectionObserver} observer - The observer itself
     */
    const observerCallback = function(entries, observer) {
        
        // Loop through each element being watched
        entries.forEach(entry => {
            
            // Is the element visible in viewport?
            if (entry.isIntersecting) {
                
                // YES! Add the 'visible' class to trigger CSS animation
                entry.target.classList.add('visible');
                
                // OPTIONAL: Stop watching this element (runs animation only once)
                // Comment this out if you want animation to repeat on scroll up/down
                observer.unobserve(entry.target);
                
                // Log for debugging
                console.log('Element animated:', entry.target);
            }
        });
    };
    
    /**
     * Step 2: Create the observer with our callback and options
     */
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    /**
     * Step 3: Find all elements we want to animate
     * 
     * We're watching:
     * - Service cards
     * - Any element with class 'fade-in'
     */
    
    // Watch all service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        observer.observe(card);
    });
    
    // Watch any elements with 'fade-in' class
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });
    
    // Log how many elements we're watching
    console.log('Scroll animations initialized!');
    console.log('Watching', serviceCards.length, 'service cards');
    console.log('Watching', fadeElements.length, 'fade-in elements');
});


// ==============================================
// PLACEHOLDER FOR FUTURE FEATURES
// ==============================================

/**
 * We'll add more features here as we build them:
 * - Contact form validation
 * - Image gallery/slider
 * - Reviews carousel
 * - Service calculator
 * - Animated stats counter
 */
