<template>
  <v-app>
    <bar></bar>
    <v-main v-if="book">
        
        <div class="d-flex justify-center align-center">
            <v-card
            class="d-flex justify-center  rounded-xl "
            width="500px"
            height="auto"
        >
            <v-col>
                <v-row class="d-flex justify-center align-center">
                    <v-card-title>{{book.name}}</v-card-title>
                </v-row>
                <v-row  class="d-flex justify-center">
                    <v-img
                    class="my-12"
                    src="../img/sem-imagem.png"                   
                    color="red"
                    max-height="400px"
                    max-width="300px"
                    >
                    </v-img> 
                </v-row>
                <v-row class="d-flex justify-center align-center">
                    <v-card-subtitle>Autor(a): {{book.author}}</v-card-subtitle>
                    <v-card-subtitle>Genero: {{book.genre}}</v-card-subtitle>
                    <v-card-subtitle>Edição:{{ book.edition}}</v-card-subtitle>
                </v-row>                
                <v-card-actions class="ma-5">
                    <v-spacer></v-spacer>
                    <v-btn fab>
                        <v-icon>mdi-heart</v-icon>                
                    </v-btn>
                        <v-btn fab>
                        <v-icon>mdi-heart</v-icon>                
                    </v-btn>
                        <v-btn fab>
                        <v-icon>mdi-heart</v-icon>                
                    </v-btn>
                        <v-btn fab>
                        <v-icon>mdi-heart</v-icon>                
                    </v-btn>
                        <v-btn fab>
                        <v-icon>mdi-heart</v-icon>                
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>  
            </v-col>      
        </v-card>
        </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
    data(){
        return {
            book:null
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
                    this.getBook()
                }
            })
    },
    methods:{
        getBook(){
            const id = this.$route.params.id
            this.$store.dispatch('Book/specificBook',id)
            .then(data => this.book = data)
        }
    }   
}
</script>

<style>

</style>