<template>
    <v-app>
        <v-container>
            <bar></bar>
        </v-container>
        <v-container class="mt-5">
            <v-card height="50px"
                class="d-flex justify-end align-center"
            >
                <v-divider vertical></v-divider> 
                <v-btn 
                    class="mx-2" 
                    elevation="0" 
                    color='white' 
                    @click="createClubDialog =! createClubDialog"
                >
                    <v-icon class="mr-2">mdi-plus</v-icon>
                    Criar novo clube do livro
                </v-btn>
                <v-divider vertical></v-divider>
                <v-btn 
                    class="mx-2" 
                    elevation="0" 
                    color='white'
                >
                    <v-icon class="mr-2">mdi-plus</v-icon>
                    Cadastrar novo livro
                </v-btn>
                <v-divider vertical></v-divider>                
            </v-card>            
        </v-container>
        <v-dialog v-model="createClubDialog" max-width="1000px">
            <v-card>
                <v-card-title>
                    Criar Clube do Livro
                </v-card-title>
                <v-divider color="black" class="mx-6"></v-divider>
                <v-text-field 
                    class="mt-5 mx-6" 
                    label="Nome do Clube"
                    v-model="formClub.name"
                ></v-text-field>
                <v-text-field 
                    class="mt-5 mx-6" 
                    label="Livro a ser lido pelo clube"
                    v-model="formClub.book"
                ></v-text-field>
                <v-text-field 
                    class="mt-5 mx-6" 
                    label="Limite de membros(max. 6)"
                    v-model="formClub.groupLimit"
                ></v-text-field>
                <div class="d-flex justify-end">
                    <v-btn class="my-2 mx-2" @click=" createClub(),createClubDialog = false">Confirmar</v-btn>
                    <v-btn class="my-2 mx-2" @click='createClubDialog = false'>Cancelar</v-btn>
                </div>                 
            </v-card>
        </v-dialog> 
    </v-app>
</template>
<script>
import bar from '../../components/bar.vue'
export default {
  components: { bar },
    data(){
        return{            
            createClubDialog : false,
            formClub:{
                name:null,
                book:null,
                groupLimit:null
            }
        }
    },
    methods:{
        createClub(){
            const params = {
                name:this.formClub.name,
                actualBook:this.formClub.book,
                groupLimit:this.formClub.groupLimit
            }
            this.$store.dispatch("Club/create",params)
        }
    }
}
</script>