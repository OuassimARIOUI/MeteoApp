<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const darkMode = ref(false)
const country = ref('')
const city = ref('')
const searchCity = ref('')
const cities = ref([])
const weather = ref(null)
const forecast = ref([])
const favorites = ref([])
const searchHistory = ref([])
const showFavorites = ref(false)
const showHistory = ref(false)
const isLoading = ref(false)
const showAlert = ref(false)
const alertMessage = ref('')
const currentView = ref('main') // main, forecast, map
const uvIndex = ref(null)
const airQuality = ref(null)
const sidebarOpen = ref(true)
const showMobileMenu = ref(false)

// Load data from localStorage
onMounted(() => {
  const savedFavorites = localStorage.getItem('weatherFavorites')
  if (savedFavorites) favorites.value = JSON.parse(savedFavorites)
  
  const savedHistory = localStorage.getItem('searchHistory')
  if (savedHistory) searchHistory.value = JSON.parse(savedHistory)
  
  const savedDarkMode = localStorage.getItem('darkMode')
  if (savedDarkMode) darkMode.value = JSON.parse(savedDarkMode)
  
  // Try to get user's location
  getUserLocation()
})

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value
  localStorage.setItem('darkMode', JSON.stringify(darkMode.value))
}

const getUserLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        // In a real app, you'd reverse geocode these coordinates
        alertMessage.value = '📍 Position détectée!'
        showAlert.value = true
        setTimeout(() => showAlert.value = false, 3000)
      },
      (error) => console.log('Geolocation error:', error)
    )
  }
}

const getCities = async () => {
  if (searchCity.value.length >= 2) {
    try {
      console.log('Fetching cities for:', searchCity.value, 'country:', country.value)
      let url = `http://localhost:3001/cities?namePrefix=${searchCity.value}`
      if (country.value && country.value.length === 2) {
        url += `&countryIds=${country.value.toUpperCase()}`
      }
      const res = await axios.get(url)
      console.log('Cities response:', res.data)
      cities.value = res.data
      console.log('Cities set:', cities.value)
    } catch (error) {
      console.error('Error fetching cities:', error)
    }
  } else {
    cities.value = []
  }
}

const getWeather = async () => {
  if (!city.value || !country.value) {
    alertMessage.value = '⚠️ Veuillez sélectionner une ville et un pays'
    showAlert.value = true
    setTimeout(() => showAlert.value = false, 3000)
    return
  }
  
  isLoading.value = true
  try {
    const res = await fetch(`http://localhost:3001/weather?city=${city.value}&country=${country.value}`)
    const data = await res.json()
    weather.value = data
    
    // Generate mock forecast data (7 days)
    forecast.value = generateForecast(data.temperature)
    
    // Generate mock UV and air quality data
    uvIndex.value = Math.floor(Math.random() * 11)
    airQuality.value = Math.floor(Math.random() * 100)
    
    // Add to search history
    addToHistory(city.value, country.value)
    
    alertMessage.value = '✅ Météo chargée avec succès!'
    showAlert.value = true
    setTimeout(() => showAlert.value = false, 3000)
  } catch (error) {
    alertMessage.value = '❌ Erreur lors du chargement de la météo'
    showAlert.value = true
    setTimeout(() => showAlert.value = false, 3000)
  } finally {
    isLoading.value = false
  }
}

const generateForecast = (baseTemp) => {
  const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
  const conditions = ['☀️ Ensoleillé', '⛅ Nuageux', '🌧️ Pluie', '🌤️ Partiellement nuageux', '⛈️ Orageux']
  
  return Array.from({ length: 7 }, (_, i) => ({
    day: days[i],
    temp: Math.round(baseTemp + (Math.random() * 10 - 5)),
    condition: conditions[Math.floor(Math.random() * conditions.length)],
    humidity: Math.floor(50 + Math.random() * 40),
    windSpeed: Math.floor(5 + Math.random() * 30)
  }))
}

const addToFavorites = () => {
  if (!city.value || !country.value) return
  
  const favorite = { city: city.value, country: country.value, addedAt: new Date().toISOString() }
  
  if (!favorites.value.some(f => f.city === city.value && f.country === country.value)) {
    favorites.value.push(favorite)
    localStorage.setItem('weatherFavorites', JSON.stringify(favorites.value))
    
    alertMessage.value = '⭐ Ajouté aux favoris!'
    showAlert.value = true
    setTimeout(() => showAlert.value = false, 3000)
  }
}

