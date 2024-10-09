document.addEventListener("DOMContentLoaded", () => {
    const footer = document.getElementById("footer");

    // creating the footer container
    const footerContainer = document.createElement("div");
    footerContainer.classList.add("footer-container");

    // about Me Section
    const aboutSection = document.createElement("div");
    aboutSection.classList.add("footer-section");

    const aboutTitle = document.createElement("h4");
    aboutTitle.textContent = "About Me";
    aboutSection.appendChild(aboutTitle);

    const aboutText = document.createElement("p");
    aboutText.textContent = "I am a fourth-year undergraduate enrolled in the Digital Art & Game Design programme at the University of Witwatersrand in central Johannesburg. This website serves as my third submission for Interactive Media: WSOA3029A.";
    aboutSection.appendChild(aboutText);

    // contact section and details
    const contactSection = document.createElement("div");
    contactSection.classList.add("footer-section");

    const contactTitle = document.createElement("h4");
    contactTitle.textContent = "Contact";
    contactSection.appendChild(contactTitle);

    const email = document.createElement("p");
    email.textContent = "Email: 2451668@students.wits.ac.za";
    contactSection.appendChild(email);

    const phone = document.createElement("p");
    phone.textContent = "Phone: (+27) 12-345-6789";
    contactSection.appendChild(phone);

    // horizontal line separator for styling
    const separator = document.createElement("hr");

    const copyrightSection = document.createElement("p");
    copyrightSection.classList.add("footer-copyright");
    copyrightSection.textContent = "© 2024 Thabang Maleka";

    // append sections to the footer container
    footerContainer.appendChild(aboutSection);
    footerContainer.appendChild(contactSection);
    footerContainer.appendChild(separator);
    footerContainer.appendChild(copyrightSection);

    // inject the footer container into DOM
    footer.appendChild(footerContainer);
});

