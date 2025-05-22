document.addEventListener('DOMContentLoaded', function() {
    /**
     * Initializes all application-specific JavaScript functionalities
     * after the DOM is fully loaded.
     */
    function initApp() {
        initLucideIcons();
        initMobileMenu();
        initDynamicYear();
        initSmoothScroll();
        initScrollAnimations();
        initHeroVideoSpeed();
        initSolutionVideoChanger();
    }

    /**
     * Initializes Lucide icons on the page.
     * Ensures the Lucide library is loaded before attempting to create icons.
     */
    function initLucideIcons() {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        } else {
            console.error('Lucide library object not found. Ensure the script is loaded correctly.');
        }
    }

    /**
     * Sets up the mobile menu toggle functionality.
     * Toggles visibility of the mobile menu and closes it when a link is clicked.
     */
    function initMobileMenu() {
        const menuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        if (menuButton && mobileMenu) {
            menuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });

            const mobileMenuLinks = mobileMenu.querySelectorAll('a');
            mobileMenuLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                });
            });
        } else {
            console.warn('Mobile menu button or menu itself not found.');
        }
    }

    /**
     * Dynamically sets the current year in the footer.
     */
    function initDynamicYear() {
        const currentYearElement = document.getElementById('currentYear');
        if (currentYearElement) {
            currentYearElement.textContent = new Date().getFullYear();
        }
    }

    /**
     * Implements smooth scrolling for all anchor links starting with '#'.
     * Calculates the correct scroll position considering the fixed header height.
     */
    function initSmoothScroll() {
        const headerEl = document.getElementById('header'); // Cache header element

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');

                if (targetId && targetId.length > 1) { // Ensure targetId is not just "#"
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        const headerOffset = headerEl ? headerEl.offsetHeight : 0;
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: "smooth"
                        });
                    } else {
                        console.warn(`Smooth scroll target element not found for selector: ${targetId}`);
                    }
                }
            });
        });
    }

    /**
     * Initializes animations for elements that appear on scroll.
     * Elements with the class '.animate-on-scroll' will become visible
     * when they enter the viewport.
     */
    function initScrollAnimations() {
        const scrollElements = document.querySelectorAll('.animate-on-scroll');
        if (scrollElements.length === 0) return; // No elements to animate

        /**
         * Checks if an element is within the viewport.
         * @param {Element} el - The DOM element to check.
         * @param {number} percentageScroll - Percentage of the viewport height the element top must be above.
         * @returns {boolean} True if the element is in view, false otherwise.
         */
        const elementInView = (el, percentageScroll = 100) => {
            const elementTop = el.getBoundingClientRect().top;
            return (
                elementTop <=
                (window.innerHeight || document.documentElement.clientHeight) * (percentageScroll / 100)
            );
        };

        /**
         * Makes a scroll element visible by adding the 'is-visible' class.
         * @param {Element} element - The DOM element to display.
         */
        const displayScrollElement = (element) => {
            element.classList.add('is-visible');
        };

        // Optional: Function to hide elements if they scroll out of view
        // const hideScrollElement = (element) => {
        //     element.classList.remove('is-visible');
        // };

        const handleScrollAnimation = () => {
            scrollElements.forEach((el) => {
                if (elementInView(el, 80)) { // Trigger when 80% of the element is in view
                    displayScrollElement(el);
                } else {
                    // if you want elements to hide and re-animate, uncomment the next line
                    // hideScrollElement(el); 
                }
            });
        };

        window.addEventListener('scroll', handleScrollAnimation);
        handleScrollAnimation(); // Initial check for elements already in view
    }

    /**
     * Adjusts the playback speed of the hero section's background video.
     */
    function initHeroVideoSpeed() {
        const heroVideo = document.querySelector('#hero video');
        if (heroVideo) {
            heroVideo.playbackRate = 0.8; // Reduce speed by 20%
        }
    }

    /**
     * Initializes the video thumbnail changer for the 'Deep Scene Understanding' solution.
     * Allows users to click thumbnails to change the main displayed video.
     * Also handles hover-to-play for thumbnail videos.
     */
    function initSolutionVideoChanger() {
        const mainVideoUnderstanding = document.getElementById('main-video-understanding');
        const thumbnailsUnderstandingContainer = document.getElementById('thumbnails-understanding');

        if (mainVideoUnderstanding && thumbnailsUnderstandingContainer) {
            const thumbnails = thumbnailsUnderstandingContainer.querySelectorAll('.thumbnail');

            // Autoplay the initially active video if it has controls (and thus is likely meant to be interactive)
            if (mainVideoUnderstanding.hasAttribute('controls')) {
                mainVideoUnderstanding.play().catch(e => console.warn("Initial main video play prevented:", e));
            }

            thumbnails.forEach(thumbnail => {
                const thumbVideo = thumbnail.querySelector('video');
                if (thumbVideo) {
                    // Play thumbnail video on hover
                    thumbnail.addEventListener('mouseenter', () => {
                        thumbVideo.play().catch(e => { /* console.warn("Thumbnail hover play prevented:", e) */ });
                    });
                    // Pause thumbnail video when mouse leaves
                    thumbnail.addEventListener('mouseleave', () => {
                        thumbVideo.pause();
                    });
                }

                // Handle click to change main video
                thumbnail.addEventListener('click', function() {
                    const newSrc = this.getAttribute('data-video-src');
                    const currentSourceElement = mainVideoUnderstanding.querySelector('source');
                    const currentSrc = currentSourceElement ? currentSourceElement.getAttribute('src') : null;

                    if (newSrc !== currentSrc) {
                        // Remove existing source elements
                        while (mainVideoUnderstanding.firstChild) {
                            mainVideoUnderstanding.removeChild(mainVideoUnderstanding.firstChild);
                        }

                        // Add new source element
                        const newSourceTag = document.createElement('source');
                        newSourceTag.setAttribute('src', newSrc);
                        newSourceTag.setAttribute('type', 'video/mp4');
                        mainVideoUnderstanding.appendChild(newSourceTag);

                        // Load and play the new video
                        mainVideoUnderstanding.load(); // Important: load the new source
                        mainVideoUnderstanding.play().catch(e => console.error("Error playing new main video:", e));

                        // Update active thumbnail state
                        thumbnails.forEach(t => t.classList.remove('active'));
                        this.classList.add('active');
                    } else if (mainVideoUnderstanding.paused) {
                        // If clicking the active thumbnail and it's paused, play it
                        mainVideoUnderstanding.play().catch(e => console.warn("Error resuming paused video:", e));
                    }
                });
            });
        } else {
            console.warn('Main video or thumbnail container for solution understanding not found.');
        }
    }

    // Start the application
    initApp();
}); 