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
}

export const mutations = {}