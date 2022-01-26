<template>
  <div>
    <v-hover v-slot="{ hover }" open-delay="100">
      <v-card
        class="mx-auto"
        width="225"
        dark
        color="rgba(0,47,101,1)"
        :elevation="hover ? 12 : 2"
        :class="{ 'on-hover': hover }"
        @click="
          isDialog = true;
          queryCharacter(character.id);
        "
      >
        <v-img :src="character.image" height="225" contain></v-img>
        <v-card-title>{{ character.name }}</v-card-title>
        <v-card-subtitle>
          <v-chip
            class="ma-0"
            :color="statusSelection[character.status]"
            text-color="white"
            small
          >
            {{ character.status }}
          </v-chip>
          - {{ character.species }}
        </v-card-subtitle>
      </v-card>
    </v-hover>
    <v-dialog v-model="isDialog" width="500">
      <CharacterDialog></CharacterDialog>
    </v-dialog>
  </div>
</template>

<script>
import CharacterDialog from "./CharacterDialog";
import { FETCH_CHARACTER } from "@/store/actions.type";
import { mapGetters } from "vuex";

export default {
  name: "Card",
  components: { CharacterDialog },
  data() {
    return {
      isDialog: false,
    };
  },
  props: {
    character: Object,
  },
  computed: {
    ...mapGetters(["statusSelection"]),
  },
  methods: {
    queryCharacter(id) {
      this.$store.dispatch(FETCH_CHARACTER, {
        id: id,
      });
    },
  },
};
</script>
