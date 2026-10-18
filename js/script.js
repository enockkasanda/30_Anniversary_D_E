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

/* =========================================
   RSVP FORM - SUPABASE CONNECTION
========================================= */

const rsvpForm = document.getElementById("rsvp-form");
const formStatus = document.getElementById("form-status");

const SUPABASE_URL = "https://yuayyxvkxvijoslqvyjx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "YOUR_PUBLISHABLE_KEY_HERE";

if (rsvpForm && formStatus) {
    rsvpForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const submitButton = rsvpForm.querySelector(
            'button[type="submit"]'
        );

        if (submitButton.disabled) return;

        const attendance = rsvpForm.querySelector(
            'input[name="attendance"]:checked'
        )?.value;

        const guestCount = Number(
            document.getElementById("guest-count").value
        );

        const response = {
            guest_name: document.getElementById("guest-name").value.trim(),
            attendance,
            guest_count: guestCount,
            message: document.getElementById("guest-message").value.trim() || null
        };

        if (
            !response.guest_name ||
            !["attending", "not_attending"].includes(response.attendance) ||
            ![1, 2].includes(response.guest_count)
        ) {
            formStatus.textContent = "Please check your RSVP details.";
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = "Submitting...";
        formStatus.textContent = "";

        try {
            const result = await fetch(
                `${SUPABASE_URL}/rest/v1/rsvps`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "apikey": sb_publishable_wRxEiMh4e82Ref2hrZO_1g_bRZLoTsy,
                        "Authorization": `Bearer ${sb_publishable_wRxEiMh4e82Ref2hrZO_1g_bRZLoTsy}`,
                        "Prefer": "return=minimal"
                    },
                    body: JSON.stringify(response)
                }
            );

            if (!result.ok) {
                const error = await result.json();
                throw new Error(
                    error.message || "Unable to submit your RSVP."
                );
            }

            formStatus.textContent =
                "Thank you! Your RSVP has been submitted successfully.";

            rsvpForm.reset();

        } 
         catch (error) {
            console.error("RSVP submission error:", error);

             formStatus.textContent =
            "RSVP error: " + error.message;
}
 finally {
            submitButton.disabled = false;
            submitButton.innerHTML =
                'Submit my response <span>↗</span>';
        }
    });
}

