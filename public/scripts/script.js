//HAMBRUGER MENU 
function toggleSidebar() {
    document.getElementById('sidebar').style.width = '200px';
    document.getElementById('overlay').style.display = 'block';
}

function closeSidebar() {
    document.getElementById('sidebar').style.width = '0';
    document.getElementById('overlay').style.display = 'none';
}

const filter = document.getElementById("trades-filter");
const table = new DataTable("#jobtable");

filter.addEventListener('change', function() {
    const value = this.value === "none" ? "" : this.value;
    table.column(4).search(value).draw();
});
