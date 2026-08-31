const images = ["fox1", "fox2", "fox3", "fox4"];
const imgElem = document.querySelector("img");

function randomValueFromArray(array) {
  const randomNo = Math.floor(Math.random() * array.length);
  return array[randomNo];
}

setInterval(() => {
  const randomChoice = randomValueFromArray(images);
  imgElem.src = `images/${randomChoice}.jpg`;
}, 2000);

// Register service worker to control making site work offline

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/pwa-examples/a2hs/sw.js").then(() => {
    console.log("Service Worker Registered");
  });
}

// Code to handle install prompt on desktop

let deferredPrompt;
const addBtn = document.querySelector(".add-button");

window.addEventListener("beforeinstallprompt", (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  addBtn.style.display = "block";

  addBtn.addEventListener("click", () => {
    // hide our user interface that shows our A2HS button
    addBtn.style.display = "none";
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the A2HS prompt");
      } else {
        console.log("User dismissed the A2HS prompt");
      }
      deferredPrompt = null;
    });
  });
});

// install test

const installBtn = document.querySelector("#install-test");

installBtn.addEventListener("click", () => {
  console.log("test");
  navigator
    .install({
      manifest:
        "https://chrisdavidmills.github.io/pwa-examples/a2hs/manifest.webmanifest",
    })
    .then((result) => console.log(result))
    .catch((e) => console.log(e));
  // fulfils with empty object on success
  // rejects with AbortError if cancel button pressed
});

// <install> interface test

const installElem = document.querySelector("install");
console.log(installElem);
console.log(installElem.manifestId);
console.log(installElem.manifest);

installElem.addEventListener("installresult", (e) => {
  console.log(`installresult: ${e.result}`);
  // success/aborted
});

// Not fired
// installElem.addEventListener("promptaction", () => {
//   console.log("promptaction fired");
// });

// installElem.addEventListener("promptdismiss", () => {
//   console.log("promptdismiss fired");
// });
