const bgContainer = document.getElementById('bg-container');
const contentContainer = document.getElementById('content-container');
const boxes = document.getElementsByClassName('box');
const labels = document.getElementsByClassName('label');

let offset = 0;
let isDragging = false;
let offsetX = 0, offsetY = 0;

function onMouseDown(e) {
    // offset += 2;
    // bgContainer.style.backgroundPosition = `${offset}px ${offset}px`;
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;    

    cstartX = e.clientX;
    cstartY = e.clientY; 

    bginitialLeft = bgContainer.offsetLeft;    
    bginitialTop = bgContainer.offsetTop;
    cinitialLeft = contentContainer.offsetLeft;    
    cinitialTop = contentContainer.offsetTop;

    bgContainer.style.cursor = 'grabbing';
    // console.log(`${initialTop}, ${initialLeft}`);
}

bgContainer.addEventListener('mousedown', onMouseDown);
contentContainer.addEventListener('mousedown', onMouseDown);

document.addEventListener('mouseup', () => {
    isDragging = false;
    bgContainer.style.cursor = 'grab';
});

// Mouse clicking and dragging
document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    let dx = e.clientX - startX;
    let dy = e.clientY - startY;

    offsetX += dx;
    offsetY += dy;    

    startX = e.clientX;
    startY = e.clientY;
    
    // Update positions
    bgContainer.style.backgroundPosition = `${offsetX}px ${offsetY}px`;
    contentContainer.style.left = `${cinitialLeft + e.clientX - cstartX}px`;
    contentContainer.style.top = `${cinitialTop + e.clientY - cstartY}px`;        
});

// Configuration
const MIN_WIDTH = 40; // Minimum width in pixels
const MIN_GAP = 10;
const MULTIPLIER = 10; // Change amount per scroll step

// Add wheel event listener
document.addEventListener("wheel", (e) => {
    const wheelOffset = Math.sign(e.deltaY); // Determine scroll direction (-1 or 1)

    Array.from(boxes).forEach((box) => {
        // Retrieve current width from dataset or default to computed width
        let currentWidth = parseFloat(box.dataset.width) || box.offsetWidth;

        // Adjust the width based on scroll direction
        currentWidth -= wheelOffset * MULTIPLIER;

        // Clamp the width to avoid going below the minimum value
        currentWidth = Math.max(MIN_WIDTH, currentWidth);

        // Save the new width to the dataset for future calculations
        box.dataset.width = currentWidth;

        // Apply the new width with a smooth transition
        box.style.width = `${currentWidth}px`;
    });

    Array.from(issuesContainers).forEach((issueContainer) => {
        let currentGap = parseFloat(issueContainer.dataset.gap) || parseFloat(window.getComputedStyle(issuesContainers[0]).gap);
        currentGap -= wheelOffset * GAP_MULTIPLIER;
        currentGap = Math.max(MIN_GAP, currentGap);
        issueContainer.dataset.gap = currentGap;
        issueContainer.style.gap = `${currentGap}px`;
    });
});


function getRandomColor() {
    let r = Math.floor(Math.random() * 128 + 128); // Range 128-255
    let g = Math.floor(Math.random() * 128 + 128); // Range 128-255
    let b = Math.floor(Math.random() * 128 + 128); // Range 128-255

    let hex = "#" +
        ("0" + r.toString(16)).slice(-2) +
        ("0" + g.toString(16)).slice(-2) +
        ("0" + b.toString(16)).slice(-2);

    return hex;
}

const colorWriter = () => {    
    window.onload = () => {
        let prevWriter = '';
        let color;

        Array.from(labels).forEach((label) => {
            if (label.textContent != prevWriter) {
                // console.log(label.textContent);
                color = getRandomColor();
                prevWriter = label.textContent;
            }            
            label.style.backgroundColor = color;
        })
    }
}

colorWriter();