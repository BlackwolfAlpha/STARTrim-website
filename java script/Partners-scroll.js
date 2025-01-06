document.addEventListener('DOMContentLoaded', function() {
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const partners = document.querySelectorAll('.partner');
    let currentIndex = 0;

    function updatePartnersDisplay() {
        partners.forEach((partner, index) => {
            if (index >= currentIndex && index < currentIndex + 5) {
                partner.style.display = 'flex';
            } else {
                partner.style.display = 'none';
            }
        });

        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex + 5 >= partners.length;
    }

    prevButton.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex -= 1;
            updatePartnersDisplay();
        }
    });

    nextButton.addEventListener('click', function() {
        if (currentIndex + 5 < partners.length) {
            currentIndex += 1;
            updatePartnersDisplay();
        }
    });

    updatePartnersDisplay();
});

document.addEventListener('DOMContentLoaded', function() {
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const partners = document.querySelectorAll('.partner');
    const container = document.querySelector('.partners-container');
    const totalPartners = partners.length;
    let displayCount = 5;
    let startIndex = 0;

    function isMobileDevice() {
        return window.matchMedia("(max-width: 767px)").matches;
    }

    function updateDisplayCount() {
        if (isMobileDevice()) {
            displayCount = totalPartners;
        } else {
            displayCount = 5;
        }
    }

    function updatePartnersDisplay() {
        updateDisplayCount();
        partners.forEach((partner, index) => {
            if (index >= startIndex && index < startIndex + displayCount) {
                partner.style.display = 'flex';
            } else {
                partner.style.display = 'none';
            }
        });

        prevButton.disabled = startIndex === 0;
        nextButton.disabled = startIndex + displayCount >= totalPartners;
    }

    prevButton.addEventListener('click', function() {
        if (startIndex > 0) {
            startIndex -= 1;
            updatePartnersDisplay();
        }
    });

    nextButton.addEventListener('click', function() {
        if (startIndex + displayCount < totalPartners) {
            startIndex += 1;
            updatePartnersDisplay();
        }
    });

    window.addEventListener('resize', updatePartnersDisplay);
    updatePartnersDisplay();
});

document.addEventListener('DOMContentLoaded', function() {
    const prevButton = document.querySelector('.Hostings-prev-button');
    const nextButton = document.querySelector('.Hostings-next-button');
    const partners = document.querySelectorAll('.Hosting-partner');
    let currentIndex = 0;

    function updateHostingDisplay() {
        partners.forEach((partner, index) => {
            if (index >= currentIndex && index < currentIndex + 5) {
                partner.style.display = 'flex';
            } else {
                partner.style.display = 'none';
            }
        });

        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex + 5 >= partners.length;
    }

    prevButton.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex -= 1;
            updateHostingDisplay();
        }
    });

    nextButton.addEventListener('click', function() {
        if (currentIndex + 5 < partners.length) {
            currentIndex += 1;
            updateHostingDisplay();
        }
    });

    updateHostingDisplay();
});

document.addEventListener('DOMContentLoaded', function() {
    const prevButton = document.querySelector('.Hostings-prev-button');
    const nextButton = document.querySelector('.Hostings-next-button');
    const partners = document.querySelectorAll('.Hosting-partner');
    const totalPartners = partners.length;
    let displayCount = 5;
    let startIndex = 0;

    function updateHostingDisplay() {
        partners.forEach((partner, index) => {
            if (index >= startIndex && index < startIndex + displayCount) {
                partner.style.display = 'flex';
            } else {
                partner.style.display = 'none';
            }
        });

        prevButton.disabled = startIndex === 0;
        nextButton.disabled = startIndex + displayCount >= totalPartners;
    }

    prevButton.addEventListener('click', function() {
        if (startIndex > 0) {
            startIndex -= 1;
            updateHostingDisplay();
        }
    });

    nextButton.addEventListener('click', function() {
        if (startIndex + displayCount < totalPartners) {
            startIndex += 1;
            updateHostingDisplay();
        }
    });

    updateHostingDisplay();
});
