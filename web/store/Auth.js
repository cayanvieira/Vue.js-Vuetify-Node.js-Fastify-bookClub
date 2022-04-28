export const state = () => ({
  user:null
})

export const getters = {}

export const actions = { 
   
  login(storeAuth,{email, password}) {
    return this.$axios
      .post('/login',{
        email:email,
        password:password   
      })
      .then(response =>{
        storeAuth.commit('SET_USER',response.data)
        return storeAuth.state.user
      })
  },

  sync(storeAuth){
    const user=window.localStorage.getItem("user")
    if(user){
      storeAuth.commit('SET_USER',JSON.parse(user))
      return storeAuth.state.user
    }    
  }
   
}

export const mutations = {
  SET_USER(stateAuth,user){
    stateAuth.user = user
    window.localStorage.setItem('user',JSON.stringify(user))
  }
}