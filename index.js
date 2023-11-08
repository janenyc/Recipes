const apiBaseURL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-fsa-et-web-ft-sf`;
const main = document.querySelector("main");
const state = {
    allArtists: [],
    details: [],
};

const getArtistDetails = async (id) =>{
    const response = await fetch(`${apiBaseURL}/artists/${id}`);
    const responseJson = await response.json()
    const artistDetails = responseJson.data
    renderDetails(artistDetails)

}

renderDetails = (detailOfArtists) =>{

    const html = `<h2>${detailOfArtists.name}</h2>
    <img src="${detailOfArtists.imageUrl}" alt="image of an artist">
    <p>${detailOfArtists.description}</p>
    
    <button id="back-button">Go back to all artists</button>`
    main.innerHTML = html;
    const backButton = document.querySelector('#back-button')
    backButton.addEventListener('click', ()=>{
        getAllArtists()
    })
}

//Fetch data from API to display all artists
const getAllArtists = async () => {
    main.innerHTML = '';
    const response = await fetch(`${apiBaseURL}/artists`);
    const responseJson = await response.json();
    state.allArtists = responseJson.data;

    renderAllArtists();
};



//Display all artists on the page
const renderAllArtists = () => {
    main.innerHTML = '';
    const section = document.createElement("section")

    section.innerHTML = state.allArtists.map((singleArtist) => `<div id="${singleArtist.id}"><img src="${singleArtist.imageUrl}" alt="image of an artist"><p>${singleArtist.name}</p></div>`).join('');

    main.appendChild(section);

//Create event target for each artist
    const artistCards = document.querySelectorAll("div");
    artistCards.forEach((artistCardItem) => {
        artistCardItem.addEventListener("click", (event) => {

            getArtistDetails(event.target.id || event.target.parentNode.id);
        });
    });
};
getAllArtists();