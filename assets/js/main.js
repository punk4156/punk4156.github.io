let setFullScreen = (elem) => {
	if (elem.requestFullscreen) {
		elem.requestFullscreen();
	  } else if (elem.webkitRequestFullscreen) { /* Safari */
		elem.webkitRequestFullscreen();
	  } else if (elem.msRequestFullscreen) { /* IE11 */
		elem.msRequestFullscreen();
	  }
}

let leaveFullScreen = () => {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	  } else if (document.webkitExitFullscreen) { /* Safari */
		document.webkitExitFullscreen();
	  } else if (document.msExitFullscreen) { /* IE11 */
		document.msExitFullscreen();
	  }
}

let toggleFullScreen = (elem) => {
	if (document.fullscreenElement) {
		leaveFullScreen();
	} else {
		setFullScreen(elem);
	}
}

let art = document.querySelector('.art-content');
let toggleHandler = (e) => {
	e.preventDefault();
	art.classList.toggle('full-screen');
	toggleFullScreen(art);
	setTimeout(() => {
		document.querySelector('.site-header').click();
	}, 500);

	//check if art is video and mute/unmute
	let vid = art.querySelector('video')
	if (vid) {
		vid.muted = !vid.muted;
	}
}
let initFullscreener = () => {
	art.removeEventListener('click', toggleHandler);
	art.querySelector('.expander').removeEventListener('click', toggleHandler);
	if (window.innerWidth > 800) {
		art.addEventListener('click', toggleHandler)
	} else {
		art.querySelector('.expander').addEventListener('click', toggleHandler);
	}
}

window.addEventListener('resize', initFullscreener)
initFullscreener();