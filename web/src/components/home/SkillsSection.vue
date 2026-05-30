<template>
  <section class="skills" aria-labelledby="skills-title">
    <div class="skills__panel">
      <h2 id="skills-title" class="skills__title">🤓 个人技能</h2>
      <p class="skills__body">
        "温故而知新，可以为师矣"，知识还是需要在大量的实践中得到巩固，除此之外，技术栈在深度方面还需要进步。
      </p>
      <div class="skills__progress-list" role="list">
        <div class="skills__progress-item" role="listitem" v-for="skill in skills" :key="skill.name">
          <div class="skills__skill-info">
            <span class="skills__skill-name">{{ skill.name }}</span>
            <span class="skills__skill-level">{{ skill.level }}%</span>
          </div>
          <div class="skills__progress-bar">
            <div class="skills__progress-fill" :style="{ width: `${skill.level}%` }"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const skills = [
  { name: 'Laravel', level: 80 },
  { name: 'PHP', level: 75 },
  { name: 'MySQL', level: 70 },
  { name: 'Linux', level: 30 },
  { name: 'Flask', level: 10 },
  { name: 'Go', level: 10 },
  { name: 'Gin', level: 10 },
  { name: 'Python', level: 10 },
  { name: 'Java', level: 10 },
  { name: 'Vue', level: 20 }
]
</script>

<style scoped>
@import '../../styles/home/skills-section.css';
</style>
