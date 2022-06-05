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
                            @click="addMyClubs()"         
                            class=" mr-3 rounded-xl"
                        >
                            <v-icon dark>
                                mdi-plus
                            </v-icon>
                            Adiconar a meus Clubes                       
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
                            v-model="descriptionForm.text"
                        ></v-textarea>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                            <v-btn class="mx-2" @click="descriptionCreate = !descriptionCreate, descriptionForm.text=null" >Cancelar</v-btn>
                            <v-btn class="mx-2" @click="subimitDescription" >Confirmar</v-btn>                
                    </v-card-actions>   
                </v-card>
            </v-dialog>            
        </v-main>   
           {{club}}
           {{whoami}}
    </v-app>
</template>
<script>
   export default {
        data(){
           return{
               club:null,
               descriptionCreate:false,
               descriptionForm:{
                   text:null
               }
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
                }
            })
           
        },
        methods:{
            getClub(){
                this.$store.dispatch('Club/get',this.$route.params.id)
                .then( (data) => this.club = data)
            },
            subimitDescription(){
                const description=this.descriptionForm.text
                const clubId = this.$route.params.id
                this.$store.dispatch('Club/description',{description,clubId})                
            },
            addMyClubs(){
                const accountId= this.whoami.id
                const clubId = this.$route.params.id
                this.$store.dispatch('Account/addFavoriteClub',{accountId,clubId})  
            }

        }
    }
    
    
</script>
