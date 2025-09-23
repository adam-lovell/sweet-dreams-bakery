/* ====================================
   SWEET DREAMS BAKERY - JAVASCRIPT FILE
   Line-by-line comments for learning
   ====================================*/

// WAIT FOR PAGE TO FULLY LOAD
// ============================

document.addEventListener('DOMContentLoaded', function() {
    // Event listener waits for HTML to be completely loaded and parsed
    // DOMContentLoaded fires before images/stylesheets finish loading
    // This ensures our JavaScript runs only after HTML elements are available
    
    console.log('Sweet Dreams Bakery website loaded successfully!');
    // Console.log outputs message to browser developer tools for debugging
    
    // MOBILE NAVIGATION FUNCTIONALITY
    // ===============================
    
    // Get references to mobile menu elements
    const mobileMenu = document.getElementById('mobile-menu');
    // getElementById finds element with id="mobile-menu" (hamburger button)
    // Returns null if element not found, so we should check for existence
    
    const navMenu = document.getElementById('nav-menu');
    // Gets the navigation menu container that slides in/out on mobile
    
    const navLinks = document.querySelectorAll('.nav-link');
    // querySelectorAll finds ALL elements with class "nav-link"
    // Returns a NodeList (array-like object) of all matching elements
    
    // Check if mobile menu button exists before adding event listener
    if (mobileMenu) {
        // if statement prevents errors if element doesn't exist
        
        mobileMenu.addEventListener('click', function() {
            // addEventListener attaches a function to run when element is clicked
            // 'click' is the event type, function is what happens when clicked
            
            console.log('Mobile menu button clicked');
            // Logs to console for debugging - helps track user interactions
            
            // Toggle the mobile menu open/closed
            navMenu.classList.toggle('active');
            // classList.toggle adds class if not present, removes if present
            // 'active' class is defined in CSS to show/hide mobile menu
            
            // Animate hamburger menu to X shape
            mobileMenu.classList.toggle('active');
            // This class can be used to animate hamburger bars into X shape
        });
    }
    
    // Close mobile menu when clicking on navigation links
    navLinks.forEach(function(link) {
        // forEach loops through each navigation link
        // Takes a function that runs for each item in the NodeList
        
        link.addEventListener('click', function() {
            // Adds click listener to each individual nav link
            
            console.log('Navigation link clicked:', link.textContent);
            // Logs which link was clicked - textContent gets the visible text
            
            // Close mobile menu when link is clicked
            navMenu.classList.remove('active');
            // classList.remove removes the 'active' class
            // This hides the mobile menu after user clicks a link
            
            mobileMenu.classList.remove('active');
            // Also removes active state from hamburger button
        });
    });
    
    // SMOOTH SCROLLING FOR NAVIGATION LINKS
    // =====================================
    
    navLinks.forEach(function(link) {
        // Loop through each navigation link again
        
        link.addEventListener('click', function(e) {
            // Event listener with 'e' parameter to access event object
            // Event object contains information about the click
            
            e.preventDefault();
            // preventDefault stops the default browser behavior
            // Prevents immediate jumping to anchor link
            
            const href = link.getAttribute('href');
            // getAttribute gets the value of specified attribute
            // Gets the href value (like "#about", "#menu", etc.)
            
            console.log('Smooth scrolling to:', href);
            // Logs which section we're scrolling to
            
            // Check if href starts with # (internal link)
            if (href.startsWith('#')) {
                // startsWith checks if string begins with specified characters
                
                const targetSection = document.querySelector(href);
                // querySelector finds first element matching CSS selector
                // href contains "#about", so this finds element with id="about"
                
                if (targetSection) {
                    // Check if target section exists before scrolling
                    
                    const headerOffset = 80;
                    // Account for fixed navigation bar height
                    // 80px offset prevents content from hiding behind navbar
                    
                    const elementPosition = targetSection.offsetTop;
                    // offsetTop gets element's distance from top of page
                    
                    const offsetPosition = elementPosition - headerOffset;
                    // Calculates final scroll position accounting for navbar
                    
                    window.scrollTo({
                        // scrollTo method moves page to specified position
                        top: offsetPosition,
                        // Vertical scroll position
                        
                        behavior: 'smooth'
                        // Creates smooth animated scrolling instead of jumping
                    });
                    
                    console.log('Scrolled to position:', offsetPosition);
                    // Logs final scroll position for debugging
                }
            }
        });
    });
    
    // MENU FILTERING FUNCTIONALITY
    // ============================
    
    const menuButtons = document.querySelectorAll('.menu-btn');
    // Gets all menu filter buttons (All Items, Pastries, Cakes, Coffee)
    
    const menuItems = document.querySelectorAll('.menu-item');
    // Gets all menu item cards that will be filtered
    
    menuButtons.forEach(function(button) {
        // Loop through each menu filter button
        
        button.addEventListener('click', function() {
            // Add click listener to each filter button
            
            const category = button.getAttribute('data-category');
            // Gets data-category attribute value (like "pastries", "cakes", "all")
            // data-* attributes store custom data on HTML elements
            
            console.log('Menu filter clicked:', category);
            // Logs which filter was selected
            
            // Remove active class from all buttons
            menuButtons.forEach(function(btn) {
                // Loop through all menu buttons
                btn.classList.remove('active');
                // Remove 'active' class from each button
            });
            
            // Add active class to clicked button
            button.classList.add('active');
            // classList.add adds specified class to element
            // This highlights the currently selected filter
            
            // Filter menu items based on category
            menuItems.forEach(function(item) {
                // Loop through all menu items
                
                const itemCategory = item.getAttribute('data-category');
                // Get the category of current menu item
                
                if (category === 'all' || category === itemCategory) {
                    // Show item if "All Items" selected OR categories match
                    // === is strict equality comparison
                    // || is logical OR operator
                    
                    item.classList.remove('hidden');
                    // Remove 'hidden' class to show item
                    
                    // Add fade-in animation
                    item.style.opacity = '0';
                    // Set opacity to 0 (invisible) first
                    
                    setTimeout(function() {
                        // setTimeout delays execution by specified milliseconds
                        item.style.opacity = '1';
                        // Fade item back in after brief delay
                    }, 100);
                    // 100ms delay creates staggered fade-in effect
                    
                    console.log('Showing item:', item.querySelector('.menu-item-title').textContent);
                    // Logs which items are being shown
                    // querySelector finds first element matching selector within item
                    
                } else {
                    // Hide item if category doesn't match
                    item.classList.add('hidden');
                    // Add 'hidden' class (defined in CSS as display: none)
                    
                    console.log('Hiding item:', item.querySelector('.menu-item-title').textContent);
                    // Logs which items are being hidden
                }
            });
        });
    });
    
    // CONTACT FORM HANDLING
    // =====================
    
    const contactForm = document.getElementById('contactForm');
    // Gets the contact form element
    
    if (contactForm) {
        // Check if form exists before adding event listener
        
        contactForm.addEventListener('submit', function(e) {
            // 'submit' event fires when form is submitted
            // Either by clicking submit button or pressing Enter
            
            e.preventDefault();
            // Prevent form from submitting normally
            // This stops page from reloading and lets us handle submission with JavaScript
            
            console.log('Contact form submitted');
            
            // Get form data
            const formData = new FormData(contactForm);
            // FormData object automatically collects all form field values
            // Includes input values, selected options, etc.
            
            // Convert FormData to regular object for easier handling
            const formObject = {};
            // Create empty object to store form values
            
            for (let [key, value] of formData.entries()) {
                // for...of loop iterates through FormData entries
                // entries() returns array of [fieldName, fieldValue] pairs
                // Destructuring assignment extracts key and value
                
                formObject[key] = value;
                // Adds each form field to our object
                console.log(`Form field - ${key}: ${value}`);
                // Template literal logs each field and its value
                // ${} inserts variable values into string
            }
            
            // Basic form validation
            const requiredFields = ['name', 'email', 'phone', 'event-date', 'cake-type'];
            // Array of field names that must be filled out
            
            let isValid = true;
            // Boolean flag to track if form is valid
            
            let missingFields = [];
            // Array to collect names of empty required fields
            
            requiredFields.forEach(function(fieldName) {
                // Check each required field
                
                const fieldValue = formObject[fieldName];
                // Get the value of current field
                
                if (!fieldValue || fieldValue.trim() === '') {
                    // Check if field is empty or only whitespace
                    // ! converts value to boolean and inverts it
                    // trim() removes whitespace from beginning and end
                    
                    isValid = false;
                    // Mark form as invalid
                    
                    missingFields.push(fieldName);
                    // Add field name to missing fields array
                    
                    console.log('Missing required field:', fieldName);
                }
            });
            
            // Email validation using regular expression
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            // Regular expression pattern for valid email format
            // ^ = start of string, $ = end of string
            // [^\s@]+ = one or more characters that are not whitespace or @
            // @ = literal @ symbol
            // \. = literal dot (escaped because . has special meaning in regex)
            
            if (formObject.email && !emailRegex.test(formObject.email)) {
                // test() method checks if string matches regex pattern
                // Returns true if valid, false if invalid
                
                isValid = false;
                missingFields.push('valid email format');
                console.log('Invalid email format:', formObject.email);
            }
            
            // Phone validation - basic pattern check
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            // Basic phone number pattern
            // [\+]? = optional + sign
            // [1-9] = first digit 1-9 (not 0)
            // [\d]{0,15} = 0 to 15 additional digits
            
            if (formObject.phone && !phoneRegex.test(formObject.phone.replace(/[\s\-\(\)]/g, ''))) {
                // Remove spaces, dashes, parentheses before testing
                // replace() with regex /[\s\-\(\)]/g removes those characters
                // g flag means "global" - replace all occurrences
                
                isValid = false;
                missingFields.push('valid phone format');
                console.log('Invalid phone format:', formObject.phone);
            }
            
            if (isValid) {
                // If form passes validation
                
                console.log('Form validation passed. Processing order...');
                
                // Show success message
                showFormMessage('Thank you! Your custom cake order request has been received. We\'ll contact you within 24 hours to discuss details.', 'success');
                // Call custom function to display success message
                // \' escapes the apostrophe in "we'll"
                
                // Reset form
                contactForm.reset();
                // reset() method clears all form fields
                
                // In real application, you would send data to server here
                // Example: fetch('/api/contact', { method: 'POST', body: formData })
                
            } else {
                // If form validation failed
                
                console.log('Form validation failed. Missing fields:', missingFields);
                
                const errorMessage = `Please fill out the following required fields: ${missingFields.join(', ')}`;
                // join() converts array to string with specified separator
                // Creates user-friendly error message
                
                showFormMessage(errorMessage, 'error');
                // Show error message to user
            }
        });
    }
    
    // SCROLL-BASED NAVBAR STYLING
    // ===========================
    
    const navbar = document.getElementById('navbar');
    // Get reference to navigation bar
    
    window.addEventListener('scroll', function() {
        // 'scroll' event fires when user scrolls the page
        // window refers to browser window object
        
        const scrollY = window.scrollY;
        // scrollY gets current vertical scroll position
        // 0 = top of page, increases as user scrolls down
        
        if (scrollY > 50) {
            // If user has scrolled more than 50 pixels
            
            navbar.classList.add('scrolled');
            // Add 'scrolled' class for styling changes
            // Could change navbar background, size, etc.
            
        } else {
            // If user is near top of page
            
            navbar.classList.remove('scrolled');
            // Remove scrolled styling
        }
    });
    
    // GALLERY LIGHTBOX FUNCTIONALITY
    // ==============================
    
    const galleryImages = document.querySelectorAll('.gallery-img');
    // Get all gallery images
    
    galleryImages.forEach(function(image, index) {
        // forEach provides both item and index
        // index is the position in the array (0, 1, 2, etc.)
        
        image.addEventListener('click', function() {
            // Add click listener to each gallery image
            
            console.log('Gallery image clicked:', index);
            
            // Create lightbox overlay
            const lightbox = document.createElement('div');
            // createElement creates new HTML element
            // Creates <div> element in memory (not yet on page)
            
            lightbox.className = 'lightbox-overlay';
            // Sets CSS class name for styling
            
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <img src="${image.src}" alt="${image.alt}" class="lightbox-img">
                    <button class="lightbox-close">&times;</button>
                </div>
            `;
            // innerHTML sets HTML content inside element
            // Template literal creates HTML structure
            // ${} inserts image src and alt attributes
            // &times; is HTML entity for × symbol
            
            // Add lightbox styles
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 2000;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            // cssText sets multiple CSS properties at once
            // Creates full-screen overlay with dark background
            
            // Style lightbox content
            const lightboxContent = lightbox.querySelector('.lightbox-content');
            lightboxContent.style.cssText = `
                position: relative;
                max-width: 90%;
                max-height: 90%;
            `;
            
            // Style lightbox image
            const lightboxImg = lightbox.querySelector('.lightbox-img');
            lightboxImg.style.cssText = `
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
            `;
            
            // Style close button
            const closeBtn = lightbox.querySelector('.lightbox-close');
            closeBtn.style.cssText = `
                position: absolute;
                top: -40px;
                right: 0;
                background: none;
                border: none;
                color: white;
                font-size: 30px;
                cursor: pointer;
                padding: 5px;
            `;
            
            // Add lightbox to page
            document.body.appendChild(lightbox);
            // appendChild adds element to end of body
            // This makes lightbox visible on page
            
            // Trigger fade-in animation
            setTimeout(function() {
                lightbox.style.opacity = '1';
                // Changes opacity after element is added to trigger animation
            }, 10);
            // Small delay ensures element is rendered before animation
            
            // Close lightbox functionality
            function closeLightbox() {
                // Function to handle closing lightbox
                
                lightbox.style.opacity = '0';
                // Start fade-out animation
                
                setTimeout(function() {
                    if (lightbox.parentNode) {
                        // Check if element still has parent (still in DOM)
                        document.body.removeChild(lightbox);
                        // removeChild removes element from page
                    }
                }, 300);
                // Wait for fade animation to complete before removing
            }
            
            // Close when clicking close button
            closeBtn.addEventListener('click', closeLightbox);
            
            // Close when clicking outside image
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    // e.target is the element that was actually clicked
                    // Only close if clicked on overlay background, not image
                    closeLightbox();
                }
            });
            
            // Close on Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    // e.key gets the key that was pressed
                    closeLightbox();
                }
            });
        });
    });
    
    // LOADING ANIMATION
    // =================
    
    // Show loading complete message
    setTimeout(function() {
        console.log('All website functionality initialized successfully!');
        
        // Add loaded class to body for any CSS animations
        document.body.classList.add('loaded');
        
    }, 500);
    // Delay to ensure all elements are properly set up
    
}); // End of DOMContentLoaded event listener

// UTILITY FUNCTIONS
// =================

function showFormMessage(message, type) {
    // Custom function to display form messages
    // Takes message text and type ('success' or 'error')
    
    console.log(`Form message (${type}):`, message);
    
    // Remove any existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
        // remove() method deletes element from DOM
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    // Sets class name with type for styling
    
    messageDiv.textContent = message;
    // textContent safely sets text (prevents HTML injection)
    
    // Style the message
    messageDiv.style.cssText = `
        padding: 15px;
        margin: 20px 0;
        border-radius: 5px;
        font-weight: 500;
        text-align: center;
        ${type === 'success' ? 
            'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;' : 
            'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
        }
    `;
    // Conditional styling based on message type
    // Ternary operator: condition ? valueIfTrue : valueIfFalse
    
    // Insert message before form
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(messageDiv, form);
    // insertBefore adds element before specified reference element
    // parentNode gets the parent container of the form
    
    // Auto-remove message after 10 seconds
    setTimeout(function() {
        if (messageDiv.parentNode) {
            // Check if message still exists
            messageDiv.style.opacity = '0';
            messageDiv.style.transition = 'opacity 0.5s ease';
            // Fade out animation
            
            setTimeout(function() {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 500);
            // Remove after fade animation completes
        }
    }, 10000);
    // 10 second delay before auto-removal
}

function debounce(func, wait) {
    // Debounce function prevents too many rapid function calls
    // Useful for scroll events, resize events, search input, etc.
    
    let timeout;
    // Variable to store timeout ID
    
    return function executedFunction(...args) {
        // Returns new function that wraps original function
        // ...args collects all arguments into array (rest parameter)
        
        const later = function() {
            // Function to execute after delay
            clearTimeout(timeout);
            // Clear any existing timeout
            
            func(...args);
            // Call original function with all arguments
            // ...args spreads array back into individual arguments
        };
        
        clearTimeout(timeout);
        // Cancel previous timeout if function called again
        
        timeout = setTimeout(later, wait);
        // Set new timeout
    };
}

// Example usage of debounce for scroll events
const debouncedScrollHandler = debounce(function() {
    // Debounced version of scroll handler
    console.log('Debounced scroll event fired');
    
    // Add scroll-based animations or effects here
    // This will only run after user stops scrolling for 100ms
}, 100);

// You could attach this to scroll events:
// window.addEventListener('scroll', debouncedScrollHandler);

// ANIMATION UTILITIES
// ===================

function fadeIn(element, duration = 300) {
    // Utility function for fade-in animations
    // Default parameter: duration = 300 if not specified
    
    element.style.opacity = '0';
    element.style.display = 'block';
    // Show element but invisible
    
    const start = performance.now();
    // performance.now() gives high-precision timestamp
    
    function animate(currentTime) {
        // Animation function called each frame
        
        const elapsed = currentTime - start;
        // Calculate how much time has passed
        
        const progress = Math.min(elapsed / duration, 1);
        // Calculate animation progress (0 to 1)
        // Math.min ensures progress never exceeds 1
        
        element.style.opacity = progress;
        // Set opacity based on progress
        
        if (progress < 1) {
            // If animation not complete
            requestAnimationFrame(animate);
            // Request next animation frame
        }
    }
    
    requestAnimationFrame(animate);
    // Start animation loop
}

function fadeOut(element, duration = 300) {
    // Utility function for fade-out animations
    
    const start = performance.now();
    const startOpacity = parseFloat(element.style.opacity) || 1;
    // Get current opacity, default to 1 if not set
    // parseFloat converts string to number
    
    function animate(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        element.style.opacity = startOpacity * (1 - progress);
        // Fade from current opacity to 0
        
        if (progress >= 1) {
            element.style.display = 'none';
            // Hide element when animation complete
        } else {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ===========================================

// Create observer for scroll-triggered animations
const observerOptions = {
    // Configuration object for Intersection Observer
    threshold: 0.1,
    // Trigger when 10% of element is visible
    
    rootMargin: '0px 0px -50px 0px'
    // Expand/shrink root area for triggering
    // Bottom margin -50px means trigger 50px before element enters viewport
};

const observer = new IntersectionObserver(function(entries) {
    // Intersection Observer watches for elements entering/leaving viewport
    // entries is array of elements that changed visibility
    
    entries.forEach(function(entry) {
        // Process each element that changed
        
        if (entry.isIntersecting) {
            // If element is now visible
            
            const element = entry.target;
            // Get the actual DOM element
            
            element.classList.add('animate-in');
            // Add class for CSS animations
            
            console.log('Element animated in:', element.className);
            
            // Optional: stop observing this element after animation
            // observer.unobserve(element);
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    // Wait for page load before setting up observers
    
    const animateElements = document.querySelectorAll('.menu-item, .gallery-item, .about-text, .contact-item');
    // Select elements to animate on scroll
    
    animateElements.forEach(function(element) {
        observer.observe(element);
        // Start observing each element
    });
});

// ERROR HANDLING
// ==============

window.addEventListener('error', function(e) {
    // Global error handler for JavaScript errors
    
    console.error('JavaScript Error:', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno,
        error: e.error
    });
    // Log detailed error information for debugging
    
    // In production, you might send errors to logging service
    // Example: sendErrorToLoggingService(e);
});

window.addEventListener('unhandledrejection', function(e) {
    // Handle Promise rejections that weren't caught
    
    console.error('Unhandled Promise Rejection:', e.reason);
    
    // Prevent default browser error handling
    e.preventDefault();
});

// PERFORMANCE MONITORING
// ======================

window.addEventListener('load', function() {
    // 'load' event fires when all resources (images, CSS, etc.) finish loading
    
    // Check if Performance API is available
    if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        
        const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
        // Calculate total page load time in milliseconds
        
        console.log(`Page loaded in ${pageLoadTime}ms`);
        
        // Log various performance metrics
        console.log('Performance Metrics:', {
            'DNS Lookup': timing.domainLookupEnd - timing.domainLookupStart + 'ms',
            'TCP Connection': timing.connectEnd - timing.connectStart + 'ms',
            'Server Response': timing.responseEnd - timing.requestStart + 'ms',
            'DOM Processing': timing.domComplete - timing.domLoading + 'ms',
            'Total Load Time': pageLoadTime + 'ms'
        });
    }
});

console.log('Sweet Dreams Bakery JavaScript loaded and ready!');