// var link= inputValue;

function move() {

    var inputValue = document.getElementById("input").value;

    window.location = "D:/Work/AOT/el-medan/medan/backend/docs/global.html#" + inputValue;
    // var location = window.location;
    // location.href = "global.html#" + inputValue;
    document.query_form.setAttribute("action", inputValue);
};

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}