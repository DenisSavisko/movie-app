let link = "https://api.themoviedb.org/";
let token = `?api_key=5874acfd11651a28c55771624f7021f4`;
export const config = {
  urlGetList: `${link}3/trending/all/day${token}`,
  urlPopularPeople:`${link}3/person/popular${token}`,
  utlPapularTv:`${link}3/tv/popular${token}`,
  utlPapularMovies:`${link}3/movie/popular${token}`,
  urlDiscover:`${link}3/discover/movie${token}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&year=2018`,
  imgLink:'https://image.tmdb.org/t/p/w500',
};

