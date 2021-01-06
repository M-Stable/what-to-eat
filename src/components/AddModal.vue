<template lang="">
  <div>
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <h1>{{ type === "Add" ? "Add" : "Edit" }} Restaurant</h1>
            <form @submit.prevent="pressed">
              <input v-model="name" placeholder="restaurant name *" required />
              <input v-model="location" placeholder="location" />
              <input v-model="phone" placeholder="phone" />
              <input v-model="website" placeholder="website" />
              <div class="rating-container">
                <span class="rating-label">Rating:</span>
                <div class="rating rating2">
                  <a @click="rating = 5" href="#5" title="Give 5 rating">
                    <div
                      id="rating"
                      class="rating-div"
                      v-bind:class="{ filled: 5 <= rating }"
                    />
                  </a>
                  <a @click="rating = 4" href="#4" title="Give 4 rating">
                    <div
                      id="rating"
                      class="rating-div"
                      v-bind:class="{ filled: 4 <= rating }"
                    />
                  </a>
                  <a @click="rating = 3" href="#3" title="Give 3 rating">
                    <div
                      id="rating"
                      class="rating-div"
                      v-bind:class="{ filled: 3 <= rating }"
                    />
                  </a>
                  <a @click="rating = 2" href="#2" title="Give 2 rating">
                    <div
                      id="rating"
                      class="rating-div"
                      v-bind:class="{ filled: 2 <= rating }"
                    />
                  </a>
                  <a @click="rating = 1" href="#1" title="Give 1 rating">
                    <div
                      id="rating"
                      class="rating-div"
                      v-bind:class="{ filled: 1 <= rating }"
                    />
                  </a>
                </div>
              </div>
              <div class="button-group">
                <button type="submit" class="add">
                  {{ type === "Add" ? "Add" : "Edit" }}
                </button>
                <button
                  @click="deleteHandler"
                  v-if="type === 'Edit'"
                  class="delete"
                >
                  Delete
                </button>
                <button
                  class="cancel"
                  @click="
                    {
                      $emit('close');
                      removeHash();
                    }
                  "
                >
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
  data() {
    return {
      name: "",
      location: "",
      website: "",
      phone: "",
      rating: 0,
    };
  },
  props: {
    category: String,
    item: Object,
    type: String,
    _key: String,
  },
  created() {
    if (this.item) {
      this.name = this.item.name;
      this.location = this.item.location;
      this.website = this.item.website;
      this.phone = this.item.phone;
      this.rating = this.item.rating;
    }
  },
  methods: {
    pressed() {
      const userId = firebase.auth().currentUser.uid;

      const itemData = {
        name: this.name,
        location: this.location ? this.location : "Unknown",
        website: this.website ? this.website : "Unknown",
        phone: this.phone ? this.phone : "Unknown",
        rating: this.rating ? this.rating : 0,
        category: this.category,
      };

      const newPostKey = firebase
        .database()
        .ref("users/" + userId)
        .child("items")
        .push().key;

      const updates = {};
      if (this.type === "Edit") {
        updates["users/" + userId + "/items/" + this._key] = itemData;
      } else if (this.type === "Add") {
        updates["users/" + userId + "/items/" + newPostKey] = itemData;
      }

      firebase
        .database()
        .ref()
        .update(updates);

      this.$emit("close");
      this.removeHash();
    },
    removeHash() {
      window.location.hash = "";
    },
    deleteHandler() {
      const userId = firebase.auth().currentUser.uid;

      firebase
        .database()
        .ref("users/" + userId + "/items/" + this._key)
        .remove();
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

.rating-container {
  display: flex;
  align-items: center;
}

.rating-div {
  height: 20px;
  width: 20px;
  border: 3px solid black;
  transform: rotate(45deg);
  margin: 0 10px;
}

.rating {
  display: flex;
  align-items: center;
  margin: 10px 0;
  direction: rtl;
  margin-left: 10px;
}

.rating div,
.rating label {
  -webkit-transition: background 0.4s;
  -moz-transition: background 0.4s;
  -o-transition: background 0.4s;
  transition: background 0.4s;
}

.rating a:hover div,
.rating a:hover ~ a div,
.rating a:focus div,
.rating a:focus ~ a div {
  background-color: black;
  cursor: pointer;
}

.rating-label {
  font-family: "Saira Condensed", sans-serif;
  font-size: 1.5rem;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

.add,
.delete,
.cancel {
  height: 40px;
  /* width: 48%; */
  flex: 1.5;
  border: 3px solid black;
  align-self: center;
  background: black;
  color: white;
  margin-top: 10px;

  transition: 0.3s;
}

.add:hover {
  cursor: pointer;
  background: white;
  color: black;
}

.delete {
  background: red;
  border: 3px solid red;
  flex: 0.5;
  margin-left: 10px;
}

.delete:hover {
  cursor: pointer;
  background: white;
  color: black;
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
