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

function initAvatar(dragAndDropElement, dragAndDrop, clientX, clientY) {
    const box = dragAndDropElement.getBoundingClientRect();

    if (avatar !== null) {
        deleteAvatar();
    }

    avatar = {
        element: dragAndDropElement.cloneNode(),
        shiftX: box.width / 2,
        shiftY: box.height / 2,
        dragAndDrop
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

function checkFieldByCordinates(field, clientX, clientY) {
    const box = field.getBoundingClientRect();

    return clientX >= box.left && clientX <= box.right &&
        clientY >= box.top && clientY <= box.bottom;
}

document.querySelectorAll(".drag-and-drop").forEach((dragAndDrop) => {
    const dragAndDropElement = dragAndDrop.querySelector(".drag-and-drop__element");
    
    setRandomBackgroundColor(dragAndDropElement);

    dragAndDropElement.addEventListener("pointerdown", (e) => {
        dragAndDrop.classList.add("drag-and-drop_touch-none");
        initAvatar(e.currentTarget, dragAndDrop, e.clientX, e.clientY);
    });
});

document.body.addEventListener("pointermove", (e) => {
    if (avatar !== null) {
        moveAvatar(e.clientX, e.clientY);
    }
});


document.body.addEventListener("pointerup", (e) => {
    if (avatar !== null) {
        const fieldAbsolute = avatar.dragAndDrop.querySelector(".drag-and-drop__field_absolute");
        const fieldFloat = avatar.dragAndDrop.querySelector(".drag-and-drop__field_float");


        if (checkFieldByCordinates(fieldAbsolute, e.clientX, e.clientY)) {
            appendAvatarToFieldAbsolute(fieldAbsolute, e.clientX, e.clientY);

        } else if (checkFieldByCordinates(fieldFloat, e.clientX, e.clientY)) {
            appendAvatarToFieldFloat(fieldFloat);
        }

        avatar.dragAndDrop.classList.remove("drag-and-drop_touch-none");

        deleteAvatar();
    }
});
