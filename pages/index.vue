<template>
    <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 sm:p-0">
        <div class="w-full max-w-md p-8 bg-white shadow rounded-md">
            <h1 class="text-2xl font-bold mb-6">Login</h1>
            <form @submit.prevent="login">
                <div class="mb-4 p">
                    <label for="role" class="block text-gray-700">Role</label>
                    <select
                        id="role"
                        v-model="role"
                        class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label for="username" class="block text-gray-700">Username</label>
                    <input
                        type="text"
                        id="username"
                        v-model="username"
                        class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>
                <div class="mb-6">
                    <label for="password" class="block text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        v-model="password"
                        class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>
                <button
                    type="submit"
                    class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                >
                    Login
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const role = ref('user');
const username = ref('');
const password = ref('');
const router = useRouter();

const login = () => {
    if (
        (role.value === 'user' && username.value === 'indipa123' && password.value === 'password') ||
        (role.value === 'admin' && username.value === 'admin' && password.value === 'admin123')
    ) {
        // Perform login (e.g., API call)
        if (role.value === 'admin') {
            router.push('/AddTask');
        } else {
            router.push('/AddTask');
        }
    } else {
        alert('Invalid username or password');
    }
};
</script>
