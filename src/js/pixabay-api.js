import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchEl = (searchedQuery, page) => {
  const axiosOptions = {
    params: {
      key: '45457641-ce63f5c92c9f6494e7448790b',
      q: searchedQuery,
      orientation: 'horizontal',
      page: page,
      per_page: 15,
      image_type: 'photo',
      safesearch: 'true',
    },
  };

  return axios.get(``, axiosOptions);
};

// export const fetchEl = query => {
//   return fetch(
//     `https://pixabay.com/api/?key=45457641-ce63f5c92c9f6494e7448790b&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`
//   ).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// };
