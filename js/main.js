var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const url = "https://monaelshikh.github.io/Time-tracking-dashboard/data/data.json";
let trackContainer = document.querySelector(".time-track");
let tracksPeriods = document.querySelectorAll(".dashboard > ul >li >a");
const imgsSrc = [
    { Work: "images/icon-work.svg" },
    { Play: "images/icon-play.svg" },
    { Study: "images/icon-study.svg" },
    { Exercise: "images/icon-exercise.svg" },
    { Social: "images/icon-social.svg" },
    { SelfCare: "images/icon-self-care.svg" }
];
function getData() {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield fetch(url);
        let data = yield result.json();
        createTimeTracks(data);
        filterTimeTracks(data, tracksPeriods);
    });
}
function createTimeTracks(tracks) {
    tracks.forEach((track, index) => {
        let trackBoxDiv = document.createElement("div");
        trackBoxDiv.className = "track-box";
        let coloredHeadDiv = document.createElement("div");
        coloredHeadDiv.className = "track-header";
        coloredHeadDiv.classList.add(`${track.title.replace(" ", "").toLowerCase()}-color`);
        let trackImg = document.createElement("img");
        trackImg.src = imgsSrc[index][track.title.replace(" ", "")];
        trackImg.alt = track.title;
        coloredHeadDiv.appendChild(trackImg);
        trackBoxDiv.appendChild(coloredHeadDiv);
        let trackContentDiv = document.createElement("div");
        trackContentDiv.className = "track-content";
        let trackTitleDiv = document.createElement("div");
        trackTitleDiv.className = "track-title";
        let titleDiv = document.createElement("h2");
        titleDiv.innerHTML = track.title;
        trackTitleDiv.appendChild(titleDiv);
        let prevImg = document.createElement("img");
        prevImg.src = "images/icon-ellipsis.svg";
        prevImg.alt = "icon-ellipsis";
        trackTitleDiv.appendChild(prevImg);
        trackContentDiv.appendChild(trackTitleDiv);
        let trackInfoDiv = document.createElement("div");
        trackInfoDiv.className = "track-info";
        let currentDiv = document.createElement("div");
        currentDiv.className = "current";
        let hrsDiv = document.createElement("h3");
        hrsDiv.innerHTML = `${track.timeframes.weekly.current}hr(s)`;
        currentDiv.appendChild(hrsDiv);
        trackInfoDiv.appendChild(currentDiv);
        let previousDiv = document.createElement("div");
        previousDiv.className = "previous";
        let prevTxt = document.createElement("p");
        prevTxt.innerHTML = `Last Week - ${track.timeframes.weekly.previous}hr(s)`;
        previousDiv.appendChild(prevTxt);
        trackInfoDiv.appendChild(previousDiv);
        trackContentDiv.appendChild(trackInfoDiv);
        trackBoxDiv.appendChild(trackContentDiv);
        trackContainer.appendChild(trackBoxDiv);
    });
}
function filterTimeTracks(tracks, periods) {
    let currentPeriod;
    let currents = document.querySelectorAll(".current > h3");
    let previous = document.querySelectorAll(".previous > p");
    periods.forEach((period) => {
        period.addEventListener("click", () => {
            period.parentElement.parentElement.querySelectorAll("li> a").forEach((item) => item.classList.remove("active"));
            period.classList.add("active");
            period.innerHTML === "Daily"
                ? currentPeriod = "Yesterday"
                : period.innerHTML === "Weekly"
                    ? currentPeriod = "Last Week" :
                    currentPeriod = "Last Month";
            tracks.forEach((track, index) => {
                currents[index].innerHTML = `${track.timeframes[period.innerHTML.toLowerCase()].current}hr(s)`;
                previous[index].innerHTML = `${currentPeriod} - ${track.timeframes[period.innerHTML.toLowerCase()].previous}hr(s)`;
            });
        });
    });
}
getData();
export {};
