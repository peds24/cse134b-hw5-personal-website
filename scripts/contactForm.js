document.addEventListener('DOMContentLoaded', () => {
    emailjs.init('q0tArIkPIMZS53i41'); 

    const fullname = document.getElementById("fullname");
    const email = document.getElementById("email");
    const textarea = document.getElementById("comments");
    const formError = document.getElementById("form-error");
    const formErrorsInput = [];
    const maxLength = textarea.getAttribute('maxlength');
    const info = document.getElementById('form-info');

    fullname.addEventListener("input", () => {
      const namePattern = /^[A-Za-z ]*$/;

      if (!namePattern.test(fullname.value)) {
        fullname.value = fullname.value.replace(/[^A-Za-z ]/g, '');
        fullname.setCustomValidity("Full name can only contain alphabetic characters.");
        formError.textContent = "Full name can only contain alphabetic characters.";
        formError.classList.add("error", "flash");
        formErrorsInput.push({ field: "fullname", message: "Invalid full name.", type: "validation" });
      } else {
        fullname.setCustomValidity("");
        formError.textContent = "";
        formError.classList.remove("error", "flash");
      }
    });

    const emailPattern = /^[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]*\.[a-zA-Z]{2,}$/;
    email.addEventListener("input", () => {
      if (!emailPattern.test(email.value)) {
        email.value = email.value.replace(/[^a-zA-Z0-9._%+-@.]/g, '');
        email.setCustomValidity("Please enter a valid email address.");
        formError.textContent = "Please enter a valid email address.";
        formError.classList.add("error", "flash");
        formErrorsInput.push({ field: "email", message: "Invalid email address.", type: "validation" });
      } else {
        email.setCustomValidity("");
        formError.textContent = "";
        formError.classList.remove("error", "flash");
      }
    });

    textarea.addEventListener('input', () => {
      const remaining = maxLength - textarea.value.length;
      info.textContent = `${remaining} characters remaining`;

      if (remaining <= 50 && remaining > 0) {
        info.style.color = 'yellow';
        formError.textContent = '';
        formError.classList.remove("error", "flash");
      } else if (remaining === 0) {
        info.style.color = 'red';
        formError.textContent = 'Character limit reached!';
        formError.classList.add("error", "flash");
      } else {
        info.style.color = 'black';
        formError.textContent = '';
        formError.classList.remove("error", "flash");
      }
    });

    document.getElementById("contact-form").addEventListener("submit", (event) => {
      event.preventDefault();

    //   if (formErrorsInput.length > 0) {
    //     console.log("Form errors: ", formErrorsInput);
    //     formError.textContent = "Please fix the errors before submitting.";
    //     formError.classList.add("error", "flash");
    //     return;
    //   }

      emailjs.send('service_cjwzjot', 'template_roa7mbh', {
        name: fullname.value,
        email: email.value,
        message: textarea.value
      }).then(() => {
        formError.textContent = "Message sent successfully!";
        formError.classList.remove("error");
        formError.style.color = "green";
        document.getElementById("contact-form").reset();
        info.textContent = `${maxLength} characters remaining`;
      }).catch((error) => {
        formError.textContent = "Error sending message. Please try again.";
        formError.classList.add("error");
        console.error("EmailJS error: ", error);
      });
    });
  });