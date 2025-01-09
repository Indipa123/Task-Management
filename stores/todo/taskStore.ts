import { defineStore } from 'pinia';

interface Task {
  name: string;
  estimatedTime: string;
  category: string;
  description: string;
  files: File[];
  status: 'reviewing' | 'approved' | 'reassigned';
  stage: 'UI Design' | 'API Design' | 'UI Integration';
  assignedTo: string | null;
}

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [] as Task[], // Array to store tasks with Task type
    newTask: {
      name: '',
      estimatedTime: '',
      category: '',
      description: '',
      files: [],
      status: 'reviewing',
      stage: 'UI Design',
      assignedTo: null,
    } as Task,
  }),
  actions: {
    addTask() {
      if (this.newTask.name && this.newTask.estimatedTime && this.newTask.category) {
        const taskToAdd = { ...this.newTask }; // Create a copy
        this.tasks.unshift(taskToAdd);
        // Clear the new task fields
        this.newTask = {
          name: '',
          estimatedTime: '',
          category: '',
          description: '',
          files: [],
          status: 'reviewing',
          stage: 'UI Design',
          assignedTo: null,
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
    updateTaskStage(index: number, stage: Task['stage']) {
      if (this.tasks[index]) {
        this.tasks[index].stage = stage;
      }
    },
    assignTask(index: number, developer: string) {
      if (this.tasks[index]) {
        this.tasks[index].assignedTo = developer;
      }
    },
  },
});