
//#region  Declaration
// const url = "../data/data.json";
const url = "https://monaelshikh.github.io/Time-tracking-dashboard/data/data.json";

let trackContainer = document.querySelector(".time-track");
let tracksPeriods = document.querySelectorAll(".dashboard > ul >li >a");
const imgsSrc = [
    { Work: "images/icon-work.svg" },
    { Play: "images/icon-play.svg" },
    { Study: "images/icon-study.svg" },
    { Exercise: "images/icon-exercise.svg" },
    { Social: "images/icon-social.svg" },
    { SelfCare: "images/icon-self-care.svg" }];
//#endregion

//#region  Functions
// function to get data from json file
async function getData() {
    let result = await fetch(url);
    let data = await result.json();

    createTimeTracks(data);
    filterTimeTracks(data, tracksPeriods);
}
// function to create time tracks boxes
function createTimeTracks(tracks) {
    tracks.forEach((track, index) => {
        // create trackBox div
        let trackBoxDiv = document.createElement("div");
        trackBoxDiv.className = "track-box";

        // create colored header and image
        let coloredHeadDiv = document.createElement("div");
        coloredHeadDiv.className = "track-header";
        coloredHeadDiv.classList.add(`${track.title.replace(" ", "").toLowerCase()}-color`);
        let trackImg = document.createElement("img");
        trackImg.src = imgsSrc[index][track.title.replace(" ", "")];
        trackImg.alt = track.title;

        // add trackImg to colored head
        coloredHeadDiv.appendChild(trackImg);
        // adding colored header to trackbox
        trackBoxDiv.appendChild(coloredHeadDiv);

        // create trackContnent div
        let trackContentDiv = document.createElement("div");
        trackContentDiv.className = "track-content";

        // create track title div
        let trackTitleDiv = document.createElement("div");
        trackTitleDiv.className = "track-title";
        let titleDiv = document.createElement("h2");
        titleDiv.innerHTML = track.title;
        trackTitleDiv.appendChild(titleDiv);
        let prevImg = document.createElement("img");
        prevImg.src = "images/icon-ellipsis.svg";
        prevImg.alt = "icon-ellipsis";
        trackTitleDiv.appendChild(prevImg);
        // add track title to trackContent div
        trackContentDiv.appendChild(trackTitleDiv);

        // create trackInfo div
        let trackInfoDiv = document.createElement("div");
        trackInfoDiv.className = "track-info";

        //#region  current div
        let currentDiv = document.createElement("div");
        currentDiv.className = "current";
        let hrsDiv = document.createElement("h3");
        hrsDiv.innerHTML = `${track.timeframes.weekly.current}hr(s)`;
        currentDiv.appendChild(hrsDiv);
        trackInfoDiv.appendChild(currentDiv);
        //#endregion

        //#region  previous div
        let previousDiv = document.createElement("div");
        previousDiv.className = "previous";
        let prevTxt = document.createElement("p");
        prevTxt.innerHTML = `Last Week - ${track.timeframes.weekly.previous}hr(s)`;
        previousDiv.appendChild(prevTxt);
        trackInfoDiv.appendChild(previousDiv);
        //#endregion
        // add track info to trackContnent
        trackContentDiv.appendChild(trackInfoDiv);

        // appedn track info div to track box div
        trackBoxDiv.appendChild(trackContentDiv);
        // adding trackbox div to track container div
        trackContainer.appendChild(trackBoxDiv);
    });

}
// function to filetr tracks according to period clicked by user.
function filterTimeTracks(tracks, periods) {
    let currentPeriod; //clicked link value
    let currents = document.querySelectorAll(".current > h3");
    let previous = document.querySelectorAll(".previous > p");
    periods.forEach((period) => {
        period.addEventListener("click", () => {
            // clrear active style from all periods links
            period.parentElement.parentElement.querySelectorAll("li> a").forEach((item) => item.classList.remove("active"));
            // set current link to active
            period.classList.add("active");
            // set previous text according to period link clicked.
            period.innerHTML === "Daily"
                ? currentPeriod = "Day"
                : period.innerHTML === "Weekly"
                    ? currentPeriod = "Week" :
                    currentPeriod = "Month";
            // set currents and previous values from json data.
            tracks.forEach((track, index) => {
                currents[index].innerHTML = `${track.timeframes[period.innerHTML.toLowerCase()].current}hr(s)`;
                previous[index].innerHTML = ` Last ${currentPeriod} - ${track.timeframes[period.innerHTML.toLowerCase()].previous}hr(s)`;
            });
        });
    });
}
//#endregion

//#region  Calls
getData();
//#endregion