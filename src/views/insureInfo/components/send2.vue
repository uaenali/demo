<template>
   <div class="input-div" v-show="formData.phone">
     <!-- <input type="text" class="input code" name="code" v-model.trim="formData.code" placeholder="验证码"> -->
     <!-- <button @click="getCode(formData)" class="code-btn" :disabled="!show"> -->
     <button @click="getCode" class="code-btn" :disabled="!show">发送验证码
         <span v-show="show">获取验证码</span>
         <span v-show="!show" class="count">{{count}}</span>
     </button>
</div>
</template>

<script>
    const TIME_COUNT = 60;
export default {
 data(){
      return {
        formData: {
          phone:'',
          code:'',
        },
        show: true,
        count: '',
        timer: null,
      }
    },

    methods:{
        getCode(formData){
            if (!this.timer) {
                this.count = TIME_COUNT;
                this.show = false;
                this.timer = setInterval(() => {
                  if (this.count > 0 && this.count <= TIME_COUNT) {
                    this.count--;
                  } else {
                    this.show = true;
                    clearInterval(this.timer);
                    this.timer = null;
                  }
                }, 1000)
              }
        }   
    }


}
</script>
<style lang="scss">
.input-div {
    background-color: red;
}
</style>
