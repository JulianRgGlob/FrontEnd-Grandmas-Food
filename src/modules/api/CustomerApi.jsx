import axios from 'axios'

function CustomerApi() {
  url = 'http://localhost:8080/api/delivery/v1/'
  const getCustomer = ()=> {
    return axios.get(this.url+'clients').then(res => res.data.data)
  }
  return { getCustomer };
}

export default CustomerApi

