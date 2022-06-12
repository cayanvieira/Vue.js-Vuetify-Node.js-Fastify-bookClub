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
                                    <v-chip color="blue-grey darken-3 white--text" small>Alterar descrição</v-chip>
                                    <v-chip color="blue-grey darken-3 white--text" small>Alterar Senha</v-chip>

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
                                    <v-chip color="blue-grey darken-3 white--text" small >Retirar dos Favoritos</v-chip>
                                </v-chip-group>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
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
              favoriteClub:null  
            }

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
            }
        } 
    } 
</script>