function toggleMenu() {
    const sideMenu = document.getElementById("side-menu");
    const direction = document.documentElement.dir;

    if (sideMenu.style.width === "0px" || sideMenu.style.width === "") {
        sideMenu.style.width = "330px";
        sideMenu.style[direction === "rtl" ? "right" : "left"] = "0";
    } else {
        sideMenu.style.width = "0";
        sideMenu.style[direction === "rtl" ? "right" : "left"] = "-330px";
    }
}
