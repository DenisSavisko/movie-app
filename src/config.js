let link = "https://api.themoviedb.org/3";
let token = `?api_key=5874acfd11651a28c55771624f7021f4`;
export const config = {
  imgLink:'https://image.tmdb.org/t/p/w500',
  urlLink: (location, params)=>`${link}${location}${token}`,
};

