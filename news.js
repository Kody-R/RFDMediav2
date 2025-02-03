document.addEventListener("DOMContentLoaded", function () {
    const newsContainer = document.querySelector(".news-container");

    if (!newsContainer) {
        console.error("Error: .news-container not found in news.html");
        return;
    }

    fetch("articles.json")
        .then(response => {
            if (!response.ok) throw new Error("Failed to load articles.json");
            return response.json();
        })
        .then(articles => {
            console.log("Articles loaded:", articles);
            newsContainer.innerHTML = ""; // Clear existing content

            articles.forEach(article => {
                const articleElement = document.createElement("div");
                articleElement.classList.add("news-item");

                // Create clickable title
                const titleLink = document.createElement("a");
                titleLink.href = `article.html?article_id=${article.id}`;
                titleLink.textContent = article.title;
                titleLink.classList.add("news-title");

                const dateElement = document.createElement("p");
                dateElement.textContent = new Date(article.date).toLocaleDateString();
                dateElement.classList.add("news-date");

                const summaryElement = document.createElement("p");
                summaryElement.textContent = article.summary;
                summaryElement.classList.add("news-summary");

                articleElement.appendChild(titleLink);
                articleElement.appendChild(dateElement);
                articleElement.appendChild(summaryElement);
                newsContainer.appendChild(articleElement);
            });
        })
        .catch(error => console.error("Error loading articles:", error));
});
