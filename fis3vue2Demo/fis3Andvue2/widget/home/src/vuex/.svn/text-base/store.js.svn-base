import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {
  notes: [],
  activeNote: {}
};
const mutations={
  ADD_NOTE:function (state) {
      alert(1);
    const newNote = {
      text: 'New note',
      favorite: false
    }
    state.notes.push(newNote)
    state.activeNote = newNote
  }
};

const actions={
  addNote:({ dispatch,commit }) => {
       commit('ADD_NOTE')
  }
};

export default new Vuex.Store({
   state,
   mutations,
   actions,
   strict: true
});
