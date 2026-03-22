planstatus = localStorage.getItem('user_plan');

if (planstatus === "pro") {
    document.getElementById("myPopup").style.display = "none";
} else {
    // Megjelenítés pl. 5 másodperc után
    setTimeout(function () {
        document.getElementById("myPopup").style.display = "block";
    }, 5000);

    // Bezárás funkció
    function closePopup() {
        document.getElementById("myPopup").style.display = "none";
    }
}


