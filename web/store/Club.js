export const state = () => ({})

export const getters = {}

export const actions = {

  async create(_, { name, dateCreate, ownerName, ownerId, groupLimit, actualBook, password }) {
    return (await this.$axios.post('/club/create', {
      name: name,
      dateCreate: dateCreate,
      owner_name: ownerName,
      owner_id: ownerId,
      groupLimit: groupLimit,
      actualBook: actualBook,
      password: password
    })
    ).data
  },

  login(storeClub, { clubId, password }) {
    return this.$axios
      .post('/club/login', {
        clubId: clubId,
        password: password
      })
      .then(response => response.data)
  },

  async fetch() {
    return (await this.$axios.get('/club')
    ).data
  },

  async get(_, id) {
    return (await this.$axios.get(`/club/${id}`)
    ).data
  },

  async fetchNewClubs() {
    try {
      return (await this.$axios.get('/club/newclubs'))
        .data
    } catch (error) {
      console.log('Erro fetchNewClubs')
      return {success:false,message:"Deu erro na Api"}
    }
    
  },

  description(_, { clubId, description }) {
    return this.$axios
      .put('/club/create_description',
        {
          description: description,
          clubId: clubId
        }
      )
      .then(response => response.data)
  },

  updateDescription(_,{clubId, description}){
    return this.$axios.put(`/club/${clubId}/update_description`,
      {
        description: description,
      }
    ).then(response => response.data)
  },

  deleteDescription(_,id){
    return this.$axios.delete(`/club/${id}/delete_description`)
  },

  deleteClub(_,club_id){
    return this.$axios.delete(`/club/${club_id}/delete`)
  },

  updatePassword(_,{id,newPassword,oldPassword}){
    return this.$axios.put(`/club/${id}/update_password`,{
      new_password:newPassword,
      password:oldPassword
    })
  }
}

export const mutations = {}