import {ELEMENTS, CSS_CLASSES, addTask, deleteTask, changeStatus, renderList} from './view.js';
import {STATUSES} from './constants.js';

ELEMENTS.FORM.addEventListener('submit', e => {
	e.preventDefault();

	ELEMENTS.INPUTS.forEach(input => {
		const taskText = input.value;
		const taskPriority = input.dataset.priority;

		addTask(taskText, STATUSES.DEFAULT, taskPriority);
		input.value = '';
	});

	renderList();
});

ELEMENTS.LISTS.forEach(list => {
	list.addEventListener('click', e => {
		const target = e.target;
		const isRemoveButton = target.classList.contains(CSS_CLASSES.BUTTON_REMOVE_TASK);
		const isCheckbox = target.classList.contains(CSS_CLASSES.TASK_CHECKBOX);
		const currentTaskContainer = target.closest(`.${CSS_CLASSES.TASK_CONTAINER}`);
		const currentTaskTextContainer = currentTaskContainer.querySelector(`.${CSS_CLASSES.TASK_TEXT_CONTAINER}`);
		const currentTaskText = currentTaskTextContainer.textContent.trim();

		if (isRemoveButton) {
			deleteTask(currentTaskText);
			renderList();
		}

		if (isCheckbox) {
			const currentCheckbox = target.closest(`.${CSS_CLASSES.TASK_CHECKBOX}`);

			if (currentCheckbox.checked) {
				changeStatus(currentTaskText, STATUSES.DONE);
			} else {
				changeStatus(currentTaskText, STATUSES.TO_DO);
			}

			currentTaskContainer.classList.toggle(CSS_CLASSES.TASK_DONE);
		}
	});
});