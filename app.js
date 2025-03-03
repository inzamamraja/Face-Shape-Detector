// Function to Convert WebP to PNG Before Processing
function convertWebPToPng(webpFile, callback) {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = URL.createObjectURL(webpFile);

    img.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob((blob) => {
            callback(blob);
        }, "image/png");
    };

    img.onerror = function () {
        console.error("Failed to load WebP image.");
    };
}

// Image Processing Function (Modify as needed)
function processImage(file) {
    if (!file) {
        console.error("No file selected!");
        return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function (event) {
        const imgElement = document.createElement("img");
        imgElement.src = event.target.result;
        imgElement.onload = function () {
            console.log("Image loaded successfully!");

            // TODO: Add additional image processing logic here
        };
    };

    reader.onerror = function () {
        console.error("Error loading file.");
    };
}

// Handle File Upload
document.getElementById("file-input").addEventListener("change", function (event) {
    const file = event.target.files[0];

    if (file && file.type === "image/webp") {
        convertWebPToPng(file, function (pngBlob) {
            processImage(pngBlob); // Convert WebP to PNG before processing
        });
    } else {
        processImage(file); // Process normally if not WebP
    }
});

// Background Sync Setup
if ("serviceWorker" in navigator && "SyncManager" in window) {
    navigator.serviceWorker.ready.then(registration => {
        return registration.sync.register("sync-data");
    }).catch(err => console.error("Background sync failed:", err));
}

console.log("App.js loaded successfully!");
