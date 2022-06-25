<template>
    <v-app>
        <v-main class="mt-5">
            <bar></bar>
            <v-card class="mt-5 rounded-xl mx-5">
                <v-card-title class="d-flex justify-center ">Adicionados Recentemente</v-card-title>
            </v-card> 
             <v-simple-table
                class="ma-5 mb-16"   
            >
                <template v-slot:default>
                    <thead>
                        <tr>
                             <th class="text-center">
                                #
                            </th>
                            <th class="text-center">
                                Nome
                            </th>
                            <th class="text-center">
                                Gênero
                            </th >
                            <th class="text-center">
                               Edição
                            </th>
                            <th class="text-center">
                               Autor
                            </th>
                            <th class="text-center">
                               Código
                            </th>
                             <th class="text-center">
                               Ações
                            </th>  
                        </tr>    
                    </thead>
                    <tbody>
                        
                    </tbody>
                    <tbody>
                        <tr
                        v-for="(item,i) in newBooks"
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
                                {{item.genre}}
                            </td>
                            <td class="text-center">
                                {{item.edition}}
                            </td>
                            <td class="text-center">
                                {{item.author}}
                            </td>
                            <td class="text-center">
                                {{item.code}}
                            </td>
                            <td class="text-center">
                                <v-btn  
                                    small 
                                    color="blue-grey darken-3 white--text rounded-xl" 
                                    @click="addRead(item.id),addSuccess=!addSuccess"> 
                                    Já li
                                </v-btn>
                                <v-btn  
                                    small 
                                    color="blue-grey darken-3 white--text rounded-xl" 
                                    @click="addWantToRead(item.id),addSuccess=!addSuccess"> 
                                    Quero ler
                                </v-btn>
                                <v-btn  
                                    small 
                                    color="blue-grey darken-3 white--text rounded-xl" 
                                    @click=" addFavoriteBook(item.id),addSuccess=!addSuccess"> 
                                    Favoritar livro
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>    
                </template>                   
            </v-simple-table>   

            <v-card class="mt-5 rounded-xl mx-5">
                <v-card-title class="d-flex justify-center ">Livros Cadastrados</v-card-title>
            </v-card> 
            
            <v-simple-table
                class="ma-5"               
                
            >
                <template v-slot:default>
                    <thead>
                        <tr>
                             <th class="text-center">
                                #
                            </th>
                            <th class="text-center">
                                Nome
                            </th>
                            <th class="text-center">
                                Gênero
                            </th >
                            <th class="text-center">
                               Edição
                            </th>
                            <th class="text-center">
                               Autor
                            </th>
                            <th class="text-center">
                               Código
                            </th>
                             <th class="text-center">
                               Ações
                            </th>  
                        </tr>    
                    </thead>
                    <tbody>
                        <tr
                        v-for="(item,i) in books"
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
                                {{item.genre}}
                            </td>
                            <td class="text-center">
                                {{item.edition}}
                            </td>
                            <td class="text-center">
                                {{item.author}}
                            </td>
                            <td class="text-center">
                                {{item.code}}
                            </td>
                            <td class="text-center">
                                 <v-btn  
                                    small 
                                    color="blue-grey darken-3 white--text rounded-xl" 
                                    @click="addRead(item.id),addSuccess=!addSuccess"> 
                                    Já li
                                </v-btn>
                                <v-btn  
                                    small 
                                    color="blue-grey darken-3 white--text rounded-xl" 
                                    @click="addWantToRead(item.id),addSuccess=!addSuccess"> 
                                    Quero ler
                                </v-btn>
                                <v-btn  
                                    small 
                                    color="blue-grey darken-3 white--text rounded-xl" 
                                    @click=" addFavoriteBook(item.id),addSuccess=!addSuccess"> 
                                    Favoritar livro
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>    
                </template>                   
            </v-simple-table>                  
        </v-main>
        <v-dialog v-model="addSuccess"  
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
                       Adicionado com Sucesso
                    </v-card-title>
                    <div class="d-flex align-center">
                        <v-btn
                            color="blue-grey darken-3 white--text rounded-xl"  
                            @click="addSuccess = false"
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
import bar from '../components/bar.vue'
export default {
  components: { bar },
    data(){
        return {
            books:[],
            newBooks:[],
            addSuccess:false
        }
    },
    computed:{
        whoami(){
            return this.$store.state.Auth.user
        }
    },
    created(){        
        this.$store.dispatch("Auth/sync")
            .then(user =>{
                if(!user){
                    this.$router.push(`/`)
                }else{
                    this.get()
                    this.fetchNewBooks()
                }
            })
    },  
    methods:{

        get(){
            this.$store.dispatch('Book/get')
                .then((data) => this.books=data )  
        },
        fetchNewBooks(){
            this.$store.dispatch('Book/newBooks')
                .then((data) => this.newBooks=data )  
        },
        addRead(bookId){
            const id = this.whoami.id
            const book_id=bookId
            this.$store.dispatch('Account/add_read',{id,book_id})
             .then((data) => data )
        },
        addWantToRead(bookId){
            const id = this.whoami.id
            const book_id=bookId
            this.$store.dispatch('Account/add_want_to_read',{id,book_id})
             .then((data) => data )
        },
        addFavoriteBook(bookId){
            const id = this.whoami.id
            const book_id=bookId
            this.$store.dispatch('Account/add_favorite_book',{id,bookId})
             .then((data) => data )
        }        
    }
}
</script>

<style>

</style>