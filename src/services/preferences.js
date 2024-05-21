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

const getFoods = async () => {
  const keys = await Preferences.keys();
  if (keys.keys.includes("foods")) {
    const foods = await Preferences.get({ key: "foods" });
    return JSON.parse(foods.value);
  } else {
    return [];
  }
};

const addFood = async (value) => {
  const foods = await getFoods();
  foods.push(value)
  await Preferences.set({
    key: "foods",
    value: JSON.stringify(foods),
  });
};

const setFoods = async (value) => {
  await Preferences.set({
    key: "foods",
    value: JSON.stringify(value),
  });
};

const clearAll = async () => {
  await Preferences.clear();
};

export default {
  getTargetCalories,
  setTargetCalories,
  getBodyWeight,
  setBodyWeight,
  getFoods,
  addFood,
  setFoods,
  clearAll,
}
