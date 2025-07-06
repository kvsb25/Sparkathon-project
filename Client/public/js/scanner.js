const scannerContainer = document.getElementById('scannerContainer');
const scanBtn = document.querySelector("#scanBtn");
const stopBtn = document.querySelector("#stopBtn");
if(scanBtn.innerHTML == "Scan"){
    scanBtn.onclick = function(){load_quagga(); toggleScanBtn()};
}

function load_quagga() {
    scannerContainer.style.display = "inline";
    // toggleScanBtn();


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
    const scanBtn = document.querySelector("#scanBtn");
    if(scanBtn.textContent == "Scan"){
        scanBtn.textContent = "Stop scan";
        scanBtn.removeEventListener('click', load_quagga);
        scanBtn.addEventListener('click', closeScanner);
    } else {
        scanBtn.textContent = "Scan";
        scanBtn.removeEventListener('click', closeScanner);
        scanBtn.addEventListener('click', load_quagga);
    }
}

/******** Event Handlers ********/

window.onload = async (event) => {
    console.log("page is fully loaded");
};