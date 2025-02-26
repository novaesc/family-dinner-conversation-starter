function displayTopic(response) {
  console.log("Topic generated");

  let topicElement = document.querySelector("#topic");
  topicElement.innerHTML = ""; // Clear previous topics before adding new ones

  let topics = response.data.answer; // Assuming the API returns a string or an array

  // Convert string response to an array (if needed)
  if (!Array.isArray(topics)) {
    topics = topics.split("\n").filter((topic) => topic.trim() !== ""); // Split by new lines
  }

  // Limit to exactly 5 topics
  topics = topics.slice(0, 5);

  let typewriter = new Typewriter(topicElement, {
    autoStart: true,
    delay: 30, // Adjust typing speed
    cursor: "",
  });

  topics.forEach((topic, index) => {
    typewriter
      .typeString(`<strong>Topic ${index + 1}:</strong> ${topic}`)
      .pauseFor(500) // Pause between topics
      .typeString("<br><br>"); // Add space between topics
  });

  typewriter.start();
}

function generateTopic(event) {
  event.preventDefault();

  let ageInput = document.querySelector("#user-age").value;
  if (!ageInput) {
    alert("Please select an age range.");
    return;
  }

  let apiKey = "t791c65fb95440of32bfcac91b7e98ae"; // Replace with your actual API key
  let prompt = `Generate exactly 5 family dinner discussion topics for children aged ${ageInput}. Each topic should be a short sentence, no numbering.`;
  let context =
    "You are an expert in creating engaging conversation starters for families. Generate 5 fun and thoughtful discussion topics based on the selected age range.";

  let apiURL = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  console.log("Searching for Topics...");
  console.log(`Prompt: ${prompt}`);
  console.log(`Context: ${context}`);

  axios
    .get(apiURL)
    .then(displayTopic)
    .catch((error) => {
      console.error("Error fetching data:", error);
      document.querySelector("#topic").innerHTML =
        "Sorry, something went wrong. Please try again.";
    });
}

let topicGeneratorElement = document.querySelector("#topic-generator-form");
topicGeneratorElement.addEventListener("submit", generateTopic);
