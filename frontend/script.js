async function generateSite() {
  let status = document.getElementById("status");
  status.innerText = "Generating site...";

  // Get logo file
  let file = document.getElementById("logoFile").files[0];
  let logoUrl = "";

  // Upload logo to Blob if it exists
  if (file) {
    const upload = await fetch("/api/upload-logo", {
      method: "POST",
      body: file
    });

    const result = await upload.json();
    logoUrl = result.url; // REAL hosted image URL
  }

  // Data for site generation
  let data = {
    name: document.getElementById("name").value,
    ticker: document.getElementById("ticker").value,
    desc: document.getElementById("desc").value,
    address: document.getElementById("address").value,
    logo: logoUrl, // IMPORTANT: use Blob URL, not base64
    theme: document.getElementById("theme").value,
    twitter: document.getElementById("twitter").value,
    telegram: document.getElementById("telegram").value,
    buy: document.getElementById("buy").value
  };

  // Send to backend
  let res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  let json = await res.json();

  if (json.success) {
    status.innerHTML = `Done! <a href="${json.url}" target="_blank">View Site</a>`;
  } else {
    status.innerText = "Error: " + json.error;
  }
}
