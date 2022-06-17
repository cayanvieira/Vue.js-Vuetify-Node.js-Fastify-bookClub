<template>
    <v-container>
        <v-navigation-drawer app v-model="drawer"
            color="blue-grey darken-3 white--text"
            img
            class=".d-flex"       
        >
            <!-- Ajeitar imagem do usuario no futuro, aqui apenas para definir template-->
            <div class="d-flex justify-center">
                <v-list>
                    <v-list-item>
                        <v-list-item-avatar height="150px" width="150px" class="ma-auto">
                            <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
                        </v-list-item-avatar>
                    </v-list-item>               
                </v-list>
            </div>
        
            <div class="d-flex justify-center ma-3 font-italic text-decoration-underline">
                {{whoami.name.toUpperCase()}}
            </div>            
            <v-list-item-group>                
                <v-divider></v-divider>
                <v-list-item 
                    class=" color white--text"
                    to="/"
                >
                    <v-icon 
                        class="mr-2"
                        color="white"
                    >
                        mdi-home
                    </v-icon>
                    Página Inicial
                </v-list-item>
                <v-list-item 
                    :to="`/account/${whoami.id}/myclubs`"
                    class=" color white--text">
                    <v-icon 
                        class="mr-2"
                        color="white"
                    >
                        mdi-account-group
                    </v-icon>
                    Meus Clubes
                </v-list-item>
                <v-divider></v-divider>
                <!-- Lembrar de mudar a url -->
                <v-list-item
                    class=" color white--text"   
                    :to="`/account/${whoami.id}/mybooks`"
                >
                    <v-icon 
                        class="mr-2"
                        color="white"
                    >
                        mdi-book-open-page-variant
                    </v-icon>
                    Meus Livros
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item :to="`/${whoami.id}`" class=" color white--text">
                    <v-icon 
                        class="mr-2"
                        color="white"
                    >
                        mdi-account
                    </v-icon>
                    Dados Pessoais
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item 
                    v-if="whoami.administer"
                    class=" color white--text"
                    to="/adm"
                >
                    <v-icon 
                        class="mr-2"
                        color="white"
                    >
                        mdi-cog
                    </v-icon>
                  Funcionalidades de Administrador
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item 
                    class=" color white--text"
                    @click="logoff()"
                
                >
                    <v-icon 
                        class="mr-2"
                        color="white"
                    >
                        mdi-logout
                    </v-icon>
                    Sair
                </v-list-item>
                <v-divider></v-divider>
            </v-list-item-group> 
            
            <template v-slot:append>
                <div class="pa-2">                
                <v-btn 
                    block
                    @click="drawer = !drawer"    
                >
                    <v-icon color="blue-grey darken-3">mdi-close</v-icon>
                </v-btn>   
                </div>
                
            </template>           
           
        </v-navigation-drawer >
        <v-app-bar app            
            color="blue-grey darken-3 white--text d-flex justify-start"
            elevation="10"               
        >                   
            <v-btn v-if="!drawer"
                @click="drawer = !drawer"
                color="blue-grey darken-3 white--text"
                elevation="0" 
                fab
                small
            >
                <v-icon>mdi-menu</v-icon>
            </v-btn>
            <v-app-bar-title class="mx-1">Clube do livro</v-app-bar-title>
            <v-select                
                :items="typesSearch"
                class="background-color white typeSelect ml-16"
                rounded
                v-model="choosedType"                
                hide-details
                outlined
                filled 
            ></v-select>
            <v-text-field
                v-model="wordSearch"                   
                class="background-color white search ml-16"
                placeholder="Pesquise por um clube, livro ou usuário"
                rounded
                
                hide-details
                filled 
                append-icon="mdi-magnify"
                v-on:keyup.enter="search()"
            >            
            </v-text-field>
            <v-spacer></v-spacer> 
        </v-app-bar>
    </v-container>
</template>
<script>
export default {    
    data(){
        return{
            drawer : false,
            typesSearch:[
                "Livros",
                "Usuários",
                "Clubes",
            ],
            choosedType:"Livros",
            wordSearch:null
        }
    },
    computed:{
        whoami(){
            return this.$store.state.Auth.user
        }
    },
    methods:{
        async logoff(){                    
            await this.$router.go("/")
            window.localStorage.removeItem('user')
        },
        search(){
            const word = this.wordSearch
            this.$router.push(`/search/${word}`)
        }
    }
}
</script>
<style >
    .search{
      width: 400px;      
    }
    .typeSelect{
      width: 150px;
      margin-left: 200px;      
    }      
</style>