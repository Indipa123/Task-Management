<template>
    <section class="bg-white">
      <div class="py-1 px-4 mx-auto max-w-full lg:py-6">
        <!-- Task List Table -->
        <div class="mt-2">
          <h2 class="text-xl font-bold text-gray-900">Task List</h2>
          <div class="overflow-x-auto relative mt-4">
            <div class="w-full border border-gray-200 divide-y divide-gray-200">
              <!-- Table Header -->
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 bg-gray-100 text-gray-900 uppercase text-sm text-center">
                <div class="px-6 py-3 border">Task Name</div>
                <div class="px-6 py-3 border">Estimated Time</div>
                <div class="px-6 py-3 border">Category</div>
                <div class="px-6 py-3 border">Description</div>
                <div class="px-6 py-3 border">Status</div>
                <div class="px-6 py-3 border">Actions</div>
              </div>
              <!-- Table Rows -->
              <div v-for="(task, index) in tasks" :key="index" class="grid">
                <!-- Main Row -->
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 bg-white text-center">
                  <div class="px-6 py-3 border">{{ task.name }}</div>
                  <div class="px-6 py-3 border">{{ task.estimatedTime }}</div>
                  <div class="px-6 py-3 border">{{ task.category }}</div>
                  <div class="px-6 py-3 border truncate">{{ task.description || '-' }}</div>
                  <div class="px-6 py-3 border capitalize">{{ task.status }}</div>
                  <div class="px-2 py-5 border flex gap-1 justify-center">
                    <button
                      @click="toggleMore(index)"
                      class="text-white bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded-lg text-sm"
                    >
                      {{ expandedIndex === index ? 'Less' : 'More' }}
                    </button>
                    <button
                      @click="deleteTask(index)"
                      class="text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <!-- Expanded Row -->
                <div
                  v-if="expandedIndex === index"
                  class="bg-gray-50 border-t-0 border border-gray-200 p-4"
                >
                  <div class="grid grid-cols-5 gap-4">
                    <!-- Description Section -->
                    <div class="flex flex-col items-center">
                      <label class="block mb-2 text-sm font-medium text-gray-900">Description:</label>
                      <textarea
                        class="w-full border border-gray-300 rounded-lg p-2 text-sm"
                        rows="4"
                        readonly
                      >{{ task.description }}</textarea>
                    </div>
                    <!-- Status Update Section -->
                    <div class="flex flex-col items-center">
                      <label class="block mb-2 text-sm font-medium text-gray-900">Update Status:</label>
                      <select
                        class="w-full border border-gray-300 rounded-lg p-2 text-sm"
                        v-model="task.status"
                        @change="updateTaskStatus(index, task.status)"
                      >
                        <option value="reviewing">Reviewing</option>
                        <option value="approved">Approved</option>
                        <option value="reassigned">Reassigned</option>
                      </select>
                    </div>
                    <!-- Workflow Grid Section -->
                    
                    <!-- Add Materials Section -->
                    <div class="flex flex-col items-center">
                      <label class="block mb-2 text-sm font-medium text-gray-900">Add Materials:</label>
                      <div class="flex gap-4">
                        <div class="flex flex-col items-center cursor-pointer" @click="handleAddMaterial(index)">
                          <img src="https://img.icons8.com/ios-filled/50/000000/image.png" alt="Image Icon" class="w-8 h-8">
                          <span class="text-xs text-gray-700">Image</span>
                        </div>
                        <div class="flex flex-col items-center cursor-pointer" @click="handleAddMaterial(index)">
                          <img src="https://img.icons8.com/ios-filled/50/000000/document.png" alt="Document Icon" class="w-8 h-8">
                          <span class="text-xs text-gray-700">Document</span>
                        </div>
                      </div>
                    </div>
                    <!-- Upload Final Output Section -->
                    <div class="flex flex-col items-center">
                      <label class="block mb-2 text-sm font-medium text-gray-900">Upload Final Output:</label>
                      <div class="flex gap-4">
                        <div
                          class="flex flex-col items-center cursor-pointer"
                          @click="handleFinalOutput(index)"
                        >
                          <img
                            src="https://img.icons8.com/ios-filled/50/000000/upload.png"
                            alt="Upload Icon"
                            class="w-8 h-8"
                          />
                          <span class="text-xs text-gray-700">Upload</span>
                        </div>
                      </div>
                    </div>
                    <!-- View File Section -->
                    <div class="flex flex-col items-center">
                      <label class="block mb-2 text-sm font-medium text-gray-900">Files:</label>
                      <div class="grid gap-2 max-h-32 overflow-y-auto">
                        <div v-for="file in task.files" :key="file.name" class="truncate max-w-xs">
                          <a
                            :href="fileUrl(file)"
                            target="_blank"
                            class="text-blue-600 underline"
                            :title="file.name"
                          >
                            {{ file.name }}
                          </a>
                        </div>
                        <span v-if="task.files.length === 0" class="text-gray-500">No Files Available</span>
                      </div>
                    </div>
                  </div>

                  <div class="flex flex-col items-center col-span-5">
                      <label class="block mb-2 text-sm font-medium text-gray-900">Workflow:</label>
                      <div class="grid grid-cols-3 gap-4">
                        <div class="flex flex-col items-center">
                          <span class="text-sm font-medium text-gray-900">UI Design</span>
                          <button
                            @click="updateTaskStage(index, 'UI Design')"
                            :class="{'bg-blue-500 text-white': task.stage === 'UI Design', 'bg-gray-200': task.stage !== 'UI Design'}"
                            class="px-4 py-2 rounded-lg mt-2"
                          >
                            {{ task.stage === 'UI Design' ? 'Current' : 'Select' }}
                          </button>
                        </div>
                        <div class="flex flex-col items-center">
                          <span class="text-sm font-medium text-gray-900">API Design</span>
                          <button
                            @click="updateTaskStage(index, 'API Design')"
                            :class="{'bg-blue-500 text-white': task.stage === 'API Design', 'bg-gray-200': task.stage !== 'API Design'}"
                            class="px-4 py-2 rounded-lg mt-2"
                          >
                            {{ task.stage === 'API Design' ? 'Current' : 'Select' }}
                          </button>
                        </div>
                        <div class="flex flex-col items-center">
                          <span class="text-sm font-medium text-gray-900">UI Integration</span>
                          <button
                            @click="updateTaskStage(index, 'UI Integration')"
                            :class="{'bg-blue-500 text-white': task.stage === 'UI Integration', 'bg-gray-200': task.stage !== 'UI Integration'}"
                            class="px-4 py-2 rounded-lg mt-2"
                          >
                            {{ task.stage === 'UI Integration' ? 'Current' : 'Select' }}
                          </button>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { useTaskStore } from '@/stores/todo/taskStore';
  import { computed, ref } from 'vue';
  
  // Access the Pinia store
  const taskStore = useTaskStore();
  
  // Computed properties for tasks
  const tasks = computed(() => taskStore.tasks);
  
  // Manage expanded row index
  const expandedIndex = ref<number | null>(null);
  
  // Toggle "More" button functionality
  const toggleMore = (index: number) => {
    expandedIndex.value = expandedIndex.value === index ? null : index;
  };
  
  // Delete a task
  const deleteTask = (index: number) => {
    taskStore.tasks.splice(index, 1);
  };
  
  // Handle Add Materials click
  const handleAddMaterial = (index: number) => {
    console.log(`Add Materials clicked for task index: ${index}`);
  };
  
  // Handle Upload Final Output click
  const handleFinalOutput = (index: number) => {
    console.log(`Upload Final Output clicked for task index: ${index}`);
  };
  
  // Generate file URL
  const fileUrl = (file: File | null) => (file ? URL.createObjectURL(file) : '#');
  
  // Update task status
  const updateTaskStatus = (index: number, status: string) => {
    taskStore.updateTaskStatus(index, status as 'reviewing' | 'approved' | 'reassigned');
  };
  
  // Update task stage
  const updateTaskStage = (index: number, stage: string) => {
    taskStore.updateTaskStage(index, stage as 'UI Design' | 'API Design' | 'UI Integration');
  };
  </script>