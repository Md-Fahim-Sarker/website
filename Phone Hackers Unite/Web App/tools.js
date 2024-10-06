const urlParams = new URLSearchParams(window.location.search);
const tools = urlParams.get('tools');
const resultDiv = document.getElementById('result');

if (tools === 'url-shorter') {
  document.title = "Url Shortener";
  document.getElementById("hi-text").textContent = "URL Shortener";
  document.getElementById("submit-button").textContent = "Generate";
  document.getElementById("input-text").placeholder = "Enter long link here";
} else if (tools === 'ip-info') {
  document.title = "IP Info🔎";
  document.getElementById("hi-text").textContent = "IP Info🔎";
  document.getElementById("submit-button").textContent = "Get Info";
  document.getElementById("input-text").placeholder = "Enter IP address here";
}

async function fetchInfo(event) {
  event.preventDefault();
  if (tools === 'url-shorter') {
    urlshorter();
  } else if (tools === 'ip-info') {
    fetchIpInfo();
  }
}

function urlshorter() {
  const urlInput = document.getElementById('input-text').value;
  if (urlInput) {
    shortenUrl(urlInput);
  } else {
    displayError("Please enter a valid URL.");
  }
}

async function getIpInfo(ip) {
  const apiUrl = `https://ip-api.com/json/${ip}`;
  try {
    const response = await fetch(apiUrl);
    return await response.json();
  } catch (error) {
    console.error("Error fetching IP info:", error);
    displayError("Failed to fetch IP info.");
  }
}

function fetchIpInfo() {
  const ip = document.getElementById('input-text').value;
  if (ip) {
    getIpInfo(ip).then(ipInfo => {
      if (ipInfo && ipInfo.status === "success") {
        const reply = `🔎IP Information:<br>` +
                      `Country: ${ipInfo.country}<br>` +
                      `Region: ${ipInfo.regionName}<br>` +
                      `City: ${ipInfo.city}<br>` +
                      `ZIP: ${ipInfo.zip}<br>` +
                      `Lat: ${ipInfo.lat}<br>` +
                      `Lon: ${ipInfo.lon}<br>` +
                      `ISP: ${ipInfo.isp}<br>` +
                      `Org: ${ipInfo.org}`;
        resultDiv.innerHTML = reply;
        resultDiv.className = 'message success';
        resultDiv.style.display = 'block';
      } else {
        displayError("Invalid IP address or IP information not found.");
      }
    });
  } else {
    displayError("Please enter a valid IP address.");
  }
}

function shortenUrl(url) {
  const apiUrl = 'https://tinyurl.com/api-create.php?url=' + encodeURIComponent(url);
  
  fetch(apiUrl)
    .then(response => response.text())
    .then(shortenedUrl => {
      document.getElementById('result').textContent = "🔗Shortened URL: " + shortenedUrl;
      resultDiv.className = 'message success';
      resultDiv.style.display = 'block';
    })
    .catch(error => {
      console.error('Error shortening URL:', error);
      displayError("Failed to shorten the URL.");
    });
}

function displayError(message) {
  resultDiv.textContent = message;
  resultDiv.className = 'message error';
  resultDiv.style.display = 'block';
}

function backtoindex() {
  window.history.back();
}