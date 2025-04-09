<script setup>
import { ref, onMounted } from 'vue'

const posts = ref([])
const error = ref('')

onMounted(async () => {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    if (!res.ok) {
      throw new Error(`伺服器回應錯誤（${res.status}）`)
    }

    const data = await res.json()
    posts.value = data.slice(0, 5) // 只取前 5 筆
  } catch (err) {
    error.value = err.message || '資料載入失敗，請稍後再試'
  }
})
</script>

<template>
  <div class="max-w-xl mx-auto my-10 font-sans">
    <h1 class="text-2xl font-bold mb-4">最新文章</h1>

    <div v-if="error" class="text-red-600 font-bold">錯誤：{{ error }}</div>

    <ul v-else-if="posts.length">
      <li v-for="post in posts" :key="post.id" class="border-b border-gray-300 py-2.5">
        <h3 class="text-lg font-semibold">{{ post.title }}</h3>
        <p class="text-gray-700">{{ post.body }}</p>
      </li>
    </ul>

    <p v-else class="text-gray-500 italic">載入中...</p>
  </div>
</template>

<style scoped></style>
