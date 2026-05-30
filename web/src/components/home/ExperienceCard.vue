<script setup lang="ts">
const projects = [
  {
    title: 'Gin+Vue',
    period: '2026 - 至今',
    description: '复现copy一个由Gin+Vue实现的个人博客项目，由此学习Gin框架与Vue的皮毛',
    tags: ['Go', 'Gin', 'Gorm', 'MySQL', 'Redis', 'Elasticsearch', 'JWT'],
    status: '进行中'
  },
  {
    title: 'Quickin_admin',
    period: '2024 - 2026',
    description: '第一家公司初入时主要负责的项目，主要是生产Quickin软件后台CMS系统的接口',
    tags: ['PHP', 'Nginx', 'Laravel', 'MySQL', 'Jumpserver'],
    status: '已完成'
  },
  {
    title: '基于卷积神经网络的中草药识别科普小程序',
    period: '2023 - 2024',
    description: '毕业设计，一款涵盖中草药科普与中草药识别的小程序，前端沿用学姐的代码进行修改扩展，模型训练时中草药图片的样本较少，大部分识别准确率在30%以上😂',
    tags: ['Python', 'Flask', 'Mysql', 'Linux', 'CNN'],
    status: '已完成'
  },
  {
    title: '新生信息化测试平台',
    period: '2023 - 2024',
    description: '大学软件开发实习项目，与舍友两人共同开发，包括课程管理，学生管理，试卷管理，成绩管理等。去年工作时想到，还回去修了下Bug。',
    tags: ['Java', 'SpringBoot', 'Mybatis'],
    status: '已完成'
  }
]
</script>

<template>
  <div class="experience-card">
    <div class="experience-card__header">
      <span class="experience-card__icon">💻</span>
      <h3 class="experience-card__title">项目经验</h3>
    </div>
    <div class="experience-card__projects">
      <div v-for="(project, index) in projects" :key="index" class="experience-card__project">
        <div class="experience-card__project-header">
          <div>
            <h4 class="experience-card__project-title">{{ project.title }}</h4>
            <span class="experience-card__project-period">{{ project.period }}</span>
          </div>
          <span class="experience-card__project-status" :class="{ 'status-active': project.status === '进行中' }">
            {{ project.status }}
          </span>
        </div>
        <p class="experience-card__project-description">{{ project.description }}</p>
        <div class="experience-card__project-tags">
          <span v-for="(tag, tagIndex) in project.tags" :key="tagIndex" class="experience-card__project-tag">
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.experience-card {
  background: linear-gradient(135deg, rgba(26, 35, 56, 0.75) 0%, rgba(32, 42, 68, 0.75) 100%);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 1rem;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
}

.experience-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, #ff6b6b 0%, #ee5a5a 100%);
  opacity: 0.6;
}

.experience-card__header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.experience-card__icon {
  font-size: 1.5rem;
}

.experience-card__title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 700;
  color: #fff;
}

.experience-card__projects {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.experience-card__project {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 0.75rem;
  padding: 1rem;
  transition: all 0.3s ease;
}

.experience-card__project:hover {
  background: rgba(255, 107, 107, 0.05);
  border-color: rgba(255, 107, 107, 0.2);
  transform: translateX(4px);
}

.experience-card__project-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.experience-card__project-title {
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
}

.experience-card__project-period {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
}

.experience-card__project-status {
  padding: 0.25rem 0.75rem;
  font-size: 0.7rem;
  font-weight: 600;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
}

.experience-card__project-status.status-active {
  background: rgba(78, 205, 196, 0.15);
  color: #4ecdc4;
}

.experience-card__project-description {
  margin: 0 0 0.75rem 0;
  font-size: 0.875rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.75);
}

.experience-card__project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.experience-card__project-tag {
  padding: 0.25rem 0.625rem;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.85);
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid rgba(255, 107, 107, 0.2);
  border-radius: 999px;
  transition: all 0.2s ease;
}

.experience-card__project-tag:hover {
  background: rgba(255, 107, 107, 0.2);
  border-color: rgba(255, 107, 107, 0.35);
}
</style>