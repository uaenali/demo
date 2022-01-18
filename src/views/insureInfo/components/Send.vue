<template>
  <div class="send">
    <input type="text" :placeholder="请输入" />
      <!-- <input 
        v-model="form.username"
        label="手机号码"
        placeholder="手机号码"
        type="tel"
        clearable
        maxlength="11"
      />
      <input type="text"  v-model="form.sms_code"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"> -->
       
     
<button @click="sendCode" :disabled="isSmsSend">{{ sendBtnText }}</button>
 </div>
</template>

<script>
export default {
    
// data() 里面添加下面几个字段
data () {
        return {
          form: {
          username: 'Mike',
          sms_code: '12345678911'
        },
          
            // 是否已经发送了验证码
            isSmsSend: false,
            // 文本
            sendBtnText: '发送验证码',
            // 计时器对象
            timer: null,
            // 倒数60秒
            counter: 60
            
        }
    },
    methods: {
      /**
       * 发送验证码
       */
      sendCode () {

        // 判断手机号是否已经输入
        if (!this.form.username) {
          this.$notify('请输入手机号')
          return false
        }
        // 判断手机号是否符合要求
        if (this.form.username.length !== 11) {
          this.$notify('请输入11位手机号')
          return false
        }
        // // 调用接口，发送短信验证码
        // // 这部分放调用发送短信的接口，这里先不做任何功能，主要先把按钮倒计时的功能实现
        // // 将按钮禁用，防止再次点击
        this.isSmsSend = true
        // 开始倒计时，60s之后才能再次点击
        this.countDown()  // 这里实现倒计时的功能
      }
    },
     /**
       * 倒计时
       */
      countDown () {
        // 将setInterval()方法赋值给前面定义的timer计时器对象，等用clearInterval()方法时方便清空这个计时器对象
        this.timer = setInterval(() => {
          this.sendBtnText = `(${this.counter}秒)后重新发送`
          this.counter--
          if (this.counter < 0) {
            // 当计时小于零时，取消该计时器
            clearInterval(this.timer)
          }
        }, 6)
      },
      /**
       * 发送验证码
       */
      // sendSmsCode () {
        
      // }
}

// 这里点击发送验证码按钮，先判断下手机号是否已经输入和是否符合规则，
// 不符合判断条件，则通知用户相应的错误。
</script>
<!--绑定disabled属性，点击发送验证码按钮后，让其按钮禁用，等倒数完后再恢复点击的功能；

“点击发送验证码”文本添加双向绑定，在点击后将文本替换为“（60秒）后重新发送”，倒计时结束后重新恢复文本为“点击发送验证码”-->