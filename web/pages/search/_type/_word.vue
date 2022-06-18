<template>
  <v-app>
    <v-main v-if="result">        
        {{result}}
    </v-main>
  </v-app>
</template>

<script>
export default {
  data(){
    return{
      result:null
    }
  },
  created(){        
        this.$store.dispatch("Auth/sync")
          .then(user =>{
              if(!user){
                  this.$router.push(`/`)
              }else{
                  this.search()
              }
          }
        )
    },
    methods:{
      search(){
       const type = this.$route.params.type
       const word = this.$route.params.word
        this.$store.dispatch("Search/fetch",{type,word})
          .then(data => this.result= data)
      }
    }  
}
</script>

<style>

</style>