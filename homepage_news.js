document.addEventListener("DOMContentLoaded", function () {
    fetch("articles.json")
        .then(response => response.json())
        .then(articles => {
            const newsContainer = document.querySelector(".news-container");
            newsContainer.innerHTML = ""; // Clear existing content

            articles.slice(0, 3).forEach(article => {
                const articleElement = document.createElement("div");
                articleElement.classList.add("news-item");

                const titleLink = document.createElement("a");
                titleLink.href = `article.html?article_id=${article.id}`;
                titleLink.textContent = article.title;
                titleLink.classList.add("news-title");

                const summaryElement = document.createElement("p");
                summaryElement.textContent = article.summary;

                articleElement.appendChild(titleLink);
                articleElement.appendChild(summaryElement);
                newsContainer.appendChild(articleElement);
            });
        })
        .catch(error => console.error("Error loading latest news:", error));
});
