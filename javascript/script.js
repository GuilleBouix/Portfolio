// ----------------------------- Light/Dark Mode ----------------------------- //
const checkbox = document.getElementById('checkbox');
const logo = document.querySelector('.logo');

// Check the system preferences
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (prefersDarkScheme) {
    document.body.classList.add('dark');
    logo.src = "/img/logo-dark.webp";
} else {
    document.body.classList.add('light');
    logo.src = "/img/logo-light.webp";
}

// Toggle dark/light mode
checkbox.addEventListener('change', () => {
    document.body.classList.toggle('dark');
    document.body.classList.toggle('light');

    // Change logo
    if (document.body.classList.contains('dark')) {
        logo.src = "/img/logo-dark.webp";
    } else {
        logo.src = "/img/logo-light.webp";
    }
});





// ----------------------------- Change Language ----------------------------- //
const translations = {
    "language": {
        "es": "ES/EN",
        "en": "EN/ES"
    },
    "title": {
        "es": "Guille Bouix | Portafolio",
        "en": "Guille Bouix | Portfolio"
    },
    "hero-name": {
        "es": "Guillermo Daniel Bouix",
        "en": "Guillermo Daniel Bouix"
    },
    "hero-intro": {
        "es": "Desarrollador web especializado en crear soluciones digitales rápidas, eficientes y seguras.",
        "en": "Web developer specializing in creating fast, efficient, and secure digital solutions."
    },
    "about-title": {
        "es": "Sobre Mí",
        "en": "About Me"
    },
    "about-description": {
        "es": "Soy un desarrollador freelance apasionado por la tecnología y la resolución de problemas mediante código. Me especializo en el desarrollo backend con Python y la creación de interfaces web con HTML, CSS y JavaScript. Disfruto creando soluciones que aumentan la eficiencia y funcionalidad de los sistemas. Siempre estoy aprendiendo y explorando nuevas herramientas para seguir enriqueciendo mis conocimientos y creciendo como profesional.",
        "en": "I am a freelance developer passionate about technology and solving problems through code. I specialize in backend development with Python and creating web interfaces with HTML, CSS, and JavaScript. I enjoy creating solutions that increase the efficiency and functionality of systems. I am always learning and exploring new tools to continue enriching my knowledge and growing as a professional."
    },
    "education-title": {
        "es": "Formación",
        "en": "Education"
    },
    "education-course-1-title": {
        "es": "INTRODUCCION A LA PROGRAMACIÓN",
        "en": "INTRODUCTION TO PROGRAMMING"
    },
    "education-course-1-institute": {
        "es": "Silicon Misiones",
        "en": "Silicon Misiones"
    },
    "education-course-1-description": {
        "es": "Curso básico donde aprendí los fundamentos de la programación, lógica computacional y estructuras de control.",
        "en": "Basic course where I learned the fundamentals of programming, computational logic, and control structures."
    },
    "education-course-1-duration": {
        "es": "2021 - 2021",
        "en": "2021 - 2021"
    },
    "education-course-2-title": {
        "es": "ANALISTA PROGRAMADOR",
        "en": "PROGRAMMER ANALYST"
    },
    "education-course-2-institute": {
        "es": "Instituto Privado de Estudios Superiores IPET 1308",
        "en": "Instituto Privado de Estudios Superiores IPET 1308"
    },
    "education-course-2-description": {
        "es": "Carrera de nivel superior orientada al desarrollo de software, bases de datos y análisis de sistemas informáticos.",
        "en": "Higher education degree oriented towards software development, databases, and analysis of information systems."
    },
    "education-course-2-duration": {
        "es": "2023 - 2024",
        "en": "2023 - 2024"
    },
    "education-course-3-title": {
        "es": "PYTHON PARA CIENCIA DE DATOS E IA",
        "en": "PYTHON FOR DATA SCIENCE & AI"
    },
    "education-course-3-institute": {
        "es": "Silicon Misiones",
        "en": "Silicon Misiones"
    },
    "education-course-3-description": {
        "es": "Curso centrado en el uso de Python para análisis de datos, machine learning e inteligencia artificial.",
        "en": "Course focused on the use of Python for data analysis, machine learning, and artificial intelligence."
    },
    "education-course-3-duration": {
        "es": "2025 - Actualidad",
        "en": "2025 - Present"
    },
    "skills-title": {
        "es": "Habilidades",
        "en": "Skills"
    },
    "select-title": {
        "es": "Otros",
        "en": "Others"
    },
    "projects-title": {
        "es": "Proyectos",
        "en": "Projects"
    },
    "project-1-title": {
        "es": "TRAINING PLUS",
        "en": "TRAINING PLUS"
    },
    "project-1-description": {
        "es": "Training+ es un sistema web diseñado para la gestión de entrenamientos personalizados, permitiendo a entrenadores y alumnos interactuar de manera eficiente.",
        "en": "Training+ is a web system designed for the management of personalized training, allowing trainers and students to interact efficiently."
    },
    "project-2-title": {
        "es": "QUICKSELL",
        "en": "QUICKSELL"
    },
    "project-2-description": {
        "es": "QuickSell es un sistema de software de gestión de ventas diseñado para facilitar la gestión de ventas y optimizar el control comercial.",
        "en": "QuickSell is a sales management software system designed to facilitate sales management and optimize business control."
    },
    "project-3-title": {
        "es": "MINDAPP",
        "en": "MINDAPP"
    },
    "project-3-description": {
        "es": "MindApp es un juego de memorización desarrollado en Python. Su objetivo es evaluar y mejorar la retención de información a corto plazo a través de desafíos dinámicos de memorización.",
        "en": "MindApp is a memory game developed in Python. Its goal is to evaluate and improve short-term information retention through dynamic memory challenges."
    },
    "contact-title": {
        "es": "Contacto",
        "en": "Contact"
    },
    "contact-name": {
        "es": "Nombre Completo",
        "en": "Full Name"
    },
    "contact-email": {
        "es": "Correo Electrónico",
        "en": "Email"
    },
    "contact-phone": {
        "es": "Nro. de Teléfono",
        "en": "Phone Number"
    },
    "contact-subject": {
        "es": "Asunto",
        "en": "Subject"
    },
    "contact-message": {
        "es": "Tu Mensaje",
        "en": "Your Message"
    },
    "contact-submit": {
        "es": "Contáctame",
        "en": "Contact Me"
    },
    "footer-text": {
        "es": "© 2025 Guillermo Daniel Bouix",
        "en": "© 2025 Guillermo Daniel Bouix"
    },
    "footer-cv": {
        "es": "Mi Curriculum",
        "en": "My Resume"
    }
};

