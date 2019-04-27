const link = 'https://api.themoviedb.org/3';
const token = `?api_key=5874acfd11651a28c55771624f7021f4`;
export const config = {
  imgLink: 'https://image.tmdb.org/t/p/w500',
  // imgLinkLogo:'https://image.tmdb.org/t/p/w500',
  // imgLinkBig:'https://image.tmdb.org/t/p/w1000_and_h563_face',
  urlLink: (location, params) => `${link}${location}${token}`,
};

// покопировать размеры с сайта
// "backdrop_sizes": [
//       "w300",
//       "w780",
//       "w1280",
//       "original"
//     ],
//     "logo_sizes": [
//       "w45",
//       "w92",
//       "w154",
//       "w185",
//       "w300",
//       "w500",
//       "original"
//     ],
//     "poster_sizes": [
//       "w92",
//       "w154",
//       "w185",
//       "w342",
//       "w500",
//       "w780",
//       "original"
//     ],
//     "profile_sizes": [
//       "w45",
//       "w185",
//       "h632",
//       "original"
//     ],
//     "still_sizes": [
//       "w92",
//       "w185",
//       "w300",
//       "original"
//     ]
