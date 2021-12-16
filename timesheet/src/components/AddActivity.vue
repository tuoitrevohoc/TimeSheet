<script setup>
import ActivityDialog from "./ActivityDialog.vue";

defineProps({
  date: {
    type: Date,
    default: () => new Date(),
  },
  onAddActivity: {
    type: Function,
    required: true,
  },
});
</script>
<script>
export default {
  data() {
    return { showingDialog: false };
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
    <a href="#" class="add-activity" v-on:click="showDialog">
      <span>Add activity</span>
    </a>
    <ActivityDialog
      v-if="showingDialog"
      @saveActivity="onAddActivity"
      :onClose="hideDialog"
      :date="date"
    />
  </div>
</template>

<style scoped>
.add-activity {
  padding: 5px 10px;
  display: flex;
  align-content: space-around;
  justify-content: space-around;
  border-radius: 5px;
  border: 1px dashed rgba(89, 62, 255, 0.5);
  color: rgba(89, 62, 255, 0.5);
  margin: 10px 5px 5px;
  text-decoration: none;
}

.add-activity:hover {
  background-color: rgba(89, 62, 255, 0.5);
  color: white;
}
</style>
