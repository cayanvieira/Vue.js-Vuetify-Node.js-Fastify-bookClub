<template>
    <v-app>
        <v-main class="d-flex justify-center align-center blue-grey darken-3">
            <v-container class="d-flex justify-center">
                <v-card 
                    class="d-flex justify-center  rounded-xl"
                    height="auto"
                    width="550px"
                >
                
                    <v-col>
                        <v-row  class="d-flex justify-center">
                                <v-img
                                class="my-12"
                                src="img/logoBook.png"
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
                                    v-model="form.sex"                               
                                    label="Sexo"                                    
                                    hide-details="true"
                                    required="true"                                    
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
                                    v-model="form.uf"                               
                                    label="UF"                                    
                                    hide-details="true"
                                    required="true"                                    
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
                                    class =" ma-5 blue-grey darken-3 white--text"
                                    :disabled=alertRegister
                                    @click ="subimit()"                                
                                >
                                    Cadastrar-se
                                </v-btn>                  
                            </v-row>
                                 <v-row class="justify-center">
                                <v-btn 
                                    class =" ma-5 blue-grey darken-3 white--text"
                                    to="/"                                                                  
                                >
                                    Voltar
                                </v-btn>                  
                            </v-row>
                        </v-form>                     
                    </v-col>                     
                </v-card>  
    
            </v-container>
            <v-dialog 
                    v-model="alertRegister" 
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
                width="600px" 
                height="300px"
            >
                <v-card
                    width="600px" 
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
            <v-dialog 
                v-model="alertNullPassword"
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
                        Campo "senha" ou "confirmar senha" vazio!
                    </v-card-title>
                    <div class="d-flex align-center">
                        <v-btn
                            color="blue-grey darken-3 white--text rounded-xl"  
                            @click="alertNullPassword = false"
                        >
                            <v-icon >
                                mdi-close
                            </v-icon>
                        </v-btn>   
                    </div>
                </v-card>
            </v-dialog>
            <v-dialog 
                v-model="alertNullEmail"
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
                        Campo "E-mail" vazio!
                    </v-card-title>
                    <div class="d-flex align-center">
                        <v-btn
                            color="blue-grey darken-3 white--text rounded-xl"  
                            @click="alertNullEmail = false"
                        >
                            <v-icon >
                                mdi-close
                            </v-icon>
                        </v-btn>   
                    </div>
                </v-card>
            </v-dialog>
            <v-dialog 
                v-model="alertNullName"
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
                        Campo "Nome" vazio!
                    </v-card-title>
                    <div class="d-flex align-center">
                        <v-btn
                            color="blue-grey darken-3 white--text rounded-xl"  
                            @click="alertNullName = false"
                        >
                            <v-icon >
                                mdi-close
                            </v-icon>
                        </v-btn>   
                    </div>
                </v-card>
            </v-dialog>
            <v-dialog 
                v-model="alertNullBirthData"
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
                        Campo "Data de Nascimento" vazio!
                    </v-card-title>
                    <div class="d-flex align-center">
                        <v-btn
                            color="blue-grey darken-3 white--text rounded-xl"  
                            @click="alertNullBirthData = false"
                        >
                            <v-icon >
                                mdi-close
                            </v-icon>
                        </v-btn>   
                    </div>
                </v-card>
            </v-dialog>
            <v-dialog 
                v-model="alertNullSex"
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
                        Campo "Sexo" vazio!
                    </v-card-title>
                    <div class="d-flex align-center">
                        <v-btn
                            color="blue-grey darken-3 white--text rounded-xl"  
                            @click="alertNullSex = false"
                        >
                            <v-icon >
                                mdi-close
                            </v-icon>
                        </v-btn>   
                    </div>
                </v-card>
            </v-dialog>
            <v-dialog 
                v-model="alertNullUF"
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
                        Campo "UF" vazio!
                    </v-card-title>
                    <div class="d-flex align-center">
                        <v-btn
                            color="blue-grey darken-3 white--text rounded-xl"  
                            @click="alertNullUF = false"
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
                sex:null,
                uf:null
              
            },
            alertPassword:false,
            alertRegister:false ,
            alertNullPassword:false,
            alertNullEmail:false,
            alertNullName:false,
            alertNullBirthData:false,
            alertNullSex:false,
            alertNullUF:false                    
        }       
    },    
    methods: {
        subimit(){
            if( this.form.name !=null && this.form.name !=='' && this.form.birthData!=null && this.form.birthData !=='' && this.form.sex!=null && this.form.sex !=='' && this.form.email!=null && this.form.email !=='' && this.form.uf!=null && this.form.uf !=='' && this.form.password == this.form.checkPassword && this.form.password !=null) {           
                const params ={
                    name:this.form.name,
                    birthData:this.form.birthData,
                    sex:this.form.sex,        
                    email:this.form.email,
                    uf:this.form.uf,
                    password:this.form.password
                }
                this.$store.dispatch("Account/register",params)
                this.alertRegister = true   
            }
            else if (this.form.name === null || this.form.name ===''){
                return this.alertNullName = true
            }
            else if (this.form.birthData === null  || this.form.birthData ===''){
                return this.alertNullBirthData = true
            }
             else if (this.form.sex === null || this.form.sex ===''){
                return this.alertNullSex = true
            }
            else if (this.form.email === null || this.form.email ===''){
                return this.alertNullEmail = true
            }
            else if (this.form.uf === null || this.form.uf===''){
                return this.alertNullUF = true
            }
            else if (this.form.password === null || this.form.checkPassword  === null){
                return this.alertNullPassword = true
            }
            else{
                return this.alertPassword = true
            }         
        },
        
    }
}
</script>

