<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToApp = () => {
  router.push('/weather')
}
</script>

<template>
  <div class="dark bg-background-dark min-h-screen text-white overflow-x-hidden">
    <!-- Background Blobs -->
    <div class="fixed top-[-100px] left-[-100px] w-[500px] h-[500px] bg-gradient-radial from-primary/20 to-accent-purple/10 rounded-full blur-[100px] -z-10"></div>
    <div class="fixed bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-gradient-radial from-primary/15 to-purple-900/10 rounded-full blur-[100px] -z-10"></div>

    <!-- Navigation Bar -->
    <header class="fixed top-0 w-full z-50 px-6 py-4 lg:px-20">
      <nav class="mx-auto max-w-7xl glass rounded-full px-6 py-3 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <svg class="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4c-1.48 0-2.85.43-4.01 1.17l1.46 1.46C10.21 6.23 11.08 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3 0 1.13-.64 2.11-1.56 2.62l1.45 1.45C23.16 18.16 24 16.68 24 15c0-2.64-2.05-4.78-4.65-4.96zM3 5.27l2.75 2.74C2.56 8.15 0 10.77 0 14c0 3.31 2.69 6 6 6h11.73l2 2L21 20.73 4.27 4 3 5.27zM7.73 10l8 8H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h1.73z"/>
          </svg>
          <span class="text-lg font-extrabold tracking-tight">MeteoApp <span class="text-primary">Premium</span></span>
        </div>
        <div class="hidden md:flex items-center gap-8">
          <a class="text-sm font-medium hover:text-primary transition-colors cursor-pointer">Solutions</a>
          <a class="text-sm font-medium hover:text-primary transition-colors cursor-pointer">Accuracy Data</a>
          <a class="text-sm font-medium hover:text-primary transition-colors cursor-pointer">Pricing</a>
          <a class="text-sm font-medium hover:text-primary transition-colors cursor-pointer">Enterprise</a>
        </div>
        <div class="flex items-center gap-3">
          <button class="hidden sm:block px-5 py-2 text-sm font-bold border border-white/10 rounded-full hover:bg-white/5 transition-all">
            Log In
          </button>
          <button @click="goToApp" class="bg-primary text-white px-5 py-2 text-sm font-bold rounded-full hover:brightness-110 transition-all shadow-lg shadow-primary/20">
            Get Started
          </button>
        </div>
      </nav>
    </header>

    <!-- Hero Section -->
    <main class="flex flex-col items-center justify-center pt-32 pb-20 px-6 lg:px-20 relative min-h-screen">
      <div class="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Text Content -->
        <div class="flex flex-col gap-8 order-2 lg:order-1">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span class="text-[10px] font-bold uppercase tracking-widest text-primary">Live Satellite Stream Active</span>
          </div>
          
          <h1 class="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight text-white">
            Master the Elements <br/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-primary">with Precision</span>
          </h1>
          
          <p class="text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed">
            Experience enterprise-grade forecasting with hyper-local accuracy and real-time data streaming across all your global assets.
          </p>
          
          <div class="flex flex-wrap gap-4">
            <button @click="goToApp" class="shimmer-gold text-background-dark px-8 py-4 rounded-xl font-black text-lg shadow-2xl shadow-primary/30 hover:scale-105 transition-transform flex items-center gap-2">
              Get Started Now
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
            </button>
            <button class="glass px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all flex items-center gap-2">
              View Demo
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </div>
          
          <div class="flex items-center gap-6 mt-4">
            <div class="flex -space-x-3">
              <div class="w-10 h-10 rounded-full border-2 border-background-dark bg-gradient-to-br from-blue-400 to-purple-600"></div>
              <div class="w-10 h-10 rounded-full border-2 border-background-dark bg-gradient-to-br from-green-400 to-cyan-600"></div>
              <div class="w-10 h-10 rounded-full border-2 border-background-dark bg-gradient-to-br from-orange-400 to-pink-600"></div>
            </div>
            <p class="text-sm text-slate-500 font-medium">Trusted by <span class="text-white font-bold">2,500+</span> global enterprises</p>
          </div>
        </div>

        <!-- Visual Asset -->
        <div class="order-1 lg:order-2 flex justify-center lg:justify-end relative">
          <div class="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
            <div class="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent-purple/20 rounded-full blur-3xl opacity-50"></div>
            <div class="relative z-10 group">
              <div class="w-64 h-64 md:w-80 md:h-80 glass rounded-3xl flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-700">
                <div class="flex flex-col items-center gap-4">
                  <svg class="w-32 h-32 lg:w-40 lg:h-40 text-primary drop-shadow-2xl" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z"/>
                  </svg>
                  <div class="absolute -bottom-10 -right-10 glass p-6 rounded-2xl shadow-2xl">
                    <div class="flex flex-col gap-1">
                      <span class="text-xs text-slate-400 font-bold uppercase">Current Temp</span>
                      <span class="text-3xl font-black">74°F</span>
                      <div class="flex gap-1">
                        <div class="w-1 h-4 bg-primary rounded-full"></div>
                        <div class="w-1 h-6 bg-primary rounded-full"></div>
                        <div class="w-1 h-3 bg-primary/30 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div class="absolute -top-10 -left-10 glass p-6 rounded-2xl shadow-2xl">
                    <svg class="w-10 h-10 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4c-1.48 0-2.85.43-4.01 1.17l1.46 1.46C10.21 6.23 11.08 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3 0 1.13-.64 2.11-1.56 2.62l1.45 1.45C23.16 18.16 24 16.68 24 15c0-2.64-2.05-4.78-4.65-4.96z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Feature Grid Section -->
    <section class="py-20 px-6 lg:px-20 relative bg-slate-950/50">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Card 1 -->
          <div class="group glass p-8 rounded-2xl purple-glow relative overflow-hidden transition-all hover:-translate-y-2 hover:border-primary/30">
            <div class="mb-6 w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors">
              <svg class="w-8 h-8 text-primary group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/>
              </svg>
            </div>
            <h3 class="text-xl font-extrabold mb-3 text-white">Global Coverage</h3>
            <p class="text-slate-400 leading-relaxed">
              Comprehensive data from 40k+ verified stations worldwide, ensuring accuracy in every corner of the globe.
            </p>
          </div>

          <!-- Card 2 -->
          <div class="group glass p-8 rounded-2xl purple-glow relative overflow-hidden transition-all hover:-translate-y-2 hover:border-primary/30">
            <div class="mb-6 w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors">
              <svg class="w-8 h-8 text-primary group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <h3 class="text-xl font-extrabold mb-3 text-white">Hyper-local Accuracy</h3>
            <p class="text-slate-400 leading-relaxed">
              Advanced ML-driven forecasting with precision down to a 500m radius for your specific facility.
            </p>
          </div>

          <!-- Card 3 -->
          <div class="group glass p-8 rounded-2xl purple-glow relative overflow-hidden transition-all hover:-translate-y-2 hover:border-primary/30">
            <div class="mb-6 w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors">
              <svg class="w-8 h-8 text-primary group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
              </svg>
            </div>
            <h3 class="text-xl font-extrabold mb-3 text-white">Real-time Alerts</h3>
            <p class="text-slate-400 leading-relaxed">
              Instant notifications for severe weather shifts with multi-channel delivery for mission-critical operations.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-24 px-6 lg:px-20 text-center relative overflow-hidden">
      <div class="absolute inset-0 bg-primary/5 -skew-y-3"></div>
      <div class="max-w-4xl mx-auto relative z-10 flex flex-col items-center gap-8">
        <h2 class="text-4xl md:text-5xl font-black text-white">Ready to elevate your weather tracking?</h2>
        <p class="text-slate-400 text-lg md:text-xl">Join thousands of enterprise users making smarter, weather-informed decisions every day.</p>
        <div class="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <button @click="goToApp" class="bg-primary text-white px-10 py-4 rounded-xl font-black text-lg hover:brightness-110 transition-all">
            Start Your Free Trial
          </button>
          <button class="glass px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all">
            Talk to Sales
          </button>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 px-6 lg:px-20 border-t border-white/5">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div class="flex items-center gap-2 opacity-60 grayscale">
          <svg class="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4c-1.48 0-2.85.43-4.01 1.17l1.46 1.46C10.21 6.23 11.08 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3 0 1.13-.64 2.11-1.56 2.62l1.45 1.45C23.16 18.16 24 16.68 24 15c0-2.64-2.05-4.78-4.65-4.96z"/>
          </svg>
          <span class="text-md font-bold">MeteoApp Premium</span>
        </div>
        <div class="flex flex-wrap justify-center gap-8 text-sm font-medium text-slate-500">
          <a class="hover:text-white transition-colors cursor-pointer">Privacy Policy</a>
          <a class="hover:text-white transition-colors cursor-pointer">Terms of Service</a>
          <a class="hover:text-white transition-colors cursor-pointer">Security</a>
          <a class="hover:text-white transition-colors cursor-pointer">Status</a>
        </div>
      </div>
      <div class="text-center mt-10 text-xs text-slate-600 font-medium">
        © 2026 MeteoApp Premium Enterprise. Precision Engineered globally.
      </div>
    </footer>
  </div>
