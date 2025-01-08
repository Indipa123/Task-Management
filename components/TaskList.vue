<template>
    <section class="bg-white">
        <div class="py-2 px-4 mx-auto max-w-full lg:py-8">
            <!-- Task List Table -->
            <div class="mt-8">
                <h2 class="text-xl font-bold text-gray-900">Task List</h2>
                <div class="overflow-x-auto relative mt-4">
                    <div class="w-full border border-gray-200 divide-y divide-gray-200">
                        <!-- Table Header -->
                        <div class="grid grid-cols-6 bg-gray-100 text-gray-900 uppercase text-sm text-center">
                            <div class="px-6 py-3 border">Task Name</div>
                            <div class="px-6 py-3 border">Estimated Time</div>
                            <div class="px-6 py-3 border">Category</div>
                            <div class="px-6 py-3 border">Description</div>
                            <div class="px-6 py-3 border">File</div>
                            <div class="px-6 py-3 border">Actions</div>
                        </div>
                        <!-- Table Rows -->
                        <div v-for="(task, index) in tasks" :key="index" class="grid">
                            <!-- Main Row -->
                            <div class="grid grid-cols-6 bg-white">
                                <div class="px-6 py-3 border">{{ task.name }}</div>
                                <div class="px-6 py-3 border">{{ task.estimatedTime }}</div>
                                <div class="px-6 py-3 border">{{ task.category }}</div>
                                <div class="px-6 py-3 border truncate">{{ task.description || '-' }}</div>
                                <div class="px-6 py-3 border">
                                    <a
                                        v-if="task.file"
                                        :href="fileUrl(task.file)"
                                        target="_blank"
                                        class="text-blue-600 underline"
                                    >
                                        View File
                                    </a>
                                    <span v-else>-</span>
                                </div>
                                <div class="px-2 py-5 border flex gap-1">
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
                                class="bg-gray-50 border-t-0 border border-gray-200 p-6">
                                <div class="grid grid-cols-3 gap-4 items-start">
                                    <!-- Description Section -->
                                    <div>
                                        <label class="block mb-2 text-sm font-medium text-gray-900">Description:</label>
                                        <textarea
                                            class="w-full border border-gray-300 rounded-lg p-2 text-sm"
                                            rows="4"
                                            readonly
                                        >{{ task.description }}</textarea>
                                    </div>
                                    <!-- Actions Section -->
                                    <!-- Add Materials Section -->
                                    <div class="flex flex-col items-center">
                                        <label class="block mb-2 text-sm font-medium text-gray-900">Add Materials:</label>
                                        <div class="flex gap-4">
                                            <div class="flex flex-col items-center cursor-pointer" @click="handleAddMaterial(index)">
                                                <img src="https://img.icons8.com/ios-filled/50/000000/image.png" alt="Image Icon" class="w-8 h-8">
                                                <span class="text-xs text-gray-700">Image</span>
                                            </div>
                                            <div class="flex flex-col items-center cursor-pointer" @click="handleAddMaterial(index)">
                                                <img src="https://img.icons8.com/ios-filled/50/000000/pdf.png" alt="PDF Icon" class="w-8 h-8">
                                                <span class="text-xs text-gray-700">PDF</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Upload Final Output Section -->
                                    <div>
                                        <label class="block mb-2 text-sm font-medium text-gray-900">Upload Final Output:</label>
                                        <div class="flex gap-4">
                                            <div class="flex flex-col items-center cursor-pointer" @click="handleFinalOutput(index)">
                                                <img src="https://img.icons8.com/ios-filled/50/000000/upload.png" alt="Upload Icon" class="w-8 h-8">
                                                <span class="text-xs text-gray-700">Upload</span>
                                            </div>
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

// Computed properties for tasks and newTask
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
</script>
