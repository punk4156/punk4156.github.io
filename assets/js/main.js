let fullscreenTimestamp = 0;
let mouseTimeout = 0;

let mouseMoveHandler = (e) => {
	if (muter) {
		muter.classList.add('show');
		art.classList.add('show-mouse');
		clearTimeout(mouseTimeout);
	
		mouseTimeout = setTimeout(()=> {
			muter.classList.remove('show');
			art.classList.remove('show-mouse');
		}, 1500);
	}
}

let setFullScreen = (elem) => {
	elem.classList.add('full-screen');
	if (elem.requestFullscreen) {
		elem.requestFullscreen();
	} else if (elem.webkitRequestFullscreen) { /* Safari */
		elem.webkitRequestFullscreen();
	} else if (elem.msRequestFullscreen) { /* IE11 */
		elem.msRequestFullscreen();
	}

	// once fullscreen add mouse move to show mute button
	document.addEventListener('mousemove', mouseMoveHandler)
}

let leaveFullScreen = (elem) => {
	elem.classList.remove('full-screen');
	if (document.fullscreenElement) {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.webkitExitFullscreen) { /* Safari */
			document.webkitExitFullscreen();
		} else if (document.msExitFullscreen) { /* IE11 */
			document.msExitFullscreen();
		}
	}

	// once fullscreen is exited remove mouse move to show mute button
	document.removeEventListener('mousemove', mouseMoveHandler)
}

let toggleFullScreen = (elem) => {

	if (document.fullscreenElement) {
		leaveFullScreen(elem);
	} else {
		setFullScreen(elem);
	}
}

let art = document.querySelector('.art-content');
let fullScreenHandler = (e) => {
	e.preventDefault();
	fullscreenTimestamp = e.timeStamp;
	toggleFullScreen(art);
};

let leaveFullScreenHandler = (e) => {
	//check if time is > 200ms
	if ((!document.fullscreenElement && fullscreenTimestamp < e.timeStamp - 200) || (e.key == "Escape")) {
		// console.log('exit')
		leaveFullScreen(art);
	} 
}

let initFullscreener = () => {
	art.querySelector('.expander').removeEventListener('click', fullScreenHandler);
	art.querySelector('.expander').addEventListener('click', fullScreenHandler);
	art.addEventListener('fullscreenchange', leaveFullScreenHandler);
	window.addEventListener('keyup', leaveFullScreenHandler);
}
let muter = art.querySelector('.muter');

let toggleMuted = (e) => {
	let vid = art.querySelector('video');
	if (vid) { vid.muted = !vid.muted; }
	muter.classList.toggle('unmute')
}

let initMuter = () => {
	muter.addEventListener('click', toggleMuted);
}

window.addEventListener('resize', initFullscreener)
initFullscreener();
initMuter();