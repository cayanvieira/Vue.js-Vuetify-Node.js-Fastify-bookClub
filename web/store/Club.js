export const state = () => ({})

export const getters = {}

export const actions = { 
   
  async create(_,{name, dateCreate, owner, groupLimit,actualBook}) {
    return (await this.$axios.post('/club/create',{
        name:name,
        dateCreate:dateCreate,        
        owner:owner,
        groupLimit:groupLimit,
        actualBook:actualBook
    })
    ).data
  }, 
}

export const mutations = {}