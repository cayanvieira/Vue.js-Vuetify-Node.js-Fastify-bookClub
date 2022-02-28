<template>
    <v-app>
        <v-main class="d-flex justify-center align-center blue-grey darken-3">                   
            <v-container class="d-flex justify-center" >                                              
                <div>
                    <v-card
                        class="d-flex justify-center  rounded-xl "
                        height="450px"
                        width="450px"
                    >
                        <v-col>
                            <v-row  class="d-flex justify-center">
                                <v-img
                                class="ma-2"
                                src="img/shield.jpg"
                                max-height="300px"
                                max-width="300px"
                            ></v-img> 
                            </v-row>
                            <v-row                    
                            >
                                <v-text-field
                                class="mx-5"
                                label="E-mail"
                                outlined
                                >                   
                                </v-text-field>
                            </v-row>
                            <v-row>
                                <v-text-field
                                class="mx-5"                            
                                label="Senha"
                                outlined
                                >                   
                                </v-text-field>                            
                            </v-row>
                            <v-row  class="d-flex justify-center">
                                <v-btn 
                                class="ma-3 mx-5" 
                                width="100px"
                                to="home"
                                color="blue-grey darken-3 white--text" 
                                >
                                    Entrar
                                </v-btn>                            
                                <v-btn
                                color="cyan lighten-1 white--text"  
                                class="ma-3 mx-5" 
                                width="100px" 
                                to="/register"
                                >
                                    Cadastrar
                                </v-btn>
                            </v-row>
                        </v-col>                     
                    </v-card>
                </div>                
            </v-container>
        </v-main>     
    </v-app>        
</template>
    


<script>

export default {
    created(){
        
    },
    data(){
        return{
                     
        }       
    },
    watch:{
       
    },
    methods: {        
    }
}
</script>







