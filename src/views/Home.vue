<template>
  <v-card color="blue-grey darken-4">
    <Search />

    <v-container fluid>
      <template v-if="error === ''">
        <v-data-iterator
          :items="characterList"
          item-key="id"
          :items-per-page="4"
          hide-default-footer
        >
          <v-row>
            <v-col
              v-for="character in characterList"
              :key="character.id"
              cols="12"
              sm="6"
              md="3"
              lg="3"
              class="pa-2"
            >
              <v-card
                flat
                min-width="250"
                style="background-color: transparent"
              >
                <Card v-bind:character="character"> </Card>
              </v-card>
            </v-col>
          </v-row>
        </v-data-iterator>
      </template>
    </v-container>
    <Pagination></Pagination>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import { FETCH_CHARACTER_LIST } from "@/store/actions.type";
import Card from "../components/Card";
import Pagination from "../components/Pagination";
import Search from "../components/Search";

export default {
  name: "Home",
  components: { Card, Pagination, Search },
  data: () => ({}),
  computed: {
    ...mapGetters(["characterList", "error"]),
  },
  beforeCreate() {
    this.$store.dispatch(FETCH_CHARACTER_LIST, {
      page: 1,
      name: "",
      gender: "",
      status: "",
    });
  },
};
</script>
