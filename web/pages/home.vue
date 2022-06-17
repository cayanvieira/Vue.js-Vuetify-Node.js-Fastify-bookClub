<template>
    <v-app >
        
        <bar :administer='whoami.administer'></bar>
        <v-main class="mt-5">
            <div v-if="whoami">               
            </div>
            <v-card height="50px"
                class="d-flex justify-end align-center rounded-xl elevation-10 mx-5"
            >
                <v-divider vertical></v-divider> 
                <v-btn 
                    class="mx-2" 
                    elevation="0" 
                    color='white' 
                    @click="createClubDialog =! createClubDialog"
                >
                    <v-icon class="mr-2">mdi-plus</v-icon>
                    Criar novo clube do livro
                </v-btn>
                <v-divider vertical></v-divider>                               
            </v-card>
            <v-card class="mt-5 rounded-xl mx-5">
                <v-card-title class="d-flex justify-center ">Últimos Clubes Criados</v-card-title>
                <v-divider></v-divider>
                <v-slide-group                                         
                    show-arrows
                >
                   <v-slide-item  
                        v-for="(club,k) in clubs"
                        :key="k"                        
                    >
                       <v-card
                            @click="detail = club, clubLoginDialog = !clubLoginDialog"
                            width="250px"
                            class="mx-3 my-3 rounded-xl " 
                            color="blue-grey darken-3 white--text"
                            elevation="16"  
                        >
                            <v-card-title  class="ma-auto overflow-auto py-1"> {{club.name}}                               
                            </v-card-title>
                            
                            <v-divider color="white"></v-divider>
                            <v-row>
                                <v-col>
                                    <v-card-text class="py-1" color=" white--text">Livro Atual :  {{club.actual_book}}</v-card-text>                            
                                
                                    <v-card-text class="py-1" color=" white--text">Dono do Club : {{club.owner_name}}</v-card-text>
                                
                                    <v-card-text class="py-1" color=" white--text">Limite de participantes : {{club.group_limit}}</v-card-text>
                                
                                    <v-card-text  class="py-1" color=" white--text">Data de criação : {{club.date_create}}</v-card-text>
                                </v-col>
                            </v-row>
                        </v-card>  
                   </v-slide-item>     
                </v-slide-group>                         
            </v-card>   
        </v-main>
        <v-dialog v-model="createClubDialog" max-width="1000px">
            <v-card>
                <v-card-title>
                    Criar Clube do Livro
                </v-card-title>
                <v-divider color="black" class="mx-6"></v-divider>
                <v-text-field 
                    class="mt-5 mx-6" 
                    label="Nome do Clube"
                    v-model="formClub.name"
                ></v-text-field>
                <v-text-field 
                    class="mt-5 mx-6" 
                    label="Livro a ser lido pelo clube"
                    v-model="formClub.book"
                ></v-text-field>
                <v-text-field 
                    class="mt-5 mx-6" 
                    label="Limite de membros"
                    v-model="formClub.groupLimit"
                ></v-text-field>
                <v-text-field
                    type="password" 
                    class="mt-5 mx-6" 
                    label="Senha"
                    v-model="formClub.password"
                ></v-text-field>
                <v-text-field 
                    type="password" 
                    class="mt-5 mx-6" 
                    label="Confirmar Senha"
                    v-model="formClub.checkPassword"
                ></v-text-field>
                <div class="d-flex justify-end">
                    <v-btn class="my-2 mx-2" @click=" createClub(),createClubDialog = false">Confirmar</v-btn>
                    <v-btn class="my-2 mx-2" @click='createClubDialog = false'>Cancelar</v-btn>
                </div>                 
            </v-card>
            <v-dialog 
                v-model="alertWrongPassword"
                class="d-flex align-center"
                width="600px" 
                height="300px"
            >
                <v-card
                    width="600px" 
                    height="100px"
                    class="d-flex justify-center" 
                >
                    <v-card-title>
                        Senhas não conferem
                    </v-card-title>
                    <div class="d-flex align-center">
                        <v-btn
                            color="blue-grey darken-3 white--text rounded-xl"  
                            @click="alertWrongPassword = false, createClubDialog = true"
                        >
                            <v-icon >
                                mdi-close
                            </v-icon>
                        </v-btn>   
                    </div>
                </v-card>
            </v-dialog>
            <v-dialog 
                v-model="alertInteger"
                class="d-flex align-center"
                width="600px" 
                height="300px"
            >
                <v-card
                    width="600px" 
                    height="100px"
                    class="d-flex justify-center" 
                >
                    <v-card-title class="justify-center">
                        O número máximo de participantes <br>
                        deve ser um numeral
                    </v-card-title>
                    <div class="d-flex align-center">
                        <v-btn
                            color="blue-grey darken-3 white--text rounded-xl"  
                            @click="alertWrongPassword = false, createClubDialog = true"
                        >
                            <v-icon >
                                mdi-close
                            </v-icon>
                        </v-btn>   
                    </div>
                </v-card>
            </v-dialog>
        </v-dialog>
        <v-dialog v-model="registerBookDialog" 
                max-width="1000px"
            >
            <v-card>
                <v-card-title>
                    Registrar novo Livro
                </v-card-title>
                <v-divider color="black" class="mx-6"></v-divider>
                <v-text-field 
                    class="mt-5 mx-6" 
                    label="Título do Livro"
                    v-model="formBook.name"
                ></v-text-field>
                <v-text-field 
                    class="mt-5 mx-6" 
                    label="Edição"
                    v-model="formBook.edition"
                ></v-text-field>
                <v-text-field 
                    class="mt-5 mx-6" 
                    label="Gênero do Livro"
                    v-model="formBook.genre"
                ></v-text-field>
                <v-text-field 
                    class="mt-5 mx-6" 
                    label="Autor do livro"
                    v-model="formBook.author"
                ></v-text-field>
                <v-text-field 
                    class="mt-5 mx-6" 
                    label="Código de registro do livro"
                    v-model="formBook.code"
                ></v-text-field>
                <div class="d-flex justify-end">
                    <v-btn class="my-2 mx-2" @click=" registerBook(),registerBookDialog = false">Confirmar</v-btn>
                    <v-btn class="my-2 mx-2" @click='registerBookDialog = false'>Cancelar</v-btn>
                </div>                 
            </v-card>
        </v-dialog>
        <v-dialog
            v-if="detail" 
            v-model="clubLoginDialog"
            max-width="300px"            
        >
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
                        @click="clubLoginDialog = false"                    
                    >
                        Cancelar
                    </v-btn>                    
                </div>                
            </v-card>
        </v-dialog>
        <v-dialog 
            v-model="alertLoginInClub"
            class="d-flex align-center"
            width="600px" 
            height="300px"
        >
            <v-card
                width="600px" 
                height="100px"
                class="d-flex justify-center" 
            >
                <v-card-title>
                    Senha Incorreta
                </v-card-title>
                <div class="d-flex align-center">
                    <v-btn
                        color="blue-grey darken-3 white--text rounded-xl"  
                        @click="alertLoginInClub = false"
                    >
                        <v-icon >
                            mdi-close
                        </v-icon>
                    </v-btn>   
                </div>
            </v-card>
        </v-dialog>
        
    </v-app>
