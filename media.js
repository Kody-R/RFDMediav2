window.addEventListener("load", function () {
    const mainContent = document.getElementById("main-content");

    if (!mainContent) {
        console.error("Error: Element with ID 'main-content' not found.");
        return; // Stop execution if main-content is missing
    }

    // ✅ Create search bar and insert into page
    const searchContainer = document.createElement("div");
    searchContainer.classList.add("search-container");

    const searchInput = document.createElement("input");
    searchInput.setAttribute("type", "text");
    searchInput.setAttribute("placeholder", "Search videos...");
    searchInput.classList.add("search-bar");

    searchContainer.appendChild(searchInput);
    mainContent.insertBefore(searchContainer, mainContent.firstChild);

    // ✅ Create tab container and insert into page
    const tabContainer = document.createElement("div");
    tabContainer.classList.add("tab-container");
    mainContent.insertBefore(tabContainer, searchContainer.nextSibling);

    fetch("podcast.json")
        .then(response => response.json())
        .then(data => {
            const categories = Object.keys(data);
            const container = document.getElementById("video-categories");

            if (!container) {
                console.error("Error: Element with ID 'video-categories' not found.");
                return;
            }

            let activeCategory = categories[0];

            function createTabs() {
                tabContainer.innerHTML = "";
                categories.forEach(category => {
                    const tab = document.createElement("button");
                    tab.textContent = category.replace(/_/g, " ");
                    tab.classList.add("tab-button");
                    if (category === activeCategory) tab.classList.add("active-tab");

                    tab.addEventListener("click", () => {
                        activeCategory = category;
                        updateTabs();
                        loadVideos(searchInput.value);
                    });

                    tabContainer.appendChild(tab);
                });
            }

            function updateTabs() {
                document.querySelectorAll(".tab-button").forEach(tab => {
                    tab.classList.toggle("active-tab", tab.textContent === activeCategory.replace(/_/g, " "));
                });
            }

            function loadVideos(filter = "") {
                container.innerHTML = "";
            
                const section = document.createElement("div");
                section.classList.add("video-section");
            
                const grid = document.createElement("div");
                grid.classList.add("video-grid");
                section.appendChild(grid);
            
                let videos = data[activeCategory].filter(video => video.Link.trim() !== "");
            
                if (filter) {
                    videos = videos.filter(video => video.Title.toLowerCase().includes(filter.toLowerCase()));
                }
            
                let currentCount = 0;
                const videosPerPage = 6;
                const loadMoreBtn = document.createElement("button");
                loadMoreBtn.classList.add("load-more");
                loadMoreBtn.textContent = "Load More";
                loadMoreBtn.style.display = "none";
            
                function showVideos() {
                    for (let i = currentCount; i < Math.min(currentCount + videosPerPage, videos.length); i++) {
                        let video = videos[i];
                        let videoId = video.Link.split("v=")[1] || video.Link.split("/").pop();
            
                        const videoCard = document.createElement("div");
                        videoCard.classList.add("video-card");
            
                        let highlightedTitle = video.Title.replace(new RegExp(filter, "gi"), match => `<mark>${match}</mark>`);
            
                        videoCard.innerHTML = `
                            <a href="video.html?title=${encodeURIComponent(video.Title)}&link=${videoId}">
                                <img src="https://img.youtube.com/vi/${videoId}/hqdefault.jpg" alt="${video.Title}">
                            </a>
                            <p>${highlightedTitle}</p> <!-- Title is below the image now -->
                        `;
            
                        grid.appendChild(videoCard);
                    }
            
                    currentCount += videosPerPage;
                    loadMoreBtn.style.display = currentCount < videos.length ? "block" : "none";
                }
            
                showVideos();
            
                if (videos.length > videosPerPage) {
                    loadMoreBtn.addEventListener("click", showVideos);
                    section.appendChild(loadMoreBtn);
                }
            
                container.appendChild(section);
            }
            
            

            createTabs();
            loadVideos();

            searchInput.addEventListener("input", function () {
                loadVideos(this.value);
            });
        })
        .catch(error => console.error("Error loading videos:", error));
});