</template>
  <div class="landing-page">
    <div class="animated-background">
      <div class="cloud cloud1">☁️</div>
      <div class="cloud cloud2">☁️</div>
      <div class="cloud cloud3">🌤️</div>
      <div class="cloud cloud4">☁️</div>
      <div class="star star1">⭐</div>
      <div class="star star2">✨</div>
      <div class="star star3">💫</div>
    </div>

    <transition name="fade-up">
      <div v-if="showContent" class="content-wrapper">
        <div class="hero-section">
          <div class="logo-section">
            <div class="logo-icon">
              <span class="icon-main">🌈</span>
              <span class="icon-accent">☀️</span>
            </div>
            <h1 class="hero-title">
              <span class="title-line">WeatherApp</span>
              <span class="title-premium">Premium</span>
            </h1>
          </div>

          <p class="hero-subtitle">
            Votre compagnon météo ultime pour toutes vos aventures
          </p>

          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">🌍</div>
              <h3>Mondial</h3>
              <p>Accédez aux données météo de milliers de villes à travers le monde</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">📊</div>
              <h3>Prévisions</h3>
              <p>Consultez les prévisions détaillées sur 7 jours avec graphiques</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">⭐</div>
              <h3>Favoris</h3>
              <p>Enregistrez vos villes préférées pour un accès rapide</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🌓</div>
              <h3>Mode Sombre</h3>
              <p>Interface adaptée à vos préférences jour et nuit</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">📱</div>
              <h3>Responsive</h3>
              <p>Expérience optimale sur tous vos appareils</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">⚡</div>
              <h3>Temps Réel</h3>
              <p>Données météo actualisées en temps réel</p>
            </div>
          </div>

          <div class="cta-section">
            <button @click="goToApp" class="cta-button">
              <span class="cta-text">Découvrir l'Application</span>
              <span class="cta-icon">→</span>
            </button>
            <p class="cta-subtitle">
              ✨ Gratuit • Sans inscription • Illimité
            </p>
          </div>

          <div class="stats-section">
            <div class="stat-item">
              <div class="stat-value">10K+</div>
              <div class="stat-label">Villes</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">99.9%</div>
              <div class="stat-label">Précision</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">24/7</div>
              <div class="stat-label">Disponible</div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.landing-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.animated-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
}

