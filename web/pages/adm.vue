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

            <v-card class="mt-5 rounded-xl mx-5">
                <v-card-title class="d-flex justify-center ">Livros Cadastrados</v-card-title>
            </v-card> 
            
            <v-simple-table
                class="ma-5"               
                
            >
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th>
                                Nome
                            </th>
                            <th>
                                Gênero
                            </th>
                            <th>
                               Edição
                            </th>
                            <th>
                               Autor
                            </th>
                            <th>
                               Código
                            </th>
                             <th>
                               Ações
                            </th>  
                        </tr>    
                    </thead>
                    <tbody>
                        <tr
                            v-for="(item,i) in books"
                            :key="i"
                        >
                            <td>
                                {{item.name}}
                            </td>
                            <td>
                                {{item.genre}}
                            </td>
                            <td>
                                {{item.edition}}
                            </td>
                            <td>
                                {{item.author}}
                            </td>
                            <td>
                                {{item.code}}
                            </td>
                            <td width="150px">
                                <v-btn fab small color="blue-grey darken-3 white--text" @click="detail=item, updateBookDialog = !updateBookDialog"> 
                                    <v-icon>
                                        mdi-pencil
                                    </v-icon>
                                </v-btn>
                                <v-btn fab small color="blue-grey darken-3 white--text" @click="detail=item, deleteDialog = !deleteDialog "> 
                                    <v-icon>
                                        mdi-close
                                    </v-icon>
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>    
                </template>                   
            </v-simple-table>                      
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
                    <v-btn class="my-2 mx-2" @click=" registerBook()">Confirmar</v-btn>
                    <v-btn class="my-2 mx-2" @click='registerBookDialog = false'>Cancelar</v-btn>
                </div>                 
            </v-card>
        </v-dialog>

        <v-dialog v-model="updateBookDialog" 
                max-width="1000px"
            >
            <v-card>
                <v-card-title>
                    Atualizar Livro
                </v-card-title>
                <v-divider color="black" class="mx-6"></v-divider>
                <v-text-field 
                    class="mt-5 mx-6" 
                    label="Título do Livro"
                    v-model="updateBookdata.name"
                ></v-text-field>
                <v-text-field 
                    class="mt-5 mx-6" 
                    label="Edição"
                    v-model="updateBookdata.edition"
                ></v-text-field>
                <v-text-field 
                    class="mt-5 mx-6" 
                    label="Gênero do Livro"
                    v-model="updateBookdata.genre"
                ></v-text-field>
                <v-text-field 
                    class="mt-5 mx-6" 
                    label="Autor do livro"
                    v-model="updateBookdata.author"
                ></v-text-field>
                <v-text-field 
                    class="mt-5 mx-6" 
                    label="Código de registro do livro"
                    v-model="updateBookdata.code"
                ></v-text-field>
                <div class="d-flex justify-end">
                    <v-btn class="my-2 mx-2" @click="updateBook(detail.id)">Confirmar</v-btn>
                    <v-btn class="my-2 mx-2" @click='updateBookDialog = !updateBookDialog'>Cancelar</v-btn>
                </div>                 
            </v-card>
        </v-dialog>

        <v-dialog v-model="deleteDialog" width="auto" >
            <v-card >
                <v-card-title>
                    Tem certeza que deseja deletar o Livro? 
                </v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="ma-3" @click="deleteDialog=false" color="blue-grey darken-3 white--text">Cancelar</v-btn>
                    <v-btn class="ma-3" @click=" deleteBook(detail.id)" color="blue-grey darken-3 white--text">Deletar</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
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
            },
            updateBookdata: {
                name:null,
                edition:null,
                genre:null,
                author:null,
                code:null
            },
            deleteDialog:false,
            books:[],
            detail:null,
            updateBookDialog:false
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
                    this.get()
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
        },
        get(){
            this.$store.dispatch('Book/get')
                .then((data)=> this.books=data )  
        },
        deleteBook(id){            
            this.$store.dispatch('Book/delete',id)
            .then(()=> this.$router.go())                  
        },
        updateBook(book_id){
            const params = {
                id:book_id,
                name:this.updateBookdata.name,
                edition:this.updateBookdata.edition,
                genre:this.updateBookdata.genre,
                author:this.updateBookdata.author,
                code:this.updateBookdata.code
            }
            this.$store.dispatch('Book/update',params)
            .then(()=> this.$router.go())   
        }           
    }
}
</script>