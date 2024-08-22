const timescaleYears = document.getElementsByClassName('timescale-year');
const issuesContainer = document.getElementsByClassName('issues-container');
const box = document.getElementsByClassName('box');
let yearWidth = timescaleYears[0].getBoundingClientRect().width;

const updateTimeScaler = () => {
    let gap = parseFloat(getComputedStyle(issuesContainer[0]).gap);
    let boxWidth = parseFloat(getComputedStyle(box[0]).width);

    Array.from(timescaleYears).forEach((timescaleYear) => {
        timescaleYear.style.padding = `0 ${gap + boxWidth - yearWidth}px 0 0px`;
    });
}

updateTimeScaler(); // Call it once to init

document.addEventListener("wheel", updateTimeScaler);