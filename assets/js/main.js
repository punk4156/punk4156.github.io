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
art.addEventListener('click', (e) => {
	e.preventDefault();
	art.classList.toggle('full-screen');
	toggleFullScreen(art);

	//check if art is video and mute/unmute
	let vid = art.querySelector('video')
	if (vid) {
		vid.muted = !vid.muted;
	}
})

document.addEventListener('click', (e) => {
	if (e.target.type == 'video') {
		console.log('yyet');
	}
})