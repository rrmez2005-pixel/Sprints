//HAMBRUGER MENU 
function toggleSidebar() {
    document.getElementById('sidebar').style.width = '200px';
    document.getElementById('overlay').style.display = 'block';
}

function closeSidebar() {
    document.getElementById('sidebar').style.width = '0';
    document.getElementById('overlay').style.display = 'none';
}
