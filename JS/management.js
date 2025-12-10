document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('modpack-form');
    const listContainer = document.getElementById('modpack-list');
    const successMsg = document.getElementById('form-success');


    loadModpacks();

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;

        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const packName = document.getElementById('pack-name').value.trim();
        const category = document.getElementById('category').value;

        clearErrors();

        if (username.length < 3) {
            showError('username', 'El nombre debe tener al menos 3 caracteres.');
            isValid = false;
        }


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('email', 'Introduce un correo válido.');
            isValid = false;
        }


        if (packName === '') {
            showError('pack-name', 'El nombre del modpack es obligatorio.');
            isValid = false;
        }


        if (category === '') {
            showError('category', 'Debes seleccionar una categoría.');
            isValid = false;
        }


        if (isValid) {
            const newPack = {
                id: Date.now(),
                username: username,
                email: email,
                packName: packName,
                category: category
            };

            saveModpack(newPack);

            successMsg.textContent = "¡Guardado correctamente!";
            form.reset();


            loadModpacks();

            setTimeout(() => successMsg.textContent = '', 3000);
        }
    });

    function showError(fieldId, msg) {
        const input = document.getElementById(fieldId);
        const errorSpan = document.getElementById('error-' + fieldId);
        input.classList.add('input-error');
        errorSpan.textContent = msg;
        errorSpan.style.display = 'block';
    }
    function clearErrors() {
        document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
        document.querySelectorAll('.error-msg').forEach(el => el.style.display = 'none');
    }
    function saveModpack(item) {
        let list = JSON.parse(localStorage.getItem('myModpacks')) || [];
        list.push(item);
        localStorage.setItem('myModpacks', JSON.stringify(list));
    }

    function loadModpacks() {
        let list = JSON.parse(localStorage.getItem('myModpacks')) || [];
        listContainer.innerHTML = '';

        if (list.length === 0) {
            listContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #aaa;">No hay sugerencias aún.</p>';
            return;
        }

        list.reverse().forEach(pack => {
            const card = document.createElement('div');
            card.className = 'crud-item';
            card.innerHTML = `
                <h3>${sanitize(pack.packName)}</h3>
                <p><strong>Categoría:</strong> ${sanitize(pack.category)}</p>
                <p><strong>Usuario:</strong> ${sanitize(pack.username)}</p>
            `;
            listContainer.appendChild(card);
        });
    }

    function sanitize(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    }
});

const form = document.getElementById('suggestion-form');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const categoryInput = document.getElementById('category');
const authorInput = document.getElementById('author');
const submitBtn = document.getElementById('submit-btn');
const clearFormBtn = document.getElementById('clear-form-btn');
const suggestionsList = document.getElementById('suggestions-list');
const totalCount = document.getElementById('total-count');
const formErrorMsg = document.getElementById('form-error');
const deleteModal = document.getElementById('delete-modal');
const deleteConfirm = document.getElementById('delete-confirm');
const deleteCancel = document.getElementById('delete-cancel');
const validationList = document.getElementById('validation-list');

const STORAGE_KEY = 'minecraft_suggestions';
let editingId = null;
let deletingId = null;

document.addEventListener('DOMContentLoaded', () => {
    loadSuggestions();
    setupMenuToggle();
    setupValidation();
});

function setupMenuToggle() {
    const menuButton = document.getElementById('menu-button');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const closeSidebar = document.getElementById('close-sidebar');

    menuButton.addEventListener('click', () => {
        sidebar.classList.add('open');
        sidebarOverlay.removeAttribute('hidden');
    });

    closeSidebar.addEventListener('click', closeSidebarMenu);
    sidebarOverlay.addEventListener('click', closeSidebarMenu);

    function closeSidebarMenu() {
        sidebar.classList.remove('open');
        sidebarOverlay.setAttribute('hidden', '');
    }
}


function setupValidation() {
    titleInput.addEventListener('input', validateTitle);
    descriptionInput.addEventListener('input', validateDescription);
    categoryInput.addEventListener('change', validateCategory);
    authorInput.addEventListener('input', validateAuthor);
}

function validateTitle() {
    const isValid = titleInput.value.trim().length >= 3;
    updateValidationItem('val-title', isValid);
    return isValid;
}

function validateDescription() {
    const isValid = descriptionInput.value.trim().length >= 10;
    updateValidationItem('val-description', isValid);
    return isValid;
}

function validateCategory() {
    const isValid = categoryInput.value !== '';
    updateValidationItem('val-category', isValid);
    return isValid;
}

function validateAuthor() {
    const isValid = authorInput.value.trim().length >= 3;
    updateValidationItem('val-author', isValid);
    return isValid;
}

