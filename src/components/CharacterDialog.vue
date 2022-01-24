<template>
  <div class="text-center">
    <template v-if="isLoading === false">
      <v-card class="text-center" min-width="200">
        <v-img gradient="to bottom, rgba(0,47,101,1), rgba(0,47,101,.6)">
          <v-avatar size="300" class="mt-3">
            <span> <img alt="Avatar" :src="character.image" /></span>
          </v-avatar>
          <h2 class="white--text">{{ character.name }}</h2>
          <v-container fluid>
            <v-row>
              <v-col>
                <v-chip
                  class="ma-0"
                  :color="statusSelection[character.status]"
                  text-color="white"
                >
                  {{ character.status }}
                </v-chip>
              </v-col>
              <v-col>
                <v-chip class="ma-0" color="blue-grey darken-4 white--text">
                  <v-icon left>
                    {{ genderSelection[character.gender] }}
                  </v-icon>
                  {{ character.gender }}
                </v-chip>
              </v-col>
              <v-col>
                <div class="font-weight-bold mt-1 white--text">
                  {{ character.species }}
                </div>
              </v-col>
            </v-row>
          </v-container>
          <v-divider class="my-3"></v-divider>
          <v-list-item>
            <v-container fluid>
              <v-row>
                <v-col cols="12" sm="4" md="4" lg="5">
                  <div class="font-weight-thin text-left white--text">
                    Origin:
                  </div>
                </v-col>
                <v-col cols="12" sm="8" md="8" lg="7">
                  <div class="font-weight-bold white--text">
                    {{ character.origin.name }}
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-list-item>
          <v-list-item>
            <v-container fluid>
              <v-row>
                <v-col cols="12" sm="4" md="4" lg="5">
                  <div class="font-weight-thin text-left white--text">
                    Last Location:
                  </div>
                </v-col>
                <v-col cols="12" sm="8" md="8" lg="7">
                  <div class="font-weight-bold white--text">
                    {{ character.location.name }}
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-list-item>

          <v-divider class="my-3"></v-divider>
          <template v-if="character.episode.length > 1">
            <h2 class="white--text">Episodes</h2>
            <v-carousel cycle height="100" hide-delimiters show-arrows-on-hover>
              <v-carousel-item
                v-for="(episode, i) in character.episode"
                :key="i"
                class="pt-3"
              >
                <v-sheet height="100%" style="background-color: transparent">
                  <v-row class="fill-height" align="center" justify="center">
                    <div class="font-weight-bold white--text">
                      {{ episode.name }}
                    </div>
                  </v-row>
                </v-sheet>
              </v-carousel-item>
            </v-carousel>
          </template>
          <template v-else>
            <v-list-item>
              <v-container fluid>
                <v-row>
                  <v-col cols="12" sm="4" md="4" lg="5">
                    <div class="font-weight-thin text-left white--text">
                      Episode:
                    </div>
                  </v-col>
                  <v-col cols="12" sm="8" md="8" lg="7">
                    <div class="font-weight-bold white--text">
                      {{ character.episode[0].name }}
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            </v-list-item>
          </template>
        </v-img>
      </v-card>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CharacterDialog",
  computed: {
    ...mapState([
      "character",
      "statusSelection",
      "genderSelection",
      "isLoading",
    ]),
  },
};
</script>
