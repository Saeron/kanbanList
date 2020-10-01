<template>
  <div class="home hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title big-title">
          <span class="has-text-primary">
            <i class="fas fa-columns"></i>
          </span>
          Kaban List
        </h1>
        <h2 class="subtitle">
          Draggable list made following the kaban method. Made with Vue and
          Node.
        </h2>
        <button @click="createCols()" class="button is-primary">Begin</button>
        <button
          @click="$router.push('/info')"
          class="button ml-3 is-primary is-outlined"
        >
          <span class="icon">
            <i class="fas fa-info"></i>
          </span>
          <span>info</span>
        </button>
        <p class="mt-3">v0.1</p>
        <button @click="redirectGithub()" class="mt-3 button">
          <span class="icon">
            <i class="fab fa-github"></i>
          </span>
          <span>GitHub</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.big-title {
  font-size: 6rem !important;
}
</style>

<script>
const API_URL = "http://localhost:5000/";
export default {
  methods: {
    createCols() {
      try {
        fetch(API_URL + "list", {
          method: "POST",
          headers: {
            "content-type": "application/json"
          }
        })
          .then(res => res.json())
          .then(result => {
            var uuid = result.uuid;
            this.$router.push(`/columns/${uuid}`);
          });
      } catch (error) {
        console.log(error);
      }
    }
  },
  name: "Home",
  components: {}
};
</script>
