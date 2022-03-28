<template>
    <v-container>
        <v-navigation-drawer app v-if="drawer"
            color="blue-grey darken-3 white--text" 
        >
            <!-- Ajeitar imagem do usuario no futuro, aqui apenas para definir template-->
            <v-img height='200px'></v-img>
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
    }
}
</script>