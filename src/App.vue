<script setup>
// 引入必要的 Vue API，供面試者使用
import { ref, onMounted } from 'vue'
import TodoList from '@/components/TodoList.vue'
import PostList from '@/components/PostList.vue'
import WebSocketChat from '@/components/WebSocketChat.vue'
// import TodoList from '@/components/TodoList(OptionAPI).vue'

// 提供基本範例變數，面試者可直接修改
const tabTitle = ref('Question1')
</script>

<template>
  <div class="app">
    <h1>面試測試環境</h1>
    <p class="">請根據題目要求在此編寫程式碼</p>
    <!-- 面試者將在此處添加內容 -->
    <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-gray-200">
      <li class="flex-auto text-center">
        <a
          class="block rounded py-1.5 px-2"
          href="#"
          @click.prevent="tabTitle = 'Question1'"
          v-bind:class="{ 'hover:text-white text-white bg-gray-500/75': tabTitle === 'Question1' }"
          >題目1</a
        >
      </li>
      <li class="flex-auto text-center">
        <a
          class="block rounded py-1.5 px-2"
          href="#"
          @click.prevent="tabTitle = `Question2`"
          v-bind:class="{
            'hover:text-white text-white bg-gray-500/75': tabTitle === 'Question2'
          }"
          >題目2</a
        >
      </li>
      <li class="flex-auto text-center">
        <a
          class="block rounded py-1.5 px-2"
          href="#"
          @click.prevent="tabTitle = `Question3`"
          v-bind:class="{
            'hover:text-white text-white bg-gray-500/75': tabTitle === 'Question3'
          }"
          >題目3</a
        >
      </li>
    </ul>
    <TodoList v-if="tabTitle === 'Question1'" />
    <PostList v-else-if="tabTitle === 'Question2'" />
    <WebSocketChat v-else />
  </div>
</template>

<style scoped>
.app {
  max-width: 600px;
  margin: 20px auto;
  text-align: center;
}
</style>
