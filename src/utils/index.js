const CLEARBIT_URL = "https://company.clearbit.com/v1/domains/find?name=";
const CLEARBIT_KEY = "sk_67250f6b93d14a236628a0cfee7db117";

export const fetchDomain = function(company) {
  return fetch(CLEARBIT_URL + `"${company}"`, {
    method: 'get',
    headers: new Headers({
      'Authorization': `Bearer ${CLEARBIT_KEY}`
    })
  })
    .then(res => res.json())
    .then(json => {
      return json.logo
    })
    .catch(ex => {
      // json.error.message
      console.log(ex.message);
      return ""
    })
};