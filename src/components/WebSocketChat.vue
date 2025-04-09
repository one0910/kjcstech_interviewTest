<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const message = ref('')
const messages = ref([])
const error = ref('')
const connectionStatus = ref('🔌 連線中...')

let socket = null

onMounted(() => {
  socket = new WebSocket('wss://echo.websocket.org')
  console.log(`socket => `, socket)
  console.log(`WebSocket => `, WebSocket.OPEN)
  socket.addEventListener('open', () => {
    connectionStatus.value = '✅ 已連線 WebSocket'
  })

  socket.addEventListener('message', (event) => {
    messages.value.push({ from: '伺服器', text: event.data })
  })

  socket.addEventListener('error', () => {
    error.value = '❌ WebSocket 發生錯誤'
  })

  socket.addEventListener('close', () => {
    connectionStatus.value = '⚠️ 連線已關閉'
  })
})

onBeforeUnmount(() => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.close()
  }
})

function sendMessage() {
  const text = message.value.trim()
  if (!text) return

  if (socket && socket.readyState === WebSocket.OPEN) {
    console.log(`socket => `, socket)
    socket.send(text)
    messages.value.push({ from: '你', text })
    message.value = ''
  } else {
    error.value = '⚠️ 尚未連線，無法發送訊息'
  }
}
</script>

<template>
  <div class="max-w-xl mx-auto my-10 font-sans">
    <h1 class="text-2xl font-bold mb-4">Vue WebSocket 即時訊息</h1>

    <div class="flex gap-2 mb-4">
      <input
        v-model="message"
        type="text"
        class="flex-1 p-2 text-base border border-gray-300 rounded-sm"
        placeholder="輸入訊息"
        @keyup.enter="sendMessage"
      />
      <button
        @click="sendMessage"
        class="px-4 py-2 text-base bg-gray-400 text-white rounded-md cursor-pointer hover:bg-gray-500 transition"
      >
        發送
      </button>
    </div>

    <div :class="['mb-2', error ? 'text-red-600 font-bold' : 'text-gray-600']">
      {{ error || connectionStatus }}
    </div>

    <div class="border border-gray-300 p-3 h-52 overflow-y-auto bg-white rounded-sm shadow-inner">
      <p v-for="(msg, index) in messages" :key="index" class="mb-2 text-left">
        <strong>{{ msg.from }}：</strong> {{ msg.text }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
