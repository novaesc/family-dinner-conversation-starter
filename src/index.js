function generateTopic(event) {
  event.preventDefault();

  new Typewriter("#topic", {
    strings: "🔎Searching for topic ideas...💡",
    autoStart: true,
    delay: 1,
    cursor: "",
  });
}

let topicGeneratorElement = document.querySelector("#topic-generator-form");
topicGeneratorElement.addEventListener("submit", generateTopic);
