/**
 * 
 */

document.addEventListener('DOMContentLoaded', function() {
	Ajax.request('GET', 'player.php', true, function (response) {
		var data = JSON.parse(response);
		useData(data);
	}, {})
}, false);

function useData(data) {
	var ul = document.createElement('ul');
	
	for (var i = 0; i < data.length; i++) {
		var item = data[i];
		var li = document.createElement('li');
		li.innerHTML = 'Name ' + item.name + ' Age ' + item.age;
		ul.appendChild(li);
	}
	
	document.body.appendChild(ul);
}