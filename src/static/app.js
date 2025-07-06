document.addEventListener("DOMContentLoaded", () => {
  const activitiesList = document.getElementById("activities-list");
  const activitySelect = document.getElementById("activity");
  const signupForm = document.getElementById("signup-form");
  const messageDiv = document.getElementById("message");

  // Function to fetch activities from API
  async function fetchActivities() {
    try {
      const response = await fetch("/activities");
      const activities = await response.json();

      // Clear loading message
      activitiesList.innerHTML = "";

      // Populate activities list
      Object.entries(activities).forEach(([name, details]) => {
        const activityCard = document.createElement("div");
        activityCard.className = "activity-card";

        const spotsLeft = details.max_participants - details.participants.length;

        // Build participants list HTML HTML
        let participantsHTML = "";ML = "";
        if (details.participants.length > 0) {ails.participants.length > 0) {
          participantsHTML = `
            <div class="participants-section">
              <strong>Participants:</strong>    <strong>Participants (${details.participants.length}):</strong>
              <ul class="participants-list">              <ul class="participants-list">
                ${details.participants.map(email => `<li>${email}</li>`).join("")}=> `<li>${email}</li>`).join("")}
              </ul>              </ul>
            </div>
          `;
        } else {
          participantsHTML = `
            <div class="participants-section">n">
              <strong>Participants:</strong>     <strong>Participants:</strong>
              <span class="no-participants">No participants yet</span>s="no-participants">No participants yet.</p>
            </div>
          `;
        }   }

        activityCard.innerHTML = `        activityCard.innerHTML = `
          <h4>${name}</h4>
          <p>${details.description}</p>
          <p><strong>Schedule:</strong> ${details.schedule}</p>le:</strong> ${details.schedule}</p>
          <p><strong>Availability:</strong> ${spotsLeft} spots left</p>          <p><strong>Availability:</strong> ${spotsLeft} spots left</p>
          ${participantsHTML}
        `;

        activitiesList.appendChild(activityCard);ctivitiesList.appendChild(activityCard);

        // Add option to select dropdown
        const option = document.createElement("option");onst option = document.createElement("option");
        option.value = name;me;
        option.textContent = name;ption.textContent = name;
        activitySelect.appendChild(option);activitySelect.appendChild(option);
      });      });
    } catch (error) {
      activitiesList.innerHTML = "<p>Failed to load activities. Please try again later.</p>";      activitiesList.innerHTML = "<p>Failed to load activities. Please try again later.</p>";
      console.error("Error fetching activities:", error);or fetching activities:", error);
    }
  }

  // Handle form submissionrm submission
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;    const email = document.getElementById("email").value;
    const activity = document.getElementById("activity").value;("activity").value;

    try {
      const response = await fetch(wait fetch(
        `/activities/${encodeURIComponent(activity)}/signup?email=${encodeURIComponent(email)}`,ctivity)}/signup?email=${encodeURIComponent(email)}`,
        {
          method: "POST",ST",
        }
      );

      const result = await response.json();

      if (response.ok) { if (response.ok) {
        messageDiv.textContent = result.message;        messageDiv.textContent = result.message;
        messageDiv.className = "success";className = "success";
        signupForm.reset();eset();
      } else {   } else {
        messageDiv.textContent = result.detail || "An error occurred";        messageDiv.textContent = result.detail || "An error occurred";





















});  fetchActivities();  // Initialize app  });    }      console.error("Error signing up:", error);      messageDiv.classList.remove("hidden");      messageDiv.className = "error";      messageDiv.textContent = "Failed to sign up. Please try again.";    } catch (error) {      }, 5000);        messageDiv.classList.add("hidden");      setTimeout(() => {      // Hide message after 5 seconds      messageDiv.classList.remove("hidden");      }        messageDiv.className = "error";        messageDiv.className = "error";
      }

      messageDiv.classList.remove("hidden");

      // Hide message after 5 seconds
      setTimeout(() => {
        messageDiv.classList.add("hidden");
      }, 5000);
    } catch (error) {
      messageDiv.textContent = "Failed to sign up. Please try again.";
      messageDiv.className = "error";
      messageDiv.classList.remove("hidden");
      console.error("Error signing up:", error);
    }
  });

  // Initialize app
  fetchActivities();
});
