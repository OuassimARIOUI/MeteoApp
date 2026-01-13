<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const props = defineProps({
  city: String,
  country: String,
  weather: Object
})

const mapContainer = ref(null)
let map = null
let marker = null
let temperatureLayer = null

const initMap = async () => {
  if (!mapContainer.value) return

  // Default center (Paris)
  let lat = 48.8566
  let lon = 2.3522

  // If we have a city, geocode it
  if (props.city && props.country) {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?city=${props.city}&country=${props.country}&format=json&limit=1`)
      const data = await response.json()
      if (data && data.length > 0) {
        lat = parseFloat(data[0].lat)
        lon = parseFloat(data[0].lon)
      }
    } catch (error) {
      console.error('Geocoding error:', error)
    }
  }

  // Initialize map
  map = L.map(mapContainer.value, {
    zoomControl: false
  }).setView([lat, lon], 10)

  // Add custom zoom control on the right
  L.control.zoom({
    position: 'topright'
  }).addTo(map)

  // Add dark theme tile layer
  L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 20
  }).addTo(map)

  // Add temperature overlay from OpenWeatherMap
  temperatureLayer = L.tileLayer('https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=439d4b804bc8187953eb36d2a8c26a02', {
    opacity: 0.6,
    attribution: 'Météo par OpenWeatherMap'
  }).addTo(map)

  // Custom marker icon
  const customIcon = L.divIcon({
    className: 'custom-marker',
    html: `
      <div class="relative">
        <div class="absolute -translate-x-1/2 -translate-y-full">
          <div class="bg-primary rounded-full p-3 shadow-2xl border-4 border-white animate-bounce">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
        </div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 40]
  })

  // Add marker
  marker = L.marker([lat, lon], { icon: customIcon }).addTo(map)

  // Add popup with weather info if available
  if (props.weather) {
    const popupContent = `
      <div class="text-center p-2 bg-slate-800 rounded-lg">
        <h3 class="text-lg font-bold text-white mb-2">${props.city}</h3>
        <div class="text-4xl mb-2">${getWeatherIcon(props.weather.condition)}</div>
        <div class="text-3xl font-black text-white mb-1">${Math.round(props.weather.temperature)}°C</div>
        <div class="text-sm text-slate-300">${props.weather.condition}</div>
        <div class="flex gap-3 justify-center mt-3 text-xs text-slate-400">
          <span>💧 ${props.weather.humidity}%</span>
          <span>💨 ${props.weather.windSpeed} km/h</span>
        </div>
      </div>
    `
    marker.bindPopup(popupContent, {
      className: 'custom-popup',
      closeButton: false
    }).openPopup()
  }

  // Smooth zoom animation
  setTimeout(() => {
    map.invalidateSize()
  }, 100)
}

const updateMapView = async () => {
  if (!map || !props.city || !props.country) return

  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?city=${props.city}&country=${props.country}&format=json&limit=1`)
    const data = await response.json()
    if (data && data.length > 0) {
      const lat = parseFloat(data[0].lat)
      const lon = parseFloat(data[0].lon)
      
      // Smooth pan to new location
      map.flyTo([lat, lon], 10, {
        duration: 1.5
      })

      // Update marker
      if (marker) {
        marker.setLatLng([lat, lon])
        
        // Update popup
        if (props.weather) {
          const popupContent = `
            <div class="text-center p-2 bg-slate-800 rounded-lg">
              <h3 class="text-lg font-bold text-white mb-2">${props.city}</h3>
              <div class="text-4xl mb-2">${getWeatherIcon(props.weather.condition)}</div>
              <div class="text-3xl font-black text-white mb-1">${Math.round(props.weather.temperature)}°C</div>
              <div class="text-sm text-slate-300">${props.weather.condition}</div>
              <div class="flex gap-3 justify-center mt-3 text-xs text-slate-400">
                <span>💧 ${props.weather.humidity}%</span>
                <span>💨 ${props.weather.windSpeed} km/h</span>
              </div>
            </div>
          `
          marker.bindPopup(popupContent, {
            className: 'custom-popup',
            closeButton: false
          }).openPopup()
        }
      }
    }
  } catch (error) {
    console.error('Geocoding error:', error)
  }
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

onMounted(() => {
  initMap()
})

onUnmounted(() => {
  if (map) {
    map.remove()
    map = null
  }
})

// Watch for changes in city/weather
watch(() => [props.city, props.country, props.weather], () => {
  if (map) {
    updateMapView()
  }
}, { deep: true })
</script>

<template>
  <div class="glass rounded-2xl purple-glow overflow-hidden">
    <div class="p-4 border-b border-white/10 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
          <svg class="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/>
          </svg>
        </div>
        <div>
          <h3 class="text-lg font-extrabold">Carte Météo Interactive</h3>
          <p class="text-xs text-slate-400 font-bold">Overlay de température en direct</p>
        </div>
      </div>
      <div class="flex items-center gap-2 text-xs text-slate-400 font-bold">
        <span class="w-3 h-3 bg-blue-500 rounded inline-block"></span>
        <span>Froid</span>
        <span class="w-3 h-3 bg-yellow-500 rounded inline-block ml-2"></span>
        <span>Modéré</span>
        <span class="w-3 h-3 bg-red-500 rounded inline-block ml-2"></span>
        <span>Chaud</span>
      </div>
    </div>
    <div ref="mapContainer" class="w-full h-[600px] relative"></div>
  </div>
</template>

<style>
/* Fix Leaflet default icon paths */
.leaflet-default-icon-path {
  background-image: url('https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png');
}

/* Custom marker styles */
.custom-marker {
  background: transparent;
  border: none;
}

/* Custom popup styles */
.custom-popup .leaflet-popup-content-wrapper {
  background: transparent;
  box-shadow: none;
  padding: 0;
}

.custom-popup .leaflet-popup-content {
  margin: 0;
  width: auto !important;
}

.custom-popup .leaflet-popup-tip {
  background: #1e293b;
}

/* Zoom control styling */
.leaflet-control-zoom {
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: 12px !important;
  overflow: hidden;
  background: rgba(15, 23, 42, 0.8) !important;
  backdrop-filter: blur(10px);
}

.leaflet-control-zoom a {
  background: transparent !important;
  color: white !important;
  border: none !important;
  width: 36px !important;
  height: 36px !important;
  line-height: 36px !important;
  font-size: 20px !important;
  font-weight: bold !important;
}

.leaflet-control-zoom a:hover {
  background: rgba(255, 255, 255, 0.1) !important;
}

.leaflet-control-zoom-in {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
}

/* Smooth animations */
.leaflet-fade-anim .leaflet-popup {
  transition: opacity 0.3s ease;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-bounce {
  animation: bounce 2s infinite;
}
</style>
