<template>
    <v-app>
        <v-main>
            <v-container>
                <v-row justify = "center" >                   
                    <v-col cols=5>
                        <v-card class="d-flex flex-column justify-center align-center mt-16">
                            <div class="ma-16"> 
                            <v-btn to="/">
                                Home
                            </v-btn>
                            </div>
                        </v-card>                        
                    </v-col>
                </v-row>
                <v-row justify = 'center'>
                    <v-col cols=5>
                        <v-form >
                            <v-col>
                                <v-text-field
                                    v-model="form.name"                               
                                    label="Nome"                                    
                                    hide-details="true"
                                    required="true"
                                ></v-text-field>
                            </v-col>

                            <v-col>
                                <v-text-field
                                    v-model="form.lastName"                               
                                    label="Sobrenome"                                    
                                    hide-details="true"
                                ></v-text-field>
                            </v-col>

                            <v-col>
                                <v-text-field
                                    v-model="form.document"                               
                                    label="Data de Nacimento"                                    
                                    hide-details="true"
                                ></v-text-field>
                            </v-col>

                            <v-col>
                                <v-text-field
                                    v-model="form.registration"
                                    label="Matricula"                                    
                                    hide-details="true"                                    
                                ></v-text-field>
                            </v-col>                            

                            <v-col>
                                <v-text-field
                                    v-model="form.email"
                                    label="E-mail"                                    
                                    hide-details="true"
                                ></v-text-field>
                            </v-col>

                        
                            <v-row justify= 'center'>
                                <v-btn class =" mt-10"
                                :disabled=alertRegister
                                @click ="subimit(),alertRegister=true"                                
                                >
                                    Inscrever-se
                                </v-btn>                  
                            </v-row>

                            <v-alert v-if="alertRegister">
                               
                                    Aluno Inscrito com Sucesso                                   
                                    <v-btn 
                                    class="ma-5"
                                    @click="alertRegister=false">
                                        <v-icon>
                                            mdi-close
                                        </v-icon>
                                    </v-btn>
                               
                            </v-alert>                          
                                
                        </v-form> 
                    </v-col>                   
                </v-row>
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

