

const apiUrl = 'https://ksprojects.pl/'

const currentUrl = () => {
  let rootUrl = windows.location.pathname;
  if (rootUrl === '/') {
    rootUrl = ''
  }
  return rootUrl;
}

export {currentUrl, apiUrl}