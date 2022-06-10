<template>
  <v-app>
    <v-main >
        Pesquisou
    </v-main>
  </v-app>
</template>

<script>
export default {
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
          }
        )
    },
    methods:{
      
    }  
}
</script>

<style>

</style>