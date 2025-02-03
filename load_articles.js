document.addEventListener("DOMContentLoaded", function () {
    console.log("Loading article page...");

    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get("article_id");
    console.log("Article ID from URL:", articleId);

    if (!articleId) {
        document.getElementById("article-content").innerHTML = "<p>Article not found.</p>";
        return;
    }

    fetch("articles.json")
        .then(response => response.json())
        .then(articles => {
            console.log("Articles loaded:", articles);
            const article = articles.find(a => a.id === articleId);

            if (!article) {
                document.getElementById("article-content").innerHTML = "<p>Article not found.</p>";
                return;
            }

            // Update title and date
            document.getElementById("article-title").textContent = article.title;
            document.getElementById("article-date").textContent = new Date(article.date).toLocaleDateString();

            // Fetch and convert Markdown to HTML
            fetch(article.markdown)
                .then(response => response.text())
                .then(markdownContent => {
                    const converter = new showdown.Converter();
                    document.getElementById("article-content").innerHTML = converter.makeHtml(markdownContent);
                })
                .catch(error => {
                    console.error("Error loading Markdown:", error);
                    document.getElementById("article-content").innerHTML = "<p>Error loading article.</p>";
                });
        })
        .catch(error => {
            console.error("Error loading articles:", error);
            document.getElementById("article-content").innerHTML = "<p>Error loading article.</p>";
        });

        fetch(article.markdown)
        .then(response => response.text())
        .then(markdownContent => {
            const converter = new showdown.Converter({
                tables: true,
                strikethrough: true,
                tasklists: true,
                simpleLineBreaks: true
            });
            document.getElementById("article-content").innerHTML = converter.makeHtml(markdownContent);
        })
    
});
