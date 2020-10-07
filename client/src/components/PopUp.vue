<template>
  <div :class="{ 'is-active': activate }" class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Introduce a new ticket</p>
        <button @click="toggle" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label class="label">Description</label>
          <div class="control">
            <input
              v-model="newTicket"
              class="input"
              type="text"
              placeholder="Introduce your ticket"
            />
          </div>
        </div>
        <label class="label">Tags</label>
        <div class="field is-grouped">
          <p class="control is-expanded">
            <input
              @keyup.enter="addTag()"
              v-model="newTag"
              class="input"
              type="text"
              placeholder="Add a new tag"
            />
          </p>
          <p class="control">
            <a @click="addTag()" class="button is-info">
              add
            </a>
          </p>
        </div>
        <ul>
          <li v-for="(tag, index) in tags" :key="index">
            {{ tag }}
          </li>
        </ul>
      </section>
      <footer class="modal-card-foot">
        <button @click="addTicket()" class="button is-success">
          Save changes
        </button>
        <button @click="toggle" class="button">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "popUp",
  props: {
    toggle: { type: Function },
    activate: Boolean,
    ticket: String,
    tags: { type: Array }
  },
  methods: {
    addTag() {
      this.$emit("newTag", this.newTag);
      this.newTag = "";
    },
    addTicket() {
      this.$emit("emmitTicket", this.newTicket);
      this.newTicket = "";
    }
  },
  watch: {
    ticket: {
      handler() {
        this.newTicket = this.ticket;
      }
    }
  },
  data: () => ({
    newTicket: "",
    newTag: ""
  })
};
</script>

<style></style>
