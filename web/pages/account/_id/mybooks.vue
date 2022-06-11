<template>
    <v-app>
        <bar> </bar>
        <v-main>
            <v-card 
                height="50px"
                class="d-flex justify-end align-center rounded-xl elevation-10 mx-5"
            > 
                <v-divider vertical></v-divider>
                    
                <v-btn 
                    class="mx-2" 
                    elevation="0" 
                    color='white'>
                    <v-icon class="mr-2">mdi-plus</v-icon>
                    Adicionar livros
                </v-btn>                    
            </v-card>
                
            <v-card class="mt-5 rounded-xl mx-5">
                    <v-card-title class="d-flex justify-center ">Meus livros</v-card-title>
            </v-card>
                
            <v-card 
                class="mt-5 rounded-xl mx-5"
                max-width="450">
    
                <v-col>
                    <v-row >        
                        <v-img
                            src="img/capaBook.png"
                            >
                        </v-img>
                    </v-row>

                    <v-card-title  
                        class="d-flex justify-center"
                        color="blue"> Cálculo 1
                    </v-card-title>

                    <v-rating
                        :value="3"
                        class="d-flex justify-center"
                        color="amber"
                        dense
                        half-increments
                        readonly
                        size="14"
                    ></v-rating>
                    
                    <v-card-subtitle class="grey--text ms-4 d-flex justify-center">James Stwart</v-card-subtitle>
                    
                    <v-chip-group
                        class="d-flex justify-center"
                    >

                        <v-chip color="blue-grey darken-3 white--text" >Clubes</v-chip>

                        <v-chip color="blue-grey darken-3 white--text" >Resumos</v-chip>

                        <v-chip color="blue-grey darken-3 white--text" >Comentários</v-chip>

                        <v-chip color="blue-grey darken-3 white--text" >Comprar</v-chip>

                        <v-btn
                            icon
                            color="blue-grey darken-3"
                            icon-right
                        >
                            <v-icon>mdi-heart</v-icon>
                        </v-btn>
                    </v-chip-group>
                </v-col>
            </v-card>
        </v-main>    
    </v-app>
</template>
<script>
    import bar from "/components/bar.vue"
    export default { 
        components:{bar}
    } 
</script>