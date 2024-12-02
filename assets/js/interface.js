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

// const updatePosition = (e, scale) => {
//     // contentContainer.style.left = `${contentContainer.offsetLeft + e.clientX*scale}px`;
//     console.log(contentContainer.offsetLeft + e.clientX*scale)
//     contentContainer.style.top = `${contentContainer.offsetTop + e.clientY*scale}px`;
// }

// Configuration
const MIN_WIDTH = 40; // Minimum width in pixels
const MAX_WIDTH = 300; // Maximum width in pixels
const SCROLL_SPEED = 0.1; // Change amount per scroll step


// Add wheel event listener
document.addEventListener("wheel", (e) => {
    const wheelOffset = Math.sign(e.deltaY); // Determine scroll direction (-1 or 1)

    // Calculate the scale factor based on scroll direction
    let scale = 1;
    if (wheelOffset < 0) {
        scale += SCROLL_SPEED;
    } else if (wheelOffset > 0) {
        scale -= SCROLL_SPEED;
    }

    // Retrieve current width and compute the new width
    let currentWidth = parseFloat(boxes[0].dataset.width) || boxes[0].offsetWidth;
    let newWidth = currentWidth * scale;

    // Clamp the width to avoid exceeding minimum and maximum bounds
    newWidth = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, newWidth));

    // Save the new width to the dataset for future calculations
    boxes[0].dataset.width = newWidth;    

    // Update each box's width
    Array.from(boxes).forEach((box) => {
        box.style.width = `${newWidth}px`;
    });

    // Adjust gaps for issuesContainers proportionally
    Array.from(issuesContainers).forEach((issueContainer) => {
        issueContainer.style.gap = `${newWidth / 5}px`;
    });

    // Calculate scale factor
    const scaleFactor = newWidth / currentWidth;

    // Get the mouse position relative to the viewport
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Get the current position of the content container relative to the viewport
    const rect = contentContainer.getBoundingClientRect();

    // Calculate how much the contentContainer needs to move to center the zoom
    const cdx = (mouseX - rect.left) * (1 - scaleFactor);
    const cdy = (mouseY - rect.top) * (1 - scaleFactor);

    // Translate the contentContainer
    contentContainer.style.left = `${parseFloat(contentContainer.style.left || 0) + cdx}px`;
    contentContainer.style.top = `${parseFloat(contentContainer.style.top || 0) + cdy}px`;
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