// =========================================
// MOBILE NAVIGATION
// =========================================

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {

    // Open / close mobile menu
    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        const isOpen = navLinks.classList.contains("active");

        menuToggle.setAttribute("aria-expanded", isOpen);

    });


    // Close menu when a navigation link is selected
    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

        });

    });


    // Close menu when clicking outside the navigation
    document.addEventListener("click", (event) => {

        const clickedInsideNavigation =
            navLinks.contains(event.target) ||
            menuToggle.contains(event.target);

        if (!clickedInsideNavigation) {

            navLinks.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

        }

    });


    // Close menu when pressing Escape
    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            navLinks.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.focus();

        }

    });

}
