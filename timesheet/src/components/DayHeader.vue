<script setup>
defineProps({
  date: {
    type: Date,
    required: true,
  },
});
</script>
<template>
  <div class="day-header">
    <div class="day-of-week">
      {{ date.toLocaleString("en-us", { weekday: "long" }) }}
    </div>
    <div class="day">{{ date.getDate() }}</div>
  </div>
</template>

<style scoped>
.day-header {
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
  justify-items: center;
  padding: 5px 20px;
  border-bottom: 1px solid #eee;
}

.day-of-week {
  opacity: 50%;
}

.day-header .day {
  font-size: 22px;
}
</style>
