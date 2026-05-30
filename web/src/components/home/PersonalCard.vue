<script setup lang="ts">
const aboutData = {
  title: '你好，我是 LyflatW',
  content: '我毕业于中南民族大学，目前是一位后端开发工程师。动漫和游戏是我生活的调味剂，汽车引擎的轰鸣是对我灵魂的安抚，代码是我个人价值的证明。我相信"实践是检验真理的唯一标准"，参与社会生产方能体现个人价值，努力做一个跟得上朋友，跟得上时代的人。',
  highlights: [
    '后端开发工程师',
    '动漫爱好者',
    '游戏玩家',
    '汽车发烧友',
    '热爱学习'
  ]
}
</script>

<template>
  <div class="personal-card">
    <div class="personal-card__header">
      <span class="personal-card__icon">👋</span>
      <h3 class="personal-card__title">ABOUT</h3>
    </div>

    <div class="personal-card__content">
      <h4 class="personal-card__greeting">{{ aboutData.title }}</h4>
      <p class="personal-card__description">{{ aboutData.content }}</p>
    </div>

    <div class="personal-card__highlights">
      <span v-for="(highlight, index) in aboutData.highlights" :key="index" class="personal-card__highlight">
        {{ highlight }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.personal-card {
  background: linear-gradient(135deg, rgba(26, 35, 56, 0.75) 0%, rgba(32, 42, 68, 0.75) 100%);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 1rem;
  padding: 1.75rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.personal-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, #4ecdc4 0%, #44a3aa 50%, #4ecdc4 100%);
  opacity: 0.6;
}

.personal-card:hover {
  border-color: rgba(78, 205, 196, 0.2);
  box-shadow: 0 10px 30px rgba(78, 205, 196, 0.1);
}

.personal-card__header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.personal-card__icon {
  font-size: 1.5rem;
  animation: wave 2s ease-in-out infinite;
  transform-origin: 70% 70%;
}

@keyframes wave {
  0%, 100% { transform: rotate(0deg); }
  10% { transform: rotate(14deg); }
  20% { transform: rotate(-8deg); }
  30% { transform: rotate(14deg); }
  40% { transform: rotate(-4deg); }
  50% { transform: rotate(10deg); }
  60% { transform: rotate(0deg); }
}

.personal-card__title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.15em;
}

.personal-card__content {
  margin-bottom: 1.5rem;
}

.personal-card__greeting {
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  font-weight: 700;
  background: linear-gradient(135deg, #4ecdc4 0%, #44a3aa 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.personal-card__description {
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.75);
  text-align: justify;
}

.personal-card__highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
}

.personal-card__highlight {
  padding: 0.4375rem 0.875rem;
  border-radius: 999px;
  background: rgba(78, 205, 196, 0.1);
  border: 1px solid rgba(78, 205, 196, 0.25);
  font-size: 0.75rem;
  font-weight: 500;
  color: rgba(78, 205, 196, 0.95);
  transition: all 0.25s ease;
  position: relative;
  overflow: hidden;
}

.personal-card__highlight::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(78, 205, 196, 0.2) 0%, transparent 100%);
  opacity: 0;
  transition: opacity 0.25s ease;
}

.personal-card__highlight:hover {
  background: rgba(78, 205, 196, 0.15);
  border-color: rgba(78, 205, 196, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(78, 205, 196, 0.2);
}

.personal-card__highlight:hover::before {
  opacity: 1;
}
</style>