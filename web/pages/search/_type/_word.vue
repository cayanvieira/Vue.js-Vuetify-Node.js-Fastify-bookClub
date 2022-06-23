<template>
  <v-app>
    <bar></bar>   
    <v-main v-if="$route.params.type ==='Livros'">            
      <v-card class="ma-5">
        <v-card-title v-if="!result[0]">Nada foi Encontrado</v-card-title>
        <v-div v-if="result[0]">
          <v-simple-table >
            <template v-slot:default>
              <thead>
                <tr >
                  <th class="text-center">
                    #
                  </th>
                  <th class="text-center">
                    Nome do livro 
                  </th>
                  <th class="text-center">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item,i) in result"
                  :key="i"
                >
                  <td class="text-center">
                    <v-btn  fab small color="blue-grey darken-3 white--text rounded-xl" :to="`/book/${item.id}`">
                      <v-icon>
                          mdi-link
                      </v-icon>
                    </v-btn>
                  </td >
                  <td class="text-center">
                    {{item.name}}
                  </td>
                  <td class="text-center"> 
                    <v-btn small fab></v-btn>
                    <v-btn small fab></v-btn>
                    <v-btn small fab></v-btn>
                  </td>
                
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-div>
      </v-card>  
    </v-main>
    <v-main v-if="$route.params.type ==='Usuários'">             
        <v-card class="ma-5">
          <v-card-title v-if="!result[0]">Nada foi Encontrado</v-card-title>
          <v-div v-if="result[0]"> 
          <v-simple-table v-if="result">
            <template v-slot:default>
              <thead>
                <tr >
                  <th class="text-center">
                    #
                  </th>
                  <th class="text-center">
                    Nome do Usúario 
                  </th>
                  <th class="text-center">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item,i) in result"
                  :key="i"
                >
                  <td class="text-center">
                    <v-btn   disabled fab small color="blue-grey darken-3 white--text rounded-xl">
                      <v-icon>
                          mdi-link
                      </v-icon>
                    </v-btn>
                  </td >
                  <td class="text-center">
                    {{item.name}}
                  </td>
                  <td class="text-center"> 
                    <v-btn small fab></v-btn>
                    <v-btn small fab></v-btn>
                    <v-btn small fab></v-btn>
                  </td>                
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-div>
      </v-card> 
    </v-main>
    <v-main v-if="$route.params.type ==='Clubes'">        
      <v-card class="ma-5">
        <v-card-title v-if="!result[0]">Nada foi Encontrado</v-card-title>
        <v-div v-if="result[0]"> 
          <v-simple-table v-if="result">
            <template v-slot:default>
              <thead>
                <tr >
                  <th class="text-center">
                    #
                  </th>
                  <th class="text-center">
                    Nome do Usúario 
                  </th>
                  <th class="text-center">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item,i) in result"
                  :key="i"
                >
                  <td class="text-center">
                    <v-btn  fab small color="blue-grey darken-3 white--text rounded-xl" @click="detail=item,loginDialog = !logindialog">
                      <v-icon>
                        mdi-link
                      </v-icon>
                    </v-btn>
                  </td >
                  <td class="text-center">
                    {{item.name}}
                  </td>
                  <td class="text-center"> 
                    <v-btn small fab></v-btn>
                    <v-btn small fab></v-btn>
                    <v-btn small fab></v-btn>
                  </td>                
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-div>
      </v-card> 
    </v-main>
    <v-dialog v-model="loginDialog" v-if="detail"  width="300px">
      <v-card
          width="300px"                
      >
          <v-card-subtitle class="d-flex justify-center pa-0">Entrar no Club</v-card-subtitle>
          <v-divider></v-divider>
          <v-card-title class="justify-center">
              {{detail.name.toUpperCase()}} 
          </v-card-title>
          <v-divider></v-divider>                
          <v-text-field
              type="password"
              class="mt-5 mx-5 d-flex"                    
              label="Digite a senha do Club"
              outlined
              v-model="clubPassword"  
          >                    
          </v-text-field>                
          <div class="justify-center"> 
              <v-btn 
                  class="mb-3 mx-5 pa-0"
                  width="100px"
                  @click="loginInClub()"                                                
              >
                  Entrar
              </v-btn>
              <v-btn 
                  class="mb-3 mx-5 pa-0"
                  width="100px"
                  @click="loginDialog = false"                    
              >
                  Cancelar
              </v-btn>                    
          </div>                
      </v-card>
  </v-dialog>
  </v-app>
</template>

<script>
import bar from '../../../components/bar.vue'
export default {
  components: { bar },
  data(){
    return{
      result:[],
      loginDialog:false,
      detail:null,
      clubPassword:null
    }
  },
  created(){        
        this.$store.dispatch("Auth/sync")
          .then(user =>{
              if(!user){
                  this.$router.push(`/`)
              }else{
                  this.search()
              }
          }
        )
    },
    methods:{
      search(){
       const type = this.$route.params.type
       const word = this.$route.params.word
        this.$store.dispatch("Search/fetch",{type,word})
          .then(data => this.result= data)
      },
      async loginInClub(){
        const params={ 
            clubId : this.detail.id,
            password : this.clubPassword
        }
        this.intoClub = await this.$store.dispatch("Club/login",params)
        
        if (this.intoClub) {    
            return this.$router.push(`/club/${this.detail.id}`)
        }else{
            return this.alertLoginInClub = false
        }            
      },
    }  
}
</script>

<style>

</style>