const translate = (lang) => {
    Object.keys(translations).forEach(id => {
        const element = document.querySelector(`[data-id='${id}']`);
        if (element) {
            element.innerText = translations[id][lang];
        }
        const inputElement = document.querySelector(`[data-id='${id}'][placeholder]`);
        if (inputElement) {
            inputElement.setAttribute("placeholder", translations[id][lang]);
        }
    });
};

document.getElementById("cambiar-idioma").addEventListener("click", () => {
    const currentLang = document.documentElement.lang || "es";
    const newLang = currentLang === "es" ? "en" : "es";
    document.documentElement.lang = newLang;
    translate(newLang);
});





// ----------------------------- Filter Projects ----------------------------- //
const select = document.getElementById("projects");
const projects = document.querySelectorAll(".project-item");

function filterProjects() {
    const selectedValue = select.value;
    
    projects.forEach(project => {
        if (project.id === selectedValue) {
            project.style.display = "block";
        } else {
            project.style.display = "none";
        }
    });
}

select.addEventListener("change", filterProjects);
filterProjects();





// ----------------------------- Animation On Scroll ----------------------------- //
AOS.init({
    duration: 500, // Duración en ms
    once: true, // Solo se anima una vez
    startEvent: 'DOMContentLoaded', // Se inicia cuando el DOM está cargado
    offset: 90 // Reduce la distancia necesaria para activar la animación
});





// ----------------------------- Copy Email to Clipboard ----------------------------- //
const copyEmail = document.getElementById("copy-email");

copyEmail.addEventListener("click", (event) => {
    event.preventDefault();

    // Correo a copiar
    const email = "bouix.dev@gmail.com"; // Reemplaza con tu email real
    navigator.clipboard.writeText(email).then(() => {
        // Crear el tooltip
        const tooltip = document.createElement("span");
        tooltip.textContent = "¡Email copiado al portapapeles!";
        tooltip.classList.add("tooltip");

        // Agregar tooltip al enlace
        copyEmail.appendChild(tooltip);

        // Eliminar tooltip después de 2 segundos
        setTimeout(() => {
            tooltip.remove();
        }, 2000);
    });
});





// ----------------------------- Scroll Up Button ----------------------------- //
document.addEventListener("DOMContentLoaded", function () {
    const btnUp = document.querySelector(".btn-up");

    btnUp.addEventListener("click", function (event) {
        event.preventDefault(); // Evita que el enlace recargue la página

        window.scrollTo({
            top: 0,
            behavior: "smooth" // Hace que el desplazamiento sea suave
        });
    });
});