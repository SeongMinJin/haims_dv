<template>
  <v-app>
    <v-app-bar
      app
      color="#ffffff"
    >
      <v-img
        contain
        max-height="40"
        max-width="40"
        src="@/assets/하임스 로고_short.png"
      >
      </v-img>
      <v-toolbar-title>
        하임스
      </v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step
            :complete="e1 > 1"
            step="1"
            color="#f0bd22"
          >
            메뉴 고르기
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
            :complete="e1 > 2"
            step="2"
            color="#f0bd22"
          >
            정보 입력하기
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3"
            color="#f0bd22"
          >
            완료

          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
              <v-list>
                <v-list-group
                  :value="true"
                >
                  <template v-slot:activator>
                    <v-list-item-title>하임스 시그니처</v-list-item-title>
                  </template>
                  <v-list-item v-for="signature in this.signature" :key="signature.name">
                    <v-container class="d-flex">
                      <v-card
                        shaped
                        max-width="200"
                        max-height="145"
                        @click="saveCurrentSignatureValue(signature.name)"
                      >
                        <v-img
                          max-width="155"
                          :src="signature.imgURL"
                          contain
                        ></v-img>
                      </v-card>
                      <v-container>
                        <v-card-text class="d-flex justify-center"> {{ signature.name }} </v-card-text>
                        <v-card-text class="d-flex justify-center"> {{ signature.price | numberWithDelimiter }}원</v-card-text>
                      </v-container>
                    </v-container>
                  </v-list-item>

                </v-list-group>
                <v-list-group
                  :value="false"
                >
                  <template v-slot:activator>
                    <v-list-item-title>커피 첨가 음료</v-list-item-title>
                  </template>
                  <v-list-item v-for="caffeine in this.caffeine" :key="caffeine.name">
                    <v-container class="d-flex">
                      <v-card
                        shaped
                        max-width="200"
                        max-height="145"
                        @click="saveCurrentCaffeineValue(caffeine.name)"
                      >
                        <v-img
                          max-width="155"
                          :src="caffeine.imgURL"
                          contain
                        ></v-img>
                      </v-card>
                      <v-container>
                        <v-card-text class="d-flex justify-center"> {{ caffeine.name }} </v-card-text>
                        <v-card-text class="d-flex justify-center"> {{ caffeine.price | numberWithDelimiter }}원</v-card-text>
                      </v-container>
                    </v-container>
                  </v-list-item>

                </v-list-group>
                <v-list-group
                  :value="false"
                >
                  <template v-slot:activator>
                    <v-list-item-title>커피 미첨가 음료</v-list-item-title>
                  </template>
                  <v-list-item v-for="non_caffeine in this.non_caffeine" :key="non_caffeine.name">
                    <v-container class="d-flex">
                      <v-card
                        shaped
                        max-width="200"
                        max-height="145"
                        @click="saveCurrentNonCaffeineValue(non_caffeine.name)"
                      >
                        <v-img
                          max-width="155"
                          :src="non_caffeine.imgURL"
                          contain
                        ></v-img>
                      </v-card>
                      <v-container>
                        <v-card-text class="d-flex justify-center"> {{ non_caffeine.name }} </v-card-text>
                        <v-card-text class="d-flex justify-center"> {{ non_caffeine.price | numberWithDelimiter }}원</v-card-text>
                      </v-container>
                    </v-container>
                  </v-list-item>

                </v-list-group>
                <v-list-group
                  :value="false"
                >
                  <template v-slot:activator>
                    <v-list-item-title>에이드</v-list-item-title>
                  </template>
                  <v-list-item v-for="ade in this.ade" :key="ade.name">
                    <v-container class="d-flex">
                      <v-card
                        shaped
                        max-width="200"
                        max-height="145"
                        @click="saveCurrentAdeValue(ade.name)"
                      >
                        <v-img
                          max-width="155"
                          :src="ade.imgURL"
                          contain
                        ></v-img>
                      </v-card>
                      <v-container>
                        <v-card-text class="d-flex justify-center"> {{ ade.name }} </v-card-text>
                        <v-card-text class="d-flex justify-center"> {{ ade.price | numberWithDelimiter }}원</v-card-text>
                      </v-container>
                    </v-container>
                  </v-list-item>

                </v-list-group>
              </v-list>
            <v-btn
              color="#f0bd22"
              @click="toSecondPage()"
              fixed
              bottom
              right
            >
              주문하기
            </v-btn>
            <v-btn
              color="#f0bd22"
              icon
              fixed
              bottom
              left
              fab
              elevation="2"
              @click="openCartList()"
            >
              <v-badge
                :value="numberOfItem"
                :content="numberOfItem"
              >
                <v-icon>
                  mdi-cart
                </v-icon>
              </v-badge>
            </v-btn>

          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card
              class="mb-12"
            >
              <v-card-title class="d-flex justify-center">배송 정보 입력</v-card-title>
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
              >
                <v-text-field
                  v-model="address"
                  placeholder="주소를 입력 해주세요."
                  :rules="addressRules"
                  required
                  class="ma-4"
                ></v-text-field>

                <v-text-field
                  v-model="phone"
                  :rules="phoneRules"
                  type="number"
                  label=""
                  placeholder="핸드폰 번호를 입력 해주세요."
                  required
                  class="ma-4"
                ></v-text-field>
                <v-text-field
                  v-model="phoneCheck"
                  :rules="phoneRules"
                  type="number"
                  label=""
                  placeholder="핸드폰 번호를 다시 한 번 입력 해주세요."
                  required
                  class="ma-4"
                ></v-text-field>
                <v-text-field
                  v-model="requestion"
                  label="추가 요청 사항을 입력 해주세요."
                  class="ma-4"
                ></v-text-field>
                <v-radio-group
                  row
                  class="ml-4"
                  v-model="payment"
                  mandatory
                >
                  <v-radio
                    label="카드"
                    value="카드"
                  ></v-radio>
                  <v-radio
                    label="현금"
                    value="현금"
                  ></v-radio>
                </v-radio-group>
              </v-form>
            </v-card>
            <v-btn
              color="#f0bd22"
              @click="openCheckMessage"
            >
              완료
            </v-btn>
            <v-dialog
              v-model="checkDialog"
              width="500"
            >
              <v-card>
                <v-card-title>입력하신 정보가 확실한가요?</v-card-title>
                <v-card-text>핸드폰 번호를 정확하게 작성 해주셔야 배송에 차질이 생기지 않습니다.</v-card-text>
                <v-divider></v-divider>

                  <v-btn
                    color="#000000"
                    text
                    @click="checkDialog = false"
                    height="50"
                  >
                    다시 확인하기
                  </v-btn>
                  <v-btn
                    color="#f0bd22"
                    text
                    @click = complete()
                    absolute
                    right
                    height="50"
                  >
                    주문하기
                  </v-btn>

              </v-card>
            </v-dialog>

            <v-btn text
              @click="e1 = 1"
            >
              뒤로가기
            </v-btn>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card
            >
              <v-card-title>주문 내용 확인</v-card-title>
              <v-divider></v-divider>
              <v-container
                v-for="list in this.cart"
                :key="list.상품명"
                class="d-flex"
              >
                <v-card-text>{{list.상품명}}</v-card-text>
                <v-card-text>{{list.수량}}</v-card-text>
                <v-card-text>{{list.가격 | numberWithDelimiter}}</v-card-text>
              </v-container>
              <v-card-title>총합 : {{this.totalPrice | numberWithDelimiter}}원</v-card-title>
              <v-card-title>결제방법 : {{this.payment}} </v-card-title>
              <v-card-text>주소 : {{this.address}}</v-card-text>
              <v-card-text>전화번호 : {{this.phone}}</v-card-text>
              <v-card-text>추가 요청사항 : {{this.requestion}}</v-card-text>
              <v-divider/>
              <v-card class="d-flex justify-center">
                <v-card-title>주문 수정 및 취소 문의</v-card-title>
                <v-btn class="mt-3" small outlined fab icon @click="openKakaoChannel()"><v-icon color="#f0bd22">mdi-chat-plus</v-icon></v-btn>
              </v-card>

            </v-card>

          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-main>
    <v-dialog
      v-model="menuDetail"
    >
      <v-card
        max-width="374"
      >
        <v-img
          :src="this.currentMenu.imgURL"
          contain
        >
          <v-btn elevation="2" color="#f0bd22" @click="menuDetail=false" icon absolute top right large><v-icon>mdi-close</v-icon></v-btn>
        </v-img>
        <v-card-title>{{this.currentMenu.name}}</v-card-title>
        <v-divider class="mx-4"></v-divider>
        <v-card-subtitle class="mt-4">{{this.currentMenu.description}}</v-card-subtitle>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn @click="plus()" icon><v-icon>mdi-plus</v-icon></v-btn>
          <v-btn @click="minus()" icon><v-icon>mdi-minus</v-icon></v-btn>
          <v-spacer/>
          <v-card-title> 수량 : {{ currentQuanity }} </v-card-title>
          <v-btn @click="addToCart()" text rounded outlined color="#f0bd22" dark>담기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="cartList"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-title>
          장바구니
          <v-spacer/>
          <v-btn @click="cartList=false" icon><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-divider/>
        <v-container v-for="list in this.cart" :key="list.상품명" class="d-flex">
          <v-card-text>{{list.상품명}}</v-card-text>
          <v-card-text>{{list.수량}}</v-card-text>
          <v-card-text>{{list.가격 | numberWithDelimiter}}</v-card-text>
          <v-btn @click="deleteList(list.상품명)" color="red" class="mt-4 ml-4" dark elevation="1" small text>삭제하기</v-btn>
        </v-container>
        <v-divider/>
        <v-card-title>총합 : {{this.totalPrice | numberWithDelimiter}} 원.</v-card-title>

        <v-divider/>
        <v-btn
          color="#f0bd22"
          @click="toNextPage()"
          fixed
          bottom
          right
        >
          주문하기
        </v-btn>
      </v-card>

    </v-dialog>
    <v-snackbar
      v-model="snackbar"
      color="red"
      :timeout="1000"
    >
    <v-icon>mdi-alert-circle-outline</v-icon>
      주소와 핸드폰 번호를 입력해주세요.
    </v-snackbar>
    <v-snackbar
      v-model="snackbar2"
      color="red"
      :timeout="1000"
    >
    <v-icon>mdi-alert-circle-outline</v-icon>
      장바구니가 비어 있습니다.
    </v-snackbar>
    <v-snackbar
      v-model="snackbar3"
      color="red"
      :timeout="1000"
    >
    <v-icon>mdi-alert-circle-outline</v-icon>
      핸드폰 번호가 일치하지 않습니다.
    </v-snackbar>
  </v-app>
