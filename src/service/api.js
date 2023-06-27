
let getImages = async() => {
    let response = await fetch("https://jsonplaceholder.typicode.com/photos")
    let json = await response.json();
    showImage(json)
    console.log(json)
}

let startGetImages = async () => {
    await getImages();
}


const showImage = (result) => {
    startGetImages();
    for(const image in result){
        console.log(image)
    }
}