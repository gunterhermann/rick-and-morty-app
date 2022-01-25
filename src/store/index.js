import Vue from "vue";
import Vuex from "vuex";
import gql from "graphql-tag";
import {
  FETCH_CHARACTER,
  FETCH_CHARACTER_LIST,
  FETCH_CHARACTER_NAMES,
} from "./actions.type";
import {
  FETCH_START,
  SET_CHARACTER_LIST,
  SET_CHARACTER_NAMES,
  SET_CHARACTER,
  SET_SEARCH_PARAMS,
  SET_ERROR,
  RESET_COUNTS,
} from "./mutations.type";

import graphqlClient from "../common/graphql.service";

Vue.use(Vuex);

const state = {
  characterList: [],
  character: [],
  characterNames: [],
  searchParams: {
    page: null,
    name: null,
    status: null,
    gender: null,
  },
  isLoading: true,
  charactersCount: null,
  pageCount: null,
  statusSelection: {
    Alive: "green",
    Dead: "red",
    unknown: "grey",
  },
  genderSelection: {
    Female: "mdi-gender-female",
    Male: "mdi-gender-male",
    Genderless: "mdi-gender-male-female",
    unknown: "mdi-help-circle-outline",
  },
  error: "",
};

const getters = {
  characterList(state) {
    return state.characterList;
  },
  characterNames(state) {
    return state.characterNames;
  },
  character(state) {
    return state.character;
  },
  searchParams(state) {
    return state.searchParams;
  },
  isLoading(state) {
    return state.isLoading;
  },
  charactersCount(state) {
    return state.charactersCount;
  },
  pageCount(state) {
    return state.pageCount;
  },
  statusSelection(state) {
    return state.statusSelection;
  },
  genderSelection(state) {
    return state.genderSelection;
  },
  error(state) {
    return state.error;
  },
};

const actions = {
  async [FETCH_CHARACTER]({ commit }, params) {
    commit(FETCH_START);
    commit(SET_ERROR, "");
    return await graphqlClient
      .query({
        query: gql`
          query Character($id: ID!) {
            character(id: $id) {
              name
              status
              species
              gender
              image
              location {
                name
              }
              origin {
                name
              }
              episode {
                name
              }
            }
          }
        `,
        variables: {
          id: params.id,
        },
      })
      .then(({ data }) => {
        commit(SET_CHARACTER, data.character);
      })
      .catch((error) => {
        commit(SET_ERROR, error);
      });
  },
  async [FETCH_CHARACTER_LIST]({ commit }, params) {
    commit(FETCH_START);
    commit(SET_ERROR, "");
    commit(RESET_COUNTS);
    return await graphqlClient
      .query({
        query: gql`
          query Characters(
            $page: Int!
            $name: String!
            $status: String!
            $gender: String!
          ) {
            characters(
              page: $page
              filter: { name: $name, status: $status, gender: $gender }
            ) {
              info {
                count
              }
              results {
                id
                name
                status
                species
                image
              }
            }
          }
        `,
        variables: {
          page: params.page,
          name: params.name,
          status: params.status,
          gender: params.gender,
        },
      })
      .then(({ data }) => {
        commit(SET_CHARACTER_LIST, data.characters);
        commit(SET_SEARCH_PARAMS, params);
      })
      .catch((error) => {
        commit(SET_ERROR, error);
      });
  },
  async [FETCH_CHARACTER_NAMES]({ commit }, params) {
    commit(FETCH_START);
    commit(SET_ERROR, "");
    return await graphqlClient
      .query({
        query: gql`
          query Characters(
            $page: Int!
            $name: String!
            $status: String!
            $gender: String!
          ) {
            characters(
              page: $page
              filter: { name: $name, status: $status, gender: $gender }
            ) {
              results {
                name
              }
            }
          }
        `,
        variables: {
          page: params.page,
          name: params.name,
          status: params.status,
          gender: params.gender,
        },
      })
      .then(({ data }) => {
        commit(SET_CHARACTER_NAMES, data.characters);
      })
      .catch((error) => {
        throw new Error(error);
      });
  },
};

/* eslint no-param-reassign: ["error", { "props": false }] */
const mutations = {
  [FETCH_START](state) {
    state.isLoading = true;
  },
  [RESET_COUNTS](state) {
    state.charactersCount = 0;
    state.pageCount = 0;
  },
  [SET_ERROR](state, error) {
    state.error = error;
    state.isLoading = false;
  },
  [SET_CHARACTER_LIST](state, characterList) {
    state.charactersCount = characterList.info.count;
    state.pageCount = Math.floor(state.charactersCount / 20) + 1;
    state.characterList = characterList.results;
    state.isLoading = false;
  },
  [SET_CHARACTER_NAMES](state, characterNames) {
    state.characterNames = characterNames.results;
    state.isLoading = false;
  },
  [SET_CHARACTER](state, character) {
    state.character = character;
    state.isLoading = false;
  },
  [SET_SEARCH_PARAMS](state, params) {
    state.searchParams = params;
  },
};

export default new Vuex.Store({
  mutations,
  actions,
  state,
  getters,
});
