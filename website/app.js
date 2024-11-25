// Global variables
const apiKey = "1b843d998effc54e78f93bc3c7d1419f"; 
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";

// Fetch weather data from OpenWeatherMap API
const getWeatherData = async (zip) => {
  const res = await fetch(`${baseURL}${zip}&appid=${apiKey}`);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

// Post data to server
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  try {
    return await response.json();
  } catch (error) {
    console.error("Error posting data:", error);
  }
};

// Update UI dynamically
const updateUI = async () => {
  const res = await fetch("/all");
  try {
    const data = await res.json();
    document.getElementById("temp").innerHTML = `Temperature: ${Math.round(
      data.temp
    )}°F`;
    document.getElementById("date").innerHTML = `Date: ${data.date}`;
    document.getElementById("content").innerHTML = `Feeling: ${data.feel}`;
  } catch (error) {
    console.error("Error updating UI:", error);
  }
};

// Event listener for the "Generate" button
document.getElementById("generate").addEventListener("click", async () => {
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

  if (zip) {
    const weatherData = await getWeatherData(zip);

    if (weatherData && weatherData.main) {
      const dataToPost = {
        temp: weatherData.main.temp,
        date: new Date().toLocaleDateString(),
        feel: feelings,
      };

      await postData("/add", dataToPost);
      updateUI();
    } else {
      alert("Invalid ZIP code or data unavailable!");
    }
  } else {
    alert("Please enter a ZIP code!");
  }
});
