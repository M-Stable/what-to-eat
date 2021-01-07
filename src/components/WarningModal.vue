<template lang="">
  <div>
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <h1>Are You Sure?</h1>
            <h3>
              This will delete Category '{{ this.category }}' and all its items
            </h3>
            <form @submit.prevent="pressed">
              <div class="button-group">
                <router-link to="/home" class="delete-container">
                  <button @click="deleteHandler" class="delete">
                    Delete
                  </button>
                </router-link>
                <button class="cancel" @click="$emit('close')">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";

export default {
  props: {
    category: String,
    categoryId: String,
  },
  data() {
    return {
      itemKeys: [],
    };
  },
  methods: {
    deleteHandler() {
      const userId = firebase.auth().currentUser.uid;

      firebase
        .database()
        .ref("users/" + userId + "/categories/" + this.categoryId)
        .remove();

      // firebase
      //   .database()
      //   .ref("/users/" + userId + "/categories")
      //   .once("value")
      //   .then((snapshot) => {
      //     this.categoryId = Object.keys(snapshot.val()).filter((key) => {
      //       if (snapshot.val()[key].category === this.category) return key;
      //     })[0];
      //   });

      firebase
        .database()
        .ref("/users/" + userId + "/items")
        .once("value")
        .then((snapshot) => {
          if (!snapshot.val()) return;
          const result = Object.keys(snapshot.val()).map((key) => {
            if (snapshot.val()[key].category === this.category) return key;
          });

          const itemKeys = result.filter((key) => key !== undefined);

          itemKeys.forEach((key) => {
            firebase
              .database()
              .ref("users/" + userId + "/items/" + key)
              .remove();
          });
        });

      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

input {
  height: 40px;
  width: calc(100% - 25px);
  margin: 10px 0;
  font-size: 1rem;
}

.filled {
  background: black;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

.delete,
.cancel {
  height: 40px;
  flex: 1;
  border: 3px solid black;
  background: black;
  color: white;
  margin-top: 10px;

  transition: 0.3s;
}

.delete {
  background: red;
  border: 3px solid red;
  width: 100%;
}

.delete-container {
  flex: 0.5;
}

.delete:hover {
  cursor: pointer;
}

.cancel {
  background: white;
  color: black;
  flex: 0.5;
  margin-left: 10px;
}

.cancel:hover {
  cursor: pointer;
  background: black;
  color: white;
}
</style>
