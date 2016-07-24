/**
 * 
 */


document.addEventListener('DOMContentLoaded', function() {
	Ajax.request('GET', 'player.php', true, function (response) {
		data = JSON.parse(response);
		useData(data);
	}, {})
}, false);

function useData(data) {
	console.log('use data');
	var ul = document.createElement('ul');
	
	for (var i = 0; i < data.length; i++) {
		console.log(data.length);
		var item = data[i];
		var li = document.createElement('li');
		
		var span = document.createElement('span');		
		span.innerHTML = (i+1) + ". "+ item.artist + ' - ' + item.song;		
		span.className = "title";
		
//		var spanPlay = document.createElement('span');			
//		spanPlay.className = "fa fa-play";
//		spanPlay.id = "play-title";
		
		var buttonPlay = document.createElement('button');			
		buttonPlay.className = "fa fa-play";
		//buttonPlay.id = "play-title";
		buttonPlay.id = i;
		buttonPlay.setAttribute("onclick", "onClickPlay(this.id)");
		buttonPlay.style.float = "right";
		
		li.appendChild(span);
		li.appendChild(buttonPlay);
		//li.appendChild(spanPlay);
		
		ul.appendChild(li);
	}
	
	document.getElementById('player-list').appendChild(ul);
	
	document.getElementsByTagName('ul')[0].style.borderLeft = "1px solid gray";
	document.getElementsByTagName('ul')[0].style.borderRight = "1px solid gray";
	
	
	//document.body.appendChild(ul);
}

 function onClickPlay(clicked_id) {
	 console.log(clicked_id);
	 playAudio(clicked_id);
}


function playAudio(index) {
	//assets/player_media-master/media/media/Alborosie_11._Ragamuffin.mp3
	var p = 'assets/player_media-master/media/media/';
	var path = data[index].path;
	var img = data[index].image;
	
	var fullPath = p + path;
	var fullPathImage = p + img;
	console.log(fullPath);
	console.log(fullPathImage);
	
	var oldAudioTag = document.getElementsByTagName("audio")[0];
	
	var newAudioTag = document.createElement('audio');	
	//autoplay="" controls="" loop="" preload="
	newAudioTag.setAttribute('autoplay', "");
	
	var sourceTag = document.createElement('source');
	sourceTag.setAttribute('src', fullPath);
	newAudioTag.appendChild(sourceTag);		
	
	var startBuff = document.getElementById('buff-start');
	var endBuff = document.getElementById('buff-end');
	
	if (!oldAudioTag){
		document.body.appendChild(newAudioTag);
		
	}else {
		document.body.replaceChild(newAudioTag, oldAudioTag);
	}	
	
	document.getElementsByTagName('audio')[0].addEventListener('loadeddata', function() {
		var sec = this.duration;		
		endBuff.innerHTML = secToMinutes(sec);
		
		document.getElementById('image').src = fullPathImage;
		document.getElementById('title').innerHTML = data[index].artist + ' - ' + data[index].song;
	}, false);
	
}

function pauseAudio() {	
	var audio = document.getElementsByTagName("audio")[0];
	audio.pause();
	
	document.addEventListener('click', function() {
		
	}, false);
}

function forwardAudio() {
	
}

function backwardAudio() {
	
}

function secToMinutes(sec) {
	var min = parseInt(sec/60 , 10);
	var s = sec - min*60;
	var secTranf = parseInt(s, 10);
	var str = min + ":" + secTranf;
	return str;
}
