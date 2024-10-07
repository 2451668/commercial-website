document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("navbar");

    // creating navbar container
    const navContainer = document.createElement("nav");
    navContainer.classList.add("navbar-container");

    // placeholder logo
    const logo = document.createElement("a");
    logo.href = "index.html";
    logo.classList.add("logo");
    logo.textContent = "SA's Climate";

    // creating the list for navigation links
    const navList = document.createElement("ul");
    navList.classList.add("nav-list");

    // defining the navigation items
    const navItems = [
        { text: "Home", href: "../index.html" },
        { text: "Design", href: "pages/design.html" },
        { text: "Theory", href: "pages/theory.html" },
        { text: "Data", href: "pages/data.html" },
        { text: "About", href: "pages/about.html" }
    ];

    // getting current page path for link highlighting
    const currentPath = window.location.pathname.split("/").pop();

    // list items for each nav item
    navItems.forEach(item => {
        const listItem = document.createElement("li");
        listItem.classList.add("nav-item");

        const link = document.createElement("a");
        link.href = item.href;
        link.textContent = item.text;

        // check if the current path matches the nav item href, and add 'active' class
        if (item.href === currentPath || (item.href === "index.html" && currentPath === "")) {
            link.classList.add("active");
        }

        listItem.appendChild(link);
        navList.appendChild(listItem);
    });

    // appends logo and nav list to container
    navContainer.appendChild(logo);
    navContainer.appendChild(navList);

    // injects nav into the DOM
    navbar.appendChild(navContainer);
});
