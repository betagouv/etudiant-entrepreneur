import axios from 'axios'

class userApi {
  static loginUser(user) {
    return axios.post('/auth', user)
      .then((response) => {
        return response.data.token
      })
      .catch((error) => {
        const errorMessage = error.response.data.message ? error.response.data.message : error
        throw new Error(errorMessage)
      })
  }
}

export default userApi
