

// get Element 
let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");
let load = document.getElementById("loaderText");
let card = document.querySelectorAll(".card1");


function loadNews(query = "Tamil Nadu") {
  if(load) load.innerText = "Loading news...";
  fetch(`/news?q=${query}`)
    .then((res) => res.json())
    .then((data) => {
      const AllData = data.articles;

      AllData.forEach((cEle, index) => {
        const AllCard = card[index];
        console.log(cEle);

        if (!AllCard) return;

        const img = AllCard.querySelector("img");
        if (img)
          img.src = cEle.urlToImage || "https://via.placeholder.com/300x180";

        const title = AllCard.querySelector(".title");
        if (title) title.textContent = cEle.title || "No title";

        const author = AllCard.querySelector(".author");
        if (author) author.textContent = cEle.author || "Unknown author";

        const desc = AllCard.querySelector(".desc");
        if (desc)
          desc.innerText =
            cEle.description.slice(0, 200) + " read more..." ||
            "No description available";

        const content = AllCard.querySelector(".content");
        if (content)
          content.textContent =
            cEle.content.slice(0, 200) + " read more..." ||
            "No content available";

        AllCard.onclick = () => {
          window.open(cEle.url, "_blank");
        };
      });

      load.innerText = "";
    })
    .catch((err) => {
      //  console.error(err);
      if (load)
        load.textContent = `Oops! Something went wrong. Try again later. ${err}`;
    });
}

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query === "") return;
  loadNews(query);
});

window.addEventListener("load", () => {
  loadNews(); 
});

document.writeln("POWERED BY NAV-NEWS")
