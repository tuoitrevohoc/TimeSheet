function uuid() {
  return window.URL.createObjectURL(new Blob([])).substr(-36);
}

export class TimeSheet {
  async getTimeSheet(startDate, count) {
    let date = startDate;
    const data = [];

    for (let i = 0; i < count; i++) {
      const savedData = localStorage.getItem(date.toISOString());
      let activities;
      if (savedData) {
        activities = JSON.parse(savedData);
      } else {
        activities = [];
      }

      data.push({
        date,
        activities,
      });

      date = new Date(date.getTime() + 86400000);
    }

    return data;
  }

  async updateActivity(date, activity) {
    let data;
    const savedData = localStorage.getItem(date.toISOString());

    if (savedData) {
      data = JSON.parse(savedData);
    } else {
      data = [];
    }

    const index = data.findIndex((item) => item.id === activity.id);
    data[index] = activity;
    localStorage.setItem(date.toISOString(), JSON.stringify(data));
  }

  async deleteActivity(date, activity) {
    let data;
    const savedData = localStorage.getItem(date.toISOString());

    if (savedData) {
      data = JSON.parse(savedData);
    } else {
      data = [];
    }

    const index = data.findIndex((item) => item.id === activity.id);
    data.splice(index, 1);
    localStorage.setItem(date.toISOString(), JSON.stringify(data));
  }

  async addActivity(date, activity) {
    let data;
    const savedData = localStorage.getItem(date.toISOString());
    console.log("Saved data", savedData);

    if (savedData) {
      data = JSON.parse(savedData);
    } else {
      data = [];
    }

    data.push({ id: uuid(), ...activity });
    localStorage.setItem(date.toISOString(), JSON.stringify(data));
  }
}

export default new TimeSheet();
