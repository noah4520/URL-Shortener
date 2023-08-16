<script setup>
import { ref, watch } from 'vue'
import { NButton, NInput, darkTheme, NConfigProvider, NPopover } from 'naive-ui'
import { ContentCopyFilled } from '@vicons/material'
import { Icon } from '@vicons/utils'
import { fetchReurlUrl } from './API/fetchReurlUrl'

const inputUrl = ref('');
const outputUrl = ref('');
const buttonDisplay = ref('none');

function copyText() {
  navigator.clipboard.writeText(outputUrl.value);
}

async function shortenURL(source) {
  const data = {
    "url": source,
    "utm_source": "FB_AD"
  }
  try {
    const response =  await fetchReurlUrl(data);
    outputUrl.value = response.short_url;
    document.querySelector('.input-area').classList.remove('active');
    setTimeout(() => {
      document.querySelector('.input-area').style.display = 'none';
      document.querySelector('.result-box').classList.add('active');
    }, 400)
  } catch (error) {
    console.error(error);
  }
}

watch(() => inputUrl.value, () => {
  buttonDisplay.value = 'block';
  requestAnimationFrame(() => {
    document.querySelector(".changebtn").classList.add('active')
  });
})
</script>

<template>
  <n-config-provider :theme="darkTheme">
    <div class="container">
      <div class="title">短網址 · 簡單使用</div>
      <div class="input-area active">
        <n-input type="text" class="textbar" size="large" placeholder="請輸入網址" v-model:value="inputUrl"></n-input>
        <div style="text-align: center; padding: 20px 0;">
          <n-button class="changebtn" size="large" @click="shortenURL(inputUrl)"
            :style="{ margin: '0 auto' }">縮短網址</n-button>
        </div>
      </div>

      <div class="result-box">
          <div style="display: flex; flex-wrap: nowrap; justify-content: space-between;">
            <div type="text" size="large">{{ outputUrl }}</div>
            <n-popover trigger="click" :keep-alive-on-hover="false">
              <template #trigger>
                <Icon class="copy-btn" size="20" @click="copyText">
                  <ContentCopyFilled />
                </Icon>
              </template>
              <span>複製成功！</span>
            </n-popover>
          </div>
        </div>
    </div>
   

  </n-config-provider>
</template>

<style lang="scss">
$pc-width: 1080px;
$mobile-width: 600px;

@mixin pc-width() {
  @media (max-width: $pc-width) {
    @content;
  }
}

@mixin mobile-width() {
  @media (max-width: $mobile-width) {
    @content;
  }
}


* {
  color: #fff;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 40px;
}

.title {
  padding: 50px 0;
  font-size: 36px;
  text-align: center;
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.input-area {
  opacity: 0;
  transform: translateY(-10px) scale(1);
  transition: transform 0.4s ease-in-out 0s, opacity 0.4s ease-in-out 0s;

  &.active {
    opacity: 1;
    transform: translateY(0) scale(1);
    transition: transform 0.4s ease-in-out 0s, opacity 0.4s ease-in-out 0s;
  }
}

.changebtn {
  opacity: 0;
  transform: translateY(-10px) scale(1);
  transition: transform 0.8s ease-in-out 0s, opacity 0.8s ease-in-out 0s;

  &.active {
    opacity: 1;
    transform: translateY(0) scale(1);
    transition: transform 0.8s ease-in-out 0s, opacity 0.8s ease-in-out 0s;
  }
}

.result-box {
  background-color: rgb(60, 60, 64, 0.5);
  padding: 10px;
  font-size: 12pt;
  border-radius: 2px;

  opacity: 0;
  transform: translateY(-10px) scale(1);
  transition: transform 0.4s ease-in-out 0s, opacity 0.4s ease-in-out 0s;

  &.active {
    opacity: 1;
    transform: translateY(0) scale(1);
    transition: transform 0.4s ease-in-out 0s, opacity 0.4s ease-in-out 0s;
  }
}

.copy-btn {
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
}
</style>