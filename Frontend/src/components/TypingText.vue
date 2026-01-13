<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  texts: {
    type: Array,
    required: true
  },
  typingSpeed: {
    type: Number,
    default: 100
  },
  deletingSpeed: {
    type: Number,
    default: 50
  },
  pauseTime: {
    type: Number,
    default: 2000
  }
})

const displayText = ref('')
const showCursor = ref(true)
const currentIndex = ref(0)
const isDeleting = ref(false)
let typingTimeout = null
let cursorInterval = null

const type = () => {
  const currentText = props.texts[currentIndex.value]
  
  if (!isDeleting.value) {
    // Typing
    if (displayText.value.length < currentText.length) {
      displayText.value = currentText.substring(0, displayText.value.length + 1)
      typingTimeout = setTimeout(type, props.typingSpeed)
    } else {
      // Pause before deleting
      typingTimeout = setTimeout(() => {
        isDeleting.value = true
        type()
      }, props.pauseTime)
    }
  } else {
    // Deleting
    if (displayText.value.length > 0) {
      displayText.value = currentText.substring(0, displayText.value.length - 1)
      typingTimeout = setTimeout(type, props.deletingSpeed)
    } else {
      // Move to next text
      isDeleting.value = false
      currentIndex.value = (currentIndex.value + 1) % props.texts.length
      typingTimeout = setTimeout(type, 500)
    }
  }
}

onMounted(() => {
  type()
  // Blinking cursor
  cursorInterval = setInterval(() => {
    showCursor.value = !showCursor.value
  }, 530)
})

onUnmounted(() => {
  if (typingTimeout) clearTimeout(typingTimeout)
  if (cursorInterval) clearInterval(cursorInterval)
})
</script>

<template>
  <span class="inline-block">
    {{ displayText }}<span :class="['inline-block w-0.5 h-[1em] bg-primary ml-1 align-middle', showCursor ? 'opacity-100' : 'opacity-0']"></span>
  </span>
</template>