.cloud {
  position: absolute;
  font-size: 3rem;
  opacity: 0.3;
  animation: float 20s ease-in-out infinite;
}

.cloud1 {
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.cloud2 {
  top: 20%;
  right: 15%;
  animation-delay: 2s;
}

.cloud3 {
  top: 60%;
  left: 20%;
  animation-delay: 4s;
}

.cloud4 {
  bottom: 15%;
  right: 10%;
  animation-delay: 3s;
}

.star {
  position: absolute;
  font-size: 2rem;
  animation: twinkle 3s ease-in-out infinite;
}

.star1 {
  top: 15%;
  right: 25%;
  animation-delay: 0s;
}

.star2 {
  top: 70%;
  left: 10%;
  animation-delay: 1s;
}

.star3 {
  bottom: 20%;
  left: 30%;
  animation-delay: 2s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(10px, -10px);
  }
  50% {
    transform: translate(-5px, 5px);
  }
  75% {
    transform: translate(-10px, -5px);
  }
}

@keyframes twinkle {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

.content-wrapper {
  max-width: 1200px;
  width: 100%;
  position: relative;
  z-index: 10;
}

.hero-section {
  text-align: center;
}

.logo-section {
  margin-bottom: 30px;
}

.logo-icon {
  position: relative;
  display: inline-block;
  margin-bottom: 20px;
}

.icon-main {
  font-size: 5rem;
  display: inline-block;
  animation: bounce 2s ease-in-out infinite;
}

.icon-accent {
  font-size: 2.5rem;
  position: absolute;
  top: -10px;
  right: -20px;
  animation: rotate 4s linear infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.hero-title {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 900;
  margin: 0;
  line-height: 1.2;
}

.title-line {
  display: block;
  background: linear-gradient(135deg, #fff 0%, #f0f0f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title-premium {
  display: block;
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 0.6em;
  margin-top: 5px;
}

.hero-subtitle {
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  color: rgba(255, 255, 255, 0.9);
  margin: 20px auto 50px;
  max-width: 700px;
  line-height: 1.6;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  margin: 50px 0;
}

.feature-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.4s ease;
  cursor: pointer;
}

.feature-card:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

.feature-icon {
  font-size: 3.5rem;
  margin-bottom: 15px;
  display: inline-block;
  animation: bounce 2s ease-in-out infinite;
}

.feature-card:nth-child(2) .feature-icon {
  animation-delay: 0.2s;
}

.feature-card:nth-child(3) .feature-icon {
  animation-delay: 0.4s;
}

.feature-card:nth-child(4) .feature-icon {
  animation-delay: 0.6s;
}

.feature-card:nth-child(5) .feature-icon {
  animation-delay: 0.8s;
}

.feature-card:nth-child(6) .feature-icon {
  animation-delay: 1s;
}

.feature-card h3 {
  font-size: 1.5rem;
  color: #fff;
  margin: 15px 0 10px;
  font-weight: 700;
}

.feature-card p {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin: 0;
}

.cta-section {
  margin: 60px 0 40px;
}

.cta-button {
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  color: #333;
  border: none;
  padding: 20px 50px;
  font-size: 1.3rem;
  font-weight: 700;
  border-radius: 50px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 15px;
  transition: all 0.4s ease;
  box-shadow: 0 10px 30px rgba(255, 215, 0, 0.4);
  position: relative;
  overflow: hidden;
}

.cta-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: left 0.5s ease;
}

.cta-button:hover::before {
  left: 100%;
}

.cta-button:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 15px 40px rgba(255, 215, 0, 0.6);
}

.cta-button:active {
  transform: translateY(-1px) scale(1.02);
}

.cta-icon {
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

.cta-button:hover .cta-icon {
  transform: translateX(5px);
}

.cta-subtitle {
  margin-top: 20px;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
}

.stats-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 30px;
  margin-top: 60px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 800;
  color: #ffd700;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

.fade-up-enter-active {
  transition: all 0.8s ease;
}

.fade-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .cta-button {
    padding: 18px 40px;
    font-size: 1.1rem;
  }

  .stats-section {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 30px;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }
}
</style>