const removeFromFavorites = (index) => {
  favorites.value.splice(index, 1)
  localStorage.setItem('weatherFavorites', JSON.stringify(favorites.value))
}

const loadFavorite = (favorite) => {
  city.value = favorite.city
  country.value = favorite.country
  searchCity.value = favorite.city
  getWeather()
  showFavorites.value = false
}

const addToHistory = (cityName, countryCode) => {
  const historyItem = { 
    city: cityName, 
    country: countryCode, 
    timestamp: new Date().toISOString() 
  }
  
  // Keep only last 10 searches
  searchHistory.value = [historyItem, ...searchHistory.value.filter(
    h => !(h.city === cityName && h.country === countryCode)
  )].slice(0, 10)
  
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value))
}

const loadFromHistory = (item) => {
  city.value = item.city
  country.value = item.country
  searchCity.value = item.city
  getWeather()
  showHistory.value = false
}

const clearHistory = () => {
  searchHistory.value = []
  localStorage.removeItem('searchHistory')
  showHistory.value = false
}

const getWeatherIcon = (condition) => {
  if (!condition) return '🌤️'
  const lower = condition.toLowerCase()
  if (lower.includes('sunny') || lower.includes('clear') || lower.includes('ensoleillé')) return '☀️'
  if (lower.includes('cloud') || lower.includes('nuageux')) return '☁️'
  if (lower.includes('rain') || lower.includes('pluie')) return '🌧️'
  if (lower.includes('storm') || lower.includes('orage')) return '⛈️'
  if (lower.includes('snow') || lower.includes('neige')) return '❄️'
  return '🌤️'
}

const getUVLevel = () => {
  if (uvIndex.value === null) return ''
  if (uvIndex.value <= 2) return 'Faible'
  if (uvIndex.value <= 5) return 'Modéré'
  if (uvIndex.value <= 7) return 'Élevé'
  if (uvIndex.value <= 10) return 'Très élevé'
  return 'Extrême'
}

const getAirQualityLevel = () => {
  if (airQuality.value === null) return ''
  if (airQuality.value <= 50) return 'Bon'
  if (airQuality.value <= 100) return 'Modéré'
  if (airQuality.value <= 150) return 'Mauvais'
  return 'Très mauvais'
}

const isFavorite = computed(() => {
  return favorites.value.some(f => f.city === city.value && f.country === country.value)
})

watch(searchCity, () => {
  getCities()
})
</script>

