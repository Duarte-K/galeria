window.onload = async () => {
    await startGetImages();
};

if ("serviceWorker" in navigator) {
    console.log("Service Worker is Supported");

    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("js/sw.min.js")
            .then((register) => console.log("Service worker registered"))
            .catch((error) => console.log("Error: " + error));
    });
} else {
    console.log("Service Worker is not Supported");
}
