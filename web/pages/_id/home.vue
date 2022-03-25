<template>
    <v-app>
        <v-container>
            <v-navigation-drawer app v-if="drawer"
                color="blue-grey darken-3 white--text" 
            >
                <div>
                    <v-btn v-if="drawer"
                    @click="drawer = !drawer"
                    elevation="0"
                    height="50px"
                    color="cyan lighten-1 white--text"                                          
                    >    
                        <v-icon>mdi-close</v-icon>
                    </v-btn>                
               </div>               
            </v-navigation-drawer>
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
    </v-app>
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