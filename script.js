/* ==========================================
   UNIVERSITY DATA
========================================== */

let students = [
    {
        id: "STU001",
        name: "Rahul Kumar",
        email: "rahul@gmail.com",
        department: "Computer Science",
        course: "CS101"
    },

    {
        id: "STU002",
        name: "Priya Sharma",
        email: "priya@gmail.com",
        department: "Computer Science",
        course: "CS102"
    },

    {
        id: "STU003",
        name: "Arjun Reddy",
        email: "arjun@gmail.com",
        department: "Electronics",
        course: "EC101"
    }
];


let courses = [
    {
        id: "CS101",
        name: "Python Programming",
        credits: 4,
        faculty: "Dr. Kumar",
        department: "Computer Science"
    },

    {
        id: "CS102",
        name: "Data Structures",
        credits: 4,
        faculty: "Dr. Priya",
        department: "Computer Science"
    },

    {
        id: "EC101",
        name: "Digital Electronics",
        credits: 3,
        faculty: "Dr. Rao",
        department: "Electronics"
    },

    {
        id: "MA101",
        name: "Engineering Mathematics",
        credits: 4,
        faculty: "Dr. Sharma",
        department: "Mathematics"
    }
];


/* ==========================================
   NAVIGATION
========================================== */

function showSection(sectionName) {

    document.querySelectorAll(".section").forEach(section => {
        section.classList.remove("active-section");
    });

    document
        .getElementById(sectionName)
        .classList.add("active-section");


    document.querySelectorAll(".nav-btn").forEach(btn => {
        btn.classList.remove("active");
    });


    const buttons = document.querySelectorAll(".nav-btn");

    buttons.forEach(button => {

        if (
            button
                .getAttribute("onclick")
                .includes(sectionName)
        ) {
            button.classList.add("active");
        }

    });


    const titles = {
        dashboard: "Dashboard",
        students: "Students",
        courses: "Courses",
        network: "Semantic Network"
    };

    document.getElementById("pageTitle").textContent =
        titles[sectionName];

    if (sectionName === "network") {
        createNetwork();
    }
}


/* ==========================================
   DASHBOARD
========================================== */

function updateDashboard() {

    document.getElementById("studentCount").textContent =
        students.length;

    document.getElementById("courseCount").textContent =
        courses.length;


    const departments = new Set();

    students.forEach(student => {
        departments.add(student.department);
    });

    courses.forEach(course => {
        departments.add(course.department);
    });


    document.getElementById("departmentCount").textContent =
        departments.size;


    document.getElementById("relationshipCount").textContent =
        students.length +
        courses.length +
        courses.length;


    displayRecentStudents();

    createChart();
}


/* ==========================================
   STUDENT MANAGEMENT
========================================== */

function displayStudents() {

    const table = document.getElementById("studentTable");

    const search =
        document
            .getElementById("studentSearch")
            .value
            .toLowerCase();


    table.innerHTML = "";


    students
        .filter(student =>
            student.name.toLowerCase().includes(search) ||
            student.id.toLowerCase().includes(search) ||
            student.department.toLowerCase().includes(search)
        )
        .forEach(student => {

            const course =
                courses.find(c => c.id === student.course);


            const row = document.createElement("tr");


            row.innerHTML = `

                <td>
                    <b>${student.id}</b>
                </td>

                <td>
                    👤 ${student.name}
                </td>

                <td>
                    ${student.email}
                </td>

                <td>
                    ${student.department}
                </td>

                <td>
                    ${course ? course.name : student.course}
                </td>

                <td>
                    <button
                        class="delete-btn"
                        onclick="deleteStudent('${student.id}')">
                        Delete
                    </button>
                </td>
            `;


            table.appendChild(row);

        });
}


function openStudentModal() {

    populateCourseSelect();

    document.getElementById("studentModal").style.display =
        "flex";
}


function closeStudentModal() {

    document.getElementById("studentModal").style.display =
        "none";
}


function addStudent(event) {

    event.preventDefault();


    const id =
        document.getElementById("studentId").value.trim();

    const name =
        document.getElementById("studentName").value.trim();

    const email =
        document.getElementById("studentEmail").value.trim();

    const department =
        document.getElementById("studentDepartment").value;

    const course =
        document.getElementById("studentCourse").value;


    if (
        students.some(student =>
            student.id.toLowerCase() === id.toLowerCase()
        )
    ) {

        alert("Student ID already exists!");

        return;
    }


    students.push({

        id,
        name,
        email,
        department,
        course

    });


    document.querySelector("#studentModal form").reset();

    closeStudentModal();

    displayStudents();

    updateDashboard();

    createNetwork();
}


