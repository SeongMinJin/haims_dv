# haims_db
경주에서 카페를 운영하는 친구가 있었다.
개인 카페치고, 커피 가격이 워낙 저렴했었다.
문제는 배달도 하고싶어했는데, 배달의 민족을 사용하기에는, 커피값보다 배달비가 더 비싸서
사람들이 주문을 아예 하지도 않을 것 같고, 현실적으로 배달의 민족으로는
배달 서비스를 제공하기가 힘들다고 했다.

사실 매장에 손님이 많지 않았던 터라, 배달은 본인이 직접 다녀도 될 것 같다고 했고
배달비도 안 받아도 된다고 했다.

그래서 최대한 여기에 맞춰서 개인 주문 사이트를 만들어보았다.
컴퓨터와는 게임 말고는 인연이 없었는데, 문득 프로그래밍을 배워보고 싶어서
Vue.js 와, firebase로 유튜브 보면서 따라만들었고
조금 복잡한 결제 시스템은 현장 카드결제, 현금결제 선택으로 대처했다.

도메인 네임은 필요가 없었던 것이, QR코드를 만들어서 뿌리면되었기 때문이다.

거의 2개월? 동안 서비스를 했었는데,
해당 주문 웹페이지만으로 매출이 100만원은 넘게 나왔던 것 같다..

서비스를 중단한 큰 원인은, 본인이 직접 배달을 다니느 것이 현실적으로 많이 힘들었고,
손익비가 맞지 않아서 어쩔 수 없이 중단했다.


나름 좋은 경험이었다.

모바일로 접속하는 경우만 생각해서, 데스크탑으로 접속하면 인터페이스가 구리긴 구리다...
그리고 메뉴 사진도 직접 다 찍긴 했는데.. 지금 다시 보니까 엄청 촌스럽다...ㅋㅋ
<img width="192" alt="image" src="https://user-images.githubusercontent.com/73181329/207280768-e0e66b6c-a4b5-4b49-a7e0-cafafc95ec54.png">



---
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
