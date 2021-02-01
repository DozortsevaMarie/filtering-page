fetch('./testData.json')
.then(response => response.json())
.then(json => {
	itemsList = Array.from(json.items);
	createContent(json.items);
	sortDuration(json.items);
	createFilterCountries(json.items);
	createFilterCities(json.items);
	filterCountry(json.items);
	filterCity(json.items);
	searchItem(json.items);
});

const sorterPrice = document.querySelector('.sorter__price');
const sorterDuration = document.querySelector('.sorter__duration');
const dropdownItems = Array.from(document.querySelectorAll('.dropdown-menu__item'));
const sorterTitle = document.querySelector('.sorter__title');
const search = document.querySelector('.search__input');

function dropdown(element) {
	const arrow = element.children[1];
	element.addEventListener('click', () => {
		arrow.classList.toggle('fa-angle-up');
	});
}

dropdown(sorterDuration);
dropdown(sorterPrice);

function createContent(items) {
	const content = document.getElementById('item');

	content.innerHTML = items.reduce((acc, item) => {
		return acc += `
		<div class="item-container">
			<div class="item__direction">Страна: ${item.country}, ${item.direction}</div>
			<div class="item__price">${item.price} рублей</div>
			<div class="item__duration">Количество дней: ${item.duration}</div>
			<div class="item__description">Краткое описании маршрута:<br><br> <span class="description__text">${item.description}</span></div>
		</div>`
	}, '');
}

sorterPrice.addEventListener('click', () => {
	const contentForPrice = itemsList.sort(sortP);
	createContent(contentForPrice);		
})

function sortP(a,b) {
	const arrow = sorterPrice.children[1];
	if (arrow.classList.contains('fa-angle-up')) {
		return a.price - b.price;
	}
	else{
		if(b.price > a.price) return 1;
		if(b.price == a.price) return 0;
		if(b.price < a.price) return -1;
	}
}

function sortD(a,b) {
	const arrow = sorterDuration.children[1];
	if(arrow.classList.contains('fa-angle-up')) {
		return a.duration - b.duration;
	}
	else{
		if(b.duration > a.duration) return 1;
		if(b.duration == a.duration) return 0;
		if(b.duration < a.duration) return -1;
	}
}

function sortDuration(arr) {
	sorterDuration.addEventListener('click', () => {
		const contentForDuration = arr.sort(sortD);
		createContent(contentForDuration);	
	})
};


function createFilterCountries(items){
	const countries = new Set();
	items.map(item => { countries.add(item.country)});

	const content = document.getElementById('countries-container');

	content.innerHTML = Array.from(countries).reduce((acc, item) => {
		return acc += ` 
		<div class="countries__item">${item}</div>`
	}, '');
}

function createFilterCities(items){
	const cities = new Set();
	items.map(item => { cities.add(item.direction)});

	const content = document.getElementById('cities-container');

	content.innerHTML = Array.from(cities).reduce((acc, item) => {
		return acc += ` 
		<div class="cities__item">${item}</div>
		`
	}, '');
}

function filterCountry(arr) {
	let filteredContentForCountries = [];
	Array.from(document.querySelectorAll('.countries__item')).map(item => {
		item.addEventListener('click',(e) => {
			let current = e.target.innerHTML;
			filteredContentForCountries = arr.filter(item => {
				return item.country === current;
			})
		createContent(filteredContentForCountries);
		})
	})
}

function filterCity(arr) {
	let filteredContentForCities = [];
	Array.from(document.querySelectorAll('.cities__item')).map( item => {
		item.addEventListener('click',(e) => {
			let current = e.target.innerHTML;
			filteredContentForCities = arr.filter(item => {
				return item.direction === current;
			})
		createContent(filteredContentForCities);
		})
	})
}	

function searchItem(arr) {
	let filteredContent =[];
	search.addEventListener('input', (event) => {
		let current = event.target.value.toLowerCase();
		filteredContent = arr.filter(item => {
			return item.direction.toLowerCase().includes(current) || item.country.toLowerCase().includes(current);
		})
	createContent(filteredContent);
	})
}

window.addEventListener('load', () => {
	const loader = document.querySelector('.loader');
	loader.classList.add('hidden');
})

