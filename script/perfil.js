const classes = [
    { id: 1, name: "Cálculo I", date: "2025-11-03", day: "Segunda", time: "10:00", price: 50.00, platform: "Zoom", tutor: "Ana Costa", slots: 10, tutorId: 1, tutorCourse: "Matemática" },
    { id: 2, name: "Programação em C", date: "2025-11-04", day: "Terça", time: "14:00", price: 75.00, platform: "Google Meet", tutor: "Carlos Mendes", slots: 8, tutorId: 2, tutorCourse: "Física" },
    { id: 3, name: "Programação em Python", date: "2025-11-05", day: "Quarta", time: "16:00", price: 60.00, platform: "Microsoft Teams", tutor: "Mariana Lima", slots: 12, tutorId: 3, tutorCourse: "Ciência da Computação" },
    { id: 4, name: "Inglês Conversação", date: "2025-11-06", day: "Quinta", time: "18:00", price: 45.00, platform: "Zoom", tutor: "Pedro Almeida", slots: 15, tutorId: 4, tutorCourse: "Letras" }
];

const reviews = [
    { id: 1, className: "Matemática Básica", tutor: "Ana Costa", rating: 4.5, comment: "Ótima explicação, muito paciente!" },
    { id: 2, className: "Programação em Python", tutor: "Mariana Lima", rating: 5.0, comment: "Aula dinâmica e prática, recomendo!" },
    { id: 3, className: "Inglês Conversação", tutor: "Pedro Almeida", rating: 4.0, comment: "Bom conteúdo, mas poderia ser mais interativo." },
];

let enrolledClasses = [];
let registeredClasses = [
    { id: 9, name: "Programação em Java", date: "2025-11-02", day: "Domingo", time: "14:00", price: 55.00, platform: "Zoom", tutor: "João Victor", slots: 10, tutorId: 0, tutorCourse: "Ciência da Computação" },
];

const dayOrder = {
    "Domingo": 0,
    "Segunda": 1,
    "Terça": 2,
    "Quarta": 3,
    "Quinta": 4,
    "Sexta": 5,
    "Sábado": 6
};

const dayNames = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

const currentTutor = {
    id: 0,
    name: "João Victor",
    course: "Ciência da Computação"
};

function formatDate(dateStr) {
    const [year, month, day] = dateStr.split("-");
    return `${day}-${month}-${year.slice(2)}`;
}

function getDayFromDate(dateStr) {
    const date = new Date(dateStr);
    return dayNames[date.getDay()];
}

function getTimeDifference(cls, now) {
    const [hours, minutes] = cls.time.split(":").map(Number);
    const classDateTime = new Date(`${cls.date}T${cls.time}:00-03:00`);
    return classDateTime - now;
}

function displayNextClass() {
    const nextClassCard = document.getElementById("next-class-card");
    nextClassCard.innerHTML = "";
    if (enrolledClasses.length === 0) {
        nextClassCard.innerHTML = "<p>Nenhuma aula inscrita.</p>";
        return;
    }

    const now = new Date("2025-10-27T11:23:00-03:00");
    const sortedClasses = [...enrolledClasses].filter(cls => getTimeDifference(cls, now) > 0).sort((a, b) => {
        return getTimeDifference(a, now) - getTimeDifference(b, now);
    });

    if (sortedClasses.length === 0) {
        nextClassCard.innerHTML = "<p>Nenhuma aula futura inscrita.</p>";
        return;
    }

    const nextClass = sortedClasses[0];
    nextClassCard.innerHTML = `
        <div class="class-header">
            <div class="class-name">${nextClass.name}</div>
        </div>
        <div class="class-info">
            <p>Tutor: ${nextClass.tutor}</p>
            ${nextClass.tutorId === currentTutor.id ? `<p>Curso: ${nextClass.tutorCourse}</p>` : ''}
            <p>${formatDate(nextClass.date)}, ${nextClass.day}, ${nextClass.time}</p>
            <p>Plataforma: ${nextClass.platform}</p>
        </div>
        <div class="class-actions">
            <button onclick="viewProfile(${nextClass.tutorId})">Ver Perfil</button>
        </div>
    `;
}

