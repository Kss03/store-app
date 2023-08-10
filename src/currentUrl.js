

const apiUrl = 'https://ksprojects.pl/'

const currentUrl = () => {
  let rootUrl = window.location.pathname;
  if (rootUrl === '/') {
    rootUrl = ''
  }
  return rootUrl;
}

export {currentUrl, apiUrl}