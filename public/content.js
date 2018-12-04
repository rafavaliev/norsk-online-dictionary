
chrome.runtime.onMessage.addListener(function (request) {
    if (request.type === 'getHeadlines') {
        console.log("Show headlines")
        document.body.innerHTML += `<dialog style="height:40%">
           <iframe id="headlineFetcher"style="height:100%"></iframe>
           <div style="position:absolute; top:0px; left:5px;">  
             <button>x</button>
           </div>
           </dialog>`;
        const dialog = document.querySelector("dialog");
        dialog.showModal();
        dialog.querySelector("button").addEventListener("click", function () {
            dialog.close();
        });
    }
});