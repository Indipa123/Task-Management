import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    tasks: [
      {
        id: 1,
        task: 'Task 1',
        assignTo: 'User A',
        estimatedTime: '3h',
        startDate: '2025-01-01',
        completedDate: null,
        status: 'Pending',
        showMore: false,
        comments: '',
      },
      {
        id: 2,
        task: 'Task 2',
        assignTo: 'User B',
        estimatedTime: '5h',
        startDate: '2025-01-02',
        completedDate: null,
        status: 'Review',
        showMore: false,
        comments: '',
      },
      {
        id: 3,
        task: 'Task 2',
        assignTo: 'User B',
        estimatedTime: '5h',
        startDate: '2025-01-02',
        completedDate: null,
        status: 'Review',
        showMore: false,
        comments: '',
      },
    ],
    inboxPending: 10, // Total pending inbox tasks
    userGroup: 'UI', // Default user group
    pool: 20, // Pool value
  }),
  actions: {
    // Toggle "showMore" for a specific task
    toggleShowMore(taskId: number) {
      const task = this.tasks.find((t) => t.id === taskId);
      if (task) {
        task.showMore = !task.showMore;
      }
    },

    // Update a specific task with new data
    updateTask(taskId: number, updates: Partial<typeof this.tasks[0]>) {
      const task = this.tasks.find((t) => t.id === taskId);
      if (task) {
        Object.assign(task, updates);
      }
    },

    // Update inboxPending, userGroup, or pool values
    updateMetaData({ inboxPending, userGroup, pool }: { inboxPending?: number; userGroup?: string; pool?: number }) {
      if (inboxPending !== undefined) this.inboxPending = inboxPending;
      if (userGroup !== undefined) this.userGroup = userGroup;
      if (pool !== undefined) this.pool = pool;
    },
  },
});
