<script setup>
import ActivityDialog from "./ActivityDialog.vue";

defineProps({
  activity: {
    type: Object,
    required: true,
  },
  onSaveActivity: {
    type: Function,
    required: true,
  },
  onDeleteActivity: {
    type: Function,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});
</script>

<script>
export default {
  data() {
    return {
      showingDialog: false,
    };
  },
  methods: {
    showDialog() {
      this.showingDialog = true;
    },
    hideDialog() {
      this.showingDialog = false;
    },
  },
};
</script>

<template>
  <div>
    <div class="activity" @click="showDialog">
      <div class="duration">
        <i class="far fa-clock" />
        {{ activity.duration }} hours
      </div>
      <div class="content">{{ activity.name }}</div>
    </div>
    <ActivityDialog
      v-if="showingDialog"
      @saveActivity="onSaveActivity"
      @deleteActivity="onDeleteActivity"
      :edittingActivity="activity"
      :onClose="hideDialog"
      :date="date"
    />
  </div>
</template>

<style scoped>
.activity {
  background-color: rgb(246, 236, 255);
  border-top: 2px solid rgb(163, 62, 252);
  border-radius: 0 0 2px 2px;
  margin: 5px;
  padding: 5px 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  cursor: pointer;
}

.duration {
  background-color: rgba(163, 62, 252, 0.5);
  font-weight: bold;
  border-radius: 5px;
  padding: 3px 10px;
  color: white;
  font-size: 10px;
  margin-bottom: 5px;
}
</style>
