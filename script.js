// Import all necessary elements

const navLinks = document.querySelectorAll('.nav_link'),
    sections = document.querySelectorAll('.section'),
    sectionContainer = document.querySelector('.section_container');

const HEADER_HEIGHT = document.querySelector('header').offsetHeight;
let isClicking = false;

// Scroll Listener on section Container
sectionContainer.addEventListener('scroll', () => {
    if (isClicking) return;  //skip handling during clicks
    const scrollY = sectionContainer.scrollTop + HEADER_HEIGHT; //Adjust for header height

    sections.forEach((section) => {
        const offset = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollY >=offset && scrollY < offset + height){
            // First remove active class on all nav links
            navLinks.forEach((item) => item.classList.remove('active'));
            document.querySelector(`.nav_links .nav_link a[href='#${id}']`).parentElement.classList.add('active');
        }
    })
})


// Click EventListener for Nav Links
navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        isClicking = true;

        const targetId = link.querySelector('a').getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        const targetOffset = targetSection.offsetTop;


        sectionContainer.scrollTo({
            top: targetOffset,
            behavior: 'smooth',
        })

        // Update the Active state Manually
        navLinks.forEach((item) => item.classList.remove('active'));
        link.classList.add('active');

        // Clear clicking flag after timout
        setTimeout(() => {
            isClicking= false;
        },500) // Adjust timout based on scroll behaviour
    })
})