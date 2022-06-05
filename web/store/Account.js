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

  async addFavoriteClub(_,{clubId,accountId}){
    return await this.$axios.post('/account/add_favorite_club',
      {
        clubId:clubId,
        accountId:accountId
      }
    ).data
  }
}

export const mutations = {}