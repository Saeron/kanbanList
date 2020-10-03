<template>
  <div class="hero is-fullheight">
    <div class="hero-head">
      <div class="container has-text-centered">
        <h1 class="title big-title">
          <span class="has-text-primary">
            <i class="fas fa-columns"></i>
          </span>
          Kaban List
        </h1>
      </div>
    </div>
    <div class="hero-body">
      <div class="container has-text-centered explanation">
        <p class="content is-large info">
          KanbanLis is a simple kanban method list made it with vue and nodejs.
          Is very simple to use, the only thing tou need to do is click the
          button begin, this will automaticly create a new board with a ramdon
          code in your url, so you can copy the url to access the board again.
        </p>
        <p class="content is-large info">
          For this reasons is important to know that anyone with the code can
          access the board, so you can share your boards wiht others just by
          sharing your link.
        </p>
        <p class="content is-large info">
          Also this make the board public, because you can try diferents codes
          until you find a board, if you have the time to do it. So don't put
          important information here, you have been warned.
        </p>
        <button @click="$router.push('/')" class="button is-primary">
          Back
        </button>
      </div>
    </div>
    <div class="hero-foot">
      <div class="container hero-footer">
        <p class="content has-text-primary info">
          Contact: antdcs@gmail.com
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.info {
  padding-left: 15% !important;
  padding-right: 15% !important;
}
.hero-footer {
  padding-bottom: 1% !important;
}
</style>
