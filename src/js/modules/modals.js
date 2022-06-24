const windows = document.querySelectorAll('[data-modal]');

function closeModal(popup, window = windows) {
	window.forEach((item) => {
		item.style.display = 'none';
	});

	popup.style.display = 'none';
	// document.body.style.overflowY = '';
	document.body.classList.remove('modal-open');
	document.body.style.marginRight = `0px`;
}
function calcScroll() {
	let div = document.createElement('div');
	div.style.width = '50px';
	div.style.height = '50px';
	div.style.overflowY = 'scroll';
	div.style.visibility = 'hidden';
	document.body.appendChild(div);

	let scrollWidth = div.offsetWidth - div.clientWidth;
	div.remove();

	return scrollWidth;
}

const modals = () => {
	const modalTimerId = setTimeout(() => timerModal('.popup', modalTimerId), 60000),
		scroll = calcScroll();

	function openModal(popup, timer, windows) {
		windows.forEach((item) => {
			item.style.display = 'none';
		});
		popup.style.display = 'block';
		// document.body.style.overflowY = 'hidden';
		document.body.classList.add('modal-open');
		document.body.style.marginRight = `${scroll}px`;
		if (timer) {
			clearInterval(timer);
		}
	}

	function timerModal(popupSelector, timer) {
		const popup = document.querySelector(popupSelector);
		popup.style.display = 'block';
		// document.body.style.overflowY = 'hidden';
		document.body.classList.add('modal-open');

		if (timer) {
			clearInterval(timer);
		}
	}

	function bindModal(triggerSelector, popupSelector, closeSelector, closeClickOverlay = true) {
		const selector = document.querySelectorAll(triggerSelector),
			popup = document.querySelector(popupSelector),
			close = document.querySelector(closeSelector);

		selector.forEach((item) => {
			item.addEventListener('click', (e) => {
				if (e.target) {
					e.preventDefault();
				}

				openModal(popup, modalTimerId, windows);
			});
		});

		close.addEventListener('click', () => {
			closeModal(popup, windows);
		});

		popup.addEventListener('click', (e) => {
			if (e.target === popup && closeClickOverlay) {
				closeModal(popup, windows);
			}
		});
	}

	// function showModalByTime(selector, time) {
	// 	setTimeout(() => {
	// 		document.querySelector(selector).style.display = 'block';
	// 		document.body.classList.add('modal-open');
	// 	}, time);
	// }

	bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
	bindModal('.phone_link', '.popup', '.popup .popup_close');
	bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
	bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
	bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
	// showModalByTime('.popup', 3000);
};

export default modals;
export { closeModal, calcScroll };
