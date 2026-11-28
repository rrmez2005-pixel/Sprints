document.getElementById("jobform").onsubmit = () => {
    let isValid = true;

    clearErrors();

    let title = document.getElementById("jobtitle").value.trim();
    let company = document.getElementById("company").value;
    let trade = document.getElementById("trade").value;
    let appLink = document.getElementById("applink").value;
    let location = document.getElementById("location").value.trim();
    let dateExpires = document.getElementById("dateexpires").value;

    const today = new Date().toLocaleDateString("en-CA");
    const urlRegex = /^https?:\/\/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}(?::\d{2,5})?(?:[/?#]\S*)?$/i;

    if(title === ""){
        document.getElementById("err-title").style.display = "block";
        isValid = false;
    }

    if(company === ""){
        document.getElementById("err-company").style.display = "block";
        isValid = false;
    }

    if(trade === "none"){
        document.getElementById("err-trade").style.display = "block";
        isValid = false;
    }

    if(!urlRegex.test(appLink) && appLink !== ""){
        document.getElementById("err-link").style.display = "block";
        isValid = false;
    }

    if(appLink === ""){
        document.getElementById("err-link").style.display = "block";
        isValid = false;
    }

    if(location === ""){
        document.getElementById("err-location").style.display = "block";
        isValid = false;
    }

    if(dateExpires < today || dateExpires === ""){
        document.getElementById("err-dateexpired").style.display = "block";
        isValid = false;
    }

    return isValid;
}

function clearErrors() {
    let errors = document.getElementsByClassName("err");
    for(let i = 0; i < errors.length; i++){
        errors[i].style.display = "none";
    }
}