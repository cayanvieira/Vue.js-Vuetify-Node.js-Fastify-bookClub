
<template>
    <v-app>
        <bar> </bar>
        <v-main class="mt-5">
            <v-card class="mt-5 rounded-xl mx-5">
                <v-card-title class="d-flex justify-center ">Livros Favoritos</v-card-title>
            </v-card> 
            <v-card class='ma-5'>                
                <v-simple-table  class="ma-5 mb-16"  >
                    <template v-slot:default>
                        <thead>
                            <tr v-if="!favoriteBooks[0]" class="text-center"> Nenhum item adicionado a lista</tr>
                            <tr v-else>
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
                                    Ações
                                </th>  
                            </tr>    
                        </thead>
                        <tbody>
                            <tr v-for="item,i in favoriteBooks"
                                :key="i"    
                            >
                                <td class="text-center">
                                    <v-btn 
                                        color="blue-grey darken-3 white--text"
                                        fab
                                        small
                                        :to="`/book/${item.id}`"
                                    >
                                        <v-icon>
                                            mdi-link
                                        </v-icon>
                                    </v-btn>
                                </td>
                                <td  class="text-center">
                                    {{item.name}}
                                </td>
                                <td  class="text-center">
                                    {{item.genre}}
                                </td>
                                <td  class="text-center">
                                    {{item.edition}}
                                </td>
                                <td  class="text-center">
                                    {{item.author}}
                                </td>
                                <td  class="text-center"> 
                                    <v-btn fab small  @click="removeFavorite(item.id)" color="blue-grey darken-3 white--text"> 
                                        <v-icon>
                                            mdi-close
                                        </v-icon>
                                    </v-btn>
                                </td >
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card>
            <v-card class="mt-5 rounded-xl mx-5">
                <v-card-title class="d-flex justify-center ">Gostaria de Ler</v-card-title>
            </v-card>
            <v-card class='ma-5'>                
                <v-simple-table  class="ma-5 mb-16"  >
                    <template v-slot:default>
                        <thead>
                            <tr v-if="!wantToRead[0]" class="text-center"> Nenhum item adicionado a lista</tr>
                            <tr v-else>
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
                                    Ações
                                </th>  
                            </tr>    
                        </thead>
                        <tbody>
                            <tr v-for="item,i in wantToRead"
                                :key="i"    
                            >
                                <td class="text-center">
                                    <v-btn
                                        color="blue-grey darken-3 white--text" 
                                        fab
                                        small
                                        :to="`/book/${item.book_id}`"
                                    >
                                        <v-icon>
                                            mdi-link
                                        </v-icon>
                                    </v-btn>
                                </td>
                                <td  class="text-center">
                                    {{item.name}}
                                </td>
                                <td  class="text-center">
                                    {{item.genre}}
                                </td>
                                <td  class="text-center">
                                    {{item.edition}}
                                </td>
                                <td  class="text-center">
                                    {{item.author}}
                                </td>
                                <td  class="text-center"> 
                                    <v-btn fab small  @click=" removeWantRead(item.book_id)" color="blue-grey darken-3 white--text"> 
                                        <v-icon>
                                            mdi-close
                                        </v-icon>
                                    </v-btn>
                                </td >
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card>
              <v-card class="mt-5 rounded-xl mx-5">
                <v-card-title class="d-flex justify-center ">Livros  Lidos</v-card-title>
            </v-card>
            <v-card class='ma-5'>                
                <v-simple-table  class="ma-5 mb-16"  >
                    <template v-slot:default>
                        <thead>
                            <tr v-if="!read[0]" class="text-center"> Nenhum item adicionado a lista</tr>
                            <tr v-else>
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
                                    Ações
                                </th>  
                            </tr>    
                        </thead>
                        <tbody>
                            <tr v-for="item,i in read"
                                :key="i"    
                            >
                                <td class="text-center">
                                    <v-btn 
                                        color="blue-grey darken-3 white--text"
                                        fab
                                        small
                                        :to="`/book/${item.book_id}`"
                                    >
                                        <v-icon>
                                            mdi-link
                                        </v-icon>
                                    </v-btn>
                                </td>
                                <td  class="text-center">
                                    {{item.name}}
                                </td>
                                <td  class="text-center">
                                    {{item.genre}}
                                </td>
                                <td  class="text-center">
                                    {{item.edition}}
                                </td>
                                <td  class="text-center">
                                    {{item.author}}
                                </td>
                                <td  class="text-center"> 
                                    <v-btn 
                                        fab 
                                        small  
                                        @click=" removeRead(item.book_id)"
                                        color="blue-grey darken-3 white--text"
                                    > 
                                        <v-icon>
                                            mdi-close
                                        </v-icon>
                                    </v-btn>
                                </td >
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card>                                            
        </v-main>       
    </v-app>
</template>
<script>
    import bar from "/components/bar.vue"
    export default { 
        components:{bar},
        data(){
            return {
               favoriteBooks:[],
               wantToRead:[],
               read:[]
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
                        this.myFavoriteBooks()
                        this. booksWantToRead()
                        this.booksRead()
                    }
                })
        },  
        methods:{
            myFavoriteBooks(){
                const id = this.whoami.id
                this.$store.dispatch('Account/myFavoriteBooks',id)
                .then(response=> this.favoriteBooks = response.data)
            },
            removeFavorite(bookId){
                const id = this.whoami.id
                const book_id= bookId                
                this.$store.dispatch('Account/removeFavoriteBook',{id,book_id})
                .then(()=> this.$router.go())
            },
            booksWantToRead(){
                const id = this.whoami.id
                this.$store.dispatch('Account/wantToReadList',id)
                .then(response=> this.wantToRead = response.data)
            },
            removeWantRead(book_id){
                const id = this.whoami.id
                const bookId= book_id                                
                this.$store.dispatch('Account/removeWantRead',{id,bookId})
                .then(()=> this.$router.go())
                
            },
            booksRead(){
                const id = this.whoami.id
                this.$store.dispatch('Account/readList',id)
                .then(response=> this.read = response.data)
            },
            removeRead(book_id){
                const id = this.whoami.id
                const bookId= book_id                                
                this.$store.dispatch('Account/removeRead',{id,bookId})
                .then(()=> this.$router.go())
            },    
        }
    } 
</script>