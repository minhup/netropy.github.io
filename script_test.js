document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    // This needs to be called after the lucide script has loaded and the `lucide` object is available.
    // DOMContentLoaded ensures the basic HTML structure is ready.
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    } else {
        // This message should ideally not appear if the correct script is loaded.
        console.error('Lucide library object not found. Ensure the script is loaded correctly.');
    }

    // Mobile menu toggle
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when a link is clicked
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
    
    // Dynamic year for footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Shrink header on scroll
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('py-3');
                header.classList.remove('py-4');
            } else {
                header.classList.add('py-4');
                header.classList.remove('py-3');
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            // Ensure targetId is not just "#" to prevent errors
            if (targetId && targetId.length > 1) { 
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Calculate offset for fixed header
                    const headerEl = document.getElementById('header');
                    const headerOffset = headerEl ? headerEl.offsetHeight : 0;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // Animate elements on scroll
    const scrollElements = document.querySelectorAll('.animate-on-scroll');

    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= 
            (window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100)
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('is-visible');
    };

    // const hideScrollElement = (element) => { // Optional: if you want to re-trigger animation
    //     // element.classList.remove('is-visible'); 
    // };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 80)) { // Trigger when 80% of the element is in view
                displayScrollElement(el);
            } else {
                // hideScrollElement(el); // Uncomment if you want elements to hide and re-animate
            }
        })
    }

    window.addEventListener('scroll', handleScrollAnimation);
    // Initial check in case elements are already in view on load
    handleScrollAnimation();

    // Solution video thumbnail changer
    const mainVideoUnderstanding = document.getElementById('main-video-understanding');
    const thumbnailsUnderstandingContainer = document.getElementById('thumbnails-understanding');

    if (mainVideoUnderstanding && thumbnailsUnderstandingContainer) {
        const thumbnails = thumbnailsUnderstandingContainer.querySelectorAll('.thumbnail');

        // Autoplay the initially active video if controls are present
        if (mainVideoUnderstanding.hasAttribute('controls')) {
             mainVideoUnderstanding.play().catch(e => console.warn("Initial main video play prevented:", e));
        }

        thumbnails.forEach(thumbnail => {
            const thumbVideo = thumbnail.querySelector('video');
            if (thumbVideo) {
                thumbnail.addEventListener('mouseenter', () => {
                    thumbVideo.play().catch(e => { /* console.warn("Thumbnail hover play prevented:", e) */ });
                });
                thumbnail.addEventListener('mouseleave', () => {
                    thumbVideo.pause();
                });
            }

            thumbnail.addEventListener('click', function () {
                const newSrc = this.getAttribute('data-video-src');
                const currentSrc = mainVideoUnderstanding.querySelector('source') ? mainVideoUnderstanding.querySelector('source').getAttribute('src') : null;

                if (newSrc !== currentSrc) {
                    // Remove existing source elements
                    while (mainVideoUnderstanding.firstChild) {
                        mainVideoUnderstanding.removeChild(mainVideoUnderstanding.firstChild);
                    }

                    // Add new source element
                    const newSourceElement = document.createElement('source');
                    newSourceElement.setAttribute('src', newSrc);
                    newSourceElement.setAttribute('type', 'video/mp4');
                    mainVideoUnderstanding.appendChild(newSourceElement);

                    // Load and play the new video
                    mainVideoUnderstanding.load();
                    mainVideoUnderstanding.play().catch(e => console.error("Error playing new main video:", e));

                    // Update active thumbnail state
                    thumbnails.forEach(t => {
                        t.classList.remove('active');
                        t.classList.remove('border-blue-500');
                        t.classList.add('border-transparent');
                    });
                    this.classList.add('active');
                    this.classList.add('border-blue-500');
                    this.classList.remove('border-transparent');
                } else if (mainVideoUnderstanding.paused) {
                     mainVideoUnderstanding.play().catch(e => console.warn("Error resuming paused video:", e));
                }
            });
        });
    }
}); 