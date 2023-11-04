const BASE_URL = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api';

function wait(delay) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function get(url) {
  // eslint-disable-next-line prefer-template
  const fullURL = BASE_URL + url + '.json';

  // we add some delay to see how the loader works
  return wait(300)
    .then(() => fetch(fullURL))
    .then(res => res.json());
}

export const getTodos = () => get('/todos');

export const getUser = (userId) => get(`/users/${userId}`);
