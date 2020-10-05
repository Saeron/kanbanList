<template>
  <article class="panel column has-background-primary-light	">
    <p class="panel-heading">
      {{ title }}
      <button v-if="buttonShow" @click="toggle" class="btn-none has-text-right">
        <i class="fas fa-plus"></i>
      </button>
    </p>

    <draggable class="dragzone" :list="list" group="tasks">
      <a
        @click="modify(item)"
        class="panel-block is-active"
        v-for="item in list"
        :key="item._id"
      >
        <div class="ticket">
          <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
              <li v-for="(tag, index) in item.tags" :key="index">
                {{ tag }}
              </li>
            </ul>
            <button
              class="delete rigthDelete has-background-danger-dark"
              @click.stop="deleteItem(item)"
            >
              remove
            </button>
          </nav>
          <p>{{ item.text }}</p>
        </div>
      </a>
    </draggable>
  </article>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "boardList",
  props: {
    title: { type: String, required: true },
    list: { type: Array },
    modify: { type: Function },
    toggle: { type: Function },
    buttonShow: Boolean
  },
  components: {
    draggable
  },
  methods: {
    deleteItem(item) {
      const modList = this.list.filter(ticket => ticket._id != item._id);
      this.$emit("delete", {
        original: this.list,
        modlist: modList
      });
    }
  }
};
</script>

<style>
.column {
  min-width: 350px !important;
  height: 80vh;
  min-height: 500px;
  margin: 1rem;
  border-radius: 5px;
}
</style>
