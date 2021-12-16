<script setup>
import DayHeader from "./DayHeader.vue";
import AddActivity from "./AddActivity.vue";
import Activity from "./Activity.vue";
import timesheet from "../services/timesheet";
</script>
<script>
function getMonday() {
  const date = new Date();
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - date.getDay() + 1
  );
}

export default {
  data() {
    return {
      startDate: getMonday(),
      data: [],
    };
  },
  created() {
    this.reloadData();
  },
  methods: {
    async addActivity(date, activity) {
      await timesheet.addActivity(date, activity);
      this.reloadData();
    },
    async saveActivity(date, activity) {
      await timesheet.updateActivity(date, activity);
      this.reloadData();
    },
    async deleteActivity(date, activity) {
      await timesheet.deleteActivity(date, activity);
      this.reloadData();
    },
    async reloadData() {
      try {
        this.data = await timesheet.getTimeSheet(this.startDate, 7);
        console.log(this.data);
      } catch (e) {
        console.log(e);
      }
    },
    async nextWeek() {
      this.startDate = new Date(
        this.startDate.getTime() + 7 * 24 * 60 * 60 * 1000
      );
      this.reloadData();
    },
    async previousWeek() {
      this.startDate = new Date(
        this.startDate.getTime() - 7 * 24 * 60 * 60 * 1000
      );
      this.reloadData();
    },
    getDateClass(date) {
      const today = new Date();

      if (date.getDay() === 0 || date.getDay() === 6) {
        return "weekend";
      } else if (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      ) {
        return "today";
      } else {
        return "";
      }
    },
  },
};
</script>

<template>
  <div class="time-sheet">
    <div class="header">
      <button @click="previousWeek">
        <i class="fas fa-chevron-left"></i>
        Previous week
      </button>
      <h1>Time Sheet</h1>
      <button @click="nextWeek">
        Next week
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
    <div class="time-sheet-week">
      <div
        class="time-sheet-day"
        v-for="item in data"
        :key="item.date"
        :class="getDateClass(item.date)"
      >
        <DayHeader :date="item.date" />
        <div
          class="time-sheet-day-content"
          v-for="activity in item.activities"
          :key="activity"
        >
          <Activity
            :activity="activity"
            :date="item.date"
            @saveActivity="saveActivity"
            @deleteActivity="deleteActivity"
          />
        </div>
        <AddActivity :date="item.date" @addActivity="addActivity" />
      </div>
    </div>
  </div>
</template>

<style scope>
* {
  box-sizing: border-box;
}

.header {
  display: flex;
  padding: 20px 0;
  justify-content: center;
}

.header h1 {
  margin: 0 20px;
}

.header button {
  background: rgba(#fff, 0.02);
  border-radius: 3px;
  border: 1px solid rgba(#fff, 0.1);
  cursor: pointer;
  color: #000;
}

.time-sheet {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
}

.time-sheet-week {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-grow: 1;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.02);
  background: #fff;
}

.time-sheet-day {
  width: 100%;
  border-right: 1px solid #eee;
}

.weekend {
  background: #ffdada;
}

.today {
  background: #cde7ff;
}
</style>
