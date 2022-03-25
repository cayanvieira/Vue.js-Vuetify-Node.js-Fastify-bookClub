export const state = () => ({})

export const getters = {}

export const actions = { 
   
  async login(_,{email, password}) {
    return (await this.$axios.post('/login',{
      email:email,
      password:password   
    })
    ).data
  }, 
}

export const mutations = {}