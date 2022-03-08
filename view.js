import {tasksList} from './main.js';
import {STATUSES, PRIORITIES} from './constants.js';

export const ELEMENTS = {
	FORM: document.querySelector('.todo__form'),
	INPUTS: document.querySelectorAll('.todo__input'),
	LISTS: document.querySelectorAll('.todo__list'),
	LIST_HIGH_PRIORITY: document.querySelector('.todo__list[data-tasks=high-priority]'),
	LIST_LOW_PRIORITY: document.querySelector('.todo__list[data-tasks=low-priority]')
}

export const CSS_CLASSES = {
	TASK_CONTAINER: 'todo__task',
	TASK_TEXT_CONTAINER: 'todo__text',
	TASK_CHECKBOX: 'todo__checkbox',
	TASK_DONE: 'todo__task--bg-grey',
	BUTTON_REMOVE_TASK: 'todo__remove-task'
}

export function addTask(task, taskStatus, priority) {
	const isAlreadyExsist = tasksList.some(item => item.name === task);

	if (!task || isAlreadyExsist) {
		return
	}

	tasksList.push({ name: task, status: taskStatus, priority });
}

export function deleteTask(task) {
	if (!task) {
		return;
	}

	tasksList = tasksList.filter(item => item.name !== task);
}

export function changeStatus(task, taskStatus) {
	if (!task) {
		return;
	}

	const findedTask = tasksList.find(item => item.name === task);
	findedTask.status = taskStatus;
}

export function renderItem(task, doneClass = '', inputChecked = '') {
	return `
		<li class="todo__task ${doneClass}">
			<div class="todo__checkbox-holder">
				<input class="todo__checkbox" type="checkbox" ${inputChecked}>
				<div class="todo__checkbox-fake"></div>
			</div>
			<div class="todo__text">
				${task}
			</div>
			<button class="todo__remove-task"></button>
		</li>
	`
}

export function renderList() {
	ELEMENTS.LIST_HIGH_PRIORITY.innerHTML = '';
	ELEMENTS.LIST_LOW_PRIORITY.innerHTML = '';

	tasksList.forEach(item => {
		if(item.priority === PRIORITIES.HIGH && item.status === STATUSES.DONE) {
			ELEMENTS.LIST_HIGH_PRIORITY.innerHTML += renderItem(item.name, CSS_CLASSES.TASK_DONE, 'checked');
		} else if(item.priority === PRIORITIES.HIGH){
			ELEMENTS.LIST_HIGH_PRIORITY.innerHTML += renderItem(item.name);
		} else if(item.priority === PRIORITIES.LOW && item.status === STATUSES.DONE) {
			ELEMENTS.LIST_LOW_PRIORITY.innerHTML += renderItem(item.name, CSS_CLASSES.TASK_DONE, 'checked');
		} else {
			ELEMENTS.LIST_LOW_PRIORITY.innerHTML += renderItem(item.name);
		}
	});
}