<template>
    <v-container>
        <v-navigation-drawer app v-if="drawer"
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
                <v-list-item class=" color white--text">
                    <v-icon 
                        class="mr-2"
                        color="white"
                    >
                        mdi-account-group
                    </v-icon>
                    Meus Clubes
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item class=" color white--text">
                    <v-icon 
                        class="mr-2"
                        color="white"
                    >
                        mdi-book-open-page-variant
                    </v-icon>
                    Meus Livros
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item class=" color white--text">
                    <v-icon 
                        class="mr-2"
                        color="white"
                    >
                        mdi-cog
                    </v-icon>
                    Configurações
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
            height="60px"
            color="blue-grey darken-3 white--text"   
        >
            <v-btn v-if="!drawer"
                @click="drawer = !drawer"
                color="cyan lighten-1 white--text"
            >
                <v-icon>mdi-menu</v-icon>
            </v-btn>                                
        </v-app-bar>           
    </v-container>
</template>
<script>
export default {
    data(){
        return{
            drawer : false            
        }
    },
    computed:{
        whoami(){
            return this.$store.state.Auth.user
        }
    },
    methods:{
        logoff(){
            window.localStorage.removeItem('user')            
            this.$router.go("/")
        }
    }
}
</script>