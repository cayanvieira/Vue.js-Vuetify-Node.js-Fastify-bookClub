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
                                <v-btn  small color="blue-grey darken-3 white--text rounded-xl" @click="detail=item, updateBookDialog = !updateBookDialog"> 
                                    Já li
                                </v-btn>
                                <v-btn  small color="blue-grey darken-3 white--text rounded-xl" @click="detail=item, deleteDialog = !deleteDialog "> 
                                    Quero ler
                                </v-btn>
                                <v-btn  small color="blue-grey darken-3 white--text rounded-xl" @click="detail=item, deleteDialog = !deleteDialog "> 
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
                                <v-btn  small color="blue-grey darken-3 white--text rounded-xl" @click="detail=item, updateBookDialog = !updateBookDialog"> 
                                    Já li
                                </v-btn>
                                <v-btn  small color="blue-grey darken-3 white--text rounded-xl" @click="detail=item, deleteDialog = !deleteDialog "> 
                                    Quero ler
                                </v-btn>
                                <v-btn  small color="blue-grey darken-3 white--text rounded-xl" @click="detail=item, deleteDialog = !deleteDialog "> 
                                    Favoritar livro
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>    
                </template>                   
            </v-simple-table>       
        </v-main>
    </v-app>
</template>

<script>
import bar from '../components/bar.vue'
export default {
  components: { bar },
    data(){
        return {
            books:[],
            newBooks:[]
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
                .then((data)=> this.books=data )  
        },
        fetchNewBooks(){
            this.$store.dispatch('Book/newBooks')
                .then((data)=> this.newBooks=data )  
        },
    }
}
</script>

<style>

</style>