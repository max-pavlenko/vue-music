<template>
   <header class="bg-gray-700">
      <nav class="container mx-auto flex items-center py-5 px-4">
         <RouterLink :to="{name: RouteName.HOME}" class="font-bold uppercase text-white text-2xl mr-4">Music</RouterLink>
         <div class="flex flex-grow items-center">
            <ul class="flex mt-1">
               <li v-if="!isAuthenticated">
                  <button class="px-2 text-white" @click="handleAuthClick">Login / Register</button>
               </li>
               <template v-else>
                  <li>
                     <RouterLink :to="{name: RouteName.MANAGE}" class="px-2 text-white">Manage</RouterLink>
                  </li>
                  <li>
                     <button class="px-2 text-white" @click="handleLogoutClick">Log out</button>
                  </li>
               </template>
            </ul>
         </div>
      </nav>
   </header>
</template>

<script setup lang="ts">
import {useAuthStore} from '@/store/auth';
import {storeToRefs} from 'pinia';
import {RouteName} from '@/app/shared/router/constants';

const authStore = useAuthStore();
const {toggleIsAuthModalVisible, logOut} = authStore;
const {isAuthenticated} = storeToRefs(authStore);

function handleAuthClick() {
   toggleIsAuthModalVisible();
}

async function handleLogoutClick() {
   await logOut();
}
</script>
