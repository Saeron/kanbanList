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
    <div class="cont ">
      <boardList
        title="To-Do"
        :list="list1"
        :modify="modifyPop"
        :toggle="togglePop"
        :buttonShow="true"
        v-on:delete="emitedList($event)"
        class="is-primary"
      />

      <boardList
        title="In-Progress"
        :list="list2"
        :modify="modifyPop"
        :toggle="togglePop"
        :buttonShow="false"
        v-on:delete="emitedList($event)"
        class="is-danger"
      />

      <boardList
        title="Finished"
        :list="list3"
        :modify="modifyPop"
        :toggle="togglePop"
        :buttonShow="false"
        v-on:delete="emitedList($event)"
        class="is-success"
      />
    </div>
  </div>
</template>

<script>
import boardList from "../components/BoardList";
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
    list1: [],
    list2: [],
    list3: []
  }),
  mounted() {
    this.uuid = this.$route.params.id;
    const body = {
      uuid: this.uuid
    };
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
          this.list1 = result.list1;
          this.list2 = result.list2;
          this.list3 = result.list3;
        });
    } catch (error) {
      console.log(error);
    }
  },
  watch: {
    list1: {
      deep: true,
      handler() {
        try {
          fetch(API_URL + "updateLists", {
            method: "POST",
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify({
              uuid: this.uuid,
              list1: this.list1,
              list2: this.list2,
              list3: this.list3
            })
          });
        } catch (error) {
          console.log(error);
        }
      }
    },
    list2: {
      deep: true,
      handler() {
        try {
          fetch(API_URL + "updateLists", {
            method: "POST",
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify({
              uuid: this.uuid,
              list1: this.list1,
              list2: this.list2,
              list3: this.list3
            })
          });
        } catch (error) {
          console.log(error);
        }
      }
    },
    list3: {
      deep: true,
      handler() {
        try {
          fetch(API_URL + "updateLists", {
            method: "POST",
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify({
              uuid: this.uuid,
              list1: this.list1,
              list2: this.list2,
              list3: this.list3
            })
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  },
  components: {
    boardList
  },
  methods: {
    emitedList(lists) {
      if (lists.modlist) {
        if (lists.original === this.list1) {
          this.list1 = lists.modlist;
        } else if (lists.original === this.list2) {
          this.list2 = lists.modlist;
        } else if (lists.original === this.list3) {
          this.list3 = lists.modlist;
        }
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
        try {
          fetch(API_URL + "addTicket", {
            method: "POST",
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify({
              uuid: this.uuid,
              item: {
                text: this.modElement.newTicket,
                tags: this.modElement.newTags
              }
            })
          })
            .then(res => res.json())
            .then(result => {
              this.list1 = result.list1;
            });
          this.modElement.newTicket = "";
        } catch (error) {
          console.error(error);
        }
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
  margin-top: 5%;
}
.column {
  min-width: 350px !important;
  height: 80vh;
  min-height: 500px;
  margin: 1rem;
  border-radius: 5px;
}
</style>
