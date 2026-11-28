const modal = document.getElementById("login-modal");
const openBtn = document.getElementById("open-modal");
const closeBtn = document.getElementById("close-modal");

openBtn.addEventListener("click", () => {
    modal.showModal();
});

closeBtn.addEventListener("click", () => {
    modal.close();
});

// Close when clicking the dark backdrop outside the modal
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.close();
    }
});