//vars
var star = document.querySelector('#loading');
let loadingt = 0;
let loaded = false;

//loading anim "..."
function loadingtt() {
	if (!loaded) {
		loadingt = (loadingt + 1) % 3;
		star.innerText = 'loading' + '.'.repeat(loadingt + 1);
		setTimeout(loadingtt, 500)
	}
};

loadingtt();

window.onload = () => {
	loaded = true;
	star.innerText = '☆';
	star.className = 'obj_centered interact clickzoom'
};

//anim hover
let a_hover = document.getElementById('au_hover');
function doclickzoom(e) {
	e.addEventListener('mouseenter', () => {
		e.style.fontSize = e.dataset.fs * 1.5 + 'px';
		let h = new Audio('music/hover.mp3');
		h.play();
	});
	e.addEventListener('mouseleave', () => {e.style.fontSize = e.dataset.fs + 'px'});
};

document.querySelectorAll('.clickzoom').forEach((e) => {doclickzoom(e)});

let a_hover_played = false;
document.addEventListener('mouseover', (event) => {
  if (event.target.closest('a') && a_hover_played == false) { //chat gpt copy + paste, idk what this is
    const h = new Audio('music/hover.mp3');
    h.play().catch(() => {});
	a_hover_played = true
  }
});

document.addEventListener('mouseout', (event) => {
  if (event.target.closest('a') && a_hover_played == true) {a_hover_played = false}
});

//click star
let cur_audio = new Audio('music/atmo.mp3');

star.addEventListener('click', () => {
	document.getElementById('bg').style.animation = 'breathe 10s ease-in-out infinite';
	star.classList.toggle('clicked');
	setTimeout(()=>typing_set(document.querySelector('.sw#bywho'), 'bywho'), 1000)
	setTimeout(()=>typing_set(document.querySelector('.sw#about'), 'about &lt;'), 1200)
	setTimeout(()=>typing_set(document.querySelector('.sw#music'), 'music &lt;'), 1400)
	setTimeout(()=>typing_set(document.querySelector('.sw#gamedev'), 'game &lt;'), 1600)
	setTimeout(()=>typing_set(document.querySelector('.sw#software'), 'software &lt;'), 1800)
	setTimeout(()=>typing_set(document.querySelector('.sw#contact'), 'contact &lt;'), 2000)
	setTimeout(()=>star.remove(), 500)
	
	let au_star = new Audio('music/star.mp3');
	au_star.play();
	cur_audio.play();
	
	document.querySelector('canvas').style.opacity = .5;
});

/*
click actions
*/

let cstars = []; //merci Kylian pour l'idee
let cstarcount = 0;

document.addEventListener('click', (e) => {
	let au_click = new Audio('music/click.mp3');
	au_click.play();
	
	//stars
	for (let s = Math.round(Math.random()*3); s < 4; s++) { //add stars to list
		let ang = Math.round(Math.random() * 180 + 180);
		let rad = ang * (Math.PI / 180); //convert to radians
		
		cstars.push([Math.cos(rad) * 32, Math.sin(rad) * 32, ang, cstarcount, 0]); //x y and id flag_anim
		
		let startoadd = document.createElement('div');
		startoadd.className = 'stars nointeract';
		startoadd.id = 'star_' + cstarcount; //set id
		cstarcount = (cstarcount + 1) % 100; //=  id++
		
		startoadd.innerText = '★';
		startoadd.style.left = e.clientX + 'px'; //pos x
		startoadd.style.top = e.clientY + 'px'; //pos y
		startoadd.style.transform = 'translate(-50%, -50%)'; //center
		startoadd.style.textShadow = '0 0 black'; //remove chadow
		startoadd.style.fontSize = '16px'; //make smaller
		
		document.getElementById('sstars').appendChild(startoadd); //add to html
		setTimeout(() => {startoadd.remove(); cstars.shift()}, 201) //delete when anim end
	};
	setTimeout(dostars, 1)
});

function dostars() { //= anim stars
	for (let s = 0; s < cstars.length; s++) {
		if (cstars[s][4] == 0) {
			document.getElementById('star_'+cstars[s][3]).style.transform = `translate(calc(-50% + ${cstars[s][0]}px), calc(-50% + ${cstars[s][1]}px)) rotate(${cstars[s][2]}deg)`;
			document.getElementById('star_'+cstars[s][3]).style.opacity = 0;
			cstars[s][4] = 1 //already animed
		}
	}
};

/*
typing anim
*/

const typing_rnd = '!#$%&*?@';
var typing = [];

document.querySelectorAll('.sw').forEach((e) => {
	e.dataset.str2w = e.innerText;
	e.innerText = '';
	e.style.fontSize = e.dataset.fs + 'px'
});

