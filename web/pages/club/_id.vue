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
                        class="mainTitle"                
                        color=" white--text"
                    >
                        {{club.name}}
                    </v-card-title>
                    <v-card-subtitle
                        color=" white--text"
                    >
                        {{club.actual_book}}
                    </v-card-subtitle>
                </v-col>
                <v-col cols="6" align='end'>
                    
                    <v-card-text                
                        color=" white--text"
                    >
                    Dono do club: {{club.owner}}
                    </v-card-text>               
                </v-col> 
            </v-row>
            <v-divider></v-divider>
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
                <v-list class=" pa-0 ma-0">
                    
                    <v-list-item @click="descriptionText = !descriptionText">
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
            v-model="descriptionText"
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
                    <v-btn class="mx-2" @click="descriptionText = !descriptionText, descriptionForm.text=null" >Cancelar</v-btn>
                    <v-btn class="mx-2" >Confirmar</v-btn>                
               </v-card-actions>
                
                
            </v-card>
        </v-dialog>
        </v-main>
        
   {{club}}
   {{descriptionForm.text}}
    
    </v-app>
</template>
<script>
   export default {
        data(){
           return{
               club:null,
               descriptionText:false,
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
           this.getClub()
        },
        methods:{
            getClub(){
                this.$store.dispatch('Club/get',this.$route.params.id)
                .then( (data) => this.club = data)
            },
            subimitDescription(){
                //criar beckend
            }
        }
    }
    
    
</script>
<style>
    
</style>