<template>
  <section class="bg-white">
    <div class="py-2 px-4 mx-auto max-w-4xl lg:py-8">
      <!-- Add Task Form -->
      <div class="bg-blue-100 shadow-md rounded-lg p-5">
        <h2 class="mb-2 text-xl font-bold text-gray-900">Add a New Task</h2>
        <form @submit.prevent="addTask">
          <!-- Form Inputs -->
          <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div class="sm:col-span-2">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Task Name</label>
              <input
                v-model="newTask.name"
                type="text"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Type Task name"
                required
              />
            </div>
            <div class="sm:col-span-2">
              <label for="estimatedTime" class="block mb-2 text-sm font-medium text-gray-900">Estimated Time</label>
              <input
                v-model="newTask.estimatedTime"
                type="text"
                id="estimatedTime"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Estimated Time"
                required
              />
            </div>
            <div class="sm:col-span-2">
              <label for="category" class="block mb-2 text-sm font-medium text-gray-900">Task Category</label>
              <select
                v-model="newTask.category"
                id="category"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
              >
                <option value="" disabled>Select category</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Frontend Developing">Frontend Developing</option>
                <option value="Database Operation">Database Operation</option>
                <option value="Backend Developing">Backend Developing</option>
              </select>
            </div>
            <div class="sm:col-span-2">
              <label for="description" class="block mb-2 text-sm font-medium text-gray-900">Task Description</label>
              <textarea
                v-model="newTask.description"
                id="description"
                rows="8"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                placeholder="Task description here"
              ></textarea>
            </div>
            <div class="sm:col-span-2">
              <label for="files" class="block mb-2 text-sm font-medium text-gray-900">Upload files</label>
              <input
              @change="handleFilesUpload"
              id="files"
              type="file"
              multiple
              class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
              />
              <div class="mt-1 text-sm text-gray-500">Upload files containing details of the Task</div>
            </div>
          </div>
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mt-3"
          >
            Add Task
          </button>
        </form>
      </div>

      <div>
        <TaskList />
      </div>
      
    </div>
  </section>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue';
import { useTaskStore } from '@/stores/todo/taskStore';
import TaskList from '@/components/TaskList.vue';

const taskStore = useTaskStore();
const newTask = computed(() => taskStore.newTask);
const tasks = computed(() => taskStore.tasks);

const expandedIndex = ref<number | null>(null);

const addTask = () => {
  taskStore.addTask();
};

const deleteTask = (index: number) => {
  taskStore.tasks.splice(index, 1);
};

const toggleMore = (index: number) => {
  expandedIndex.value = expandedIndex.value === index ? null : index;
};

const handleAddMaterial = (index: number) => {
  console.log('Add Materials for task', index);
};

const handleFinalOutput = (index: number) => {
  console.log('Upload Final Output for task', index);
};

const handleFilesUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0] || null;
  taskStore.newTask.file = file;
};

const fileUrl = (file: File | null) => (file ? URL.createObjectURL(file) : '#');
</script>
