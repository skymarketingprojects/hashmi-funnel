// Open the form popup
function openForm() {
  document.getElementById("popupForm").style.display = "flex";
}

// Close the form popup
function closeForm() {
  document.getElementById("popupForm").style.display = "none";
}

// Show form submission notification
function showNotification(message, isError = false) {
  const notification = document.getElementById("formNotification");
  notification.textContent = message;
  notification.classList.toggle("error", isError);
  notification.style.display = "block";

  setTimeout(() => {
    notification.style.display = "none";
  }, 3000);
}

// Handle form submission with fetch (no page refresh)
function submitForm(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  // Send the form data using Fetch API
  fetch("https://formspree.io/f/your-form-id", {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        showNotification("Form submitted successfully!");
        form.reset();
        closeForm(); // Automatically close form on success
      } else {
        showNotification("Form submission failed. Please try again.", true);
      }
    })
    .catch((error) => {
      showNotification("An error occurred. Please try again.", true);
    });
}

// Attach event listeners to buttons (to open the form)
document.querySelectorAll(".btn.red").forEach((button) => {
  button.addEventListener("click", openForm);
});

// Attach the submit function to the form
document
  .getElementById("appointmentForm")
  .addEventListener("submit", submitForm);

// Optional: Add mobile sticky CTA button click
const mobileCTA = document.querySelector(".mobile-cta");
if (mobileCTA) {
  mobileCTA.addEventListener("click", openForm);
}
