export const parseForFilter = (filmList) => {

	let listGenre = new Set();
	let listYear = new Set();

	filmList.forEach(film => {
		listGenre.add(film.genre_type)
		listYear.add(film.year)
	})

	return {listGenre, listYear}
}