
//#region  Declaration
const url = "../data/data.json";
const imgsSrc = [
    { Work: "../images/icon-work.svg" },
    { Play: "../images/icon-play.svg" },
    { Study: "../images/icon-study.svg" },
    { Exercise: "../images/icon-Exercise.svg" },
    { Social: "../images/icon-Social.svg" },
    { SelfCare: "../images/icon-self-care.svg" }]
let trackContainer = document.querySelector(".time-track");
console.log(trackContainer);
//#endregion

//#region  Functions
// function to get data from json file
async function getData() {
    let result = await fetch(url);
    let data = await result.json();
    createTimeTrackingBoxes(data);
    console.log(data);
}

// function to create tracking
function createTimeTrackingBoxes(tracks) {
    tracks.forEach((track, index) => {
        // console.log(imgsSrc[index][track.title]);
        // create trackBox div
        let trackBoxDiv = document.createElement("div");
        trackBoxDiv.className = "track-box";

        // create colored header and image
        let coloredHeadDiv = document.createElement("div");
        coloredHeadDiv.className = "colored-head ";
        coloredHeadDiv.classList.add(`${track.title.replace(" ", "").toLowerCase()}-color`);
        let trackImg = document.createElement("img");
        trackImg.src = imgsSrc[index][track.title.replace(" ", "")];
        trackImg.alt = track.title;

        // add trackImg to colored head
        coloredHeadDiv.appendChild(trackImg);

        // adding colored header to trackbox
        trackBoxDiv.appendChild(coloredHeadDiv);

        // create trackInfo div
        let trackInfoDiv = document.createElement("div");
        trackInfoDiv.className = "track-info";

        //#region  current div
        let currentDiv = document.createElement("div");
        currentDiv.className = "current";

        let titleDiv = document.createElement("h2");
        titleDiv.innerHTML = track.title;
        currentDiv.appendChild(titleDiv);

        let hrsDiv = document.createElement("h3");
        hrsDiv.innerHTML = "23hrs";
        currentDiv.appendChild(hrsDiv);

        trackInfoDiv.appendChild(currentDiv);
        //#endregion

        //#region  previous div
        let previousDiv = document.createElement("div");
        previousDiv.className = "previous";

        let prevImg = document.createElement("img");
        prevImg.src = "../images/icon-ellipsis.svg";
        prevImg.alt = "icon-ellipsis";
        previousDiv.appendChild(prevImg);

        let prevTxt = document.createElement("p");
        prevTxt.innerHTML = "Last 20hrs";
        previousDiv.appendChild(prevTxt);

        trackInfoDiv.appendChild(previousDiv);
        //#endregion

        // appedn track info div to track box div
        trackBoxDiv.appendChild(trackInfoDiv);
        // adding trackbox div to track container div
        trackContainer.appendChild(trackBoxDiv);

    });
}
//#endregion

//#region  Calls
getData();
//#endregion