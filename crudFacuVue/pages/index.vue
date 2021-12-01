<template>
    <v-app>
        <v-main>
            <v-container>
                <v-row justify="center" >                   
                    <v-col cols=5>
                        <v-card class="d-flex flex-column justify-center align-center mt-16">
                            <div class="ma-16">
                                <v-btn to="/register">
                                    Inscrever-se
                                </v-btn>
                            </div>
                        </v-card>                        
                    </v-col>
                </v-row>
                <v-row justify="center" >                    
                    <v-col class="d-flex justify-center mt-16  cols=5">
                        <v-simple-table>
                            <template v-slot:default>
                                <thead>                                        
                                    <tr> 
                                        <th class="text-center">user_id</th>                                                                                                   
                                        <th class="text-center">Nome</th>
                                        <th class="text-center">Sobrenome</th>
                                        <th class="text-center">Documento</th>
                                        <th class="text-center">Matricula</th>
                                        <th class="text-center">E-mail</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="(account, i)  in accounts"
                                        :key ="i"
                                    >   
                                        <td>{{account.user_id}}</td>
                                        <td>{{account.name}}</td>
                                        <td>{{account.lastName}}</td> 
                                        <td>{{account.document}}</td> 
                                        <td>{{account.registration}}</td> 
                                        <td>{{account.email}}</td>
                                        <td>
                                            <v-chip
                                            color="red"
                                            @click="deleteAccount(account.user_id)"
                                            >
                                                <v-icon >
                                                    mdi-delete
                                                </v-icon> 
                                            </v-chip>
                                        </td>
                                                                                 
                                    </tr>                                                                       
                                </tbody>    
                            </template>
                        </v-simple-table>                        
                    </v-col>
                </v-row>
            </v-container>
        </v-main>     
    </v-app>        
</template>
    


<script>

export default {
    created(){
        this.fetch()
    },
    data(){
        return{
            accounts:[],          
        }       
    },
    watch:{
        accounts(value){
            
        }
    },
    methods: {
        fetch(){
            this.$store.dispatch("Index/accounts")
                .then( data =>  this.accounts = data) 
        },
        deleteAccount(user_id){
            this.$store.dispatch('Index/deleteAccount', {user_id})            
        }
    }
}
</script>







