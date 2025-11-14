function toggleSection(id) {
    var sections = ["animali-container", "musica-container", "giappone-container", "mostri-container", "racconti-container"]
    var e = document.getElementById(id);
    if(e.style.display != "block") {
        for(var i = 0; i < sections.length; i++) {
            b = document.getElementById(sections[i]);
            b.style.display = "none";
        }    
        e.style.display = "block"
    }
}
