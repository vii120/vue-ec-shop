<template>
	<div class="u-game-bg">
		<div class="container">
			<loading :active.sync="isLoading"></loading>
			<div class="row justify-content-center">
				<div class="col-md-7 text-center">
					<div class="box my-4 py-4">
						<h2>Let's play a weird game!</h2>
						<img class="img-fluid" src="static/image/pin-map.jpg">
						<div class="desc">
							Weird Store的員工眾多且來自世界各地，<br>
							只要在<span class="text-danger"><b>三次機會內</b></span>猜對了他們的年齡，<br>
							他們就會提供你一個折扣代碼哦！<br>
						</div>
						<button class="btn btn-primary d-block mx-auto my-2 btn-lg" @click="getPerson()" v-if="isShow">給我折扣！</button>
						<!-- guess -->
						<div v-if="!isShow">
							<!-- person card -->
							<div class="card text-white bg-warning shadow d-block mx-auto my-2 text-center" style="max-width: 18rem;">
							  <div class="card-header h4"><b>Guess {{isHe}} age!</b></div>
							  <div class="card-body">
							    <h5 class="card-title">
							    	來自{{person.region}}的<b>{{person.name}}</b></h5>
							    <img class="card-img-top" :src="person.photo" alt="image">
							  </div>
							</div>
							<div v-if="times!==0">
								<span v-if="times!==3">
									<span v-if="isHigh">太高了，</span>
									<span v-else>太低了，</span>
								</span>
								還有{{times}}次機會！
								<div>不專業小提示：很可能介於{{Math.floor(person.age/10)*10}}到{{(Math.floor(person.age/10)+1)*10}}之間！</div>
								<form @submit.prevent="guessing()">
									<input type="number" class="text-center rounded border mt-1" placeholder="start guess!" v-model.number="ageGuess">
									<button class="btn btn-warning d-block mx-auto my-2">Guess</button>
								</form>
							</div>
						</div>
							
						<!-- success -->
						<div class="desc" v-if="success">
							恭喜你猜中了！是{{person.age}}歲沒錯！<br>
							{{person.name}}想給你的折扣代碼是
							<code class="border rounded bg-light px-2 py-1"><b>{{getCoupon.code}}</b></code><br>
							<i>﹝折扣名稱：<b>{{getCoupon.name}}</b>，{{100-getCoupon.discount}}% off﹞</i>
							<br>
							想必這也是一種緣份~~~不如就當交個朋友吧！<br>
							<span v-if="isHe=='his'">他</span><span v-else>她</span>的電話是{{person.phone}}，e-mail是{{person.email}}
							<div>
								<router-link class="btn btn-success text-white mt-1" to="/">
									馬上買個小禮物送給<span v-if="isHe=='his'">他</span><span v-else>她</span>！
								</router-link>
							</div>
						</div>
						<!-- failed -->
						<div class="desc" v-else-if="times==0">
							太可惜了~~~<span v-if="isHe=='his'">他</span><span v-else>她</span>的年齡是{{person.age}}歲！<br>
							但我們還是準備了另一個折扣代碼給認真玩遊戲的你！<br>
							結帳時輸入<code class="border rounded bg-light px-2 py-1"><b>forever95</b></code>就可以享有<b>95折</b>優惠哦！
							<div>
								<router-link class="btn btn-success text-white mt-1" to="/">太棒了！馬上買東西去！</router-link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
		
</template>

<script>
import $ from 'jquery';
export default {
	data() {
		return {
			isLoading: false,
			person: {
				name: ''
			},
			isHe: '',
			isShow: true,
			success: false,
			ageGuess: '',
			isHigh: false,
			times: 3,
			coupons: [
				{name: '我~~~我愛夏天~~~', code: 'summer520', discount: 90},
				{name: '今日不買更待何時', code: 'buynow', discount: 90},
				{name: '我有一個小折扣我從來也不說', code: 'neversay', discount: 85},
				{name: '月底限定！拯救荷包大作戰	', code: 'savemoney', discount: 80},
				{name: '被同業討厭的勇氣', code: 'courage', discount: 75},
			]
		}
	},
	methods: {
		getPerson() {
			const vm = this;
			const api = 'https://uinames.com/api/?ext';
			vm.isLoading = true;
			this.$http.get(api).then((response)=>{
				vm.person = response.data;
				(vm.person.gender == 'male') ? vm.isHe = 'his' : vm.isHe = 'her'; 
				vm.isLoading = false;
				// console.log(response.data)
			});
			vm.isShow = false;
		},
		guessing() {
			const vm = this;
			if (vm.times!==0) {
				if (vm.ageGuess == vm.person.age) {
					vm.success = true;
					vm.times = 0;
				} else if (vm.ageGuess > vm.person.age){
					vm.isHigh = true;
					vm.times -= 1;
				} else {
					vm.isHigh = false;
					vm.times -= 1;
				}
			}
		},
	},
	computed: {
		getCoupon() {
			const vm = this;
			if (vm.success) {
				let num = Math.round(Math.random()*100)%(vm.coupons.length);
				let randomCoupon = vm.coupons[num];
				return randomCoupon;
			}
		}
	}
}
</script>

<style>
.box{
	line-height:28px;
	box-shadow: 5px 5px 12px rgba(0,0,0,0.6);
	background-color: rgba(256,256,256,0.9);
	border-radius: 20px
}
.u-game-bg{
	background: url('../../static/image/world-map.jpg');
	background-size: cover;
	-webkit-background-size: cover;
	background-position: center;
	/*opacity:.5;*/
}
.u-game-bg:before{
	content: "";
	width:100%;
	height:100%;
	position:absolute;
	top:0;
	left:0;
	background-color: rgba(256,256,256,0.5);
}
</style>