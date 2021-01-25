<template>
  <div class="bje">
    <div>
      <van-nav-bar :title="$t('m.Balance.withdrawal1')"
                   left-text
                   left-arrow
                   @click-left="onClickLeft" />
    </div>
    <div class="f-flex f-jc-sb with-m">
      <span>{{$t('m.Balance.withdrawal2')}}：INR {{money}}</span>
      <a href="#"
         @click="alltx">{{$t('m.Balance.withdrawal3')}}</a>
    </div>
    <div class="with-num p20">
      <p style="color: #999999">{{$t('m.Balance.withdrawal4')}}</p>
      <p class="f-flex">
        <span>INR</span>
        <input type="number"
               v-model="amount.withdraw_money" />
      </p>
    </div>
    <div class="with-type">
      <p>{{$t('m.Balance.withdrawal5')}}</p>
      <!-- <p class="f-flex f-jc-sb">
            <span><img src="../../assets/zfb.png" alt="">提现到支付宝</span>
             <el-radio v-model="radio" label="1"></el-radio>
        </p> -->
      <p class="f-flex f-jc-sb">
        <span v-if="amount.type == 4"><img src="../../assets/bank.png"
               alt="" />{{$t('m.Balance.withdrawal6')}}</span>
        <span v-else><img src="../../assets/bank.png"
               alt="" />{{$t('m.Balance.withdrawal25')}}</span>
        <el-radio v-model="radio" label="2" style="margin-top: 5px;"></el-radio>
      </p>
      <p>
        <van-field v-model="amount.username"
                   :placeholder="amount.type == 4 ? $t('m.Balance.withdrawal7') : $t('m.Balance.withdrawal26')"
                   :label="pay_type == 'zf77' ? $t('m.Balance.withdrawal40') : $t('m.Balance.withdrawal8')" />
      </p>
      <p v-if="amount.type == 3 && pay_type != 'loanmanager' && pay_type != 'zf77'">
        <van-field maxlength="11"
                   v-model="amount.tel"
                   :placeholder="$t('m.Balance.withdrawal9')"
                   :label="$t('m.Balance.withdrawal10')" />
      </p>
      <p v-if="amount.type == 3 && pay_type != 'loanmanager' && pay_type != 'shineupay' && pay_type != 'zf77'">
        <van-field v-model="amount.bank_name"
                   :placeholder="$t('m.Balance.withdrawal11')"
                   :label="$t('m.Balance.withdrawal12')" />
      </p>
      <p v-if="amount.type == 3 && pay_type != 'loanmanager' && pay_type != 'shineupay' && pay_type != 'zf77'">
        <van-field v-model="amount.bank_card"
                   :placeholder="$t('m.Balance.withdrawal13')"
                   :label="$t('m.Balance.withdrawal14')" />
      </p>
      <p v-if="amount.type == 3">
        <van-field maxlength="11"
                   v-model="amount.ifsc"
                   :placeholder="$t('m.Balance.withdrawal28')"
                   :label="$t('m.Balance.withdrawal27')" />
      </p>
      <p v-if="amount.type == 3 && pay_type != 'shineupay'">
        <van-field v-model="amount.accno"
                   :placeholder="$t('m.Balance.withdrawal15')"
                   :label="$t('m.Balance.withdrawal16')" />
      </p>
      <!-- loanmanager     @click="openChangeBankcode" -->
      <p v-if="pay_type == 'loanmanager'">
        <van-field v-model="amount.bank_code"
                   :placeholder="$t('m.Balance.withdrawal30')"
                   :label="$t('m.Balance.withdrawal29')" />
      </p>
      <!--  -->
      <p v-if="pay_type == 'shineupay'">
        <van-field maxlength="30"
                   v-model="amount.email"
                   :placeholder="$t('m.Balance.withdrawal35')"
                   :label="$t('m.Balance.withdrawal38')" />
      </p>
      <p v-if="pay_type == 'shineupay'">
        <van-field maxlength="30"
                   v-model="amount.address"
                   :placeholder="$t('m.Balance.withdrawal36')"
                   :label="$t('m.Balance.withdrawal39')" />
      </p>
      <p v-if="pay_type == 'shineupay'">
        <van-field maxlength="30"
                   v-model="amount.bankCode"
                   :placeholder="$t('m.Balance.withdrawal23')"
                   :label="$t('m.Balance.withdrawal99')" />
      </p>

      <!--  -->
      
      <!-- <van-popup v-model="changeBankcode"
                position="bottom">
      <van-picker show-toolbar
                  :columns="bankCodes"
                  @cancel="changeBankcode = false"
                  @confirm="onChangeBankcode"
                  :confirm-button-text="$t('m.Personal.Center23')"
                  :cancel-button-text="$t('m.Personal.Center24')" />
    </van-popup> -->
      
    </div>
    <div class="with-btn">
      <el-button type="primary"
                 @click="withdrae(amount.type)">{{$t('m.Balance.withdrawal17')}}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      radio: "2",
      money: this.$route.query.money,
      amount: {
        username: "",
        bank_card: "",
        accno: "",
        bank_name: "",
        tel: "",
        withdraw_money: "",
        type: 0,
        ifsc: '',
        bank_code:'',
      },
      pay_type :'',
      minmoney:'',
      maxmoney:'',
      // changeBankcode:false,
      bankCodes: [
        { text: 'KBANK', value: 'KBANK' },
        { text: 'BBL', value: 'BBL' },
        { text: 'BAAC', value: 'BAAC' },
        { text: 'BOA', value: 'BOA' },
        { text: 'BAY', value: 'BAY' },
        { text: 'BOC', value: 'BOC' },
        { text: 'BNPP', value: 'BNPP' },
        { text: 'CIMB', value: 'CIMB' },
        { text: 'CITI', value: 'CITI' },
        { text: 'DB', value: 'DB' },
        { text: 'GHB', value: 'GHB' },
        { text: 'ICBC', value: 'ICBC' },
        { text: 'TIBT', value: 'TIBT' },
        { text: 'CHAS', value: 'CHAS' },
        { text: 'KKB', value: 'KKB' },
        { text: 'KTB', value: 'KTB' },
        { text: 'LHBA', value: 'LHBA' },
        { text: 'MEGA', value: 'MEGA' },
        { text: 'MHCB', value: 'MHCB' },
        { text: 'SCBT', value: 'SCBT' },
        { text: 'SMTB', value: 'SMTB' },
        { text: 'TBNK', value: 'TBNK' },
        { text: 'GSB', value: 'GSB' },
        { text: 'HSBC', value: 'HSBC' },
        { text: 'SCB', value: 'SCB' },
        { text: 'SMBC', value: 'SMBC' },
        { text: 'TCRB', value: 'TCRB' },
        { text: 'TISCO', value: 'TISCO' },
        { text: 'TMB', value: 'TMB' },
        { text: 'UOB', value: 'UOB' },
      ],
    };
  },
  created () {
    let islog = localStorage.getItem('amount') || false;
    if (islog != false) {
      this.amount = JSON.parse(islog)
    }
    this.logo()
  },
  methods: {
    // 打开选择
    // openChangeBankcode () {
    //   this.changeBankcode = true;
    // },
    // // 选择银行编码
    // onChangeBankcode (e) {
    //   this.amount.bank_code = e.value;
    //   this.changeBankcode = false
    // },
    onClickLeft () {
      this.$router.go(-1);
    },
    logo () {
      this.$api.Post('logo').then(res => {
        this.amount.type = res.result.type
        this.pay_type =  res.result.pay_type
        // this.pay_type = 'loanmanager'
        this.maxmoney = Number(res.result.maxmoneywithdrawal)
        this.minmoney = Number(res.result.minmoneywithdrawal)
      })
    },
    //提现
    withdrae (type) {
      if (this.amount.username == "") {
        this.$toast(this.$t('m.Balance.withdrawal19'));
        return;
      }
      if (this.amount.withdraw_money == "") {
            this.$toast(this.$t('m.Balance.withdrawal18'));
            return;
      }
      if (Number(this.amount.withdraw_money) < this.minmoney) {
        this.$toast(this.$t('m.Balance.withdrawal34') + this.minmoney)
        return
      }
      
      if (Number(this.amount.withdraw_money) > this.maxmoney) {
        this.$toast(this.$t('m.Balance.withdrawal35') + this.maxmoney)
        return
      }
      if (type == 3) {
        if(this.pay_type == 'loanmanager'){
          if (this.amount.accno == "") {
            this.$toast(this.$t('m.Balance.withdrawal13'));
            return;
          }
          if (this.amount.bank_code == "") {
            this.$toast(this.$t('m.Balance.withdrawal30'));
            return;
          }
          if (this.amount.ifsc == "") {
            this.$toast(this.$t('m.Balance.withdrawal28'));
            return;
          }
        }
         // shineupay
        else if(this.pay_type == 'shineupay'){
          if (this.amount.tel == "") {
            this.$toast(this.$t('m.Balance.withdrawal20'));
            return;
          }
          if (this.amount.ifsc == "") {
            this.$toast(this.$t('m.Balance.withdrawal28'));
            return;
          }
          if (this.amount.email == "") {
            this.$toast(this.$t('m.Balance.withdrawal35'));
            return;
          }
          if (this.amount.address == "") {
            this.$toast(this.$t('m.Balance.withdrawal36'));
            return;
          }
          if (this.amount.bankCode == "") {
            this.$toast(this.$t('m.Balance.withdrawal23'));
            return;
          }
        }
         // zf77
        else if(this.pay_type == 'zf77'){
          if (this.amount.ifsc == "") {
            this.$toast(this.$t('m.Balance.withdrawal28'));
            return;
          }
          if (this.amount.accno == "") {
            this.$toast(this.$t('m.Balance.withdrawal13'));
            return;
          }
        }
        // 
        else{
          if (this.amount.tel == "") {
            this.$toast(this.$t('m.Balance.withdrawal20'));
            return;
          }
          if (this.amount.ifsc == "") {
            this.$toast(this.$t('m.Balance.withdrawal28'));
            return;
          }
          if (this.amount.bank_name == "") {
            this.$toast(this.$t('m.Balance.withdrawal22'));
            return;
          }
          if (this.amount.bank_card == "") {
            this.$toast(this.$t('m.Balance.withdrawal23'));
            return;
          }
          if (this.amount.accno == "") {
            this.$toast(this.$t('m.Balance.withdrawal23'));
            return;
          }
        }
      }
      this.$api.Post("submit_withdraw", this.amount).then(res => {
        this.$toast(res.result.message);
        if (res.status == 1) {
          this.amount.withdraw_money = '';
          this.amount.type = 0;
          localStorage.setItem('amount', JSON.stringify(this.amount))
          this.$router.go(-1);
        }
      });
    },
    //全部提现
    alltx () {
      this.amount.withdraw_money = this.money
    }
  }
};
</script>

