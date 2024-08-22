const timescaleYears = document.getElementsByClassName('timescale-year');
const timescaleAxis = document.getElementById('timescale-axis');
const issuesContainer = document.getElementsByClassName('issues-container');
const box = document.getElementsByClassName('box');

let yearWidth = timescaleYears[0].getBoundingClientRect().width;
let timescaleAxisWidth = timescaleAxis.getBoundingClientRect().width;
const STARTING_YEAR = 1962

const updateTimeScaler = () => {
    let gap = parseFloat(getComputedStyle(issuesContainer[0]).gap);
    let boxWidth = parseFloat(getComputedStyle(box[0]).width);

    Array.from(timescaleYears).forEach((timescaleYear) => {
        timescaleYear.style.padding = `0 ${gap + boxWidth - yearWidth}px 0 0px`;
    });
}

const drawTimescaleYears = () => {
    for (let i = 0; i < 2024-STARTING_YEAR; i++) {
        var timescaleYearChild = document.createElement('div');
        timescaleYearChild.className = 'timescale-year';
        let numericYear = STARTING_YEAR+1;

        timescaleYearChild.textContent = (numericYear+i).toString();
        timescaleAxis.appendChild(timescaleYearChild);
    }
}

drawTimescaleYears();
updateTimeScaler(); // Call it once to init

document.addEventListener("wheel", updateTimeScaler);