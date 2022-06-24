import checkNumInputs from './checkNumInputs';
import { closeModal } from './modals';

const setInputsAttribute = (selector, attr = 'disabled') => {
	selector.forEach((item) => {
		item.setAttribute('disabled', 'disabled');
	});
};
const removeInputsAttribute = (selector) => {
	selector.forEach((item) => {
		item.removeAttribute('disabled');
	});
};

const forms = (state) => {
	const form = document.querySelectorAll('form'),
		inputs = document.querySelectorAll('input'),
		btns = document.querySelectorAll('button');

	checkNumInputs('input[name="user_phone"]');

	const message = {
		loading: 'Загрузка...',
		success: 'Спасибо! Скоро мы с вами свяжемся',
		failure: 'Что-то пошло не так...',
	};

	const postData = async (url, data) => {
		document.querySelector('.status').textContent = message.loading;

		let res = await fetch(url, {
			method: 'POST',
			body: data,
		});

		return await res.text();
	};

	const clearInputs = () => {
		inputs.forEach((item) => {
			item.value = '';
		});
	};

	form.forEach((item) => {
		item.addEventListener('submit', (e) => {
			e.preventDefault();

			let statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
			item.appendChild(statusMessage);

			const formData = new FormData(item);

			if (item.getAttribute('data-calc') === 'end') {
				for (let key in state) {
					formData.append(key, state[key]);
				}
			}
			postData('assets/server.php', formData)
				.then((res) => {
					console.log(res);
					statusMessage.textContent = message.success;
				})
				.catch(() => {
					statusMessage.textContent = message.failure;
				})
				.finally(() => {
					clearInputs();
					setInputsAttribute(inputs);
					setInputsAttribute(btns);

					setTimeout(() => {
						statusMessage.remove();
						removeInputsAttribute(inputs);
						removeInputsAttribute(btns);
						inputs.forEach((item) => {
							item.checked = false;
						});
						Object.keys(state).forEach((key) => delete state[key]);
						closeModal(document.querySelector('.popup_calc_end'));
					}, 6000);
				});
		});
	});
};

export default forms;
export { setInputsAttribute, removeInputsAttribute };
