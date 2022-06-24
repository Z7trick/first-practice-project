import { calcScroll } from './modals';

const images = () => {
	const imgPopUp = document.createElement('div'),
		workSection = document.querySelector('.works'),
		bigImage = document.createElement('img'),
		scroll = calcScroll();

	workSection.appendChild(imgPopUp);
	imgPopUp.style.cssText = 'display: none; justify-content: center; align-items: center;}';
	imgPopUp.appendChild(bigImage);

	workSection.addEventListener('click', (e) => {
		e.preventDefault();
		let target = e.target;

		if (target && target.classList.contains('preview')) {
			document.body.style.marginRight = `${scroll}px`;

			imgPopUp.classList.add('popup_img');
			document.body.classList.add('modal-open');
			imgPopUp.style.display = 'flex';
			const path = target.parentNode.getAttribute('href');
			bigImage.setAttribute('src', path);
		}

		if (target && target.matches('div.popup_img')) {
			imgPopUp.style.display = 'none';
			document.body.classList.remove('modal-open');
			document.body.style.marginRight = `0px`;
		}
	});
};

export default images;
