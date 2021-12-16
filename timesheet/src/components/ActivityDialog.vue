<script setup>
import moment from "moment";

defineProps({
  edittingActivity: {
    type: Object,
    required: false,
  },
  onSaveActivity: {
    type: Function,
    required: true,
  },
  onDeleteActivity: {
    type: Function,
    required: false,
  },
  date: {
    type: Date,
    default: () => new Date(),
  },
  onClose: {
    type: Function,
    default: () => {},
  },
});
</script>
<script>
export default {
  data() {
    let activity;

    if (this.edittingActivity) {
      activity = this.edittingActivity;
    } else {
      activity = {
        name: "",
        duration: 0,
      };
    }

    return {
      activity,
    };
  },
  computed: {
    formatedDate() {
      return moment(this.date).format("MMM-DD");
    },
    presetHours() {
      return [1, 2, 4, 8];
    },
  },
  methods: {
    addActivity() {
      this.onSaveActivity(this.date, this.activity);
      this.onClose();
    },
    deleteActivity() {
      this.onDeleteActivity(this.date, this.activity);
      this.onClose();
    },
  },
};
</script>

<template>
  <div>
    <div class="dialog-background" @click="onClose" />
    <div class="activity dialog">
      <div class="dialog-header">
        {{ activity.id ? "Edit" : "Add" }} Activity
      </div>
      <div class="dialog-body">
        <div class="description">
          Add an activity on date: {{ formatedDate }}
        </div>
        <div class="form-group">
          <input
            placeholder="Activity Name"
            type="text"
            class="form-control"
            id="activity-name"
            v-model="activity.name"
          />
          <i class="far fa-list-alt"></i>
        </div>
        <div class="form-group">
          <input
            placeholder="Duration"
            type="number"
            class="form-control"
            id="activity-duration"
            v-model="activity.duration"
          />
          <div class="preset-hours" v-for="hour in presetHours" :key="hour">
            <button class="preset button" v-on:click="activity.duration = hour">
              {{ hour }}
            </button>
          </div>
          <i class="far fa-clock"></i>
        </div>
      </div>
      <div class="actions">
        <button class="button" @click="addActivity">
          {{ activity.id ? "Save" : "Add" }}
        </button>
        <button class="trash button" @click="deleteActivity">
          <i class="fa fa-trash"></i>
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.dialog-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.05);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.activity.dialog {
  position: fixed;
  top: calc(100vh / 2 - 150px);
  left: calc(100vw / 2 - 150px);
  width: 300px;
  height: 300px;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #ccc;
  z-index: 11;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
}

.dialog-body {
  flex-grow: 1;
}

.dialog-header {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.form-group {
  margin-bottom: 10px;
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
  justify-content: center;
  align-items: center;
}

.description {
  color: #999;
}

.form-group label {
  display: block;
  margin-right: 5px;
}

input[type="text"],
input[type="number"] {
  flex-grow: 1;
  outline: none;
  padding: 5px 0;
  border-width: 0;
  font-size: 16px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

input[type="number"] {
  width: 30px;
}

.preset-hours {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.preset.button {
  padding: 3px 7px;
  margin-right: 5px;
  display: block;
  background: rgba(89, 62, 255, 0.7);
}

.button {
  padding: 10px 20px;
  width: 100%;
  border: none;
  border-radius: 5px;
  background-color: rgba(89, 62, 255, 1);
  color: #fff;
  cursor: pointer;
}

.button:hover {
  background-color: rgb(68, 46, 212);
}

.actions {
  display: flex;
  justify-content: space-between;
}

.trash.button {
  width: 50px;
  margin-left: 10px;
  background: rgb(223, 93, 93);
}
</style>
