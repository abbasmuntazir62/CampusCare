import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const auth = getAuth();

// Already logged in hai toh redirect karo
onAuthStateChanged(auth, (user) => {
  if (user) {
    if (user.email === "admin@its.edu.in") {
      window.location.href = "admin-dashboard.html";
    } else {
      window.location.href = "student-dashboard.html";
    }
  }
});

// Login Form
const form = document.getElementById("login-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email    = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const btn      = form.querySelector("button[type=submit]");

  if (!email || !password) {
    alert("Please enter email and password!");
    return;
  }

  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Signing In...';
  btn.disabled = true;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    alert("Login Successful!");

    if (user.email === "admin@its.edu.in") {
      window.location.href = "admin-dashboard.html";
    } else {
      window.location.href = "student-dashboard.html";
    }

  } catch (error) {
    console.error("Login error:", error.code);

    let message = "Login failed!";
    if (error.code === "auth/user-not-found")     message = "No account found!";
    if (error.code === "auth/wrong-password")     message = "Wrong password!";
    if (error.code === "auth/invalid-email")      message = "Invalid email!";
    if (error.code === "auth/too-many-requests")  message = "Too many attempts!";
    if (error.code === "auth/invalid-credential") message = "Wrong email or password!";

    alert(message);

    btn.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> Sign In to CampusCare';
    btn.disabled = false;
  }
});

// Password show/hide
document.getElementById("toggle-password").addEventListener("click", () => {
  const input = document.getElementById("password");
  const icon  = document.getElementById("toggle-password");
  if (input.type === "password") {
    input.type = "text";
    icon.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    input.type = "password";
    icon.classList.replace("fa-eye-slash", "fa-eye");
  }
});