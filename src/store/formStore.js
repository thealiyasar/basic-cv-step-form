import { create } from "zustand";

const STORAGE_KEY = "jobApplicationForm";

const getInitialState = () => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  }

  return {
    step: 1,
    data: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      education: [
        {
          school: "",
          degree: "",
          graduationYear: "",
        },
      ],
      experience: [
        {
          company: "",
          position: "",
          duration: "",
        },
      ],
      skills: "",
      cvFile: null,
    },
  };
};

export const useFormStore = create((set, get) => ({
  ...getInitialState(),
  nextStep: () => {
    const step = get().step + 1;
    const data = get().data;
    const newState = { step, data };
    if (typeof window !== "undefined")
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    set({ step });
  },
  prevStep: () => {
    const step = get().step - 1;
    const data = get().data;
    const newState = { step, data };
    if (typeof window !== "undefined")
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    set({ step });
  },
  updateField: (field, value) => {
    const data = { ...get().data, [field]: value };
    const step = get().step;
    const newState = { step, data };
    if (typeof window !== "undefined")
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    set({ data });
  },
  updateNestedArray: (field, newArray) =>
    set(state => ({
      data: {
        ...state.data,
        [field]: newArray,
      },
    })),

  addNestedItem: (field, newItem) =>
    set(state => ({
      data: { ...state.data, [field]: [...state.data[field], newItem] },
    })),

  removeNestedItem: (field, index) =>
    set(state => {
      const updated = [...state.data[field]];
      updated.splice(index, 1);
      return { data: { ...state.data, [field]: updated } };
    }),
  resetForm: () => {
    if (typeof window !== "undefined") localStorage.removeItem(STORAGE_KEY);
    set({
      step: 1,
      data: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        education: [
          {
            school: "",
            degree: "",
            graduationYear: "",
          },
        ],
        experience: [
          {
            company: "",
            position: "",
            duration: "",
          },
        ],
        skills: "",
        cvFile: null,
      },
    });
  },
}));
