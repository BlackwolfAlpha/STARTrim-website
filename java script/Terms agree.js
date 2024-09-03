document.addEventListener("DOMContentLoaded", function() {
    const termsLink = document.querySelector("#terms-link");
    const modal = document.querySelector(".modal");
    const closeButton = document.querySelector(".modal .icon-button");
    const declineButton = document.querySelector(".modal-container-footer .is-ghost");
    const acceptButton = document.querySelector(".modal-container-footer .is-primary");

    termsLink.addEventListener("click", function(event) {
        event.preventDefault();
        modal.style.display = "block";
    });

    closeButton.addEventListener("click", function() {
        modal.style.display = "none";
    });

    declineButton.addEventListener("click", function() {
        modal.style.display = "none";
    });

    acceptButton.addEventListener("click", function() {
        modal.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
