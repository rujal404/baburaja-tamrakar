const form = document.getElementById("contact-form");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const loading = form.querySelector(".loading");
  const errorMsg = form.querySelector(".error-message");
  const successMsg = form.querySelector(".sent-message");

  loading.style.display = "block";
  errorMsg.innerHTML = "";
  successMsg.style.display = "none";

  const formData = new FormData(form);

  fetch("https://formspree.io/f/xeerwbkq", {
    method: "POST",
    body: formData,
    headers: {
      "Accept": "application/json"
    }
  })
  .then(response => {
    loading.style.display = "none";

    if (response.ok) {
      successMsg.style.display = "block";
      form.reset();
    } else {
      errorMsg.innerHTML = "Something went wrong!";
    }
  })
  .catch(() => {
    loading.style.display = "none";
    errorMsg.innerHTML = "Network error!";
  });
});