function updateValidationItem(itemId, isValid) {
    const item = document.getElementById(itemId);
    const icon = item.querySelector('i');

    if (isValid) {
        item.classList.remove('pending', 'error');
        item.classList.add('valid');
        icon.className = 'fa-solid fa-check-circle';
    } else {
        item.classList.remove('valid', 'pending');
        item.classList.add('error');
        icon.className = 'fa-solid fa-times-circle';
    }
}

function checkAllValid() {
    return validateTitle() && validateDescription() && validateCategory() && validateAuthor();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    formErrorMsg.style.display = 'none';
    formErrorMsg.textContent = '';

    if (!checkAllValid()) {
        formErrorMsg.textContent = 'Por favor completa todos los campos correctamente.';
        formErrorMsg.style.display = 'block';
        return;
    }

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    const category = categoryInput.value;
    const author = authorInput.value.trim();

    const suggestion = {
        id: editingId || Date.now(),
        title: title,
        description: description,
        category: category,
        author: author,
        date: new Date().toLocaleDateString('es-ES')
    };

    let suggestions = getSuggestionsFromStorage();

    if (editingId) {
        suggestions = suggestions.map(s => s.id === editingId ? suggestion : s);
        editingId = null;
        submitBtn.textContent = 'Enviar Sugerencia';
    } else {
        suggestions.push(suggestion);
    }

    saveSuggestionsToStorage(suggestions);
    loadSuggestions();
    form.reset();
    resetValidationList();
});

clearFormBtn.addEventListener('click', () => {
    form.reset();
    editingId = null;
    submitBtn.textContent = 'Enviar Sugerencia';
    formErrorMsg.style.display = 'none';
    resetValidationList();
});

function resetValidationList() {
    document.querySelectorAll('.validation-item').forEach(item => {
        item.classList.remove('valid', 'error');
        item.classList.add('pending');
        const icon = item.querySelector('i');
        icon.className = 'fa-solid fa-circle';
    });
}

function loadSuggestions() {
    const suggestions = getSuggestionsFromStorage();
    totalCount.textContent = suggestions.length;

    if (suggestions.length === 0) {
        suggestionsList.innerHTML = '<p class="no-suggestions">No hay sugerencias aún. ¡Sé el primero en enviar una!</p>';
        return;
    }

    suggestionsList.innerHTML = suggestions
        .reverse()
        .map(suggestion => `
            <div class="suggestion-card">
                <div class="suggestion-header">
                    <h3>${escapedHtml(suggestion.title)}</h3>
                    <span class="suggestion-category ${suggestion.category}">${getCategoryLabel(suggestion.category)}</span>
                </div>
                <p class="suggestion-description">${escapedHtml(suggestion.description)}</p>
                <div class="suggestion-meta">
                    <span><i class="fa-solid fa-user"></i> ${escapedHtml(suggestion.author)}</span>
                    <span><i class="fa-solid fa-calendar"></i> ${suggestion.date}</span>
                </div>
                <div class="suggestion-actions">
                    <button class="btn-edit" onclick="editSuggestion(${suggestion.id})">
                        <i class="fa-solid fa-edit"></i> Editar
                    </button>
                    <button class="btn-delete" onclick="showDeleteModal(${suggestion.id})">
                        <i class="fa-solid fa-trash"></i> Eliminar
                    </button>
                </div>
            </div>
        `)
        .join('');
}

function editSuggestion(id) {
    const suggestions = getSuggestionsFromStorage();
    const suggestion = suggestions.find(s => s.id === id);

    if (suggestion) {
        titleInput.value = suggestion.title;
        descriptionInput.value = suggestion.description;
        categoryInput.value = suggestion.category;
        authorInput.value = suggestion.author;
        editingId = id;
        submitBtn.textContent = 'Actualizar Sugerencia';
        formErrorMsg.style.display = 'none';
        resetValidationList();
        form.scrollIntoView({ behavior: 'smooth' });
    }
}

function showDeleteModal(id) {
    deletingId = id;
    deleteModal.style.display = 'flex';
}

deleteConfirm.addEventListener('click', () => {
    if (deletingId) {
        let suggestions = getSuggestionsFromStorage();
        suggestions = suggestions.filter(s => s.id !== deletingId);
        saveSuggestionsToStorage(suggestions);
        loadSuggestions();
        deleteModal.style.display = 'none';
        deletingId = null;
    }
});

deleteCancel.addEventListener('click', () => {
    deleteModal.style.display = 'none';
    deletingId = null;
});

deleteModal.addEventListener('click', (e) => {
    if (e.target === deleteModal) {
        deleteModal.style.display = 'none';
        deletingId = null;
    }
});

function getSuggestionsFromStorage() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function saveSuggestionsToStorage(suggestions) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(suggestions));
}

function getCategoryLabel(category) {
    const labels = {
        'modpack': 'Nuevo Modpack',
        'feature': 'Nueva Función',
        'bug': 'Reporte de Error',
        'mejora': 'Mejora Sugerida',
        'otro': 'Otro'
    };
    return labels[category] || category;
}

function escapedHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}