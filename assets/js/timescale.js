const timescaleYears = document.getElementsByClassName('timescale-year');
const timescaleAxis = document.getElementById('timescale-axis');
const issuesContainers = document.getElementsByClassName('issues-container');
const box = document.getElementsByClassName('box');

const STARTING_YEAR = 1962
const NUM_SMALL_LINES = 12;   // Small lines on the timescale


const drawTimescaleElements = () => {
    for (let i = 0; i < 2024-STARTING_YEAR; i++) {
        var timescaleYearChild = document.createElement('div');
        timescaleYearChild.className = 'timescale-year';

        var smallLine = document.createElement('div');
        smallLine.className = 'small-line';

        let numericYear = STARTING_YEAR;
        var pp = document.createElement('p');
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
    let gap = parseFloat(getComputedStyle(issuesContainers[0]).gap);
    let boxWidth = box[0].offsetWidth;
    let borderLeft = parseFloat(getComputedStyle(timescaleYears[0]).borderLeft);
    const NUM_ISSUES_PER_YEAR = 12;

    Array.from(timescaleYears).forEach((timescaleYear) => {
        timescaleYear.style.width = `${NUM_ISSUES_PER_YEAR*(gap + boxWidth)}px`;
    });
}

drawTimescaleElements();
updateTimeScaler(); // Call it once to init

document.addEventListener("wheel", updateTimeScaler);