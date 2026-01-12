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
      const res = await axios.get(`http://localhost:3001/cities?namePrefix=${searchCity.value}`)
      cities.value = res.data.filter(c => !country.value || c.country === country.value)
    } catch (error) {
      console.error('Error fetching cities:', error)
    }
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
  <div :class="['weather-app', { 'dark-mode': darkMode }]">
    <!-- Alert Notification -->
    <transition name="alert">
      <div v-if="showAlert" class="alert-notification">
        {{ alertMessage }}
      </div>
    </transition>

    <!-- Header with Dark Mode Toggle -->
    <header class="app-header">
      <div class="header-content">
        <h1 class="app-title">
          <span class="gradient-text">☁️ MeteoApp Premium</span>
        </h1>
        <div class="header-actions">
          <button @click="getUserLocation" class="icon-btn" title="Ma position">
            📍
          </button>
          <button @click="showHistory = !showHistory" class="icon-btn" title="Historique">
            🕒
          </button>
          <button @click="showFavorites = !showFavorites" class="icon-btn" title="Favoris">
            ⭐
          </button>
          <button @click="toggleDarkMode" class="icon-btn dark-toggle" title="Mode sombre">
            {{ darkMode ? '☀️' : '🌙' }}
          </button>
        </div>
      </div>
    </header>

    <div class="weather-container">
      <!-- Search Section -->
      <div class="glass-card search-card">
        <h2 class="section-title">🔍 Rechercher une ville</h2>
        
        <div class="input-group">
          <div class="input-wrapper">
            <label class="form-label">🌍 Code Pays</label>
            <input 
              v-model="country" 
              class="form-input" 
              placeholder="Ex: FR, DZ, US" 
              maxlength="2" 
            />
          </div>

          <div class="input-wrapper flex-2">
            <label class="form-label">🏙️ Ville</label>
            <input 
              v-model="searchCity" 
              class="form-input" 
              placeholder="Commencez à taper..." 
              @focus="cities.length > 0 && (showCityDropdown = true)"
            />
          </div>
        </div>

        <div class="input-wrapper" v-if="cities.length > 0">
          <label class="form-label">📍 Sélectionner</label>
          <select v-model="city" class="form-select">
            <option disabled value="">Choisir une ville</option>
            <option v-for="c in cities" :key="c.id" :value="c.name">
              {{ c.name }} ({{ c.country }})
            </option>
          </select>
        </div>

        <div class="button-group">
          <button @click="getWeather" class="btn btn-primary" :disabled="isLoading">
            <span v-if="isLoading" class="spinner"></span>
            <span v-else>{{ weather ? '🔄 Actualiser' : '🌤️ Afficher la météo' }}</span>
          </button>
          <button 
            v-if="city && country" 
            @click="addToFavorites" 
            class="btn btn-secondary"
            :class="{ 'is-favorite': isFavorite }"
          >
            {{ isFavorite ? '⭐ Favori' : '☆ Ajouter aux favoris' }}
          </button>
        </div>
      </div>

      <!-- Favorites Panel -->
      <transition name="slide-fade">
        <div v-if="showFavorites" class="glass-card favorites-panel">
          <div class="panel-header">
            <h3>⭐ Mes Favoris</h3>
            <button @click="showFavorites = false" class="close-btn">✕</button>
          </div>
          <div v-if="favorites.length === 0" class="empty-state">
            Aucun favori pour le moment
          </div>
          <div v-else class="favorites-list">
            <div 
              v-for="(fav, index) in favorites" 
              :key="index" 
              class="favorite-item"
              @click="loadFavorite(fav)"
            >
              <div class="favorite-info">
                <span class="favorite-city">{{ fav.city }}</span>
                <span class="favorite-country">{{ fav.country }}</span>
              </div>
              <button 
                @click.stop="removeFromFavorites(index)" 
                class="remove-btn"
                title="Supprimer"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      </transition>

      <!-- History Panel -->
      <transition name="slide-fade">
        <div v-if="showHistory" class="glass-card history-panel">
          <div class="panel-header">
            <h3>🕒 Historique</h3>
            <div>
              <button @click="clearHistory" class="clear-btn" v-if="searchHistory.length > 0">
                🗑️ Tout effacer
              </button>
              <button @click="showHistory = false" class="close-btn">✕</button>
            </div>
          </div>
          <div v-if="searchHistory.length === 0" class="empty-state">
            Aucun historique
          </div>
          <div v-else class="history-list">
            <div 
              v-for="(item, index) in searchHistory" 
              :key="index" 
              class="history-item"
              @click="loadFromHistory(item)"
            >
              <div class="history-info">
                <span class="history-city">{{ item.city }}, {{ item.country }}</span>
                <span class="history-time">{{ new Date(item.timestamp).toLocaleString('fr-FR') }}</span>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <!-- Main Weather Display -->
      <transition name="fade" mode="out-in">
        <div v-if="weather" class="weather-display">
          <!-- Current Weather Card -->
          <div class="glass-card main-weather">
            <div class="weather-header">
              <div>
                <h2 class="location-name">{{ weather.city }}</h2>
                <p class="location-country">{{ weather.country }}</p>
              </div>
              <div class="weather-icon-large">
                {{ getWeatherIcon(weather.condition) }}
              </div>
            </div>

            <div class="temperature-display">
              <span class="temp-value">{{ Math.round(weather.temperature) }}</span>
              <span class="temp-unit">°C</span>
            </div>

            <p class="weather-condition">{{ weather.condition }}</p>

            <div class="weather-stats">
              <div class="stat-item">
                <span class="stat-icon">💧</span>
                <div class="stat-info">
                  <span class="stat-label">Humidité</span>
                  <span class="stat-value">{{ weather.humidity }}%</span>
                </div>
              </div>
              <div class="stat-item">
                <span class="stat-icon">💨</span>
                <div class="stat-info">
                  <span class="stat-label">Vent</span>
                  <span class="stat-value">{{ weather.windSpeed }} km/h</span>
                </div>
              </div>
              <div class="stat-item">
                <span class="stat-icon">🌡️</span>
                <div class="stat-info">
                  <span class="stat-label">Ressenti</span>
                  <span class="stat-value">{{ Math.round(weather.temperature - 2) }}°C</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Additional Info Cards -->
          <div class="info-grid">
            <div class="glass-card info-card">
              <div class="info-header">
                <span class="info-icon">☀️</span>
                <h3>Indice UV</h3>
              </div>
              <div class="info-content">
                <div class="info-value">{{ uvIndex }}</div>
                <div class="info-label">{{ getUVLevel() }}</div>
                <div class="progress-bar">
                  <div class="progress-fill uv" :style="{ width: (uvIndex / 11 * 100) + '%' }"></div>
                </div>
              </div>
            </div>

            <div class="glass-card info-card">
              <div class="info-header">
                <span class="info-icon">🌬️</span>
                <h3>Qualité de l'air</h3>
              </div>
              <div class="info-content">
                <div class="info-value">{{ airQuality }}</div>
                <div class="info-label">{{ getAirQualityLevel() }}</div>
                <div class="progress-bar">
                  <div class="progress-fill air" :style="{ width: airQuality + '%' }"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- 7-Day Forecast -->
          <div class="glass-card forecast-card">
            <h3 class="section-title">📅 Prévisions sur 7 jours</h3>
            <div class="forecast-grid">
              <div 
                v-for="(day, index) in forecast" 
                :key="index" 
                class="forecast-item"
              >
                <div class="forecast-day">{{ day.day }}</div>
                <div class="forecast-icon">{{ getWeatherIcon(day.condition) }}</div>
                <div class="forecast-temp">{{ day.temp }}°C</div>
                <div class="forecast-condition">{{ day.condition }}</div>
                <div class="forecast-details">
                  <span>💧 {{ day.humidity }}%</span>
                  <span>💨 {{ day.windSpeed }} km/h</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Map Placeholder -->
          <div class="glass-card map-card">
            <h3 class="section-title">🗺️ Carte météo interactive</h3>
            <div class="map-placeholder">
              <p>🌍 Carte interactive disponible prochainement</p>
              <p class="map-subtitle">Visualisez les conditions météo en temps réel</p>
            </div>
          </div>
        </div>
      </transition>

      <!-- Empty State -->
      <div v-if="!weather && !isLoading" class="glass-card empty-state-card">
        <div class="empty-state-content">
          <span class="empty-icon">🌤️</span>
          <h3>Bienvenue sur MeteoApp Premium</h3>
          <p>Recherchez une ville pour commencer à explorer la météo</p>
          <ul class="features-list">
            <li>🌍 Météo mondiale en temps réel</li>
            <li>📊 Prévisions sur 7 jours</li>
            <li>⭐ Système de favoris</li>
            <li>🌓 Mode sombre/clair</li>
            <li>📍 Géolocalisation automatique</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="app-footer">
      <p>© 2026 MeteoApp Premium - Propulsé par OpenWeather API</p>
    </footer>
  </div>
</template>

<style src="./WeatherAppStyles.css" scoped></style>
