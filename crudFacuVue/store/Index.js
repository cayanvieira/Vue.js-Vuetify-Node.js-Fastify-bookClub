export const state = () => ({})

export const getters = {}

export const actions = {
  async accounts() {    
    return (await this.$axios.get('/register/accounts')).data
  },
  async register(_,{name, lastName, document, registration, email}) {
    return (await this.$axios.post('/register/create',{
      name:name,
      lastName:lastName,
      document:document,
      registration:registration,
      email:email   
    })
    ).data
  },
  async deleteAccount(_,{user_id}) {
    console.log(user_id)
    return ( await this.$axios.delete('register/delete',{
      data:{user_id:user_id}
     
    })
    ).data
  }

}

export const mutations = {}