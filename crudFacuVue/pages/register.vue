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
                                    v-model="form.document"                               
                                    label="Data de Nascimento"                                    
                                    hide-details="true"
                                    class="mx-5 mt-2"
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
                                    label="Senha"                                    
                                    hide-details="true"
                                    class="mx-5 mt-2"
                                    type="password"                                    
                                ></v-text-field>
                            </v-row>

                            <v-row>
                                <v-text-field                                    
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
                                    @click ="subimit(),alertRegister=true"                                
                                >
                                    Cadastrar-se
                                </v-btn>                  
                            </v-row>  

                        </v-form> 
                    
                    </v-col> 
                </v-card>   

            </v-container>

            <v-container class="d-flex justify-center ">
                <v-modal>
                    <v-alert v-if="alertRegister" class="rounded-xl">                
                        Cadastrado com Sucesso
                        <v-btn
                        color="blue-grey darken-3 white--text rounded-xl"                
                        class="ma-5"
                        to="/">
                            <v-icon>
                                mdi-close
                            </v-icon>
                        </v-btn>                                    
                    </v-alert> 
                </v-modal>
            </v-container>
        </v-main>     
    </v-app>        
</template>

<script>

export default {    
    data(){
        return{
            form:{
                name:null,
                lastName:null,
                document:null,
                registration:null,
                email:null
            },
            alertRegister:false          
        }       
    },
    watch:{
        form(value){
            if(value){
                return this.form
            }
        },
        alertRegister(value){
            if(value){
                return this.alertRegister
            }
        }
    },
    methods: {
        subimit(){            
            const params ={
                name:this.form.name,
                lastName:this.form.lastName,
                document:this.form.document,
                registration:this.form.registration,
                email:this.form.email
            }
            this.$store.dispatch("Index/register",params)            
        }
    }
}
</script>

