<template>
    <v-app  v-if="whoami.administer">        
        <bar></bar>
        <v-main class="mt-5">
            <div>               
            </div>
            <v-card height="50px"
                class="d-flex justify-end align-center rounded-xl elevation-10 mx-5"
            >
                <v-divider vertical></v-divider>
                <v-btn 
                    class="mx-2" 
                    elevation="0" 
                    color='white'
                    @click="registerBookDialog = !registerBookDialog"
                >
                    <v-icon class="mr-2">mdi-plus</v-icon>
                    Cadastrar novo livro
                </v-btn>                 
            </v-card>          
        </v-main>
       
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
    </v-app>
    <v-app  v-else>
        <v-main class="d-flex justify-center align-center blue-grey darken-3">
            <div class="d-flex justify-center">                
                    <v-btn to="/home">
                        voltar para a home 
                    </v-btn>               
            </div>        
        </v-main>
       
        
    </v-app>
</template>
<script>
import bar from '/components/bar.vue'

  

export default {
    
  components: { bar },
    data(){
        return{            
            registerBookDialog : false,
            formBook: {
                name:null,
                edition:null,
                genre:null,
                author:null,
                code:null
            }
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
                }
            })
    },    
    methods:{        
        registerBook() {
            const params = {
                name:this.formBook.name,
                edition:this.formBook.edition,
                genre:this.formBook.genre,
                author:this.formBook.author,
                code:this.formBook.code
            }
            this.$store.dispatch("Book/register",params)
            .then(()=> this.$router.go())           
        }           
    }
}
</script>