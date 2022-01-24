<template>
  <v-container fluid>
    <v-row justify="center" align="center" class="ma-0 pa-0">
      <v-col class="d-flex my-0 py-0" cols="6" lg="3" md="3" sm="3">
        <v-text-field
          v-model="selectedName"
          label="Search Character"
          outlined
          dark
          single-line
          dense
          min-width="50"
          clearable
          append-outer-icon="mdi-magnify"
          @click:append-outer="sendQuery()"
          @keydown.enter.prevent="sendQuery()"
        ></v-text-field>
      </v-col>
      <v-col class="d-flex mb-5 py-0" cols="6" lg="3" md="3" sm="3">
        <v-btn rounded color="grey" dark @click="resetSelection()">
          Reset
        </v-btn>
      </v-col>
    </v-row>

    <v-row justify="center" class="ma-0 pa-0">
      <v-col class="d-flex my-0 py-0" cols="6" lg="3" md="3" sm="3">
        <v-select
          v-model="selectedStatus"
          :items="getKeys(statusSelection)"
          label="Status"
          dense
          dark
          outlined
        ></v-select>
      </v-col>

      <v-col class="d-flex my-0 py-0" cols="6" lg="3" md="3" sm="3">
        <v-select
          v-model="selectedGender"
          :items="getKeys(genderSelection)"
          label="Gender"
          dense
          dark
          outlined
        ></v-select>
      </v-col>
    </v-row>
    <v-row justify="center" class="pa-0 ma-0">
      <v-progress-linear
        rounded
        color="primary"
        :active="isLoading"
        :indeterminate="isLoading"
      ></v-progress-linear>
    </v-row>
    <v-row justify="center">
      <h2 v-if="error === ''" class="white--text">
        {{ charactersCount }} characters are listed!
      </h2>
      <h2 v-else class="white--text">An error occurred: {{ error.message }}</h2>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { FETCH_CHARACTER_LIST } from "@/store/actions.type";

export default {
  name: "Search",
  data() {
    return {
      selectedGender: "",
      selectedStatus: "",
      selectedName: "",
    };
  },
  computed: {
    ...mapGetters([
      "isLoading",
      "statusSelection",
      "genderSelection",
      "charactersCount",
      "error",
    ]),
  },
  methods: {
    getKeys(obj) {
      return Object.keys(obj);
    },
    resetSelection() {
      this.selectedGender = "";
      this.selectedStatus = "";
      this.selectedName = "";
      this.sendQuery();
    },
    sendQuery() {
      this.$store.dispatch(FETCH_CHARACTER_LIST, {
        page: 1,
        name: this.selectedName,
        gender: this.selectedGender,
        status: this.selectedStatus,
      });
    },
  },
};
</script>
