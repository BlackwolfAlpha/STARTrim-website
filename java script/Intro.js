document.addEventListener("DOMContentLoaded", function () {
    // בדוק אם הספירה לאחור כבר הסתיימה
    // localStorage.removeItem("countdownEnded");
    if (localStorage.getItem("countdownEnded")) {
        document.getElementById("intro").style.display = "none";
        return; // יציאה מהפונקציה אם הספירה לאחור הסתיימה
    }

    // קבע תאריך סוף הספירה לאחור (21 באוקטובר 2026, 12:00)
    const countdownDate = new Date("2026-10-21T12:00:00").getTime();
    // const countdownDate = new Date(Date.now() + 60000).getTime(); //(test mode)

    const x = setInterval(function() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        // חשב את הזמן שנותר
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // הצג את הספירה לאחור
        const preferredLanguage = localStorage.getItem("preferredLanguage") || "he";
        let countdownText;

        if (preferredLanguage === "he") {
            countdownText = `${days} ימים ${hours} שעות ${minutes} דקות ${seconds} שניות`;
        } else {
            countdownText = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
        }

        document.getElementById("countdown").innerHTML = countdownText;

        // בדוק אם הספירה לאחור נגמרה
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("countdown").innerHTML = "✨✨";

            const introElement = document.getElementById("intro");
            introElement.classList.add("fade-out");

            setTimeout(() => {
                introElement.style.display = "none";
                localStorage.setItem("countdownEnded", "true"); // קבע שהספירה לאחור הסתיימה
            }, 1500);
        }
    }, 1000);

    document.getElementById("intro").style.display = "flex";

    // קיצור מקלדת עבור מנהלים: Ctrl + Alt + i
    document.addEventListener("keydown", function (e) {
        if (e.ctrlKey && e.altKey && e.key === 'i') {
            const intro = document.getElementById("intro");
            const introStyle = window.getComputedStyle(intro);
            if (introStyle.display === "none") {
                intro.style.display = "flex"; // הצג את המסך
            } else {
                intro.style.display = "none"; // הסתר את המסך
            }
        }
    });

    // פונקציה ליצור כוכבים נעים ברקע
    function createStars(numStars) {
        const starsContainer = document.getElementById("stars");

        for (let i = 0; i < numStars; i++) {
            const star = document.createElement("div");
            star.classList.add("star");

            // קבע גודל ומיקום אקראיים
            const size = Math.random() * 6 + 2;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.top = `${Math.random() * 100}vh`;
            star.style.left = `${Math.random() * 100}vw`;

            starsContainer.appendChild(star);

            // הוסף אנימציה לתנועה
            const animationDuration = Math.random() * 5 + 5; // בין 5 ל-10 שניות
            star.style.animationDuration = `${animationDuration}s`;
            star.style.animationName = 'moveStar';
            star.style.animationIterationCount = 'infinite';
            star.style.animationTimingFunction = 'linear';
        }
    }

    createStars(100);
});
