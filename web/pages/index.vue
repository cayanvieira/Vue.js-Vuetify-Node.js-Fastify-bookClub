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
                                class="my-12"
                                src="img/logoBook.png"
                                max-height="300px"
                                max-width="300px"
                                color="red"
                                >
                                </v-img> 
                            </v-row>
                            <v-row                    
                            >
                                <v-text-field
                                class="mx-5"
                                label="E-mail"
                                outlined
                                v-model="dataLogin.email"                                
                                >                   
                                </v-text-field>
                            </v-row>
                            <v-row>
                                <v-text-field
                                class="mx-5"                            
                                label="Senha"
                                outlined
                                type="password"
                                v-model="dataLogin.password"                                
                                >                   
                                </v-text-field>                            
                            </v-row>
                            <v-row  class="d-flex justify-center">
                                <v-btn 
                                class="ma-3 mx-5" 
                                width="100px"                                
                                color="blue-grey darken-3 white--text"
                                @click="login()" 
                                >
                                    Entrar
                                </v-btn>                            
                                <v-btn
                                color="blue-grey darken-3 white--text"
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
                <v-dialog 
                v-model="alertLogin"
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
                        E-mail e senha errados ou não cadastrados!
                    </v-card-title>
                    <div class="d-flex align-center">
                        <v-btn
                            color="blue-grey darken-3 white--text rounded-xl"  
                            @click="alertLogin= false"
                        >
                            <v-icon >
                                mdi-close
                            </v-icon>
                        </v-btn>   
                    </div>
                </v-card>                
            </v-dialog>                
            </v-container>
        </v-main>     
    </v-app>        
</template>
    


<script>

export default {   
    data(){
        return{
            dataLogin:{
                email:null,
                password:null
            },           
            alertLogin:false,
            whoami:null           
        }       
    },
    created(){
        this.$store.dispatch("Auth/sync")
            .then(user =>{
                    if(user){
                        this.$router.push(`/home`)
                    }
                })
        
    },
    methods: {
       
        async login(){
            const params={ 
                email : this.dataLogin.email,
                password : this.dataLogin.password
            }
            this.whoami = await this.$store.dispatch("Auth/login",params)
           console.log(this.whoami)
            if (this.whoami) {                
                return this.$router.push(`/home`)
            }else{
                return this.alertLogin = true
            }            
        }

    }
}
</script>