function typing_set(obj, str2w) { //set object's string
	let found = 0;
	obj.dataset.str2w = str2w;
	for (let l of typing) {
		if (l[0] == obj) {
			l[1] = str2w;
			l[2] = 0;
			found = 1
		}
	};
	if (found == 0) {typing.push([obj, str2w, 0])}
};

function typing_upd() { //update all strings
	for (let l of typing) {
		//the @(^#*&$
		let rc = ''; 
		if (l[2] == 1 || l[2] == l[1].length + 1) {rc += typing_rnd.charAt(Math.floor(Math.random()*typing_rnd.length))};
		if (l[2] > 1 && l[2] < l[1].length) {rc += typing_rnd.charAt(Math.floor(Math.random()*typing_rnd.length))};
		
		//write
		l[0].innerHTML = l[1].slice(0, Math.max(0, l[2] - 2)) + rc;
		
		if (l[2] < l[1].length + 2) {
			if (l[1][l[2]] == '<') {while (l[1][l[2] - 1] != '>') {l[2]++}}; //skip <>
			if (l[1][l[2]] == '&') {while (l[1][l[2] - 1] != ';') {l[2]++}}; //skip &;
			l[2]++ //type
		} else {
			typing.splice(typing.indexOf(l), 1) //remove from the list if finished
		}
	};
	setTimeout(typing_upd, 33)
};

typing_upd();

//description
let lastclicked = '';

document.getElementById('about').addEventListener('click', () => {
	if (lastclicked != 'about') {
		dolastclicked('about');
		lastclicked = 'about';
		
		typing_set(document.getElementById('desc'), '&gt; Mark<br>&gt; ukrainian<br>&gt; 2007')
	}
});

let psong = 1;
let psongs = [['по льду', 'w/ sh!'],['согрей','w/ bio., tarab'],['мало красок','w/ DDOUBLEMUR'],['что-то на красивом','w/ danyarayd, alonk'],['вернуться назад','w/ ekyo, ub1qza'],['инцидент "15"','w/ полоса юруки'],['всё вянет','solo']];

document.getElementById('music').addEventListener('click', () => {
	if (lastclicked != 'music') {
		psong = 1;
		dolastclicked('music');
		lastclicked = 'music';
		
		typing_set(document.getElementById('desc'), '\
		&gt; <a href="https://soundcloud.com/6ywho/tracks" target="_blank">SoundCloud</a> (all music)<br>\
		&gt; <a href="https://open.spotify.com/artist/6h0LMmMM5VarZOSYJklUcN" target="_blank">Spotify</a> <br>\
		&gt; <a href="https://music.apple.com/fr/artist/bywho/1806085957" target="_blank">Apple Music</a> <br> <br>\
		&gt; <a href="https://bywho.gumroad.com/" target = "_blank">sample packs</a>');
		
		document.getElementById('pdesc').innerHTML = '';
		document.getElementById('pdesc2').innerHTML = '';
		document.getElementById('psong').innerHTML = '';
		document.getElementById('psong2').innerHTML = '';
		
		setTimeout(()=>typing_set(document.getElementById('pdesc'), 'latest release (31.05)'),800);
		setTimeout(()=>typing_set(document.getElementById('pdesc2'), '<a href="https://band.link/solnechniezaychiki" target="_blank">солнечные зайчики</a>'),1000);
	}
});

let au_toplay = ''
function stopaudio() {
	if (cur_audio) {
		if (cur_audio.volume > 0) {
			cur_audio.volume = Math.max(0, cur_audio.volume - 0.01);
			setTimeout(()=>stopaudio(), 1);
		} else {
			cur_audio.pause();
			cur_audio.currentTime = 0;
			cur_audio.src = '';
			cur_audio.volume = 1;
			cur_audio = null;
			if (au_toplay) {
				cur_audio = new Audio(au_toplay);
				cur_audio.loop = (cur_audio.src.split('/').pop() == 'atmo.mp3') ? true : false;
				cur_audio.play();
			}
		}
	}
};

function playsong(s) {
	//update N, name, w/
	document.getElementById('psongid').innerText = `${psong} / 7`;
	typing_set(document.getElementById('psong'), psongs[psong - 1][0]);
	setTimeout(()=>typing_set(document.getElementById('psong2'), psongs[psong - 1][1]),200);
	
	au_toplay = `music/${s}.mp3`;
	stopaudio()
};

function p_prev() { //prev song
	if (psong > 1) {
		psong = Math.max(1, psong - 1);
		playsong(psong)
	}
};

function p_next() { //next song
	if (psong < 7) {
		psong = Math.min(psong + 1, 7);
		playsong(psong)
	}
};

