let avatar = null;

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }

    return color;
}

function setRandomBackgroundColor(element) {
    element.style.backgroundColor = getRandomColor();
}

function initAvatar(dragAndDropElement, clientX, clientY) {
    const box = dragAndDropElement.getBoundingClientRect();

    avatar = {
        element: dragAndDropElement.cloneNode(),
        shiftX: box.width / 2,
        shiftY: box.height / 2
    }

    avatar.element.classList.add("drag-and-drop__element_avatar");

    moveAvatar(clientX, clientY);

    document.body.appendChild(avatar.element);

    setRandomBackgroundColor(dragAndDropElement);
}

function moveAvatar(clientX, clientY) {
    avatar.element.style.top = clientY - avatar.shiftY + "px";
    avatar.element.style.left = clientX - avatar.shiftX + "px";
}

function deleteAvatar() {
    avatar.element.outerHTML = "";
    avatar = null;
}

function appendAvatarToFieldAbsolute(field, clientX, clientY) {
    const boxField = field.getBoundingClientRect();

    avatar.element.classList.remove("drag-and-drop__element_avatar");

    avatar.element.classList.add("drag-and-drop__element_absolute");
    avatar.element.style.top = clientY - boxField.top - avatar.shiftY + "px";
    avatar.element.style.left = clientX - boxField.left - avatar.shiftX + "px";

    field.appendChild(avatar.element.cloneNode());
}

function appendAvatarToFieldFloat(field) {
    avatar.element.classList.remove("drag-and-drop__element_avatar");

    avatar.element.classList.add("drag-and-drop__element_float");

    field.appendChild(avatar.element.cloneNode());
}

document.querySelectorAll(".drag-and-drop__element").forEach((dragAndDropElement) => {
    setRandomBackgroundColor(dragAndDropElement);

    dragAndDropElement.addEventListener("pointerdown", (e) => {
        initAvatar(e.currentTarget);
        moveAvatar(e.clientX, e.clientY);
    });
});

document.body.addEventListener("pointermove", (e) => {
    if (avatar !== null) {
        moveAvatar(e.clientX, e.clientY);
    }
});

document.addEventListener("pointerup", (e) => {
    if (avatar !== null) {
        const field = e.target.closest(".drag-and-drop__field");

        if (field !== null && field.classList.contains("drag-and-drop__field_absolute")) {
            appendAvatarToFieldAbsolute(field, e.clientX, e.clientY);

        } else if (field !== null && field.classList.contains("drag-and-drop__field_float")) {
            appendAvatarToFieldFloat(field);
        }

        deleteAvatar();
    }
});