function displayClasses(filterDay = "all", searchQuery = "") {
    const classesList = document.getElementById("classes-list");
    classesList.innerHTML = "";
    let filteredClasses = [...classes, ...registeredClasses];

    if (filterDay !== "all") {
        filteredClasses = filteredClasses.filter(cls => cls.day === filterDay);
    }

    if (searchQuery) {
        filteredClasses = filteredClasses.filter(cls =>
            cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cls.tutor.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    const uniqueClasses = Array.from(
        new Map(filteredClasses.map(cls => [cls.id, cls])).values()
    );

    const now = new Date("2025-10-27T11:23:00-03:00");
    uniqueClasses.sort((a, b) => getTimeDifference(a, now) - getTimeDifference(b, now));

    uniqueClasses.forEach(cls => {
        const card = document.createElement("div");
        card.className = `class-card ${cls.tutorId === currentTutor.id ? 'own-class' : ''}`;
        card.innerHTML = `
            <div class="class-header">
                <div class="class-name">${cls.name}</div>
            </div>
            <div class="class-info">
                <p>Tutor: ${cls.tutor}</p>
                ${cls.tutorId === currentTutor.id ? `<p>Curso: ${cls.tutorCourse}</p>` : ''}
                <p>${formatDate(cls.date)}, ${cls.day}, ${cls.time}</p>
                <p>R$ ${cls.price.toFixed(2)}</p>
                <p>Plataforma: ${cls.platform}</p>
                <p>Vagas: ${cls.slots}</p>
            </div>
            <div class="class-actions">
                ${cls.tutorId === currentTutor.id ? '' : `<button onclick="enrollClass(${cls.id})">Inscrever</button>`}
                <button onclick="viewProfile(${cls.tutorId})">Ver Perfil</button>
            </div>
        `;
        classesList.appendChild(card);
    });
}

function displayRegisteredClasses(searchQuery = "") {
    const registeredList = document.getElementById("registered-classes-list");
    registeredList.innerHTML = "";
    let filteredClasses = registeredClasses;

    if (searchQuery) {
        filteredClasses = registeredClasses.filter(cls =>
            cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cls.tutor.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    const now = new Date("2025-10-27T11:23:00-03:00");
    filteredClasses.sort((a, b) => getTimeDifference(a, now) - getTimeDifference(b, now));

    filteredClasses.forEach(cls => {
        const card = document.createElement("div");
        card.className = "class-card own-class";
        card.innerHTML = `
            <div class="class-header">
                <div class="class-name">${cls.name}</div>
            </div>
            <div class="class-info">
                <p>Tutor: ${cls.tutor}</p>
                <p>Curso: ${cls.tutorCourse}</p>
                <p>${formatDate(cls.date)}, ${cls.day}, ${cls.time}</p>
                <p>R$ ${cls.price.toFixed(2)}</p>
                <p>Plataforma: ${cls.platform}</p>
                <p>Vagas: ${cls.slots}</p>
            </div>
            <div class="class-actions">
                <button onclick="cancelRegisteredClass(${cls.id})">Cancelar Cadastro</button>
            </div>
        `;
        registeredList.appendChild(card);
    });
}

function enrollClass(classId) {
    const enrolledClass = [...classes, ...registeredClasses].find(cls => cls.id === classId);
    if (enrolledClasses.some(cls => cls.id === classId)) {
        showNotification("Você já está inscrito nesta aula!", "error");
        return;
    }
    enrolledClasses.push(enrolledClass);
    updateEnrollments();
    displayNextClass();
    showNotification(`Inscrito na aula: ${enrolledClass.name}`);
}

function unenrollClass(classId) {
    enrolledClasses = enrolledClasses.filter(cls => cls.id !== classId);
    updateEnrollments();
    displayNextClass();
    showNotification("Inscrição cancelada com sucesso!");
}

function cancelRegisteredClass(classId) {
    registeredClasses = registeredClasses.filter(cls => cls.id !== classId);
    displayRegisteredClasses();
    displayClasses();
    showNotification("Aula removida com sucesso!");
}

function viewProfile(tutorId) {
    showNotification(`Visualizando perfil do tutor ID: ${tutorId}`);
}

function updateEnrollments() {
    const enrollmentsList = document.getElementById("enrollments-list");
    enrollmentsList.innerHTML = "";
    enrolledClasses.forEach(cls => {
        const card = document.createElement("div");
        card.className = "class-card";
        card.innerHTML = `
            <div class="class-header">
                <div class="class-name">${cls.name}</div>
            </div>
            <div class="class-info">
                <p>Tutor: ${cls.tutor}</p>
                ${cls.tutorId === currentTutor.id ? `<p>Curso: ${cls.tutorCourse}</p>` : ''}
                <p>${formatDate(cls.date)}, ${cls.day}, ${cls.time}</p>
                <p>R$ ${cls.price.toFixed(2)}</p>
                <p>Plataforma: ${cls.platform}</p>
                <p>Vagas: ${cls.slots}</p>
            </div>
            <div class="class-actions">
                <button onclick="unenrollClass(${cls.id})">Cancelar Inscrição</button>
                <button onclick="viewProfile(${cls.tutorId})">Ver Perfil</button>
            </div>
        `;
        enrollmentsList.appendChild(card);
    });
}

document.getElementById("class-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const maxId = Math.max(...classes.map(c => c.id), ...registeredClasses.map(c => c.id), 0);
    const date = document.getElementById("class-date").value;
    const newClass = {
        id: maxId + 1,
        name: document.getElementById("class-name").value,
        date: date,
        day: getDayFromDate(date),
        time: document.getElementById("class-time").value,
        price: parseFloat(document.getElementById("class-price").value),
        platform: document.getElementById("class-platform").value,
        slots: parseInt(document.getElementById("class-slots").value),
        tutor: currentTutor.name,
        tutorId: currentTutor.id,
        tutorCourse: currentTutor.course
    };
    registeredClasses.push(newClass);
    displayRegisteredClasses();
    displayClasses();
    closeModal();
    showNotification("Aula cadastrada com sucesso!");
});

function displayReviews() {
    const reviewsList = document.getElementById("reviews-list");
    reviewsList.innerHTML = "";
    reviews.forEach(review => {
        const card = document.createElement("div");
        card.className = "review-card";
        card.innerHTML = `
            <div class="class-header">
                <div class="class-name">${review.className}</div>
            </div>
            <div class="class-info">
                <p>Tutor: ${review.tutor}</p>
                <p>Nota: ${review.rating}</p>
                <p>${review.comment}</p>
            </div>
        `;
        reviewsList.appendChild(card);
    });
}

document.getElementById("search").addEventListener("input", function () {
    const sortDay = document.getElementById("sort-day").value;
    displayClasses(sortDay, this.value);
});

document.getElementById("sort-day").addEventListener("change", function () {
    const searchQuery = document.getElementById("search").value;
    displayClasses(this.value, searchQuery);
});

document.getElementById("registered-search").addEventListener("input", function () {
    displayRegisteredClasses(this.value);
});

document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelectorAll(".menu a").forEach(l => l.classList.remove("active"));
        document.querySelectorAll(".menu-content").forEach(mc => mc.classList.remove("active"));
        this.classList.add("active");
        document.getElementById(`${this.dataset.menu}-section`).classList.add("active");
        if (this.dataset.menu === "dashboard") {
            document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
            document.querySelectorAll(".tab-content").forEach(tc => tc.classList.remove("active"));
            document.querySelector('.tab[data-tab="student"]').classList.add("active");
            document.getElementById("student-tab").classList.add("active");
        }
    });
});

document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", function () {
        document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach(tc => tc.classList.remove("active"));
        this.classList.add("active");
        document.getElementById(`${this.dataset.tab}-tab`).classList.add("active");
    });
});

document.querySelector(".open-modal").addEventListener("click", function () {
    document.getElementById("class-modal").style.display = "flex";
});

document.querySelector(".close-modal").addEventListener("click", closeModal);

function closeModal() {
    document.getElementById("class-modal").style.display = "none";
    document.getElementById("class-form").reset();
}

function showNotification(message, type = "success") {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.style.background = type === "error" ? "var(--error-color)" : "var(--success-color)";
    notification.style.color = "#eee";
    notification.style.display = "block";
    setTimeout(() => {
        notification.style.display = "none";
    }, 3000);
}

document.getElementById("theme-switch").addEventListener("change", function () {
    document.body.classList.toggle("light");
});

displayClasses();
displayReviews();
updateEnrollments();
displayRegisteredClasses();
displayNextClass();