<template>
  <div class="flex h-screen text-white overflow-hidden" style="background-color: #0a0c14;">
    <!-- Alert Notification -->
    <transition name="alert">
      <div v-if="showAlert" class="fixed top-4 right-4 z-50 glass px-6 py-4 rounded-xl shadow-2xl border border-primary/30 animate-bounce">
        {{ alertMessage }}
      </div>
    </transition>

    <!-- Sidebar -->
    <aside :class="['hidden lg:flex flex-col w-64 glass border-r border-white/10 p-6 transition-all', sidebarOpen ? 'translate-x-0' : '-translate-x-full']">
      <div class="flex items-center gap-3 mb-8">
        <svg class="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4c-1.48 0-2.85.43-4.01 1.17l1.46 1.46C10.21 6.23 11.08 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3 0 1.13-.64 2.11-1.56 2.62l1.45 1.45C23.16 18.16 24 16.68 24 15c0-2.64-2.05-4.78-4.65-4.96z"/>
        </svg>
        <span class="font-extrabold text-lg">MeteoApp</span>
      </div>

      <nav class="flex-1 space-y-2">
        <button @click="currentView = 'main'" :class="['w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-white/5', currentView === 'main' ? 'bg-primary text-white' : 'text-slate-400']">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          <span class="font-bold">Dashboard</span>
        </button>
        <button @click="showFavorites = !showFavorites" :class="['w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-white/5', showFavorites ? 'bg-white/10' : 'text-slate-400']">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
          <span class="font-bold">Favorites</span>
        </button>
        <button @click="showHistory = !showHistory" :class="['w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-white/5', showHistory ? 'bg-white/10' : 'text-slate-400']">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>
          <span class="font-bold">History</span>
        </button>
        <button @click="currentView = 'map'" :class="['w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-white/5', currentView === 'map' ? 'bg-primary text-white' : 'text-slate-400']">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/></svg>
          <span class="font-bold">Map</span>
        </button>
      </nav>

      <div class="pt-6 border-t border-white/10">
        <button @click="toggleDarkMode" class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 transition-all">
          <svg v-if="darkMode" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/></svg>
          <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 2c-1.05 0-2.05.16-3 .46 4.06 1.27 7 5.06 7 9.54 0 4.48-2.94 8.27-7 9.54.95.3 1.95.46 3 .46 5.52 0 10-4.48 10-10S14.52 2 9 2z"/></svg>
          <span class="font-bold">{{ darkMode ? 'Light Mode' : 'Dark Mode' }}</span>
        </button>
        <button @click="router.push('/')" class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 transition-all mt-2">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
          <span class="font-bold">Exit</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto">
      <!-- Top Bar -->
      <header class="sticky top-0 z-40 glass border-b border-white/10 px-6 py-4 flex items-center justify-between backdrop-blur-xl">
        <div class="flex items-center gap-4">
          <button @click="showMobileMenu = !showMobileMenu" class="lg:hidden p-2 hover:bg-white/5 rounded-lg">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
          </button>
          <div>
            <h1 class="text-2xl font-black">Weather Dashboard</h1>
            <p class="text-sm text-slate-400">Real-time weather monitoring</p>
          </div>
        </div>
        <button @click="getUserLocation" class="glass px-4 py-2 rounded-xl hover:bg-white/10 transition-all flex items-center gap-2">
          <svg class="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/></svg>
          <span class="hidden sm:inline font-bold">Locate Me</span>
        </button>
      </header>

      <div class="p-6 space-y-6">
        <!-- Search Card -->
        <div class="glass p-6 rounded-2xl purple-glow">
          <h2 class="text-lg font-extrabold mb-4 flex items-center gap-2">
            <svg class="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
            Search Location
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label class="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Country Code</label>
              <input v-model="country" maxlength="2" placeholder="FR, US, DZ" class="w-full glass px-4 py-3 rounded-xl border border-white/10 focus:border-primary transition-all outline-none font-bold uppercase">
            </div>
            <div class="md:col-span-2">
              <label class="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">City Name</label>
              <input v-model="searchCity" placeholder="Start typing..." class="w-full glass px-4 py-3 rounded-xl border border-white/10 focus:border-primary transition-all outline-none font-bold">
            </div>
          </div>

          <div v-if="cities.length > 0" class="mb-4">
            <label class="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Select City</label>
            <select v-model="city" class="w-full px-4 py-3 rounded-xl border border-white/10 focus:border-primary transition-all outline-none font-bold bg-slate-800 text-white">
              <option disabled value="" class="bg-slate-800 text-white">Choose a city</option>
              <option v-for="c in cities" :key="c.id" :value="c.name" class="bg-slate-800 text-white">{{ c.name }} ({{ c.country }})</option>
            </select>
          </div>

          <div class="flex flex-wrap gap-3">
            <button @click="getWeather" :disabled="isLoading" class="shimmer-gold text-background-dark px-6 py-3 rounded-xl font-black flex items-center gap-2 hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed">
              <svg v-if="isLoading" class="animate-spin w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4V2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10h-2c0 4.41-3.59 8-8 8s-8-3.59-8-8 3.59-8 8-8z"/></svg>
              <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4c-1.48 0-2.85.43-4.01 1.17l1.46 1.46C10.21 6.23 11.08 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3 0 1.13-.64 2.11-1.56 2.62l1.45 1.45C23.16 18.16 24 16.68 24 15c0-2.64-2.05-4.78-4.65-4.96z"/></svg>
              {{ isLoading ? 'Loading...' : weather ? 'Refresh' : 'Get Weather' }}
            </button>
            <button v-if="city && country" @click="addToFavorites" :class="['glass px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-white/10 transition-all', isFavorite ? 'border-2 border-primary' : '']">
              <svg class="w-5 h-5" :class="isFavorite ? 'text-primary' : ''" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              {{ isFavorite ? 'Favorited' : 'Add to Favorites' }}
            </button>
          </div>
        </div>

        <!-- Weather Content -->
        <transition name="fade" mode="out-in">
          <div v-if="weather" key="weather" class="space-y-6">
            <!-- Current Weather Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <!-- Main Weather Card -->
              <div class="lg:col-span-2 glass p-8 rounded-2xl purple-glow relative overflow-hidden">
                <div class="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10"></div>
                <div class="flex items-start justify-between mb-6">
                  <div>
                    <h2 class="text-4xl font-black mb-1">{{ weather.city }}</h2>
                    <p class="text-slate-400 font-bold">{{ weather.country }}</p>
                  </div>
                  <div class="text-7xl">{{ getWeatherIcon(weather.condition) }}</div>
                </div>
                <div class="flex items-baseline gap-2 mb-2">
                  <span class="text-8xl font-black">{{ Math.round(weather.temperature) }}</span>
                  <span class="text-4xl font-bold text-slate-400">°C</span>
                </div>
                <p class="text-xl font-bold text-slate-300 mb-8">{{ weather.condition }}</p>
                
                <div class="grid grid-cols-3 gap-4">
                  <div class="glass p-4 rounded-xl">
                    <div class="text-3xl mb-2">💧</div>
                    <div class="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Humidity</div>
                    <div class="text-2xl font-black">{{ weather.humidity }}%</div>
                  </div>
                  <div class="glass p-4 rounded-xl">
                    <div class="text-3xl mb-2">💨</div>
                    <div class="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Wind</div>
                    <div class="text-2xl font-black">{{ weather.windSpeed }}<span class="text-sm font-bold text-slate-400">km/h</span></div>
                  </div>
                  <div class="glass p-4 rounded-xl">
                    <div class="text-3xl mb-2">🌡️</div>
                    <div class="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Feels Like</div>
                    <div class="text-2xl font-black">{{ Math.round(weather.temperature - 2) }}°</div>
                  </div>
                </div>
              </div>

              <!-- UV Index Card -->
              <div class="glass p-6 rounded-2xl purple-glow">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-2xl">☀️</div>
                  <div>
                    <h3 class="font-extrabold text-lg">UV Index</h3>
                    <p class="text-xs text-slate-400 font-bold">Current exposure level</p>
                  </div>
                </div>
                <div class="text-6xl font-black mb-2">{{ uvIndex }}</div>
                <div class="text-primary font-bold text-lg mb-4">{{ getUVLevel() }}</div>
                <div class="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full transition-all" :style="{ width: (uvIndex / 11 * 100) + '%' }"></div>
                </div>
              </div>
            </div>

            <!-- Air Quality Card -->
            <div class="glass p-6 rounded-2xl purple-glow">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-2xl">🌬️</div>
                  <div>
                    <h3 class="font-extrabold text-lg">Air Quality Index (AQI)</h3>
                    <p class="text-xs text-slate-400 font-bold">Particulate matter concentration</p>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-4xl font-black">{{ airQuality }}</div>
                  <div :class="['text-sm font-bold', airQuality <= 50 ? 'text-green-400' : airQuality <= 100 ? 'text-yellow-400' : 'text-red-400']">{{ getAirQualityLevel() }}</div>
                </div>
              </div>
              <div class="h-2 bg-white/10 rounded-full overflow-hidden">
                <div :class="['h-full rounded-full transition-all', airQuality <= 50 ? 'bg-green-500' : airQuality <= 100 ? 'bg-yellow-500' : 'bg-red-500']" :style="{ width: airQuality + '%' }"></div>
              </div>
            </div>

            <!-- 7-Day Forecast -->
            <div class="glass p-6 rounded-2xl purple-glow">
              <h3 class="text-xl font-extrabold mb-6 flex items-center gap-2">
                <svg class="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/></svg>
                7-Day Forecast
              </h3>
              <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                <div v-for="(day, index) in forecast" :key="index" class="glass p-4 rounded-xl text-center hover:bg-white/5 transition-all cursor-pointer group">
                  <div class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">{{ day.day }}</div>
                  <div class="text-4xl mb-3 group-hover:scale-110 transition-transform">{{ getWeatherIcon(day.condition) }}</div>
                  <div class="text-2xl font-black mb-2">{{ day.temp }}°</div>
                  <div class="text-xs text-slate-300 font-bold mb-3 truncate">{{ day.condition.split(' ')[1] || day.condition }}</div>
                  <div class="flex justify-center gap-2 text-xs text-slate-500 font-bold">
                    <span>💧{{ day.humidity }}%</span>
                  </div>
                  <div class="text-xs text-slate-500 font-bold mt-1">💨{{ day.windSpeed }}km/h</div>
                </div>
              </div>
            </div>

            <!-- Map Section -->
            <div v-if="currentView === 'map'" class="glass p-8 rounded-2xl purple-glow text-center">
              <div class="text-6xl mb-4">🗺️</div>
              <h3 class="text-2xl font-black mb-2">Interactive Weather Map</h3>
              <p class="text-slate-400 font-bold mb-4">Visualize real-time weather conditions</p>
              <p class="text-sm text-slate-500">Coming soon with live radar and satellite imagery</p>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else key="empty" class="glass p-12 rounded-2xl text-center">
            <div class="text-8xl mb-6">🌤️</div>
            <h3 class="text-3xl font-black mb-4">Welcome to MeteoApp Premium</h3>
            <p class="text-lg text-slate-400 font-bold mb-8">Search for a city to explore weather data</p>
            <ul class="inline-block text-left space-y-3">
              <li class="flex items-center gap-3"><span class="text-2xl">🌍</span><span class="font-bold">Global real-time weather</span></li>
              <li class="flex items-center gap-3"><span class="text-2xl">📊</span><span class="font-bold">7-day detailed forecasts</span></li>
              <li class="flex items-center gap-3"><span class="text-2xl">⭐</span><span class="font-bold">Favorites system</span></li>
              <li class="flex items-center gap-3"><span class="text-2xl">🌓</span><span class="font-bold">Dark/Light mode</span></li>
              <li class="flex items-center gap-3"><span class="text-2xl">📍</span><span class="font-bold">Auto geolocation</span></li>
            </ul>
          </div>
        </transition>

        <!-- Favorites Panel -->
        <transition name="fade">
          <div v-if="showFavorites" class="glass p-6 rounded-2xl purple-glow">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xl font-extrabold flex items-center gap-2">
                <svg class="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                My Favorites
              </h3>
              <button @click="showFavorites = false" class="p-2 hover:bg-white/10 rounded-lg transition-all">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
              </button>
            </div>
            <div v-if="favorites.length === 0" class="text-center text-slate-400 py-8 font-bold">No favorites yet. Add some cities!</div>
            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div v-for="(fav, index) in favorites" :key="index" @click="loadFavorite(fav)" class="glass p-4 rounded-xl hover:bg-white/10 transition-all cursor-pointer group flex items-center justify-between">
                <div>
                  <div class="font-black text-lg">{{ fav.city }}</div>
                  <div class="text-sm text-slate-400 font-bold">{{ fav.country }}</div>
                </div>
                <button @click.stop="removeFromFavorites(index)" class="p-2 hover:bg-red-500/20 rounded-lg transition-all group-hover:scale-110">
                  <svg class="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                </button>
              </div>
            </div>
          </div>
        </transition>

        <!-- History Panel -->
        <transition name="fade">
          <div v-if="showHistory" class="glass p-6 rounded-2xl purple-glow">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xl font-extrabold flex items-center gap-2">
                <svg class="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>
                Search History
              </h3>
              <div class="flex items-center gap-2">
                <button v-if="searchHistory.length > 0" @click="clearHistory" class="text-sm font-bold text-red-400 hover:text-red-300 transition-colors">Clear All</button>
                <button @click="showHistory = false" class="p-2 hover:bg-white/10 rounded-lg transition-all">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                </button>
              </div>
            </div>
            <div v-if="searchHistory.length === 0" class="text-center text-slate-400 py-8 font-bold">No search history</div>
            <div v-else class="space-y-2">
              <div v-for="(item, index) in searchHistory" :key="index" @click="loadFromHistory(item)" class="glass p-4 rounded-xl hover:bg-white/10 transition-all cursor-pointer flex items-center justify-between">
                <div>
                  <div class="font-bold">{{ item.city }}, {{ item.country }}</div>
                  <div class="text-xs text-slate-500 font-bold">{{ new Date(item.timestamp).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }) }}</div>
                </div>
                <svg class="w-5 h-5 text-slate-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </main>
  </div>
</template>

<style scoped>
.alert-enter-active, .alert-leave-active {
  transition: all 0.3s ease;
}
.alert-enter-from, .alert-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
