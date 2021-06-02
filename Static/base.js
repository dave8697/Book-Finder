async function search_books() {
    const x = document.getElementById("search").value;
    document.getElementById("cardsection").innerHTML = "";
    document.getElementById("trash").innerHTML = "";
    var spinner = document.getElementById("spinner");
    spinner.classList.remove("visually-hidden");
    var foot = document.getElementById("footer");
    foot.classList.add("visually-hidden");
    await fetch_books(x);
    foot.classList.remove("visually-hidden");
    spinner.classList.add("visually-hidden");
}

async function fetch_books(x) {
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${x}`);
    const result = await res.json();
    console.log(result);
    if (res.status == 200) {
        var cardSection = document.getElementById("cardsection");
        for (var i = 0; i < result.items.length; i++) {
            var row;
            var id;
            var item = result.items[i];
            if (i % 5 === 0) {
                row = document.createElement("div");
                row.classList.add("row");
                id = `book-${i}`
                row.setAttribute("id", id);
            }
            cardSection.appendChild(row);
            var col = addelement(item.volumeInfo.imageLinks.thumbnail, item.volumeInfo.title, item.volumeInfo.publishedDate, item.volumeInfo.authors, item.volumeInfo.infoLink);
            document.getElementById(id).appendChild(col);
        }
    }
}
function addelement(imgUrl, cardTitleText, publishedDate, authorText, extUrl) {
    var column = document.createElement("div");
    var cardParent = document.createElement("div");
    var cardImg = document.createElement("img");
    var cardBody = document.createElement("div");
    var cardTitle = document.createElement("h5");
    var author = document.createElement("p");
    var cardText = document.createElement("p");
    var moreBtn = document.createElement("a");

    column.classList.add("col-6", "col-md");
    author.classList.add("author");
    cardParent.classList.add("card", "mt-3");
    cardImg.classList.add("card-img-top", "mt-2", "mb-2");
    cardBody.classList.add("card-body", "d-flex", "flex-column");
    cardTitle.classList.add("card-title");
    cardText.classList.add("card-text");
    moreBtn.classList.add("btn", "btn-primary", "mt-auto");

    cardImg.setAttribute("src", `${imgUrl}`);
    cardImg.setAttribute("alt", `${cardTitleText}`);
    moreBtn.setAttribute("href", `${extUrl}`);
    moreBtn.setAttribute("target", "_blank");
    cardTitle.setAttribute("style", "font-size: medium;")

    author.innerHTML = `${authorText}`;
    cardTitle.innerHTML = `${cardTitleText}`;
    cardText.innerHTML = `Published on: ${publishedDate}`;
    moreBtn.innerHTML = "Read More";

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(author);
    cardBody.appendChild(cardText);
    cardBody.appendChild(moreBtn);

    cardParent.appendChild(cardImg);
    cardParent.appendChild(cardBody);

    column.appendChild(cardParent);

    return column;
}