</template>
<script>
import bar from '/components/bar.vue'

  

export default {
    
  components: { bar },
    data(){
        return{            
            createClubDialog : false,
            registerBookDialog : false,
            alertWrongPassword : false,
            alertInteger: false,
            clubLoginDialog: false,
            detail:null,
            clubPassword:null,
            formClub: {
                name:null,
                book:null,
                groupLimit:null,
                password:null,
                checkPassword:null
            },
            formBook: {
                name:null,
                edition:null,
                genre:null,
                author:null,
                code:null
            },            
            clubs:[],
            intoClub:false,
            alertLoginInClub :false,
            drawer : false 
        }
    },
    computed:{
        whoami(){
            return this.$store.state.Auth.user
        },
       
    },
    created(){        
        this.$store.dispatch("Auth/sync")
            .then(user =>{
                if(!user){
                    this.$router.push(`/`)
                }else{
                    this.fetchNewClubs()
                }
            })
    },    
    methods:{
        createClub() {
            const params = {
                name:this.formClub.name,
                actualBook:this.formClub.book,
                groupLimit:this.formClub.groupLimit,
                ownerName:this.whoami.name,
                ownerId:this.whoami.id,
                password:this.formClub.password
            }
            params.groupLimit=parseInt(params.groupLimit)
            if(params.groupLimit){
                if(this.formClub.password === this.formClub.checkPassword && this.formClub.password != null){
                    this.$store.dispatch("Club/create",params)
                        .then(()=> this.$router.go())
                    }else{
                        this.alertWrongPassword = true
                    }      
            }else{
                this.alertInteger = true
            }
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
        fetchNewClubs() {
            this.$store.dispatch("Club/fetchNewClubs")
                .then(data => this.clubs = data)
        },             
    }
}
</script>