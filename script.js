const totalCards =
collectionConfig.totalCards;

const defaultOwned = [];
const foilCards = [];

let currentView = "grid";

let ownedCards =
JSON.parse(
    localStorage.getItem(
        `ownedCards_${collectionConfig.id}`
    )
)
|| defaultOwned;

let foilOwnedCards =
JSON.parse(
    localStorage.getItem(
        `foilOwnedCards_${collectionConfig.id}`
    )
)
|| foilCards;

const container =
document.getElementById("cards");

for(let i=1;i<=totalCards;i++){

    const card =
    document.createElement("div");

    card.classList.add("card");
    card.dataset.number = i;

    if(ownedCards.includes(i)){
        card.classList.add("owned");
    }

    const imageUrl =
collectionConfig.imagePattern
.replace("{id}", i);

  const foilActive =
foilOwnedCards.includes(i)
? "active"
: "";

card.innerHTML = `

    <div class="foil-btn ${foilActive}" title="Foil">
        ⭐
    </div>

    <div class="owned-indicator" title="Gotcha">
        <img src="3dpokeball.png" alt="Carta obtida">
    </div>

    <img src="${imageUrl}" loading="lazy">

    <div class="card-number">
        #${i}
    </div>

`;

const foilButton =
card.querySelector(".foil-btn");

foilButton.addEventListener("click",(e)=>{

    e.stopPropagation();

    foilButton.classList.toggle("active");

    if(foilButton.classList.contains("active")){

        if(!foilOwnedCards.includes(i)){
            foilOwnedCards.push(i);
        }

    }else{

        foilOwnedCards =
        foilOwnedCards.filter(
            cardNumber => cardNumber !== i
        );

    }

   localStorage.setItem(
    `foilOwnedCards_${collectionConfig.id}`,
    JSON.stringify(foilOwnedCards)
);

    updateStats();

});

    card.addEventListener("click",()=>{

        card.classList.toggle("owned");

        
const pokeball =
card.querySelector(".owned-indicator img");

if(card.classList.contains("owned")){

    pokeball.classList.remove("pokeball-animate");

    void pokeball.offsetWidth;

    pokeball.classList.add("pokeball-animate");
}

        if(card.classList.contains("owned")){

            if(!ownedCards.includes(i)){
                ownedCards.push(i);
            }

        }else{

            ownedCards =
            ownedCards.filter(
                cardNumber => cardNumber !== i
            );
        }

      localStorage.setItem(
    `ownedCards_${collectionConfig.id}`,
    JSON.stringify(ownedCards)
);

        updateStats();
    });

    container.appendChild(card);
}

function toggleView(){

    const cards =
    document.getElementById("cards");

    const btn =
    document.getElementById("viewBtn");

    cards.classList.toggle("list-view");

    currentView =
    currentView === "grid"
    ? "list"
    : "grid";

    btn.innerHTML =
    currentView === "list"
    ? "🖼️"
    : "☰";
}

function updateStats(){

    const owned =
    document.querySelectorAll(
        ".card.owned"
    ).length;

    const percent =
    ((owned/totalCards)*100)
    .toFixed(1);

    document.getElementById(
        "progressText"
    ).innerHTML =
    `${owned}/${totalCards} cartas (${percent}%)`;

    document.getElementById(
        "progressFill"
    ).style.width =
    percent + "%";

    document.getElementById(
    "foilCount"
).innerHTML =
`⭐ Foils: ${foilOwnedCards.length}`;
}

function showAll(){

    document
    .querySelectorAll(".card")
    .forEach(card=>{
        card.classList.remove("hidden");
    });

}

function showOwned(){

    document
    .querySelectorAll(".card")
    .forEach(card=>{

        if(
            !card.classList.contains("owned")
        ){
            card.classList.add("hidden");
        }else{
            card.classList.remove("hidden");
        }

    });

}

function showMissing(){

    document
    .querySelectorAll(".card")
    .forEach(card=>{

        if(
            card.classList.contains("owned")
        ){
            card.classList.add("hidden");
        }else{
            card.classList.remove("hidden");
        }

    });

}

updateStats();