function deleteStudent(id) {

    const confirmDelete =
        confirm("Delete this student?");


    if (!confirmDelete) return;


    students =
        students.filter(student =>
            student.id !== id
        );


    displayStudents();

    updateDashboard();

    createNetwork();
}


/* ==========================================
   COURSE MANAGEMENT
========================================== */

function displayCourses() {

    const grid =
        document.getElementById("courseGrid");


    const search =
        document
            .getElementById("courseSearch")
            .value
            .toLowerCase();


    grid.innerHTML = "";


    courses
        .filter(course =>
            course.name.toLowerCase().includes(search) ||
            course.id.toLowerCase().includes(search) ||
            course.department.toLowerCase().includes(search)
        )
        .forEach(course => {

            const enrolled =
                students.filter(
                    student => student.course === course.id
                ).length;


            const card =
                document.createElement("div");


            card.className = "course-card";


            card.innerHTML = `

                <span class="course-id">
                    ${course.id}
                </span>

                <h3>
                    ${course.name}
                </h3>

                <p>
                    🏫 ${course.department}
                </p>

                <p>
                    👨‍🏫 ${course.faculty}
                </p>

                <p>
                    ⭐ ${course.credits} Credits
                </p>

                <p>
                    👨‍🎓 ${enrolled} Students
                </p>

            `;


            grid.appendChild(card);

        });
}


function openCourseModal() {

    document.getElementById("courseModal").style.display =
        "flex";
}


function closeCourseModal() {

    document.getElementById("courseModal").style.display =
        "none";
}


function addCourse(event) {

    event.preventDefault();


    const id =
        document.getElementById("courseId").value.trim();

    const name =
        document.getElementById("courseName").value.trim();

    const credits =
        document.getElementById("courseCredits").value;

    const faculty =
        document.getElementById("courseFaculty").value.trim();

    const department =
        document.getElementById("courseDepartment").value;


    if (
        courses.some(course =>
            course.id.toLowerCase() === id.toLowerCase()
        )
    ) {

        alert("Course ID already exists!");

        return;
    }


    courses.push({

        id,
        name,
        credits,
        faculty,
        department

    });


    document.querySelector("#courseModal form").reset();

    closeCourseModal();

    displayCourses();

    populateCourseSelect();

    updateDashboard();

    createNetwork();
}


/* ==========================================
   COURSE SELECT
========================================== */

function populateCourseSelect() {

    const select =
        document.getElementById("studentCourse");


    select.innerHTML =
        '<option value="">Select Course</option>';


    courses.forEach(course => {

        const option =
            document.createElement("option");


        option.value = course.id;

        option.textContent =
            `${course.id} - ${course.name}`;


        select.appendChild(option);

    });
}


/* ==========================================
   RECENT STUDENTS
========================================== */

function displayRecentStudents() {

    const container =
        document.getElementById("recentStudents");


    container.innerHTML = "";


    students
        .slice(-5)
        .reverse()
        .forEach(student => {

            const course =
                courses.find(c =>
                    c.id === student.course
                );


            const div =
                document.createElement("div");


            div.className =
                "recent-student";


            div.innerHTML = `

                <div>
                    <b>${student.name}</b>

                    <small>
                        ${student.department}
                    </small>
                </div>

                <span>
                    ${course ? course.id : ""}
                </span>

            `;


            container.appendChild(div);

        });
}


/* ==========================================
   CHART
========================================== */

let courseChart;


function createChart() {

    const canvas =
        document.getElementById("courseChart");


    if (!canvas) return;


    const labels =
        courses.map(course => course.id);


    const values =
        courses.map(course =>
            students.filter(
                student =>
                    student.course === course.id
            ).length
        );


    if (courseChart) {
        courseChart.destroy();
    }


    courseChart =
        new Chart(canvas, {

            type: "bar",

            data: {

                labels: labels,

                datasets: [{

                    label: "Students",

                    data: values,

                    borderRadius: 8

                }]

            },

            options: {

                responsive: true,

                plugins: {

                    legend: {
                        display: false
                    }

                },

                scales: {

                    y: {
                        beginAtZero: true,
                        ticks: {
                            precision: 0
                        }
                    }

                }

            }

        });
}


/* ==========================================
   SEMANTIC NETWORK
========================================== */

