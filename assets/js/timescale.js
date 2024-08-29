const timescaleYears = document.getElementsByClassName('timescale-year');
const timescaleAxis = document.getElementById('timescale-axis');
const issuesContainer = document.getElementsByClassName('issues-container');
const box = document.getElementsByClassName('box');

let timescaleAxisWidth = timescaleAxis.getBoundingClientRect().width;
const STARTING_YEAR = 1962
const NUM_SMALL_LINES = 10;   // Small lines on the timescale

const drawTimescaleElements = () => {
    for (let i = 0; i < 2024-STARTING_YEAR; i++) {
        var timescaleYearChild = document.createElement('div');
        timescaleYearChild.className = 'timescale-year';

        var smallLine = document.createElement('div');
        smallLine.className = 'small-line';

        let numericYear = STARTING_YEAR;
        var pp= document.createElement('p');
		pp.textContent = (numericYear+i).toString();
		timescaleYearChild.append( pp );
               
        for (let j = 0; j < NUM_SMALL_LINES; j++) {
			var smallLine = document.createElement('div');
			smallLine.className = 'small-line';
			smallLine.style.left = (j+1) * (100/NUM_SMALL_LINES) + "%";
			timescaleYearChild.append(smallLine);
		}

        timescaleAxis.appendChild(timescaleYearChild);
    }
}

const updateTimeScaler = () => {
    let gap = parseFloat(getComputedStyle(issuesContainer[0]).gap);
    let boxWidth = parseFloat(getComputedStyle(box[0]).width);

    Array.from(timescaleYears).forEach((timescaleYear) => {
        timescaleYear.style.width = `${gap + boxWidth }px`;
    });
}

drawTimescaleElements();
updateTimeScaler(); // Call it once to init

document.addEventListener("wheel", updateTimeScaler);