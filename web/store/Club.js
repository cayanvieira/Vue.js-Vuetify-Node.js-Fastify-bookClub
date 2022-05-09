export const state = () => ({})

export const getters = {}

export const actions = { 
   
  async create(_,{name, dateCreate, owner, groupLimit,actualBook,password}) {
    return (await this.$axios.post('/club/create',{
        name:name,
        dateCreate:dateCreate,        
        owner:owner,
        groupLimit:groupLimit,
        actualBook:actualBook,
        password:password
    })
    ).data
  },

  login(storeClub,{clubId, password}) {
    return this.$axios
      .post('/club/login',{
        clubId:clubId,
        password:password   
      })
      .then(response => response.data)
  },
   
  async fetch() {
    return (await this.$axios.get('/club')
    ).data
  },

  async fetchNewClubs() {
    return (await this.$axios.get('/newclubs')
    ).data
  },  
}

export const mutations = {}