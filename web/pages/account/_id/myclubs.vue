<template>
    <v-app>
        <bar> </bar>
        <v-main>
                            
            <v-card class="mt-5 rounded-xl mx-5">
                <v-card-title class="d-flex justify-center ">Meus Clubes</v-card-title>
            </v-card>                
            
            <v-simple-table class="ma-5 mb-16" fixed-header>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-center">
                                #
                            </th>
                            <th class="text-center">
                                Nome 
                            </th>
                            <th class="text-center">
                                Livro Atual
                            </th>
                            <th class="text-center">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="item in  selfClub"
                            :key="item.name"
                        >   
                            <td class="text-center">
                                <v-btn
                                    color="blue-grey darken-3 white--text"
                                    fab
                                    small
                                    elevation=0
                                    :to="`/club/${item.id}`"
                                >
                                    <v-icon>
                                        mdi-account-group
                                    </v-icon>
                                </v-btn>
                            </td>
                            <td class="text-center">{{ item.name }}</td>
                            <td class="text-center">{{ item.actual_book }}</td>
                            <td class="d-flex justify-center align-center">
                                <v-chip-group>

                                    <v-chip color="blue-grey darken-3 white--text" small >Alterar Livro</v-chip>
                                    <v-chip
                                        @click="updateDescriptionDialog=!updateDescriptionDialog,detail=item"
                                        color="blue-grey darken-3 white--text" 
                                        small
                                    >Alterar descrição</v-chip>
                                    <v-chip color="blue-grey darken-3 white--text" small>Alterar Senha</v-chip>
                                    <v-chip color="blue-grey darken-3 white--text" small>Excluir Clube</v-chip>
                                </v-chip-group>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>

             <v-card class="mt-5 rounded-xl mx-5">
                <v-card-title class="d-flex justify-center ">Clubes Favoritos</v-card-title>
            </v-card>                
            
            <v-simple-table class="ma-5 mb-16" fixed-header>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-center">
                                #
                            </th>
                            <th class="text-center">
                                Nome 
                            </th>
                            <th class="text-center">
                                Livro Atual
                            </th>
                            <th class="text-center">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(item,i) in  favoriteClub"
                            :key="i"
                        >   
                            <td class="text-center">
                                <v-btn
                                    color="blue-grey darken-3 white--text"
                                    fab
                                    small
                                    elevation=0
                                    @click="detail=item,clubLoginDialog=true "
                                >
                                    <v-icon>
                                        mdi-account-group
                                    </v-icon>
                                </v-btn>
                            </td>
                            <td class="text-center">{{ item.name }}</td>
                            <td class="text-center">{{ item.actual_book }}</td>
                            <td class="d-flex justify-center align-center">
                                <v-chip-group>
                                    <v-chip color="blue-grey darken-3 white--text" small @click="detail=item, removeFavoriteClub(detail.id)">Retirar dos Favoritos</v-chip>
                                </v-chip-group>
                            </td>
                        </tr>
                    </tbody>
                    
                </template>                 
            </v-simple-table>            
            <v-dialog
                v-if="detail" 
                v-model="clubLoginDialog"
                max-width="300px"            
            >
                <v-card
                    width="300px"                
                >
                    <v-card-subtitle class="d-flex justify-center pa-0">Entrar no Club</v-card-subtitle>
                    <v-divider></v-divider>
                    <v-card-title class="justify-center">
                        {{detail.name.toUpperCase()}} 
                    </v-card-title>
                    <v-divider></v-divider>                
                    <v-text-field
                        type="password"
                        class="mt-5 mx-5 d-flex"                    
                        label="Digite a senha do Club"
                        outlined
                        v-model="clubPassword"  
                    >                    
                    </v-text-field>                
                    <div class="justify-center"> 
                        <v-btn 
                            class="mb-3 mx-5 pa-0"
                            width="100px"
                            @click="loginInClub()"                                                
                        >
                            Entrar
                        </v-btn>
                        <v-btn 
                            class="mb-3 mx-5 pa-0"
                            width="100px"
                            @click="clubLoginDialog = false"                    
                        >
                            Cancelar
                        </v-btn>                    
                    </div>                
                </v-card>
            </v-dialog>
            <v-dialog
                v-model="updateDescriptionDialog"
                width=500px
            >
                <v-card>
                    <v-card-text class="pt-8">
                            <v-textarea
                                label=' Escreva algo sobre o Clube.'
                                hide-details                   
                                outlined
                                v-model="descriptionForm.newDescription"
                        ></v-textarea>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                            <v-btn 
                                class="mx-2" 
                                @click="updateDescriptionDialog = !updateDescriptionDialog, descriptionForm.newDescription = null" 
                            >
                                Cancelar
                            </v-btn>
                            <v-btn class="mx-2" @click="sendDescription(detail,descriptionForm.newDescription)">Confirmar</v-btn>                
                    </v-card-actions>   
                </v-card>
            </v-dialog>             
        </v-main>    
    </v-app>
</template>
<script>
    import bar from "/components/bar.vue"
    export default { 
        components:{bar},
        data(){
            return{
              selfClub:null,
              favoriteClub:null,
              clubLoginDialog:false,
              detail:null,
              clubPassword:null,
              updateDescriptionDialog:false,
              descriptionForm:{
                newDescription:null
              }
              
            }

        },
        computed:{
            whoami(){
            return this.$store.state.Auth.user
            },
        },
        created(){        
            this.$store.dispatch("Auth/sync")
                .then(user =>{
                    if(!user){
                        this.$router.push(`/`)
                    }else{
                        this.fetchMyClubs()
                        this.fetchMyFavoriteClubs()
                    }
                })
        },
        methods:{
            fetchMyClubs(){
                const accountId=this.$route.params.id
                this.$store.dispatch('Account/fechMyClubs',accountId)
                .then(data => this.selfClub=data)
            },
            fetchMyFavoriteClubs(){
                const accountId = this.$route.params.id
                this.$store.dispatch('Account/fechMyFavoriteClubs',accountId)
                .then(data => this.favoriteClub=data)
            },
            async loginInClub(){
                const params={ 
                    clubId : this.detail.id,
                    password : this.clubPassword
                }
                this.intoClub = await this.$store.dispatch("Club/login",params)
                
                if (this.intoClub) {    
                    return this.$router.push(`/club/${this.detail.id}`)
                }else{
                    return this.alertLoginInClub = false
                }            
            },
            sendDescription(item,newDescription){
                
                if(item.description){
                    
                    const clubId = item.id
                    const description = newDescription
                    this.$store.dispatch('Club/updateDescription',{clubId, description})
                    .then(()=>this.$router.go())
                }                
                else{                    
                    const description=newDescription
                    const clubId = item.id
                    this.$store.dispatch('Club/description',{description,clubId})
                    .then(()=>this.$router.go())                
                
                }
                
            },
            removeFavoriteClub(club_id){
                const accountId = this.whoami.id
                const clubId = club_id
                this.$store.dispatch('Account/removeFavoriteClub',{accountId, clubId})
                .then(()=>this.$router.go())                 
            },
            
        } 
    } 
</script>