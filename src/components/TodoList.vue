<script setup>
import { reactive } from 'vue'

const state = reactive({
  newTodo: '',
  todos: []
})

function addTodo() {
  const text = state.newTodo.trim()
  if (text !== '') {
    state.todos.push({ text, done: false })
    state.newTodo = ''
  }
}

function toggleDone(index) {
  state.todos[index].done = !state.todos[index].done
}
</script>

<template>
  <div class="max-w-md mx-auto my-10 p-5 border border-gray-300 rounded-lg font-sans bg-neutral-50">
    <h1 class="text-2xl font-bold mb-4">待辦事項清單</h1>

    <div class="flex gap-2 mb-5">
      <input
        type="text"
        v-model="state.newTodo"
        @keyup.enter="addTodo"
        placeholder="請輸入待辦事項"
        class="flex-1 p-2 text-base border rounded"
      />
      <button
        @click="addTodo"
        class="px-4 py-1 text-base bg-gray-400 text-white rounded transition"
      >
        新增
      </button>
    </div>

    <ul class="list-none p-0">
      <li
        v-for="(item, index) in state.todos"
        :key="index"
        :class="[
          'p-2 border-b border-gray-200 cursor-pointer transition duration-200',
          item.done ? 'line-through text-gray-500' : ''
        ]"
        @click="toggleDone(index)"
      >
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
