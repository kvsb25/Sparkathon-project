function load_quagga() {
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
            document.querySelector('#result').textContent = data.codeResult.code;
            Quagga.stop();
        });
    }
}

/******** Event Handlers ********/

window.onload = async (event) => {
    console.log("page is fully loaded");
    // await setupMedia();
    // initUPCAScanner();
};