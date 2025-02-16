<template>
  <v-container fluid>
    <v-row justify="center" align="center" class="ma-0 pa-0">
      <v-col class="d-flex my-0 py-0" cols="6" lg="3" md="3" sm="3">
        <v-combobox
          v-model="selectedName"
          :items.sync="characterNames"
          :search-input.sync="search"
          item-text="name"
          outlined
          single-line
          dense
          dark
          no-filter
          hide-details
          label="Search Character"
          clearable
          @keydown.enter="queryCharacterList()"
          :menu-props="{
            closeOnContentClick: true,
            closeOnClick: true,
          }"
          @click:clear="resetNameSelection()"
          @change="$refs['autocomplete'].isMenuActive = false"
          class="mb-3"
          ref="autocomplete"
        >
          <template v-slot:no-data>
            <v-list-item>
              <v-list-item-title>
                Search for Your Favorite Character
              </v-list-item-title>
            </v-list-item>
          </template></v-combobox
        >
      </v-col>
      <v-col class="d-flex py-0 mb-3" cols="6" lg="3" md="3" sm="3">
        <v-btn rounded color="green" dark @click="queryCharacterList()">
          Search
        </v-btn>
        <v-btn class="ml-2" rounded color="grey" dark @click="resetSelection()">
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
          outlined
          single-line
          dense
          dark
          no-filter
          hide-details
          @keydown.enter="queryCharacterList()"
          ref="status"
        ></v-select>
      </v-col>

      <v-col class="d-flex my-0 py-0" cols="6" lg="3" md="3" sm="3">
        <v-select
          v-model="selectedGender"
          :items="getKeys(genderSelection)"
          label="Gender"
          outlined
          single-line
          dense
          dark
          no-filter
          hide-details
          @keydown.enter="queryCharacterList()"
          ref="gender"
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
      <h2 v-else class="white--text">{{ getErrorMessage() }}</h2>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import {
  FETCH_CHARACTER_LIST,
  FETCH_CHARACTER_NAMES,
} from "@/store/actions.type";
import { SET_CHARACTER_NAMES } from "@/store/mutations.type";

export default {
  name: "Search",
  data() {
    return {
      selectedGender: "",
      selectedStatus: "",
      selectedName: "",
      search: null,
    };
  },
  computed: {
    ...mapGetters([
      "isLoading",
      "statusSelection",
      "genderSelection",
      "charactersCount",
      "characterNames",
      "error",
    ]),
  },
  methods: {
    getKeys(obj) {
      return Object.keys(obj);
    },
    resetNameSelection() {
      this.selectedName = "";
      this.$store.commit(SET_CHARACTER_NAMES, []);
    },
    getErrorMessage() {
      if (this.error.message === "GraphQL error: 404: Not Found") {
        return "No results found!";
      } else {
        return "An error occurred: " + this.error.message;
      }
    },
    resetSelection() {
      this.selectedGender = "";
      this.selectedStatus = "";
      this.selectedName = "";
      this.search = null;
      this.queryCharacterList();
      this.$store.commit(SET_CHARACTER_NAMES, []);
    },
    queryCharacterList() {
      let searchName = this.search != null ? this.search : "";
      this.$store.dispatch(FETCH_CHARACTER_LIST, {
        page: 1,
        name: searchName,
        gender: this.selectedGender,
        status: this.selectedStatus,
      });
    },
    querySelections(name) {
      this.$store.dispatch(FETCH_CHARACTER_NAMES, {
        page: 1,
        name: name,
        gender: this.selectedGender,
        status: this.selectedStatus,
      });
    },
  },
  watch: {
    search(val) {
      if (val != null && val.length > 2 && val !== this.selectedName) {
        this.querySelections(val);
      } else {
        this.resetNameSelection();
      }
    },
  },
};
</script>
