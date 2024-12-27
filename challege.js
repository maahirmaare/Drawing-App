document.addEventListener("DOMContentLoaded", function() {
    // Canvas setup
    const canvas = document.getElementById("drawingCanvas");
    const ctx = canvas.getContext("2d");
    let painting = false;
    let eraseMode = false;

    // Tools and Settings
    const colorPicker = document.getElementById("colorPicker");
    const sizeSlider = document.getElementById("sizeSlider");
    const sizePreview = document.getElementById("sizePreview");
    const eraseButton = document.getElementById("erase");
    const resetButton = document.getElementById("reset");
    const saveButton = document.getElementById("save");

    // Set initial brush settings
    ctx.lineWidth = sizeSlider.value;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = colorPicker.value;

    // Start and Stop Painting
    canvas.addEventListener("mousedown", (e) => {
        painting = true;
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
    });
    canvas.addEventListener("mouseup", () => (painting = false));
    canvas.addEventListener("mouseleave", () => (painting = false));

    // Draw
    canvas.addEventListener("mousemove", (e) => {
        if (!painting) return;
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.strokeStyle = eraseMode ? "#ffffff" : colorPicker.value;
        ctx.lineWidth = sizeSlider.value;
        ctx.stroke();
    });

    // Color Picker Change
    colorPicker.addEventListener("input", () => {
        ctx.strokeStyle = colorPicker.value;
        sizePreview.style.backgroundColor = colorPicker.value;
    });

    // Brush Size Change
    sizeSlider.addEventListener("input", () => {
        ctx.lineWidth = sizeSlider.value;
        sizePreview.style.width = `${sizeSlider.value}px`;
        sizePreview.style.height = `${sizeSlider.value}px`;
    });

    // Erase Toggle
    eraseButton.addEventListener("click", () => {
        eraseMode = !eraseMode;
        eraseButton.style.backgroundColor = eraseMode ? "#ff0000" : "#0066cc";
    });

    // Reset Canvas
    resetButton.addEventListener("click", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    // Save Canvas as Image
    saveButton.addEventListener("click", () => {
        const dataURL = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "Somali_Drawing.png";
        link.click();
    });
});