</template>

<script>
import emailjs from 'emailjs-com'

export default {
  components: {
  },
  name: 'App',
  created () {
  },
  mounted () {
    this.$firebase.database().ref('하임스 시그니처').on('value', (snapshot) => {
      this.signature = snapshot.val()
    })
    this.$firebase.database().ref('커피 첨가 음료').on('value', (snapshot) => {
      this.caffeine = snapshot.val()
    })
    this.$firebase.database().ref('커피 미첨가 음료').on('value', (snapshot) => {
      this.non_caffeine = snapshot.val()
    })
    this.$firebase.database().ref('에이드').on('value', (snapshot) => {
      this.ade = snapshot.val()
    })
  },
  data: () => ({
    signature: [],
    caffeine: [],
    non_caffeine: [],
    ade: [],
    e1: 1,
    checkDialog: false,
    currentValue: '',
    currentParrentValue: '',
    menuDetail: false,
    currentMenu: [],
    currentQuanity: 0,
    cart: [],
    currentMenuName: '',
    currentMenuPrice: 0,
    numberOfItem: 0,
    cartList: false,
    totalPrice: 0,
    address: '',
    phone: '',
    phoneCheck: '',
    requestion: '',
    valid: true,
    addressRules: [
      v => !!v || '주소를 입력 해주세요!'
    ],
    phoneRules: [
      v => !!v || '( ㅡ ) 를 제외한 번호만 입력 해주세요!'
    ],
    payment: null,
    snackbar: false,
    snackbar2: false,
    snackbar3: false,
    message: ''
  }),
  methods: {
    complete () {
      for (let i = 0; i < this.cart.length; i++) {
        this.message += this.cart[i].상품명 + ' : ' + this.cart[i].수량 + ' / '
      }
      this.message += '주소 : ' + this.address + ' / ' + '휴대폰 번호 : ' + this.phone + ' / ' + '결제방법 : ' + this.payment + ' / ' + '가격 : ' + this.totalPrice + ' 원' + ' / ' + '요청사항 : ' + this.requestion
      this.checkDialog = false
      this.e1 = 3
      emailjs.send('haims', 'template_7g626yb', {
        to_name: '하임스',
        message: this.message
      },
      'user_B0jjWoF9BmzJdBQbMzjqp')
    },
    saveCurrentSignatureValue (i) {
      this.currentValue = i
      this.currentParrentValue = '하임스 시그니처'
      this.$firebase.database().ref('하임스 시그니처').child(this.currentValue).on('value', (sn) => {
        this.currentMenu = sn.val()
      })
      this.menuDetail = true
    },
    saveCurrentCaffeineValue (i) {
      this.currentValue = i
      this.currentParrentValue = '커피 첨가 음료'
      this.$firebase.database().ref('커피 첨가 음료').child(this.currentValue).on('value', (sn) => {
        this.currentMenu = sn.val()
      })
      this.menuDetail = true
    },
    saveCurrentNonCaffeineValue (i) {
      this.currentValue = i
      this.currentParrentValue = '커피 미첨가 음료'
      this.$firebase.database().ref('커피 미첨가 음료').child(this.currentValue).on('value', (sn) => {
        this.currentMenu = sn.val()
      })
      this.menuDetail = true
    },
    saveCurrentAdeValue (i) {
      this.currentValue = i
      this.currentParrentValue = '에이드'
      this.$firebase.database().ref('에이드').child(this.currentValue).on('value', (sn) => {
        this.currentMenu = sn.val()
      })
      this.menuDetail = true
    },
    addToCart () {
      this.currentMenuName = this.currentMenu.name
      this.currentMenuPrice = Number(this.currentMenu.price)
      if (this.currentQuanity === 0) {
        this.menuDetail = false
        return
      }
      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i].상품명 === this.currentMenu.name) {
          this.cart[i].가격 += Number(this.currentMenuPrice * this.currentQuanity)
          this.cart[i].수량 += Number(this.currentQuanity)
          this.menuDetail = false
          this.totalPrice += Number(this.currentMenuPrice * this.currentQuanity)
          this.currentQuanity = 0
          this.currentMenuName = ''
          this.currentMenuPrice = 0
          this.numberOfItem = this.cart.length
          return
        }
      }

      this.cart.push({ 상품명: this.currentMenuName, 수량: this.currentQuanity, 가격: this.currentQuanity * this.currentMenuPrice })
      this.totalPrice += Number(this.currentQuanity * this.currentMenuPrice)
      this.menuDetail = false
      this.currentQuanity = 0
      this.currentMenuName = ''
      this.currentMenuPrice = 0
      this.numberOfItem = this.cart.length
    },
    plus () {
      this.currentQuanity += 1
    },
    minus () {
      this.currentQuanity -= 1
      if (this.currentQuanity < 0) {
        this.currentQuanity = 0
      }
    },
    openCartList () {
      this.cartList = true
    },
    toNextPage () {
      if (this.cart.length === 0) {
        this.snackbar2 = true
        return
      }
      this.e1 = 2
      this.cartList = false
    },
    deleteList (name) {
      for (let i = 0; i < this.cart.length; i++) {
        if (name === this.cart[i].상품명) {
          this.totalPrice = Number(this.totalPrice) - Number(this.cart[i].가격)
          this.cart.splice(i, 1)
        }
      }
      this.numberOfItem = this.cart.length
    },
    validate () {
      this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    openCheckMessage () {
      if (this.phone !== this.phoneCheck) {
        this.snackbar3 = true
        return
      }
      if (this.address === '' || this.phone === '') {
        this.snackbar = true
        return
      }
      this.checkDialog = true
    },
    toSecondPage () {
      if (this.cart.length === 0) {
        this.snackbar2 = true
        return
      }
      this.e1 = 2
    },
    openKakaoChannel () {
      window.open('http://pf.kakao.com/_fxdrgK/chat', '_blank')
    }
  },
  filters: {
    numberWithDelimiter: function (value) {
      if (!value) {
        return '0'
      }
      return value.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,')
    }
  }
}
</script>
