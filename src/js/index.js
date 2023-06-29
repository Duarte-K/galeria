// Registra o service worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("sw.min.js")
            .then((registration) => {
                console.log(
                    "Service Worker registrado com sucesso: " + registration
                );
            })
            .catch((error) => {
                console.log("Erro ao registrar Service Worker" + error);
            });
    });
}

window.onload = async () => {
    await startGetImages();
};
