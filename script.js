// ================= DARK MODE =================
const toggleBtn = document.createElement("button");
toggleBtn.innerText = "🌙 Dark Mode";
toggleBtn.className = "dark-btn";
document.body.appendChild(toggleBtn);

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// ================= SHOW / HIDE PASSWORD =================
function togglePassword(id) {
  const input = document.getElementById(id);
  input.type = input.type === "password" ? "text" : "password";
}

// ================= VALIDATION FUNCTIONS =================
function showError(input, message) {
  let error;

  // check if input is inside password-box
  if (input.parentElement.classList.contains("password-box")) {
    error = input.parentElement.nextElementSibling;
  } else {
    error = input.nextElementSibling;
  }

  if (error) error.innerText = message;

  input.style.border = "1px solid red";
}

function showSuccess(input) {
  let error;

  if (input.parentElement.classList.contains("password-box")) {
    error = input.parentElement.nextElementSibling;
  } else {
    error = input.nextElementSibling;
  }

  if (error) error.innerText = "";

  input.style.border = "1px solid green";
}
// ================= SIGNUP =================
const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const city = document.getElementById("city");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const cityRegex = /^[A-Za-z ]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

    // Name
    if (name.value.trim() === "") {
      showError(name, "Full name required");
      isValid = false;
    } else {
      showSuccess(name);
    }

    // Email
    if (!emailRegex.test(email.value.trim())) {
      showError(email, "Invalid email");
      isValid = false;
    } else {
      showSuccess(email);
    }

    // Phone
    if (!phoneRegex.test(phone.value.trim())) {
      showError(phone, "Must be 10 digits");
      isValid = false;
    } else {
      showSuccess(phone);
    }

    // City
    if (!cityRegex.test(city.value.trim())) {
      showError(city, "Only alphabets allowed");
      isValid = false;
    } else {
      showSuccess(city);
    }

    // Password
    if (!passwordRegex.test(password.value.trim())) {
      showError(password, "Min 8 chars + letters & numbers");
      isValid = false;
    } else {
      showSuccess(password);
    }

    // Confirm Password
    if (confirmPassword.value !== password.value) {
      showError(confirmPassword, "Passwords do not match");
      isValid = false;
    } else {
      showSuccess(confirmPassword);
    }

    if (isValid) {
      const user = {
        email: email.value.trim(),
        password: password.value.trim(),
      };

      localStorage.setItem("user", JSON.stringify(user));

      alert("Signup Successful ✅");
      window.location.href = "signin.html";
    }
  });
}

// ================= SIGNIN =================
const signinForm = document.getElementById("signinForm");

if (signinForm) {
  signinForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail");
    const password = document.getElementById("loginPassword");

    const storedUser = JSON.parse(localStorage.getItem("user"));

    let isValid = true;

    if (!storedUser) {
      alert("No user found. Please signup first!");
      return;
    }

    if (email.value !== storedUser.email) {
      showError(email, "Email not registered");
      isValid = false;
    } else {
      showSuccess(email);
    }

    if (password.value !== storedUser.password) {
      showError(password, "Wrong password");
      isValid = false;
    } else {
      showSuccess(password);
    }

    if (isValid) {
      alert("Login Successful 🎉");
      window.location.href = "landing.html";
    }
  });
}

// ================= LOGOUT =================
function logout() {
  window.location.href = "signin.html";
}