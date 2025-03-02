
let eksempel1 = document.querySelector("#myCallbackButton1")

eksempel1.addEventListener("click", function () {
    alert("Dette er eksempel 1 Callback");

});


function leggSammen(a, b) {
    return a + b;
}

console.log(leggSammen(5, 10)); // 15



