// https://www.youtube.com/watch?v=d2aKPJuVZHk
<template>
  <!-- Popup -->
  <div class="background has-background-primary-dark">
    <div :class="{ 'is-active': active }" class="modal">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Introduce a new ticket</p>
          <button
            @click="togglePop()"
            class="delete"
            aria-label="close"
          ></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">Description</label>
            <div class="control">
              <input
                v-model="modElement.newTicket"
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
                v-model="modElement.newTag"
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
            <li v-for="(tag, index) in modElement.newTags" :key="index">
              {{ tag }}
            </li>
          </ul>
        </section>
        <footer class="modal-card-foot">
          <button @click="addTicket()" class="button is-success">
            Save changes
          </button>
          <button @click="togglePop()" class="button">Cancel</button>
        </footer>
      </div>
    </div>

    <!-- modify popup -->
    <div :class="{ 'is-active': modifyActive }" class="modal">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Introduce a new ticket</p>
          <button
            @click="modifyPop()"
            class="delete"
            aria-label="close"
          ></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">Description</label>
            <div class="control">
              <input
                v-model="modElement.newTicket"
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
                v-model="modElement.newTag"
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
            <li v-for="(tag, index) in modElement.newTags" :key="index">
              {{ tag }}
            </li>
          </ul>
        </section>
        <footer class="modal-card-foot">
          <button @click="modifyTicket()" class="button is-success">
            Save changes
          </button>
          <button @click="modifyPop()" class="button">Cancel</button>
        </footer>
      </div>
    </div>

    <!-- Page content -->
    <h1 class="title has-text-centered has-text-white">Title</h1>
    <div class="cont ">
      <article class="panel is-primary column has-background-primary-light	">
        <p class="panel-heading">
          To-Do
          <button @click="togglePop()" class="btn-none has-text-right">
            <i class="fas fa-plus"></i>
          </button>
        </p>

        <draggable class="dragzone" :list="list1" group="tasks">
          <a
            @click="modifyPop(item)"
            class="panel-block is-active"
            v-for="item in list1"
            :key="item.id"
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
                  @click.stop="deleteItem(list1, item)"
                >
                  remove
                </button>
              </nav>
              <p>{{ item.text }}</p>
            </div>
          </a>
        </draggable>
      </article>

      <article class="panel is-danger column has-background-primary-light">
        <p class="panel-heading">
          In-Progress
        </p>
        <draggable class="dragzone" :list="list2" group="tasks">
          <a
            @click="modifyPop(item)"
            class="panel-block is-active"
            v-for="item in list2"
            :key="item.id"
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
                  @click.stop="deleteItem(list2, item)"
                >
                  remove
                </button>
              </nav>
              <p>{{ item.text }}</p>
            </div>
          </a>
        </draggable>
      </article>

      <article class="panel is-success column has-background-primary-light">
        <p class="panel-heading">
          Finished
        </p>
        <draggable class="dragzone" :list="list3" group="tasks">
          <a
            @click="modifyPop(item)"
            class="panel-block is-active"
            v-for="item in list3"
            :key="item.id"
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
                  @click.stop="deleteItem(list3, item)"
                >
                  remove
                </button>
              </nav>
              <p>{{ item.text }}</p>
            </div>
          </a>
        </draggable>
      </article>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
const API_URL = "http://localhost:5000/";
export default {
  data: () => ({
    uuid: "",
    refItem: {},
    modElement: {
      newTicket: "",
      newTag: "",
      newTags: []
    },
    modifyActive: false,
    active: false,
    isDragging: false,
    editable: true,
    list1: [
      { id: 1, tags: ["front"], text: "bulma" },
      { id: 2, tags: ["middle"], text: "draggable" },
      { id: 3, tags: ["front", "middle"], text: "vue" },
      { id: 4, tags: ["back", "middle"], text: "node" },
      { id: 5, tags: ["back", "middle"], text: "express" }
    ],
    list2: [],
    list3: []
  }),
  mounted() {
    this.uuid = this.$route.params.id;
    const body = {
      uuid: this.uuid
    };
    console.log(this.uuid);
    try {
      fetch(API_URL + "list", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(body)
      })
        .then(res => res.json())
        .then(result => {
          console.log(result);
          this.list1 = result.list1;
          this.list2 = result.list2;
          this.list3 = result.list3;
        });
    } catch (error) {
      console.log(error);
    }
  },
  components: {
    draggable
  },
  methods: {
    deleteItem(list, item) {
      const modList = list.filter(ticket => ticket.id != item.id);
      if (list === this.list1) {
        this.list1 = modList;
      } else if (list === this.list2) {
        this.list2 = modList;
      } else {
        this.list3 = modList;
      }
    },
    modifyTicket() {
      this.refItem.text = this.modElement.newTicket;
      this.refItem.tags = this.modElement.newTags;
      this.modifyPop();
    },
    modifyPop(item) {
      if (!this.modifyActive) {
        this.refItem = item;
        this.modElement.newTicket = item.text;
        this.modElement.newTags = Array.from(item.tags);
      } else {
        this.modElement.newTags = [];
        this.modElement.newTicket = "";
        this.modElement.newTag = "";
      }
      this.modifyActive = !this.modifyActive;
    },
    togglePop() {
      this.modElement.newTags = [];
      this.modElement.newTicket = "";
      this.modElement.newTag = "";
      this.active = !this.active;
    },
    addTag() {
      this.modElement.newTags.push(this.modElement.newTag);
      this.modElement.newTag = "";
    },
    addTicket() {
      if (this.modElement.newTicket) {
        this.list1.push({
          text: this.modElement.newTicket,
          tags: this.modElement.newTags,
          id: Math.random() * 100
        });
        this.modElement.newTicket = "";
      }
      this.togglePop();
    }
  }
};
</script>

<style>
html {
  overflow-y: hidden !important;
}
body {
  height: 100vh;
}
.background {
  height: 100vh;
  overflow-x: auto;
}
.rigthDelete {
  float: right;
}
.btn-none {
  background: none;
  border: none;
  color: white;
  float: right;
  font-size: 1.3rem;
}
.breadcrumb {
  font-size: 0.8rem !important;
  color: hsl(204, 86%, 53%);
}
.ticket {
  width: 100%;
}

.dragzone {
  height: 90%;
  overflow-y: auto;
}
.cont {
  display: flex;
  flex-direction: row;
}
.column {
  min-width: 350px !important;
  height: 80vh;
  min-height: 500px;
  margin: 1rem;
  border-radius: 5px;
}
.to-Do {
  background-color: aqua;
}
.in-Progress {
  background-color: rgb(24, 153, 104);
}
.finished {
  background-color: rgb(3, 124, 33);
}
</style>
