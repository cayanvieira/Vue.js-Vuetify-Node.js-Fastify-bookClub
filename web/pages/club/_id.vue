<template>
    <v-app v-if="club">
        <bar></bar>
        <v-main>
            <v-card 
                class="mx-3 mt-2" 
                color="blue-grey darken-3 white--text"
            >
                <v-row >
                    <v-col>
                        <v-card-title
                            class="pa-0 ma-3"                
                            color=" white--text"
                        >
                            {{club.name}}
                        </v-card-title>
                        <v-card-subtitle
                            class="pa-0 ma-2 ml-3 mt-1"  
                            color=" white--text"
                        >
                            {{club.actual_book}}
                        </v-card-subtitle>
                    </v-col>
                    <v-col cols="6" align='end'>
                        <v-btn 
                            v-if="!favorited"
                            @click="addMyFavoriteClubs()"                                     
                            class=" mr-3 rounded-xl"
                        >
                            <v-icon dark>
                                mdi-plus
                            </v-icon>
                            Adiconar a meus Clubes Favoritos                     
                        </v-btn>
                        <v-btn
                            v-else 
                            @click="removeFavoriteClub()"         
                            class=" mr-3 rounded-xl"
                        >
                            <v-icon dark>
                                mdi-close
                            </v-icon>
                            Retirar dos meus Clubes Favoritos                      
                        </v-btn>
                        <v-card-text                
                            color=" white--text"
                        >
                        Dono do club: {{club.owner_name}}
                        </v-card-text>               
                    </v-col> 
                </v-row>
                <v-divider color="white"></v-divider>
                <div v-if="club.description">            
                    <v-card-title>
                        Descrição do Clube:
                        <v-spacer></v-spacer>
                        <v-btn 
                            class="rounded-xl"
                            @click="updateDescriptionDialog = !updateDescriptionDialog"
                        >
                            <v-icon class="mr-1">
                                mdi-pencil
                            </v-icon> Atualizar
                        </v-btn>
                        <v-btn 
                            @click="deleteDescription()" 
                            class="ml-2 rounded-xl"
                        >
                            <v-icon>
                              mdi-delete 
                            </v-icon>
                            Deletar
                        </v-btn>
                    </v-card-title>            
                    <v-card-subtitle               
                    >
                        {{club.description}}
                    </v-card-subtitle>                
                </div>
                <div v-else>            
                    <v-list>
                        
                        <v-list-item @click="descriptionCreate = !descriptionCreate">
                            <v-icon>
                                mdi-plus
                            </v-icon>
                            <v-list-item-content>
                                <v-list-item-title>Criar descrição para o Grupo</v-list-item-title>
                            </v-list-item-content>                     
                            
                        </v-list-item>
                        
                    </v-list>                
                </div>          
            </v-card>
            <v-dialog
                v-model="descriptionCreate"
                width=500px
            >
                <v-card>
                    <v-card-text class="pt-8">
                            <v-textarea
                                label=' Escreva algo sobre o grupo.'
                                hide-details                   
                                outlined
                                v-model="descriptionForm.newDescription"
                        ></v-textarea>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                            <v-btn class="mx-2" @click="descriptionCreate = !descriptionCreate, descriptionForm.text=null" >Cancelar</v-btn>
                            <v-btn class="mx-2" @click="subimitDescription" >Confirmar</v-btn>                
                    </v-card-actions>   
                </v-card>
            </v-dialog>  
            <v-dialog 
                width=500px
                v-model="updateDescriptionDialog"
            >
                <v-card>
                    <v-card-text class="pt-8" >
                        <v-textarea
                            label='Nova descrição'
                            hide-details
                            outlined
                            v-model="descriptionForm.updateDescription"
                        ></v-textarea>                   
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                            <v-btn class="mx-2" @click="updateDescription()">Atualizar</v-btn>
                            <v-btn class="mx-2" @click="updateDescriptionDialog = false">Cancelar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>                                   
        </v-main>     
  
    </v-app>
</template>
<script>
   export default {
        data(){
           return{
               club:null,
               descriptionCreate:false,
               descriptionForm:{
                   newDescription:null,
                   updateDescription:null
               },
               favorited:null,
               updateDescriptionDialog:false,
           }
        },
        computed:{
            whoami(){
                return this.$store.state.Auth.user
            },
        },
        created(){
            //verificar se o usuario tem acesso ao club
            this.$store.dispatch("Auth/sync")
            .then(user =>{
                if(!user){
                    this.$router.push(`/`)
                }else{
                    this.getClub()
                    this.checkFavoriteClub()   
                }   
            })
           
        },
        methods:{
            getClub(){
                this.$store.dispatch('Club/get',this.$route.params.id)
                .then( (data) => this.club = data)
            },
            subimitDescription(){
                const description=this.descriptionForm.newDescription
                const clubId = this.$route.params.id
                this.$store.dispatch('Club/description',{description,clubId})
                .then(()=>this.$router.go())                
            },
            addMyFavoriteClubs(){
                const accountId= this.whoami.id
                const clubId = this.$route.params.id
                this.$store.dispatch('Account/addFavoriteClub',{accountId,clubId}) 
                .then(()=>this.$router.go())  
            },
            checkFavoriteClub(){
                const accountId= this.whoami.id
                const clubId = this.$route.params.id
                this.$store.dispatch('Account/checkFavoriteClub',{accountId,clubId})
                .then((response)=> this.favorited = response.data)
                    
            },
            removeFavoriteClub(){
                const accountId = this.whoami.id
                const clubId = this.$route.params.id
                this.$store.dispatch('Account/removeFavoriteClub',{accountId, clubId})
                .then(()=>this.$router.go())                 
            },
            updateDescription(){
                const clubId = this.$route.params.id
                const description = this.descriptionForm.updateDescription
                this.$store.dispatch('Club/updateDescription',{clubId, description})
                .then(()=>this.$router.go())
            },
            deleteDescription(){
                const clubId = this.$route.params.id
                this.$store.dispatch('Club/deleteDescription',clubId)
                .then(()=>this.$router.go())
            }
        }
    }
    
    
</script>
