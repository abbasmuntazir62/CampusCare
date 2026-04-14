import { db } from "./firebase.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

console.log("complaint.js loaded");

const form = document.getElementById("new-complaint-form");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("FORM SUBMITTED");

    const title       = document.getElementById("complaintTitle").value;
    const category    = document.getElementById("complaintCategory").value;
    const priority    = document.getElementById("complaintPriority").value;
    const location    = document.getElementById("complaintLocation").value;
    const description = document.getElementById("complaintDescription").value;

    console.log(title, category, priority, location, description);

    try {
      console.log("Trying to save in Firestore...");

      await addDoc(collection(db, "complaints"), {
        title,
        category,
        priority,
        location,
        description,
        status: "pending",
        createdAt: serverTimestamp()
      });

      console.log("Saved Successfully!");
      alert("Complaint Submitted Successfully!");
      form.reset();

    } catch (error) {
      console.error("Firestore Error:", error);
      alert("Complaint not submitted! Error: " + error.message);
    }
  });
} else {
  console.log("Form not found on this page.");
}