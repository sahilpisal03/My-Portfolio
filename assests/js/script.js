const apiKey = "984abe2c65e502573ac0a7548fc67e47";
const endpoint = `https://gnews.io/api/v4/top-headlines?token=${apiKey}&lang=en&topic=technology&max=9`; // Updated to call serverless function

fetch(endpoint)
  .then((response) => response.json())
  .then((data) => {
    const newsContainer = document.getElementById("news");

    const row = document.createElement("div");
    row.className = "row g-4";

    data.articles.forEach((article) => {
      const col = document.createElement("div");
      col.className = "col-lg-4 col-md-6";

      const imageUrl =
        article.image && article.image !== "null"
          ? article.image
          : "images/news-default.jpg";

      col.innerHTML = `
        <div class="card h-100">
          <img src="${imageUrl}" class="card-img-top" alt="news image"
               onerror="this.onerror=null; this.src='images/news-default.jpg';">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${article.title}</h5>
            <p class="card-text">${
              article.description || "No description available."
            }</p>
            <a href="${
              article.url
            }" target="_blank" class="btn btn-outline-primary mt-auto">Read More</a>
          </div>
        </div>
      `;

      row.appendChild(col);
    });

    // ✅ Append the full row of news cards once
    newsContainer.appendChild(row);

    // ✅ Injecting dynamic headlines into marquee — OUTSIDE forEach
    const headlinesMarquee = document.querySelector(".headlines");
    const headlinesText = data.articles
      .map((article) => `📢 ${article.title}`)
      .join(" ⚡ ");
    headlinesMarquee.textContent = headlinesText;
  })
  .catch((error) => {
    console.error("Failed to load news:", error);
  });
