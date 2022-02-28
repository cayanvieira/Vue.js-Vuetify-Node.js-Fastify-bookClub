<template>
    <v-app>
        <v-main class="d-flex justify-center align-center blue-grey darken-3">
            <v-container class="d-flex justify-center">
                <v-card 
                    class="d-flex justify-center  rounded-xl"
                    height="600px"
                    width="550px"
                >
                    <v-col>
                        <v-row  class="d-flex justify-center">
                                <v-img
                                class="ma-5"
                                src="img/shield.jpg"
                                max-height="300px"
                                max-width="300px"
                            ></v-img> 
                        </v-row>
                        <v-form >
                            <v-row>
                                <v-text-field
                                    v-model="form.name"                               
                                    label="Nome Completo"                                    
                                    hide-details="true"
                                    required="true"                                    
                                    class="mx-5 mt-2"
                                ></v-text-field>
                            </v-row>

                            <v-row>
                                <v-text-field
                                    v-model="form.birthData"                               
                                    label="Data de Nascimento"                                    
                                    hide-details="true"
                                    class="mx-5 mt-2"
                                    v-mask="'##/##/####'"
                                ></v-text-field>
                            </v-row>

                            <v-row>
                                <v-text-field
                                    v-model="form.email"
                                    label="E-mail"                                    
                                    hide-details="true"
                                    class="mx-5 mt-2"
                                ></v-text-field>
                            </v-row>

                             <v-row>
                                <v-text-field
                                    v-model="form.password"                                    
                                    label="Senha"                                    
                                    hide-details="true"
                                    class="mx-5 mt-2"
                                    type="password"                                    
                                ></v-text-field>
                            </v-row>

                            <v-row>
                                <v-text-field
                                    v-model="form.checkPassword"                                     
                                    label="Confirmar Senha"                                    
                                    hide-details="true"
                                    class="mx-5 mt-2"
                                    type="password"
                                ></v-text-field>
                            </v-row>

                        
                            <v-row class="justify-center">
                                <v-btn 
                                    class =" ma-13 blue-grey darken-3 white--text"
                                    :disabled=alertRegister
                                    @click ="subimit()"                                
                                >
                                    Cadastrar-se
                                </v-btn>                  
                            </v-row>
                        </v-form> 
                    
                    </v-col>                     
                </v-card>   

            </v-container>
            <v-dialog 
                    v-model="alertRegister" 
                    class="d-flex align-center"
                    width="500px" 
                    height="300px"
                                  
                >
                    <v-card 
                    width="500px" 
                    height="100px"
                    class="d-flex justify-center" 
                    > 
                        <v-card-title>
                        Cadastrado com Sucesso
                        </v-card-title>
                        <div class="d-flex align-center">
                            <v-btn
                                color="blue-grey darken-3 white--text rounded-xl"  
                                to="/"
                            >
                                <v-icon >
                                    mdi-close
                                </v-icon>
                            </v-btn>   
                        </div>
                               
                    </v-card>
            </v-dialog>
            <v-dialog 
                v-model="alertPassword"
                class="d-flex align-center"
                width="500px" 
                height="300px"
            >
                <v-card
                    width="500px" 
                    height="100px"
                    class="d-flex justify-center" 
                >
                    <v-card-title>
                        Senhas não conferem!
                    </v-card-title>
                    <div class="d-flex align-center">
                        <v-btn
                            color="blue-grey darken-3 white--text rounded-xl"  
                            @click="alertPassword = false"
                        >
                            <v-icon >
                                mdi-close
                            </v-icon>
                        </v-btn>   
                    </div>
                </v-card>
            </v-dialog>
        </v-main>     
    </v-app>        
</template>

<script>

export default {    
    data(){
        return{
            form:{
                name:null,
                birthData:null,               
                email:null,
                password:null,
                checkPassword:null,
              
            },
            alertPassword:false,
            alertRegister:false          
        }       
    },
    watch:{
        form(value){
            if(value){
                return this.form
            }
        },  
    },
    methods: {
        subimit(){
            if( this.form.password == this.form.checkPassword ) {           
                const params ={
                    name:this.form.name,
                    birthData:this.form.birthData,        
                    email:this.form.email,
                    password:this.form.password
                }
                this.$store.dispatch("Account/register",params)
                this.alertRegister = true   
            }else{
                return this.alertPassword = true
            }         
        }
    }
}
</script>

