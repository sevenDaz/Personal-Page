<script setup lang="ts">
const hobbies = {
  game: ['Warframe','我的世界','GTA5','荒野大镖客2','黑神话·悟空','刺客信条','艾尔登法环'],
  anime: ['冰海战纪','夏目友人帐','凡人修仙传','无职转生','JOJO的奇妙冒险','罪恶王冠','Fate/Stay Night']
}
</script>

<template>
  <div class="hobbies-card">
    <h3 class="hobbies-card__title">游戏雷达</h3>
    <div class="hobbies-card__list">
      <div v-for="(game, index) in hobbies.game" :key="index" class="hobbies-card__item">
        <div class="hobbies-card__content">
          <span class="hobbies-card__name">{{ game }}</span>
        </div>
      </div>
    </div>

    <h3 class="hobbies-card__title hobbies-card__title--anime">动漫追番</h3>
    <div class="hobbies-card__list">
      <div v-for="(anime, index) in hobbies.anime" :key="index" class="hobbies-card__item">
        <div class="hobbies-card__content">
          <span class="hobbies-card__name">{{ anime }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hobbies-card {
  background: linear-gradient(135deg, rgba(26, 35, 56, 0.75) 0%, rgba(32, 42, 68, 0.75) 100%);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 1rem;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
}

.hobbies-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, #ffd93d 0%, #ffb344 100%);
  opacity: 0.6;
}

.hobbies-card__title {
  margin: 0 0 1rem 0;
  font-size: 1.125rem;
  font-weight: 700;
  color: #fff;
}

.hobbies-card__title--anime {
  margin-top: 1.5rem;
}

.hobbies-card__list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.hobbies-card__item {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  border-radius: 999px;
  background: rgba(255, 217, 61, 0.1);
  border: 1px solid rgba(255, 217, 61, 0.25);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.hobbies-card__item::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 20% 50%, rgba(255, 217, 61, 0.2) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.hobbies-card__item:hover {
  transform: translateY(-2px);
  background: rgba(255, 217, 61, 0.15);
  border-color: rgba(255, 217, 61, 0.4);
  box-shadow: 0 6px 12px rgba(255, 217, 61, 0.2);
}

.hobbies-card__item:hover::before {
  opacity: 1;
}

.hobbies-card__icon {
  font-size: 1.5rem;
  flex-shrink: 0;
  margin-top: 0.25rem;
}

.hobbies-card__content {
  display: flex;
  align-items: center;
}

.hobbies-card__name {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.95);
  font-weight: 600;
  line-height: 1;
}
</style>