<template>
  <div class="text-center">
    <template v-if="pageCount > 1 && error === ''">
      <v-container>
        <v-row justify="center">
          <v-col cols="6">
            <v-container class="max-width">
              <v-pagination
                v-model="searchParams.page"
                class="my-4"
                color="rgba(0,47,101,1)"
                circle
                dark
                :length="pageCount"
                @input="onPageChange()"
              ></v-pagination>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { FETCH_CHARACTER_LIST } from "@/store/actions.type";

export default {
  name: "Pagination",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["pageCount", "searchParams", "error"]),
  },
  methods: {
    onPageChange() {
      this.$store.dispatch(FETCH_CHARACTER_LIST, {
        page: this.searchParams.page,
        name: this.searchParams.name,
        status: this.searchParams.status,
        gender: this.searchParams.gender,
      });
      this.$vuetify.goTo(0);
    },
  },
};
</script>
