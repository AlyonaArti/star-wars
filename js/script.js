$(document).ready(function(){
	let pageData;
	
	$('#personList').append('<div class="preloaderContainer"><div class="green"><div class="red"><div class="blue"></div></div></div></div>');

	$('body').on('click', 'li i', function() {
		let likeName = $(this).parent().text();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			localStorage.removeItem(likeName);
		} else {
			$(this).addClass('active');
			localStorage.setItem(likeName, true);
		}
	});

	function ajaxCall(pageNumber) {
		$.ajax({
			url: 'https://swapi.co/api/people/?page=' + pageNumber,
			type: 'GET',
			success: function(data) {
				$('#personList').children().hide(100);
				pageData = data.results;

				$('#personList').children().remove();

				for(let i = 0; i < pageData.length; i++) {
					if (pageData[i]) {
						let activeLikeStr = '';
						if (localStorage.getItem(pageData[i].name)) {
							activeLikeStr = ' active';
						}
						$('#personList').append('</div><li>'+ pageData[i].name +'<i class="fa fa-heart-o' + activeLikeStr + '" aria-hidden="true"></i></li><div class="fadeBlock">');
					}
				}
			},
			error: function() {
				console.log('Error');
			}	
		});
	};
	ajaxCall(1);

	$('#page span').on('click', function() {
		$('#page').find('.press').removeClass('press');
		$(this).addClass('press');

		let pageNum = $('span.press').text();
		ajaxCall(pageNum);
	});

	$('#personList').on('click', 'li', function() {
		$('body').find('li.active').removeClass('active');
		$(this).addClass('active');
		$('.rightColumn').children().remove();
		let index = $('li').index(this);
		
		let filmNumber= '';
		for(let j = 0; j < pageData[index].films.length; j++) {
			filmNumber += '<li><a href="'+ pageData[index].films[j] +'">'+ pageData[index].films[j] +'</a></li>';
		}

		let speciesNumber= '';
		for(let j = 0; j < pageData[index].species.length; j++) {
			speciesNumber += '<li><a href="'+ pageData[index].species[j] +'">'+ pageData[index].species[j] +'</a></li>';
		}

		let vehiclesNumber= '';
		for(let j = 0; j < pageData[index].vehicles.length; j++) {
			vehiclesNumber += '<li><a href="'+ pageData[index].vehicles[j] +'">'+ pageData[index].vehicles[j] +'</a></li>';
		}

		let starshipsNumber= '';
		for(let j = 0; j < pageData[index].starships.length; j++) {
			starshipsNumber += '<li><a href="'+ pageData[index].starships[j] +'">'+ pageData[index].starships[j] +'</a></li>';
		}

		let createdDate = new Date(Date.parse(pageData[index].created)).toGMTString();
		let edetedDate = new Date(Date.parse(pageData[index].edited)).toGMTString();

		$('.rightColumn').append('<div class="topPersonRow"><div><ul id="personsData"><h1>'+ pageData[index].name +'</h1><li>Height: '+ pageData[index].height +'</li><li>Mass: '+ pageData[index].mass +'</li><li>Hair color: '+ pageData[index].hair_color +'</li><li>Skin color: '+ pageData[index].skin_color +'</li><li>Eye color: '+ pageData[index].eye_color +'</li><li>Birth year: '+ pageData[index].birth_year +'</li><li>Gender: '+ pageData[index].gender +'</li><li>Homeworld: <a href="'+ pageData[index].homeworld +'">'+ pageData[index].homeworld +'</a></li></ul></div><div><ul id="films"><h2>Films:</h2>'+ filmNumber +'</ul></div></div><div class="middlePersonRow"><div><ul id="species"><h2>Species:</h2>'+ speciesNumber +'</ul></div><div><ul id="vehicles"><h2>Vehicles:</h2>'+ vehiclesNumber +'</ul></div></div><div class="bottomPersonRow"><div><ul id="starships"><h2>Starships:</h2>'+ starshipsNumber +'</ul></div><div><ul id="url"><h2>Url:</h2><li><a href="'+ pageData[index].url +'">'+ pageData[index].url +'</a></li></ul><ul id="date"><h2>Created:</h2><li>'+ createdDate +'</li><h2>Edited:</h2><li>'+ edetedDate +'</li></ul></div></div>');
	});
})