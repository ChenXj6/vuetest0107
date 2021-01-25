<template>
  <div class="p20">
    <p class="logo">
      <img class="logoImg"
           :src="logoimg"
           alt />
    </p>
    <input type="password"
           style="display: none;">
    <div class="memberset">

      <p class="membersetTitle">
        <span>{{$t('m.registerpage.register1')}}</span>
        <!-- <button @click="changeOut">{{$t('m.loginpage.login14')}}</button> -->
      </p>
      <p class="incode">

        <i class="el-icon-s-custom "></i>
        <input type="text"
               v-model="zcdata.incode"
               :placeholder="$t('m.registerpage.register2')" />
      </p>
      <p class="nickname">

        <i class="el-icon-user-solid "></i>
        <input type="text"
               v-model="zcdata.nickname"
               :placeholder="$t('m.registerpage.register3')" />
      </p>
      <p class="mobile">
        <i class="el-icon-phone "></i>
        <input type="text"
               v-model="zcdata.mobile"
               maxlength="20"
               :placeholder="$t('m.registerpage.register4')" />
      </p>
      <p class="f-flex code">
        <i class="el-icon-orange"></i>
        <input type="text"
               v-model="zcdata.code"
               :placeholder="$t('m.registerpage.register5')" />
        <el-button class="saveCodeBtn"
                   type="primary"
                   @click="getcode"
                   :disabled="iscode">{{countDown}} </el-button>
      </p>
      <p class="pasword">
        <i class="el-icon-lock "></i>
        <input type="text"
               onfocus="this.type='password'"
               autocomplete="off"
               v-model="zcdata.password"
               :placeholder="$t('m.registerpage.register8')" />
      </p>
      <p class="password1">
        <i class="el-icon-lock "></i>
        <input type="text"
               onfocus="this.type='password'"
               autocomplete="off"
               v-model="zcdata.password1"
               :placeholder="$t('m.registerpage.register9')" />
      </p>
      <p class="sumbit">
        <el-button type="primary"
                   @click="reister">{{$t('m.registerpage.register10')}}</el-button>
      </p>
      <div class="golog"><span @click="gologin">{{$t('m.registerpage.register11')}}</span></div>
      <div class="golog"><span><a :href="loginUrl">{{$t('m.loginpage.login11')}}</a></span></div>
      <p>
        <a href="https://app.indianbicycles.in/indianbicycles.apk">{{$t('m.registerpage.register12')}}</a>
      </p>
    </div>
    <!--  -->
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
      zcdata: {
        mobile: '',
        password: '',
        password1: '',
        nickname: '',
        code: '',
        incode: this.GetUrlParam('incode')
      },
      iscode: false,
      logoimg: '',
      loginUrl: '',
      timer: null,
      outTime: 60,
      countDown: this.$t('m.registerpage.register7'),
      lang: 'en',
      changeLanBox: false,
    }
  },
  mounted () {
    this.logo();
    this.lang = localStorage.getItem('language')
  },
  methods: {
    logo () {
      this.$api.Post('logo').then(res => {
        this.logoimg = res.result.logo
        this.loginUrl = res.result.loginurl
      })
    },
    gologin () {
      this.$router.push({ name: 'login' })
    },
    reister () {
      let that = this;
      if (that.zcdata.nickname == '') {
        that.$toast(that.$t('m.registerpage.register13'))
        return;
      }
      if (that.zcdata.mobile == '') {
        that.$toast(that.$t('m.registerpage.register14'))
        return;
      }
      if (that.zcdata.code == '') {
        that.$toast(that.$t('m.registerpage.register16'))
        return;
      }
      if (that.zcdata.password == '') {
        that.$toast(that.$t('m.registerpage.register17'))
        return;
      }
      if (that.zcdata.password != that.zcdata.password1) {
        that.$toast(that.$t('m.registerpage.register18'))
        return;
      }
      that.$api.Post('register', that.zcdata).then(res => {
        if (res.status == 1) {
          localStorage.setItem('mobile', this.zcdata.mobile)
          this.$router.push('/')
        } else {
          that.$toast(that.$t('m.registerpage.register21'))
        }
      })
    },
    //获取验证码
    getcode () {
      if (this.zcdata.mobile == '') {
        this.$toast(this.$t('m.registerpage.register19'))
        return;
      }
      this.$api.Post('sendcode', { mobile: this.zcdata.mobile }).then(res => {
        if (res.status == 1) {
          this.iscode = true;
          this.lang = localStorage.getItem('language')
          if (!this.timer) {
            this.timer = setInterval(() => {
              if (this.lang == 'en-US' || this.lang == 'en') {
                this.countDown = this.$t('m.registerpage.register22') + ' ' + this.outTime + 's';
              } else {
                this.countDown = this.outTime + this.$t('m.registerpage.register22');
              }
              this.outTime -= 1;
              if (this.outTime < 0) {
                clearInterval(this.timer);
                this.countDown = this.$t('m.registerpage.register7');
                this.outTime = 60;
                this.timer = null;
                this.iscode = false;
              }
            }, 1000)
          }
        } else {
          this.$toast(this.$t('m.registerpage.register21'))
        }
      })

    },
    //paraName 等找参数的名称
    GetUrlParam (paraName) {
      var url = document.location.toString();
      var arrObj = url.split("?");

      if (arrObj.length > 1) {
        var arrPara = arrObj[1].split("&");
        var arr;

        for (var i = 0; i < arrPara.length; i++) {
          arr = arrPara[i].split("=");

          if (arr != null && arr[0] == paraName) {
            return arr[1];
          }
        }
        return "";
      }
      else {
        return "";
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
  },
  watch: {
    lang () {
      this.countDown = this.$t('m.registerpage.register7')
    }
  }
};
</script>

<style lang="less">
.logo {
  position: relative;
  text-align: center;
  margin: 20px auto;
}
.logoImg {
  display: inline-block;
  width: 270px !important;
}
.memberset {
  color: #333;
  padding-bottom: 50px;
  > .membersetTitle {
    display: flex;
    justify-content: space-between;
    > span:nth-child(1) {
      font-weight: 600;
      font-size: 20px;
    }
  }
  > .incode {
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
  > .nickname {
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
  > .mobile {
    background: #f7f7f7;
    //   padding: 15px;
    border-radius: 4px;
    margin-top: 15px;
    height: 50px;
    input {
      width: 80%;
      height: 100%;
    }
  }
  > .code {
    background: #f7f7f7;
    //   padding: 15px;
    border-radius: 4px;
    margin-top: 15px;
    height: 50px;
    input {
      width: 80%;
      height: 100%;
    }
  }
  > .password {
    background: #f7f7f7;
    //   padding: 15px;
    border-radius: 4px;
    margin-top: 15px;
    height: 50px;
    input {
      width: 80%;
      height: 100%;
    }
  }
  > .password1 {
    background: #f7f7f7;
    //   padding: 15px;
    border-radius: 4px;
    margin-top: 15px;
    height: 50px;
    input {
      width: 80%;
      height: 100%;
    }
  }

  > .sumbit {
    margin-top: 40px;
    button {
      width: 100%;
      border-radius: 4px;
      padding: 15px;
    }
  }
  > p:last-child {
    margin-top: 30px;
    text-align: center;
    font-size: 18px;
    color: #1ab394;
    padding: 8px 20px;
    border: 1px #1ab394 solid;
    border-radius: 4px;
    > a {
      color: #1ab394;
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
