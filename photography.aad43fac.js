const photos = Array.from(document.querySelectorAll(".photo-grid img"));
const gallery = document.querySelector("#gallery");
const imgCurrent = document.querySelector("#imgCurrent");
const imgPrevious = document.querySelector("#imgPrevious");
const imgContainerCurrent = document.querySelector("#imgContainerCurrent");
const imgContainerPrevious = document.querySelector("#imgContainerPrevious");
const arrowRight = document.querySelector("#arrowRight");
const arrowLeft = document.querySelector("#arrowLeft");
const skrim = document.querySelector("#skrim");
const { pageURL , imageIndex  } = parsePageURL();
const state = {
    imageIndex
};
for(let i = 0; i < photos.length; i++){
    const photo = photos[i];
    photo.addEventListener("click", ()=>{
        control.open(i);
    });
}
document.addEventListener("keydown", (e)=>{
    // Listeners are only for when the gallery is open
    if (state.imageIndex === null) return;
    switch(e.key){
        case "ArrowLeft":
            control.prev();
            break;
        case "ArrowRight":
            control.next();
            break;
        case "ArrowUp":
        case "ArrowDown":
        case "Escape":
            control.close();
            break;
    }
});
arrowRight.addEventListener("click", ()=>control.next());
arrowLeft.addEventListener("click", ()=>control.prev());
gallery.addEventListener("click", (e)=>{
    if (e.target instanceof HTMLButtonElement) return;
    if (arrowLeft.contains(e.target)) return;
    if (arrowRight.contains(e.target)) return;
    control.close();
});
// TODO Popstate event listener
const control = {
    open: (index)=>{
        if (inRange(index)) {
            state.imageIndex = index;
            transition("up", null, photos[index].src);
            writeURL(index);
        }
    },
    close: ()=>{
        const from = state.imageIndex === null ? null : photos[state.imageIndex].src;
        state.imageIndex = null;
        if (from) transition("down", from, null);
        writeURL(null);
    },
    next: ()=>{
        const from = state.imageIndex === null ? null : photos[state.imageIndex].src;
        let to = null;
        if (state.imageIndex !== null) {
            state.imageIndex++;
            if (inRange(state.imageIndex)) to = photos[state.imageIndex].src;
            else state.imageIndex = null;
        }
        transition("left", from, to);
        writeURL(state.imageIndex);
    },
    prev: ()=>{
        const from = state.imageIndex === null ? null : photos[state.imageIndex].src;
        let to = null;
        if (state.imageIndex !== null) {
            state.imageIndex--;
            if (inRange(state.imageIndex)) to = photos[state.imageIndex].src;
            else state.imageIndex = null;
        }
        transition("right", from, to);
        writeURL(state.imageIndex);
    }
};
let cleanupTransition = ()=>{};
// gallery renderer
function transition(type, from, to) {
    // ensure the previous transition was cleaned up
    cleanupTransition();
    if (to) {
        gallery.classList.remove("hidden");
        imgCurrent.src = to;
        imgContainerCurrent.classList.add("start-out");
        switch(type){
            case "up":
                imgContainerCurrent.classList.add("start-down");
                break;
            case "down":
                imgContainerCurrent.classList.add("start-up");
                break;
            case "left":
                imgContainerCurrent.classList.add("start-right");
                break;
            case "right":
                imgContainerCurrent.classList.add("start-left");
                break;
        }
    } else imgCurrent.src = "";
    if (from) {
        imgContainerPrevious.classList.remove("hidden");
        imgContainerPrevious.classList.add("start-in");
        imgPrevious.src = from;
    } else imgPrevious.src = "";
    requestAnimationFrame(()=>{
        if (to) imgContainerCurrent.classList.add("transition-in-center");
        if (from) switch(type){
            case "up":
                imgContainerPrevious.classList.add("transition-out-up");
                break;
            case "down":
                imgContainerPrevious.classList.add("transition-out-down");
                break;
            case "left":
                imgContainerPrevious.classList.add("transition-out-left");
                break;
            case "right":
                imgContainerPrevious.classList.add("transition-out-right");
                break;
        }
    });
    const listeningEl = from ? imgContainerPrevious : imgContainerCurrent;
    cleanupTransition = ()=>{
        listeningEl.removeEventListener("transitionend", cleanupTransition);
        cleanupTransition = ()=>{};
        removeAnimationClasses(imgContainerCurrent);
        removeAnimationClasses(imgContainerPrevious);
        imgContainerPrevious.classList.add("hidden");
        if (!to) gallery.classList.add("hidden");
    };
    listeningEl.addEventListener("transitionend", cleanupTransition);
}
function removeAnimationClasses(el) {
    el.classList.remove("transition-out-up", "transition-out-down", "transition-out-left", "transition-out-right", "transition-in-center", "start-left", "start-right", "start-up", "start-down", "start-out", "start-in");
}
window.addEventListener("load", ()=>{
    if (state.imageIndex !== null) control.open(state.imageIndex);
});
function parsePageURL() {
    const url = `${window.location.origin}${window.location.pathname}`;
    const hash = window.location.hash;
    let imageIndex = null;
    if (hash) {
        const num = parseInt(hash.replace("#", ""), 10);
        if (inRange(num - 1)) imageIndex = num - 1;
    }
    return {
        pageURL: url,
        imageIndex
    };
}
function writeURL(index) {
    let nextPageURL = pageURL;
    if (index !== null && inRange(index)) nextPageURL += `#${index + 1}`;
    window.history.pushState(null, "", nextPageURL);
}
function inRange(index) {
    return !Number.isNaN(index) && index >= 0 && index < photos.length;
}

//# sourceMappingURL=photography.aad43fac.js.map