document.addEventListener('visibilitychange', () => { //remove sound when out of page
  if (document.hidden) {cur_audio.pause()}
  else {cur_audio.play()}
});

document.getElementById('gamedev').addEventListener('click', () => {
	if (lastclicked != 'game') {
		dolastclicked('game');
		lastclicked = 'game';
		
		typing_set(document.getElementById('desc'), '\
		&gt; <a href = "https://sqkriwvy.itch.io/" target="_blank">itch.io</a> (all games)<br>\
		&gt; <a href = "https://www.lexaloffle.com/bbs/?uid=49295" target="_blank">Lexaloffle Games</a> (PICO-8 only)<br>\
		&gt; <span>Steam</span> (soon)');
		
		document.getElementById('edesc').innerHTML = '';
		document.getElementById('edesc2').innerHTML = '';
		document.getElementById('edesc3').innerHTML = '';
		document.getElementById('edesc4').innerHTML = '';
		
		setTimeout(() => {typing_set(document.getElementById('edesc'), 'Ewelyss (31.10.2023)')}, 800);
		setTimeout(() => {typing_set(document.getElementById('edesc2'), '<span>blood is everything</span>')}, 1000)
		setTimeout(() => {typing_set(document.getElementById('edesc3'), 'indie card roguelike')}, 1200)
		setTimeout(() => {typing_set(document.getElementById('edesc4'), 'available on <a href = "https://sqkriwvy.itch.io/ewelyss" target="_blank">itch.io</a>')}, 1400)
	}
});

document.getElementById('software').addEventListener('click', () => {
	if (lastclicked != 'software') {
		dolastclicked('software');
		lastclicked = 'software';
		
		typing_set(document.getElementById('desc'), '\
		&gt; music<br>\
		<a href="https://www.image-line.com/" target="_blank">FL Studio</a> <br> <br>\
		&gt; visual<br>\
		<a href="https://derivative.ca/" target="_blank">TouchDesigner</a> <br>\
		<a href="https://www.capcut.com/" target="_blank">Capcut</a> (free)<br>\
		<a href="https://avidemux.sourceforge.net/" target="_blank">Avidemux</a> (free)<br> <br>\
		&gt; dev<br>\
		<a href="https://www.clickteam.com/" target="_blank">Clickteam Fusion 2.5+</a> <br>\
		<a href="https://www.lexaloffle.com/pico-8.php" target="_blank">PICO-8</a>');
	}
});

document.getElementById('contact').addEventListener('click', () => {
	if (lastclicked != 'contact') {
		dolastclicked('contact');
		lastclicked = 'contact';
		
		typing_set(document.getElementById('desc'), '\
		&gt; <a href="https://t.me/bywhoo" target="_blank">telegram</a> (channel) <br>\
		&gt; <a href="https://www.instagram.com/bywho_____/" target="_blank">instagram</a> <br>\
		&gt; <a href="https://www.tiktok.com/@6ywho" target="_blank">tiktok</a>');
	}
});

function dolastclicked(c) {
	if (c == 'music') {
		document.querySelector('#player').style.left = '32px';
		document.querySelector('#alb').style.filter = 'blur(0)'; //merci Kylian pour l'idee
		playsong(psong)
	} else {
		document.querySelector('#player').style.left = '-512px';
		document.querySelector('#alb').style.filter = 'blur(10px)';
		if (lastclicked == 'music') {
			au_toplay = 'music/atmo.mp3';
			stopaudio()
		}
	};
	if (c == 'game') {
		document.querySelector('#ewelyss').style.left = '32px';
		document.querySelector('#img_ewelyss').style.filter = 'blur(0)';
	} else {
		document.querySelector('#ewelyss').style.left = '-512px';
		document.querySelector('#img_ewelyss').style.filter = 'blur(10px)';
		
	}
};

//starfield
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
function canvas_resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};
window.addEventListener('resize', canvas_resize);
canvas_resize();

const starcount = 400;
//init stars
let stars = [];
for (let s = 0; s < starcount; s++) {
	stars.push([
		Math.random() * Math.PI * 2,
		Math.random() * 1000 + 128,
		(Math.random() - 1.3) * 0.001 //angle, radius, speed (= opacity)
	])
};

//upd stars
function upd_stars() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	stars.forEach(s => {
		s[0] += s[2]; //rotate
		let sx = Math.cos(s[0]) * s[1] + (canvas.width / 2);
		let sy = Math.sin(s[0]) * s[1] + canvas.height;
		
		ctx.fillStyle = '#fff';
		ctx.beginPath();
		ctx.arc(sx, sy, 1, 0, Math.PI * 2);
		ctx.fill();
	});
	requestAnimationFrame(upd_stars);
};
upd_stars();