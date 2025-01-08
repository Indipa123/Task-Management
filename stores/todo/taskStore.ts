import { defineStore } from 'pinia';

interface Task {
  name: string;
  estimatedTime: string;
  category: string;
  description: string;
  file: File | null;
  status: string;
}

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [] as Task[], // Array to store tasks with Task type
    newTask: {
      name: '',
      estimatedTime: '',
      category: '',
      description: '',
      file: null,
      status: 'pending',
    } as Task,
  }),
  actions: {
    addTask() {
      if (this.newTask.name && this.newTask.estimatedTime && this.newTask.category) {
        const taskToAdd = { ...this.newTask }; // Create a copy
        this.tasks.push(taskToAdd);
        // Clear the new task fields
        this.newTask = {
          name: '',
          estimatedTime: '',
          category: '',
          description: '',
          file: null,
        } as Task;
      } else {
        alert('Please fill all required fields!');
      }
    },
  },
});

