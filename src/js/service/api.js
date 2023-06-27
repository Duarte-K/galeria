const getImages = async () => {
    let response = await fetch("https://jsonplaceholder.typicode.com/photos");
    let json = await response.json();
    showImage(json);
};

const startGetImages = async () => {
    await getImages();
};

const showImage = (result) => {
    for (let i = 0; i < 9; i++) {
        console.log(result[i]);
    }
};
