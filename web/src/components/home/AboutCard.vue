<script setup lang="ts">
const aboutData = {
  content: '不看动漫不打游戏的后端开发工程师不是一名合格的驱动(Driver)',
  description: '毕业于中南民族大学，喜欢动漫，游戏，汽车。生产与劳动体现个人价值',
  highlights: [
    '中南民族大学',
    '后端开发',
    '动漫鉴赏者',
    '游戏玩家',
    'I Drive',
    'AI'
  ],
  social: {
    github: 'https://github.com/lyflat',
    email: 'lyflat@example.com',
    wechat: 'LyflatW'
  }
}
</script>

<template>
  <div class="about-card">

    <div class="about-card__content">
      <p class="about-card__title">{{ aboutData.content }}</p>

      <p class="about-card__description">{{ aboutData.description }}</p>

      <div class="about-card__highlights">
        <div v-for="(highlight, index) in aboutData.highlights"
             :key="index"
             class="about-card__highlight">
          {{ highlight }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-card {
  background: linear-gradient(135deg, rgba(26, 35, 56, 0.75) 0%, rgba(32, 42, 68, 0.75) 100%);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 2rem;
  padding: 3rem;
  box-shadow:
    0 35px 80px rgba(0, 0, 0, 0.3),
    inset 0 0 0 1px rgba(255, 255, 255, 0.03);
  color: rgba(255, 255, 255, 0.95);
  position: relative;
  overflow: hidden;
}

.about-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #ff6b6b 0%, #ee5a5a 50%, #ff6b6b 100%);
  opacity: 0.6;
}

.about-card__name {
  display: inline-block;
  padding: 0.4rem 1.25rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 999px;
  font-size: 0.9375rem;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  position: relative;
  letter-spacing: 0.02em;
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.about-card__name::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.about-card__name:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.about-card__name:hover::before {
  opacity: 1;
}

.about-card__content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80%;
}

.about-card__avatar {
  width: 100%;
  height: 100%;
  border-radius: 999px;
  object-fit: cover;
  border: 4px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.about-card__avatar-glow {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(255, 107, 107, 0.2) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.about-card__avatar-wrapper:hover .about-card__avatar-glow {
  opacity: 1;
}

.about-card__title {
  font-size: clamp(2.25rem, 4.5vw, 3rem);
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 2rem;
  text-align: left;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.35) 0%,
    rgba(255, 255, 255, 0.95) 30%,
    rgba(255, 255, 255, 0.4) 50%,
    rgba(255, 255, 255, 0.95) 70%,
    rgba(255, 255, 255, 0.35) 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.35));
  animation: title-shimmer 6s linear infinite;
}

@keyframes title-shimmer {
  to {
    background-position: 200% center;
  }
}

.about-card__description {
  font-size: 1rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 400;
}

.about-card__highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;
  justify-content: center;
}

.about-card__highlight {
  padding: 0.5rem 1rem;
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid rgba(255, 107, 107, 0.3);
  border-radius: 999px;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.9);
  transition: all 0.2s ease;
}

.about-card__highlight:hover {
  background: rgba(255, 107, 107, 0.2);
  border-color: rgba(255, 107, 107, 0.5);
  transform: translateY(-1px);
}

.about-card__social {
  display: flex;
  justify-content: center;
  gap: 1.25rem;
}

.about-card__social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  color: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.05);
}

.about-card__social-link:hover {
  color: #fff;
  background: rgba(255, 107, 107, 0.15);
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(255, 107, 107, 0.3);
}

.about-card__social-link svg {
  width: 1.25rem;
  height: 1.25rem;
  fill: currentColor;
}
</style>