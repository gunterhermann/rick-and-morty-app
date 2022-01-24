<template>
  <v-card>
    <v-toolbar prominent color="#f0f0f0" height="260">
      <v-container fluid class="pa-0">
        <v-card flat height="250" color="#f0f0f0">
          <v-container>
            <v-row justify="center">
              <v-col class="pa-0" cols="6">
                <v-img
                  src="https://rickandmortyapi.com/api/character/avatar/189.jpeg"
                  height="250"
                  contain
                >
                </v-img>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-container>
    </v-toolbar>
  </v-card>
</template>

<script>
export default {
  name: "AppBar",
};
</script>
