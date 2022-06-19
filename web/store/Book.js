export const state = () => ({})

export const getters = {}

export const actions = { 
   
  async register(_,{name,edition,genre,author,code}) {
    return (await this.$axios.post('/book/register',{
        name : name,
        edition: edition, 
        genre:genre,
        author : author,        
        code : code
    })
    ).data
  },
  get(_){
    return this.$axios.get('/book/list')
      .then(response => response.data)
  },
  specificBook(_,id){
    return this.$axios.get(`/book/${id}`)
      .then(response => response.data)
  },
  newBooks(_){
    return this.$axios.get('/new_books')
      .then(response => response.data)
  },
  delete(_,id){
    return this.$axios.delete(`/book/${id}/delete`)
      .then(response => response.data)
  },
  update(_,{id,name,edition,genre,author,code}){
    this.$axios.put(`/book/${id}/update`,{
      name : name,
      edition: edition, 
      genre:genre,
      author : author,        
      code : code
    })
      .then(response => response.data)    
  }

}

export const mutations = {}