# Console Blackjack Game

로컬서버로 구동되는 1인용 콘솔 블랙잭 게임이다.

![playing_blackjack](https://user-images.githubusercontent.com/26920620/59201338-29f92700-8bd5-11e9-860b-352a968b15e8.gif)

## 플레이방법

1. 'blessed'가 설치되어있어야 한다.

   ```
   $ npm install blessed
   ```

2. 서버를 먼저 구동해 주도록 한다.

   ```
   $ nodejs server_main.js
   or 
   $ node server_main.js
   ```

3. 클라이언트를 구동해준다

   ```
   $ nodejs main.js
   or
   $ node main.js
   ```

4. 회원가입을 한다. (한글, 특수문자는 사용 불가)

   ![main_menu](https://user-images.githubusercontent.com/26920620/59214025-2d021080-8bf1-11e9-8a74-8d23da381ceb.png)

5. 게임시작! 베팅을 한다. 방향키로 이동, 엔터로 선택 or 1~6 숫자 눌러도 선택 가능. Bet 선택시 베팅!

   ![bet](https://user-images.githubusercontent.com/26920620/59214182-836f4f00-8bf1-11e9-9051-7171a2b900da.png)

6. 자동으로 카드를 나눠준다. 합계를 보고 카드를 더 받을지 말지 결정한다. (hit - 한장 더 받기 stay - 받지 않기)

   ![choice_action](https://user-images.githubusercontent.com/26920620/59214275-bdd8ec00-8bf1-11e9-918c-4326db9d1518.png)

7. stay 를 선택하거나 합계가 21이 넘어가면 딜러의 카드를 공개하고 결과를 보여준다. 게임을 더할지 그만할지 결정한다.

   ![show_result](https://user-images.githubusercontent.com/26920620/59214540-363fad00-8bf2-11e9-99e0-80b17ac7d9ec.png)

8. 파산상태에서 게임을 시작하면 메세지와 함께 돈을 더 충전할지 여부를 결정할 수 있다.

   ![be_broken](https://user-images.githubusercontent.com/26920620/59214660-7dc63900-8bf2-11e9-80d2-f5cbaad105ea.png)

9. Exit 나 충전 받지 않기를 선택하면 게임을 종료 할 수 있다.

   ![game_over](https://user-images.githubusercontent.com/26920620/59214767-b9610300-8bf2-11e9-8d8f-3322606f592a.png)

   



## 기획 및 설계

콘솔에서 구동되는 1인용 블랙잭 게임을 구현한다.

### 주제 선정 이유

주제 선정에 가장 큰 우선순위는 나의 흥미이다. 좋아하는 것을 만들며 중간에 흥미를 잃지 않고 프로그램을 끝까지 완성하는 게 가장 큰 목적이기 때문이다.  따라서 내가 좋아하는 것 중 하나인 게임을 만들기로 했다.

수많은 게임 중 객체지향 설계를 연습하기 위해 카드게임을 택했다. 플레이어, 카드 뭉치, 카드, 베팅금 등 많은 객체를 사용할 수 있을 것이기 때문이다. 연습을 위한 것이기 때문에 카드게임 중 **비교적**  간단한 블랙잭을 택했다.



### 목적

- 나에게 재미있는걸 만들며 프로그램을 완성한다.
- 객체지향 설계를 연습한다.



### 포함할 내용

- 회원가입, 로그인 기능
- 서버와 클라이언트 간의 통신
- 멀티유저  기능
- 데이터 저장



### 구현 방법

#### 객체

속성은 보통 글씨, 기능은 두꺼운 글씨로 표현했다.

- 테이블
  - 플레이어
  - 딜러
  - 덱 (카드뭉치)
  - 베팅금
- 플레이어 
  - 이름(ID)
  - 소지금
  - 핸드(카드)
  - **베팅하기**
  - **액션(hit, stay)**
- 딜러 
  - 핸드(카드)
  - **베팅금 수거하기**
  - **상금 지급하기**
  - **액션(hit, stay)**
  - **카드 섞기(덱을)**
  - **카드 뽑기(덱에서)**
  - **카드 주기(덱에서 플레이어 or 딜러에게)**
  - **카드 가져오기(플레이어 and 딜러 핸드에서)**
- 덱(카드뭉치)
  - 카드 배열
- 카드
  - 숫자
  - 모양
- 블랙잭
  - 룰

#### 모듈

##### 모듈간 데이터 이동

![module](<https://user-images.githubusercontent.com/26920620/58724810-83fd2e00-8418-11e9-8fd3-ef9bb980b8be.png>)

##### 모듈 목록

- main
- server 
- user manager
- game

