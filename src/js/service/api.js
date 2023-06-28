let db;
let dadosArray = [];

const getImages = async () => {
    let response = await fetch("https://jsonplaceholder.typicode.com/photos");
    let json = await response.json();
    managerDB(json);
};

const startGetImages = async () => {
    //Criar o banco e fazer as implementações
    await getImages();
};

const managerDB = (links) => {
    var request = indexedDB.open("galeriadb", 1);

    request.onerror = function (event) {
        console.log(
            "Erro ao abrir o banco de dados: " + event.target.errorCode
        );
    };

    request.onsuccess = function (event) {
        db = event.target.result;
        deleteAllDatas(db, "imagens", links);
    };

    request.onupgradeneeded = function (event) {
        var dbup = event.target.result;

        // Criação da tabela 'imagens'
        if (!dbup.objectStoreNames.contains("imagens")) {
            var objectStore = dbup.createObjectStore("imagens", {
                keyPath: "id",
                autoIncrement: true,
            });
            objectStore.createIndex("linkIndex", "link", { unique: false });
        }
    };
};

const addRegister = function (registro, db) {
    return new Promise((resolve, reject) => {
        var transaction = db.transaction(["imagens"], "readwrite");
        var objectStore = transaction.objectStore("imagens");
        var value = { link: registro };
        var request = objectStore.add(value);
        request.onsuccess = function (event) {
            resolve(event.target.result);
        };
        request.onerror = function (event) {
            reject(event.target.error);
        };
    });
};

const deleteAllDatas = function (db, tabela, links) {
    var transaction = db.transaction([tabela], "readwrite");
    var objectStore = transaction.objectStore(tabela);

    var request = objectStore.clear();

    request.onsuccess = function (event) {
        var promissesArray = [];

        for (let i = 0; i < 9; i++) {
            var promise = addRegister(links[i].url, db);
            promissesArray.push(promise);
        }

        Promise.all(promissesArray)
            .then(() => {
                selectAll(db)
                    .then(function (dadosArray) {
                        showImage();
                    })
                    .catch(function (error) {
                        console.log(error); // Tratar erros
                    });
            })
            .catch((error) => {
                console.error(`Erro ao adicionar registros: ${error}`);
            });
    };

    request.onerror = function (event) {
        console.log(
            "Erro ao deletar os dados da tabela: " + event.target.errorCode
        );
    };
};

const selectAll = function (db) {
    return new Promise((resolve, reject) => {
        var transaction = db.transaction(["imagens"], "readonly");
        var objectStore = transaction.objectStore("imagens");

        var request = objectStore.openCursor();

        request.onsuccess = function (event) {
            var cursor = event.target.result;

            if (cursor) {
                var dados = cursor.value;
                // Faça algo com os dados
                dadosArray.push(dados);
                cursor.continue();
            } else {
                resolve(dadosArray);
            }
        };

        request.onerror = function (event) {
            reject([]);
        };
    });
};

const getDadosArray = () => {
    return dadosArray;
};

const showImage = () => {
    getDadosArray();
    let number = 1;
    for (let i = 0; i < dadosArray.length; i++) {
        document.getElementById(
            `card-${number}`
        ).style.background = `url("${dadosArray[i].link}") no-repeat center center`;
        document.getElementById(
            `card-${number}`
        ).style.backgroundSize = `cover`;
        number++;
    }
};
