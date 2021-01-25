<template>
  <div class="p20"
       style="position: relative;">
    <p class="logo">
      <img class="logoImg"
           :src="logoimg"
           alt />
    </p>
    <div class="memberlogin mt4">
      <p>
        <span>{{$t('m.loginpage.login1')}}</span>
        <!-- <button @click="changeOut">{{$t('m.loginpage.login14')}}</button> -->
      </p>
      <p>
        <i class="el-icon-user"></i>
        <input type="text"
               v-model="mobile"
               maxlength="20"
               :placeholder="$t('m.loginpage.login2')" />
      </p>
      <p class="f-flex">
        <i class="el-icon-lock"></i>
        <input type="password"
               v-model="password"
               :placeholder="$t('m.loginpage.login3')" />

      </p>
      <p>
        <el-button type="primary"
                   @click="login">{{$t('m.loginpage.login5')}}</el-button>
      </p>
      <p>
        <!-- <span @click="forget">{{$t('m.loginpage.login4')}}</span> -->
        <br><span @click="goset">{{$t('m.loginpage.login6')}}</span>
        <br><span><a :href="loginUrl"
             style="color:#1a73e7">{{$t('m.loginpage.login11')}}</a></span>
      </p>
      <p>
        <a href="https://app.indianbicycles.in/indianbicycles.apk">{{$t('m.loginpage.login7')}}</a>
      </p>
    </div>
    <!-- 切换语言弹出框 -->
    <div class="outBox_mask"
         v-if="changeLanBox">
      <div class="outbox">
        <p class="out_Tips">{{$t('m.loginpage.login15')}}</p>
        <div class="out_btn_box">
          <p class="cancel"
             @click="hideChange">{{$t('m.Personal.Center24')}}</p>
          <p class="determine"
             @click="changeLangEvent">{{$t('m.Personal.Center23')}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mobile: localStorage.getItem('mobile') || '',
      password: '',
      logoimg: '',
      lang: 'en',
      loginUrl: '',
      changeLanBox: false,

    }
  },
  updated () {
    // window.localStorage.setItem("language", "en-US");
    // var language_val = localStorage.getItem("language");
    // this.lang = language_val;
  },
  mounted () {
    let islogin = this.getCookie3("openid") || false;
    if (islogin != false) {
      this.$router.push({ name: 'index' })
    }
    this.logo()
  },
  methods: {
    logo () {
      this.$api.Post('logo').then(res => {
        this.logoimg = res.result.logo
        this.loginUrl = res.result.loginurl
      })
    },
    login () {
      let that = this;
      if (that.mobile == '') {
        that.$toast(that.$t('m.loginpage.login8'))
        return;
      }
      if (that.password == '') {
        that.$toast(that.$t('m.loginpage.login9'))
      }
      that.$api.Post('login', {
        mobile: that.mobile,
        password: that.password
      }).then(res => {
        if (res.status == 1) {
          that.$toast(that.$t('m.loginpage.login10'))
          that.setCookie('openid', res.result.openid)
          let url = this.$route.query.redirect || '/'
          this.$router.push({ path: url })
        } else {
          that.$toast(that.$t('m.loginpage.login12'))
        }
      })

    },
    //注册
    goset () {
      this.$router.push({ name: 'register' })
    },
    //忘记密码
    forget () {
      this.$router.push({ name: 'forget' })
    },

    getCookie3 (name) {
      //可以搜索RegExp和match进行学习
      var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
      } else {
        return null;
      }
    },
    //点击显示切换语言框
    changeOut () {
      this.changeLanBox = true;
    },
    // 点击隐藏语言切换确认框
    hideChange () {
      this.changeLanBox = false;
    },
    // 语言切换
    changeLangEvent () {
      var that = this;
      if (that.lang == 'en' || this.lang == 'en-US') {
        that.lang = 'cn';
        this.$i18n.locale = that.lang;//关键语句
        window.localStorage.setItem("language", that.lang);
      } else {
        that.lang = 'en';
        this.$i18n.locale = that.lang;//关键语句
        window.localStorage.setItem("language", that.lang);
      }
      this.changeLanBox = false
    },

    setCookie (c_name, value, expire) {
      var date = new Date()
      date.setSeconds(date.getSeconds() + expire)
      document.cookie = c_name + "=" + escape(value) + "; expires=" + date.toGMTString()
    }

  }
};
</script>

<style lang="less">
body {
}
.logo {
  position: relative;
  text-align: center;
  margin: 20px auto;
}
.logoImg {
  display: inline-block;
  width: 270px !important;
}
.select_box {
  position: absolute;
  right: 40px;
  top: 20px;
  height: 25px;
}
.select_box select {
  height: 100%;
}
.memberlogin {
  color: #333;
  > p:nth-child(1) {
    display: flex;
    justify-content: space-between;
    > span:nth-child(1) {
      font-weight: 600;
      font-size: 20px;
    }
  }
  > p:nth-child(2) {
    background: #f7f7f7;
    //   padding: 15px;
    border-radius: 4px;
    margin-top: 30px;
    height: 50px;
    input {
      width: 80%;
      height: 100%;
    }
  }
  > p:nth-child(3) {
    background: #f7f7f7;
    //   padding: 15px;
    border-radius: 4px;
    margin-top: 15px;
    height: 50px;
    input {
      width: 60%;
      height: 100%;
    }
    span {
      padding: 14px 10px;
    }
  }
  > p:nth-child(4) {
    margin: 30px auto;
    button {
      width: 100%;
      border-radius: 4px;
      padding: 15px;
    }
  }
  > p:nth-child(5) {
    margin-top: 10px;
    text-align: center;
    color: #1a73e7;
    line-height: 1.8;
  }
  > p:nth-child(6) {
    margin-top: 30px;
    text-align: center;
    color: #1ab394;
    font-size: 16px;
    i {
      padding: 0;
    }
    a {
      color: #1ab394;
      padding: 8px 20px;
      border: 1px #1ab394 solid;
      border-radius: 4px;
    }
  }
  i {
    font-size: 22px;
    padding: 14px 10px;
  }
}
.golog {
  text-align: center;
  padding: 20px 0 0;
  color: #666666;
}
.golog a {
  color: #1a73e7;
}
</style>
