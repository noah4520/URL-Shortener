<script setup>
import { ref, watch } from 'vue'
import { NButton, NInput, darkTheme, NConfigProvider, NPopover } from 'naive-ui'
import { ContentCopyFilled } from '@vicons/material'
import { Icon } from '@vicons/utils'
import { fetchReurlUrl } from './API/fetchReurlUrl'

const inputUrl = ref('');
const outputUrl = ref('');

// 判斷送出按鈕狀態
const submitButtonDisplay = ref(false);

const copyText = () => {
  return navigator.clipboard.writeText(outputUrl.value);
}

const shortenURL = async(source) => {
  const data = {
    "url": source,
    "utm_source": "FB_AD"
  };
  try {
    const response = await fetchReurlUrl(data);
    outputUrl.value = response.short_url;
    document.querySelector('.input-area').classList.remove('active');
    await new Promise(resolve => setTimeout(resolve, 400));
    document.querySelector('.input-area').style.display = 'none';
    document.querySelector('.result-area').classList.add('active');
  } catch (error) {
    console.error(error);
  }
}

const restartUrl = async() => {
  inputUrl.value = '';
  
  await new Promise(resolve => requestAnimationFrame(resolve));
  document.querySelector('.result-area').classList.remove('active');
  
  await new Promise(resolve => setTimeout(resolve, 400));
  document.querySelector("#SubmitBtn").classList.remove('active');
  document.querySelector('.input-area').style.display = 'block';
  
  await new Promise(resolve => setTimeout(resolve, 100));
  document.querySelector('.input-area').classList.add('active');
  
  submitButtonDisplay.value = false;
}

watch(
() => inputUrl.value,
  async () => {
    if (!submitButtonDisplay.value) {
      submitButtonDisplay.value = true;
      await new Promise(resolve => requestAnimationFrame(resolve));
      document.querySelector("#SubmitBtn").classList.add('active');
    }
  }
);

</script>

<template>
  <n-config-provider :theme="darkTheme">
    <div class="container">
      <div class="title">短網址 · 簡單使用</div>
      <div class="input-area active">
        <n-input type="text" class="text-bar" size="large" placeholder="請輸入網址" v-model:value="inputUrl"></n-input>
        <div class="btn-wrapper">
          <n-button id="SubmitBtn" size="large" @click="shortenURL(inputUrl)"
            :style="{ margin: '0 auto' }">縮短網址</n-button>
        </div>
      </div>

      <div class="result-area">
        <div class="result-box">
          <div class="box-wrapper">
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
        <div class="btn-wrapper">
          <n-button id="RestartBtn" size="large" @click="restartUrl">重新網址</n-button>
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

  .btn-wrapper {
    text-align: center; 
    padding: 20px 0;
  }
}

#SubmitBtn {
  opacity: 0;
  transform: translateY(-10px) scale(1);
  transition: transform 0.8s ease-in-out 0s, opacity 0.8s ease-in-out 0s;

  &.active {
    opacity: 1;
    transform: translateY(0) scale(1);
    transition: transform 0.8s ease-in-out 0s, opacity 0.8s ease-in-out 0s;
  }
}

.result-area {
  opacity: 0;
  transform: translateY(-10px) scale(1);
  transition: transform 0.4s ease-in-out 0s, opacity 0.4s ease-in-out 0s;

  &.active {
    opacity: 1;
    transform: translateY(0) scale(1);
    transition: transform 0.4s ease-in-out 0s, opacity 0.4s ease-in-out 0s;
  }

  .result-box {
    background-color: rgb(60, 60, 64, 0.5);
    padding: 10px;
    font-size: 12pt;
    border-radius: 2px;

    .box-wrapper {
      display: flex; 
      flex-wrap: nowrap; 
      align-items: center;
      justify-content: space-between;
    }
  }

  .btn-wrapper {
    text-align: center; 
    padding: 20px 0;
  }
}

.copy-btn {
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
}
</style>