export const state = () => ({})

export const getters = {}

export const actions = { 
   
  async register(_,{name, birthData, email, password,confirmPassword,uf,sex}) {
    return (await this.$axios.post('/account/register',{
      name:name,
      birthData:birthData,        
      email:email,
      password:password,
      confirmPassword:confirmPassword,
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
    return  this.$axios.get(`/account/${id}/information`)
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
  },

  add_read(_,{id,book_id}){
    return  this.$axios.post(`/account/${id}/add_my_library_read_list`,{
      book_id
    })
  },

  add_want_to_read(_,{id,book_id}){
    return  this.$axios.post(`/account/${id}/add_my_library_want_to_read_list`,{
      book_id
    })
  },

  add_favorite_book(_,{id,bookId}){
    return  this.$axios.post(`/account/${id}/add_favorite_book`,{
      bookId
    })
  },

  myFavoriteBooks(_,id){
    return  this.$axios.get(`/account/${id}/favorited_book_list`)
  },

  removeFavoriteBook(_,{id,book_id}){
    return  this.$axios.delete(`/account/${id}/remove_favorited_book/${book_id}`)      
  },
  
  wantToReadList(_,id){
    return  this.$axios.get(`/account/${id}/want_to_read_list`)
  },
  
  removeWantRead(_,{id,bookId}){   
    return  this.$axios.delete(`/account/${id}/remove_want_to_read/${bookId}`)      
  },

  readList(_,id){
    return  this.$axios.get(`/account/${id}/read_list`)
  },

  removeRead(_,{id,bookId}){   
    return  this.$axios.delete(`/account/${id}/remove_read/${bookId}`)      
  },
}

export const mutations = {}