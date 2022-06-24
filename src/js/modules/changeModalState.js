import checkNumInputs from './checkNumInputs';
import { setInputsAttribute, removeInputsAttribute } from './forms';

const changeModalState = (state) => {
	const windowForm = document.querySelectorAll('.balcon_icons_img'),
		windowWidth = document.querySelectorAll('#width'),
		windowHeight = document.querySelectorAll('#height'),
		windowType = document.querySelectorAll('#view_type'),
		windowProfile = document.querySelectorAll('.checkbox'),
		popupButton = document.querySelectorAll('.popup_calc_btn'),
		windowButton = document.querySelectorAll('.popup_calc_content .popup_calc_button'),
		windowProfileButton = document.querySelectorAll('.popup_calc_profile_button');

	checkNumInputs('#width');
	checkNumInputs('#height');

	function changeInputColor(input) {
		input.style.border = '1px solid red';
	}
	changeInputColor(windowHeight[0]);
	changeInputColor(windowWidth[0]);

	function bindActionToElems(event, element, prop) {
		element.forEach((item, i) => {
			item.addEventListener(event, () => {
				if (item === popupButton[i]) {
					setInputsAttribute(windowButton);
					setInputsAttribute(windowProfileButton);

					if (!state.type) {
						state.type = 'tree';
					}
					if (!state.width && !state.height) {
						changeInputColor(windowHeight[0]);
						changeInputColor(windowWidth[0]);
					}
				}

				switch (item.nodeName) {
					case 'SPAN':
						state[prop] = i;
						break;
					case 'INPUT':
						if (item.getAttribute('type') === 'checkbox') {
							i === 0 ? (state[prop] = 'холодное') : (state[prop] = 'Теплое');
							element.forEach((box, j) => {
								box.checked = false;
								if (i === j) {
									box.checked = true;
								}
							});
						} else {
							if (!item.value && item.value == '') {
								changeInputColor(item);
							} else {
								element.forEach((input, j) => {
									if (i === j) {
										input.style.border = 'none';
									}
								});
							}

							state[prop] = item.value;
						}
						break;

					case 'SELECT':
						state[prop] = item.value;

						break;
				}
				if (state.width && state.height && state.width !== '' && state.height !== '') {
					removeInputsAttribute(windowButton);
				} else {
					setInputsAttribute(windowButton);
				}

				if (state.profile && state.type && state.profile !== '' && state.type !== '') {
					removeInputsAttribute(windowProfileButton);
				} else {
					setInputsAttribute(windowProfileButton);
				}

				console.log(state);
			});
		});
	}
	bindActionToElems('click', windowForm, 'form');
	bindActionToElems('input', windowHeight, 'height');
	bindActionToElems('input', windowWidth, 'width');
	bindActionToElems('change', windowType, 'type');
	bindActionToElems('change', windowProfile, 'profile');
	bindActionToElems('click', popupButton, '');
	bindActionToElems('click', windowButton, '');
	bindActionToElems('click', windowProfileButton, '');
};
export default changeModalState;
