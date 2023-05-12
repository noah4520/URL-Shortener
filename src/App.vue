<script setup>
import { ref, watch } from 'vue'
import axios from 'axios'
import { NButton, NInput, darkTheme, NConfigProvider } from 'naive-ui'
import { ContentCopyFilled } from '@vicons/material'
import { Icon } from '@vicons/utils'

const inputUrl = ref('');
const outputUrl = ref('');
const buttonDisplay = ref('none')

async function shortenURL(source) {
  const url = "https://api.reurl.cc/shorten";
  const data = {
    "url": source,
    "utm_source": "FB_AD"
  }
  const headers = {
    'Content-Type': 'application/json',
    'reurl-api-key': '4070ff49d794e13d18543b663c974755ecd1b537909804df8a38b58d65165567c4f5d6'
  };
  console.log(data);

  try {
    const response = await axios.post(url, data, { headers });
    outputUrl.value = response.data.short_url;
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
            :style="{ display: buttonDisplay, margin: '0 auto' }">縮短網址</n-button>
        </div>
      </div>

      <div class="result-box">
        <div style="display: flex; flex-wrap: nowrap; justify-content: space-between;">
          <div type="text" size="large">{{ outputUrl }}</div>
          <Icon class="copy-btn" size="20">
            <ContentCopyFilled />
          </Icon>
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
  padding: 10px 5px;
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