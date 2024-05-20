import { Preferences } from "@capacitor/preferences";

const getTargetCalories = async () => {
  const keys = await Preferences.keys();
  if (keys.keys.includes("targetCalories")) {
    const targetCalories = await Preferences.get({ key: "targetCalories" });
    return targetCalories.value;
  } else {
    return 0;
  }
};

const setTargetCalories = async (value) => {
  await Preferences.set({
    key: "targetCalories",
    value: value,
  });
};

const getBodyWeight = async () => {
  const keys = await Preferences.keys();
  if (keys.keys.includes("bodyWeight")) {
    const bodyWeight = await Preferences.get({ key: "bodyWeight" });
    return bodyWeight.value;
  } else {
    return 0;
  }
};

const setBodyWeight = async (value) => {
  await Preferences.set({
    key: "bodyWeight",
    value: value,
  });
};

const getThing = async (key) => {
  const thing = await Preferences.get({ key: key });
  console.log(thing)
}
const removeThing = async (thing) => {
  await Preferences.remove({ key: thing });
};
const getKeys = async () => {
  const keys = await Preferences.keys();
  console.log(keys);
};

const clearAll = async () => {
  await Preferences.clear();
};

export default {
  getTargetCalories,
  setTargetCalories,
  getBodyWeight,
  setBodyWeight,
  clearAll,
  
  getThing, removeThing, getKeys,
};
