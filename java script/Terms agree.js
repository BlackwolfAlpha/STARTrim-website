document.addEventListener("DOMContentLoaded", function() {
    const termsAgreementCheckbox = document.getElementById("terms_agreement");
    const modal = document.querySelector(".modal");

    termsAgreementCheckbox.addEventListener("change", function() {
        if (this.checked) {
            modal.style.display = "block";
        } else {
            modal.style.display = "none";
        }
    });

    const closeButton = document.querySelector(".icon-button");
    closeButton.addEventListener("click", function() {
        modal.style.display = "none";
        termsAgreementCheckbox.checked = false;
    });

    const declineButton = document.querySelector(".modal-container-footer .is-ghost");
    declineButton.addEventListener("click", function() {
        modal.style.display = "none";
        termsAgreementCheckbox.checked = false;
    });

    const acceptButton = document.querySelector(".modal-container-footer .is-primary");
    acceptButton.addEventListener("click", function() {
        modal.style.display = "none";
        if (!document.getElementById("teems").checked) {
            termsAgreementCheckbox.checked = false;
        }
    });
});
