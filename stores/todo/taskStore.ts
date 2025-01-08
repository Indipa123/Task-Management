import { defineStore } from 'pinia';

interface Task {
  name: string;
  estimatedTime: string;
  category: string;
  description: string;
  file: File | null;
  status: 'reviewing' | 'approved' | 'reassigned';
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
      status: 'reviewing',
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
          status: 'reviewing',
        } as Task;
      } else {
        alert('Please fill all required fields!');
      }
    },
    updateTaskStatus(index: number, status: Task['status']) {
      if (this.tasks[index]) {
        this.tasks[index].status = status;
      }
    },
  },
});