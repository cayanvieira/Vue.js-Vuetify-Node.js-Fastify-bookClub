export const state = () => ({})

export const getters = {}

export const actions = { 
   
  async register(_,{name, birthData, email, password,uf,sex}) {
    return (await this.$axios.post('/account/register',{
      name:name,
      birthData:birthData,        
      email:email,
      password:password,
      sex:sex,
      uf:uf,      
    })
    ).data
  },
  
  del(_,id){
    return  this.$axios.delete(`/account/${id}/delete`)
  },

  update(_,{id,name,birthData,sex,email,uf}){
    return  this.$axios.put(`/account/${id}/update`,{
      name:name,
      birthData:birthData,        
      email:email,      
      sex:sex,
      uf:uf,   
    })
    .then(response => response.data)
  },

  get(_,id){
    return  this.$axios.get(`/account/${id}/data`)
    .then(response => response.data)
  },

  async addFavoriteClub(_,{clubId,accountId}){
    return await this.$axios.post('/account/add_favorite_club',
      {
        clubId:clubId,
        accountId:accountId
      }
    ).data
  },

  checkFavoriteClub(_,{clubId,accountId}){
    return  this.$axios.get(`/account/${accountId}/favorited_club/${clubId}`)
  },
  
  removeFavoriteClub(_,{clubId,accountId}){
    return  this.$axios.delete(`/account/${accountId}/remove_favorited_club/${clubId}`)
  },

  fechMyClubs(_,accountId){
    return  this.$axios.get(`/account/${accountId}/myclubs`)
      .then(response => response.data)
  },

  fechMyFavoriteClubs(_,accountId){
    return  this.$axios.get(`/account/${accountId}/favorited_club_list`)
      .then(response => response.data)
  }
}

export const mutations = {}