function createNetwork() {

    const container =
        document.getElementById("networkNodes");

    const svg =
        document.getElementById("networkSvg");


    if (!container || !svg) return;


    container.innerHTML = "";

    svg.innerHTML = "";


    const nodes = [];

    const centerX = 50;
    const centerY = 50;


    /*
        COURSE NODES
    */

    courses.forEach((course, index) => {

        const angle =
            (index / Math.max(courses.length, 1))
            * Math.PI * 2;


        const radius = 30;


        nodes.push({

            id: "course-" + course.id,

            name: course.id,

            subtitle: course.name,

            type: "course",

            x:
                centerX +
                Math.cos(angle) * radius,

            y:
                centerY +
                Math.sin(angle) * radius

        });

    });


    /*
        STUDENT NODES
    */

    students.slice(0, 10).forEach((student, index) => {

        const angle =
            (index / Math.max(students.length, 1))
            * Math.PI * 2;


        const radius = 43;


        nodes.push({

            id: "student-" + student.id,

            name: student.name,

            subtitle: student.id,

            type: "student",

            x:
                centerX +
                Math.cos(angle) * radius,

            y:
                centerY +
                Math.sin(angle) * radius

        });

    });


    /*
        FACULTY NODES
    */

    const faculty =
        [...new Set(
            courses.map(course =>
                course.faculty
            )
        )];


    faculty.slice(0, 4).forEach((person, index) => {

        nodes.push({

            id: "faculty-" + index,

            name: person,

            subtitle: "Faculty",

            type: "faculty",

            x: 50 + (index - 1.5) * 15,

            y: 90

        });

    });


    /*
        DEPARTMENT NODES
    */

    const departments =
        [...new Set(
            courses.map(course =>
                course.department
            )
        )];


    departments.slice(0, 4).forEach((department, index) => {

        nodes.push({

            id: "department-" + index,

            name: department,

            subtitle: "Department",

            type: "department",

            x: 12 + index * 25,

            y: 10

        });

    });


    /*
        CREATE EDGES
    */

    students.slice(0, 10).forEach(student => {

        const studentNode =
            nodes.find(
                n =>
                    n.id ===
                    "student-" + student.id
            );


        const courseNode =
            nodes.find(
                n =>
                    n.id ===
                    "course-" + student.course
            );


        if (studentNode && courseNode) {

            drawLine(
                svg,
                studentNode,
                courseNode
            );

        }

    });


    courses.forEach(course => {

        const courseNode =
            nodes.find(
                n =>
                    n.id ===
                    "course-" + course.id
            );


        const facultyIndex =
            faculty.indexOf(course.faculty);


        const facultyNode =
            nodes.find(
                n =>
                    n.id ===
                    "faculty-" + facultyIndex
            );


        if (courseNode && facultyNode) {

            drawLine(
                svg,
                courseNode,
                facultyNode
            );

        }

    });


    /*
        DRAW NODES
    */

    nodes.forEach(node => {

        const div =
            document.createElement("div");


        div.className =
            "network-node";


        div.style.left =
            node.x + "%";


        div.style.top =
            node.y + "%";


        const colors = {

            student: "#5268db",

            course: "#8a55d6",

            faculty: "#28a879",

            department: "#e69535"

        };


        div.style.background =
            colors[node.type];


        div.innerHTML = `

            ${node.name}

            <small>
                ${node.subtitle}
            </small>

        `;


        container.appendChild(div);

    });

}


/* ==========================================
   SVG LINE
========================================== */

function drawLine(svg, node1, node2) {

    const line =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
        );


    line.setAttribute(
        "x1",
        node1.x + "%"
    );


    line.setAttribute(
        "y1",
        node1.y + "%"
    );


    line.setAttribute(
        "x2",
        node2.x + "%"
    );


    line.setAttribute(
        "y2",
        node2.y + "%"
    );


    line.setAttribute(
        "stroke",
        "#aeb7ca"
    );


    line.setAttribute(
        "stroke-width",
        "2"
    );


    line.setAttribute(
        "stroke-dasharray",
        "5 5"
    );


    svg.appendChild(line);
}


/* ==========================================
   CLOSE MODALS WHEN CLICKING OUTSIDE
========================================== */

window.addEventListener("click", function(event) {

    const studentModal =
        document.getElementById("studentModal");

    const courseModal =
        document.getElementById("courseModal");


    if (event.target === studentModal) {
        closeStudentModal();
    }


    if (event.target === courseModal) {
        closeCourseModal();
    }

});


/* ==========================================
   INITIALIZE
========================================== */

document.addEventListener("DOMContentLoaded", function() {

    displayStudents();

    displayCourses();

    populateCourseSelect();

    updateDashboard();

    createNetwork();

});
