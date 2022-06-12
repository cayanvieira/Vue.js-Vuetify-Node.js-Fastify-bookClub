<template>
    <v-app>
        <bar> </bar>
        <v-main>
                            
            <v-card class="mt-5 rounded-xl mx-5">
                <v-card-title class="d-flex justify-center ">Meus Clubes</v-card-title>
            </v-card>                
            
            <v-card 
                class="mt-5 rounded-xl mx-5"
                max-width="450">
                <v-list>
                    
                </v-list>
            </v-card>

             <v-card class="mt-5 rounded-xl mx-5">
                <v-card-title class="d-flex justify-center ">Clubes Favoritos</v-card-title>
            </v-card>                
            
            <v-card 
                class="mt-5 rounded-xl mx-5"
                max-width="450">
                <v-list>
                    
                </v-list>
            </v-card>
        </v-main>    
    </v-app>
</template>
<script>
    import bar from "/components/bar.vue"
    export default { 
        components:{bar},
        data(){
            return

        },
        created(){        
        this.$store.dispatch("Auth/sync")
            .then(user =>{
                if(!user){
                    this.$router.push(`/`)
                }else{
                    this.fetchNewClubs()
                }
            })
    }, 
    } 
</script>