import React, { useEffect, useReducer } from 'react';
import './page.css';

const MODE = {
	OPENING: 'MODE_OPENING',
	OPENING_ACTIVE: 'MODE_OPENING_ACTIVE',
	CLOSING: 'MODE_CLOSING',
	CLOSING_ACTIVE: 'MODE_CLOSING_ACTIVE',
	CLOSED: 'MODE_CLOSED',
};
const ACTION = {
	CLICK: 'CLICK',
	OPENING_ACTIVE: 'OPENING_ACTIVE',
	CLOSING_ACTIVE: 'CLOSING_ACTIVE',
	CLOSING_DONE: 'CLOSING_DONE',
};
const
	OPEN = Symbol('TARGET_OPEN'),
	CLOSED = Symbol('TARGET_CLOSED');
const TARGET = {
	OPEN,
	CLOSED,
};
const BUTTON_STATE_TEXT = {
	[OPEN]: 'hide',
	[CLOSED]: 'show',
};
const PAGE_CLASS = {
	MODE_OPENING: 'nav--enter',
	MODE_OPENING_ACTIVE: 'nav--enter nav--enter-active',
	MODE_CLOSING: 'nav--leave',
	MODE_CLOSING_ACTIVE: 'nav--leave nav--leave-active',
	MODE_CLOSED: ''
};
const initialState = {
	target: TARGET.CLOSED,
	mode: MODE.CLOSED
};

const reducer = (state, action) => {
	const newState = { ...state };

	switch (action) {
		case ACTION.CLICK:
			newState.target =
				state.target === TARGET.OPEN
				? TARGET.CLOSED
				: TARGET.OPEN;

			newState.mode =
				newState.target === TARGET.OPEN
				? MODE.OPENING
				: MODE.CLOSING;

			return newState;

		case ACTION.OPENING_ACTIVE:
			newState.mode = MODE.OPENING_ACTIVE;

			return newState;

		case ACTION.CLOSING_ACTIVE:
			newState.mode = MODE.CLOSING_ACTIVE;

			return newState;

		case ACTION.CLOSING_DONE:
			newState.mode = MODE.CLOSED;

			return newState;

		default:
			throw new Error('Reducer action not found: ' + action);
	}
};

const CLOSING_ANIMATION_DURATION = 1020;

let closingDoneTimeoutId = null;

function Page ({ className, children, ...props }) {
	const [state, dispatch] = useReducer(reducer, initialState);

	function navClickHandler () {
		dispatch(ACTION.CLICK);
	}

	useEffect(() => {
		if (state.target === TARGET.OPEN) {
			document.body.classList.add('no-scroll');

			if (closingDoneTimeoutId) {
				clearTimeout(closingDoneTimeoutId);
			}
		}

		return () => {
			document.body.classList.remove('no-scroll');
			// clearTimeout(closingDoneTimeoutId);
		};
	}, [state]);

	switch (state.mode) {
		case MODE.OPENING:
			window.requestAnimationFrame(() => dispatch(ACTION.OPENING_ACTIVE));

			break;
		case MODE.CLOSING:
			window.requestAnimationFrame(() => dispatch(ACTION.CLOSING_ACTIVE));

			break;
		case MODE.CLOSING_ACTIVE:
			closingDoneTimeoutId = setTimeout(
				() => dispatch(ACTION.CLOSING_DONE),
				CLOSING_ANIMATION_DURATION
			);

			break;
		default:
	}

	let pageClassName = 'page';
	pageClassName += PAGE_CLASS[state.mode] ? ` ${PAGE_CLASS[state.mode]}` : '';
	pageClassName += className ? ` ${className}` : '';

	const buttonStateText = BUTTON_STATE_TEXT[state.target] || '';

	return (
		<div className={pageClassName} {...props}>
			<PageHeader navClickHandler={navClickHandler} buttonStateText={buttonStateText} />
			{children}
			<div id="overlay" className="overlay"></div>
		</div>
	);
}

function PageHeader ({ navClickHandler, buttonStateText, ...props }) {
	return (
		<header className="header-nav" {...props}>
			<nav className="header-nav__inner" role="navigation">
				<div className="header-nav__auxiliary">
					<div className="header-nav__logo">
						<a href="/">logo</a>
					</div>
					<button
						className="header-nav__button"
						onClick={ navClickHandler }
						aria-live="polite">
						<span className="header-nav__button-state">{ buttonStateText } </span>
						menu
						<svg
							className="header-nav__button-icon"
							viewBox="0 0 16 12"
							width="1em"
							height="0.75em"
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
							xmlnsXlink="http://www.w3.org/1999/xlink"
							preserveAspectRatio="xMidYMid meet"
						>
						<polygon
							points="
							1 3
							4 3
							8 7
							12 3
							15 3
							8 10"
							stroke="none"
							fill="#FFF"
						/>
						</svg>
					</button>
				</div>
				<div className="header-nav__links">
					<div className="header-nav__links-inner">
						<a href="/">Link A</a>
						<a href="/">Link B</a>
						<a href="/">Link C</a>
						<a href="/">Link D</a>
					</div>
				</div>
			</nav>
		</header>
	);
}

export default Page;
