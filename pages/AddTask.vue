<template>
  <div class="rounded-lg p-6">
    <button @click="showTaskAdd = !showTaskAdd" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mt-3 mx-auto block">
      {{ showTaskAdd ? 'Hide Add Task' : 'Show Add Task' }}
    </button>
    <div v-if="showTaskAdd">
      <TaskAdd />
    </div>

    <div>
      <TaskList />
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TaskList from '@/components/TaskList.vue';
import TaskAdd from '~/components/TaskAdd.vue';

const showTaskAdd = ref(false);
</script>
