function toggleSection(id) {
    var sections = ["education-container", "publications-container", "teaching-container", "contacts-container"]
    var e = document.getElementById(id);
    if(e.style.display != "block") {
        for(var i = 0; i < sections.length; i++) {
            b = document.getElementById(sections[i]);
            b.style.display = "none";
        }    
        e.style.display = "block"
    }
}