document.addEventListener("DOMContentLoaded", function () {
    // *Check if the countdown has already ended*
    // localStorage.removeItem("countdownEnded");
    if (localStorage.getItem("countdownEnded")) {
        document.getElementById("intro").style.display = "none";
        return; // *Exit the function if the countdown has ended*
    }

    // *Define the countdown end date (October 21, 2024, 12:00 PM)*
    const countdownDate = new Date("2024-10-21T12:00:00").getTime();

    const x = setInterval(function() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        // *Calculate time remaining*
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // *Display the countdown*
        document.getElementById("countdown").innerHTML = `${days} ימים ${hours} שעות ${minutes} דקות ${seconds} שניות`;

        // *End of countdown*
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("countdown").innerHTML = "✨✨"; // *Change to show stars in the end*
            createStars(200); // *Create more stars in the background*

            const introElement = document.getElementById("intro");
            introElement.classList.add("fade-out");

            setTimeout(() => {
                introElement.style.display = "none"; // *Hide the intro*
                localStorage.setItem("countdownEnded", "true"); // *Set countdown as ended*
            }, 1500);
        }
    }, 1000);

    document.getElementById("intro").style.display = "flex"; // *Show the intro initially*

    // *Keyboard shortcut for admins: Ctrl + Alt + i*
    document.addEventListener("keydown", function (e) {
        if (e.ctrlKey && e.altKey && e.key === 'i') {
            const intro = document.getElementById("intro");
            const introStyle = window.getComputedStyle(intro);
            if (introStyle.display === "none") {
                intro.style.display = "flex"; // *Show the screen*
            } else {
                intro.style.display = "none"; // *Hide the screen*
            }
        }
    });

    // *Function to create moving stars in the background*
    function createStars(numStars) {
        const starsContainer = document.getElementById("stars");

        for (let i = 0; i < numStars; i++) {
            const star = document.createElement("div");
            star.classList.add("star");

            // *Set random size and position*
            const size = Math.random() * 6 + 2;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.position = 'absolute';
            star.style.top = `${Math.random() * 100}vh`;
            star.style.left = `${Math.random() * 100}vw`;

            starsContainer.appendChild(star);

            // *Add animation for movement*
            const animationDuration = Math.random() * 5 + 5; // *Between 5 and 10 seconds*
            star.style.animationDuration = `${animationDuration}s`;
            star.style.animationName = 'moveStar';
            star.style.animationIterationCount = 'infinite';
            star.style.animationTimingFunction = 'linear';
        }
    }
    createStars(100);
});
