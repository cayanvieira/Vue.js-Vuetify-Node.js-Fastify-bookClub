<template>    
    <v-app>
        <bar></bar>
        <v-main>            
            <div class="d-flex justify-center">
                <v-card class="ma-5" v-if='dataAccount' width="500px">
                <div class="d-flex justify-center blue-grey darken-3 white--text">
                    <v-card-title >
                        Dados do usuário                    
                    </v-card-title>
                </div>                
                <v-divider></v-divider>
                <v-card-title>{{dataAccount.name}}</v-card-title>
                <v-card-subtitle>Nome</v-card-subtitle>
                <v-card-title>{{dataAccount.birthData}}</v-card-title>
                 <v-card-subtitle>Data de Nascimento</v-card-subtitle>
                <v-card-title>{{dataAccount.sex}}</v-card-title>
                 <v-card-subtitle>Sexo</v-card-subtitle>
                <v-card-title>{{dataAccount.email}}</v-card-title>
                 <v-card-subtitle>E-mail</v-card-subtitle>
                <v-card-title>{{dataAccount.uf}}</v-card-title>
                 <v-card-subtitle>UF</v-card-subtitle>
                <v-card-actions class="d-flex justify-center">
                     <v-btn class="ma-2 m blue-grey darken-3 white--text rounded-xl"
                        @click="alterData = !alterData"
                    >
                        Alterar dados
                    </v-btn>
                     <v-btn 
                            class="ma-2 blue-grey darken-3 white--text rounded-xl "
                            @click="alertDelAccount = !alertDelAccount"
                        >
                            Excluir conta
                        </v-btn> 
                </v-card-actions>                               
            </v-card>
            </div>
            <v-dialog 
                v-model="alterData"
                class="d-flex justify-center "
                width="auto"         
            >
                <v-card                
                    height='auto'
                    width="500px"                    
                >
                    <div class="d-flex justify-center blue-grey darken-3 white--text">
                        <v-card-title>
                            Alterar Dados                
                        </v-card-title> 
                    </div>                    
                    <v-divider></v-divider>
                    <v-text-field  
                        v-model="form.name"
                        :rules="rules" 
                        class="mx-5 my-2" 
                        label="Nome"
                        required
                    ></v-text-field>
                    
                    <v-text-field 
                        v-model="form.birthData" 
                        class="mx-5 my-2" 
                        label="Data de nascimento"
                        :rules="rules"
                         required 
                    ></v-text-field>
                    
                    <v-text-field
                        :rules="rules"   
                        v-model="form.sex" 
                        class="mx-5 my-2" 
                        label="Sexo"
                        required
                    ></v-text-field>
                    
                    <v-text-field
                        :rules="emailRules"   
                        v-model="form.email" 
                        class="mx-5 my-2" 
                        label="E-mail"
                        required
                    ></v-text-field>
                    
                    <v-text-field
                        :rules="rules"   
                        v-model="form.uf" 
                        class="mx-5 my-2" 
                        label="UF"
                        required
                    ></v-text-field>
                    
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn 
                            class="mx-2 blue-grey darken-3 white--text rounded-xl"
                            @click="alterData = !alterData"
                        >
                            Cancelar
                        </v-btn> 
                    
                        <v-btn 
                            class="mx-2 blue-grey darken-3 white--text rounded-xl"
                            @click="update()"
                        >
                            Alterar dados
                        </v-btn>                       
                    </v-card-actions>
                    <v-dialog 
                        v-model="alertFormSuccess" 
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
                            Alterado com Sucesso
                            </v-card-title>
                            <div class="d-flex align-center">
                                <v-btn
                                    color="blue-grey darken-3 white--text rounded-xl"  
                                    @click=" closeAlertSuccess()"
                                >
                                    <v-icon >
                                        mdi-close
                                    </v-icon>
                                </v-btn>   
                            </div>                               
                        </v-card>
                    </v-dialog> 
                    <v-dialog 
                        v-model="alertEmptyBox" 
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
                            Preencha os campos para fazer a alteração.
                            </v-card-title>
                            <div class="d-flex align-center">
                                <v-btn
                                    color="blue-grey darken-3 white--text rounded-xl"  
                                    @click="alertEmptyBox=false"
                                >
                                    <v-icon >
                                        mdi-close
                                    </v-icon>
                                </v-btn>   
                            </div>                               
                        </v-card>
                    </v-dialog>                                                            
                </v-card>                
            </v-dialog>
            <v-dialog 
                v-model="alertDelAccount"
                width="auto"  
            >
                <v-card> 
                    <div>
                        <v-card-title>
                            Tem certeza que quer deletar a conta?
                        </v-card-title>
                    </div>
                    <div class="d-flex justify-center">
                        <v-card-actions>                      
                            <v-spacer></v-spacer>
                            <v-btn
                                color="mx-5 blue-grey darken-3 white--text rounded-xl"  
                                @click="alertDelAccount=false"
                            >
                                Cancelar
                            </v-btn>                        
                            <v-btn
                                color=" mx-5 blue-grey darken-3 white--text rounded-xl"  
                                @click="delAccount()"
                            >
                                Confirmar
                            </v-btn>   
                        </v-card-actions>
                    </div> 
                      
                </v-card>
            </v-dialog>
        </v-main>
    </v-app>
</template>

<script>
import bar from '../components/bar.vue'
export default {
  components: { bar },
    data(){
        return {
            dataAccount:null,
            alterData:false,
            form:{
                name:"",
                birthData:"",
                sex:"",
                email:"",
                uf:""
            },
            rules: [
                v => !!v || 'Campo obrigatório',                
            ],
            emailRules: [
                v => !!v || 'Campo obrigatório',
                v => /.+@.+/.test(v) || 'E-mail deve ser válido  ',
            ],            
            alertFormSuccess :false,
            alertEmptyBox:false,
            alertDelAccount:false

        }     
    },
    computed:{
        whoami(){
            return this.$store.state.Auth.user
        }
    },
    created(){        
        this.$store.dispatch("Auth/sync")
            .then(user =>{
                if(!user){
                    this.$router.push(`/`)
                }else(
                    this.getAccount()
                )
            })
    },
    methods:{
        getAccount(){
            const id = this.whoami.id
            this.$store.dispatch("Account/get",id)
            .then(data => this.dataAccount = data )
        },
        update(){            
             const id = this.whoami.id
             const name = this.form.name
             const birthData = this.form.birthData
             const sex = this.form.sex
             const email= this.form.email
             const uf = this.form.uf
            if(id&&name&&birthData&&sex&&email&&uf){
                this.$store.dispatch("Account/update",{id,name,birthData,sex,email,uf})
                .then( () => this.alertFormSuccess = true)                
            }else{
                this.alertEmptyBox = true
            }

        },
        delAccount(){
            const id = this.whoami.id
            this.$store.dispatch("Account/del",id)
                .then(()=>{
                    this.$router.push("/")
                    window.localStorage.removeItem('user')
                    
                })
                          
        },
        closeAlertSuccess(){
            this.$router.go()
        }    
    }
}
</script>

<style>

</style>