<style lang="less">
.with-m {
  background: #ffffff;
  padding: 15px;
  font-size: 14px;
  span {
    line-height: 2.3;
  }
  a {
    font-size: 12px;
    color: #ffffff;
    display: inline-block;
    padding: 8px 12px;
    background: #5d70bd;
    border-radius: 5px;
  }
}
.with-num {
  background-color: #f8f8f8;
  padding-top: 10px !important;
  padding-bottom: 10px !important;
  > p:nth-child(2) {
    margin-top: 10px;
    color: #1a73e7;
    span {
      font-weight: 700;
      font-size: 28px;
      margin-right: 10px;
    }
    input {
      font-size: 28px;
      font-weight: 700;
      width: 80%;
    }
  }
}
.division {
  padding: 10px;
}
.with-type {
  > p {
    padding: 10px 20px;
    border-bottom: 1px solid #eeeeee;
  }
  img {
    width: 30px;
    margin-right: 10px;
  }
  .van-field__body input{
    hight:36px;
    line-height: 36px;
    background: #e8e9ed;
    border-radius: 5px;
    padding: 0 8px;
  }
}
.bje .el-radio__label {
  opacity: 0;
}
.bje .el-radio__inner {
  width: 20px !important;
  height: 20px !important;
}
.bje .el-radio__inner::after {
  width: 8px !important;
  height: 8px !important;
}
.bje .van-cell {
  padding: 0 !important;
  background: none;
  font-size: 14px !important;
  line-height: 36px;
  vertical-align: middle;
}
.with-btn {
  padding: 20px;
  button {
    width: 100%;
  }
}
</style>
