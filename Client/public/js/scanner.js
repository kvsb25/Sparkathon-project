const scannerContainer = document.getElementById('scannerContainer');
const btn = document.querySelector("#scanBtn");

function scanInit(){
    toggleScanBtn();
    load_quagga();
}

function load_quagga() {
    scannerContainer.style.display = "inline";


    if (document.querySelector('#camera') && navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {
        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: document.querySelector('#camera')
            },
            decoder: {
                readers: ["upc_reader"] // for UPC_A barcodes
            }
        }, function (err) {
            if (err) {
                console.error(err);
                return;
            }
            Quagga.start();
        });

        Quagga.onDetected(function (data) {
            // document.querySelector('#result').textContent = data.codeResult.code;
            closeScanner();
            console.log(data);
        });
    }
}


function closeScanner() {
    Quagga.stop();
    scannerContainer.style.display = "none";
    toggleScanBtn();
}

function toggleScanBtn(){
    const btn = document.querySelector("#scanBtn");
    if(btn.textContent == "Scan"){
        btn.textContent = "Stop scan";
        btn.onclick = closeScanner;
    } else {
        btn.textContent = "Scan";
        btn.onclick = scanInit;
    }
    console.log(btn.onclick);
}

/******** Event Handlers ********/

window.onload = async (event) => {
    console.log("page is fully loaded");
};