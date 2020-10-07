// https://www.youtube.com/watch?v=d2aKPJuVZHk
<template>
  <!-- Popup -->
  <div class="background has-background-primary-dark">
    <popUp
      :toggle="togglePop"
      :activate="active"
      :ticket="modElement.newTicket"
      :tags="modElement.newTags"
      v-on:newTag="emitedTag($event)"
      v-on:emmitTicket="emitedTicket($event)"
    />
    <!-- Modify popup -->
    <popUp
      :toggle="modifyPop"
      :activate="modifyActive"
      :ticket="modElement.newTicket"
      :tags="modElement.newTags"
      v-on:newTag="emitedTag($event)"
      v-on:emmitTicket="emitedModify($event)"
    />

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
import popUp from "../components/PopUp";
const API_URL = "http://localhost:5000/";
export default {
  data: () => ({
    uuid: "",
    newItem: null,
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
    boardList,
    popUp
  },
  methods: {
    emitedModify(emited) {
      this.newItem.tags = this.modElement.newTags;
      this.newItem.text = emited;
      this.modifyPop();
    },
    emitedTicket(ticket) {
      this.modElement.newTicket = ticket;
      this.addTicket();
    },
    emitedTag(tag) {
      this.modElement.newTag = tag;
      this.modElement.newTags.push(this.modElement.newTag);
      this.modElement.newTag = "";
    },
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
    modifyPop(item) {
      if (!this.modifyActive) {
        this.newItem = item;
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
.cont {
  display: flex;
  flex-direction: row;
  margin-top: 5%;
}
</style>
