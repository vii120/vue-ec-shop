<template>
	<div class="wrapper">
		<!-- nav bar -->
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
		  <router-link class="store-name" to="/">Weird Store</router-link>
		  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
		    <span class="navbar-toggler-icon"></span>
		  </button>
		  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
		    <div class="navbar-nav ml-4">
		    	<router-link class="nav-item nav-link mr-2" to="/">Home</router-link>
		    	<router-link class="nav-item nav-link mr-2" to="/faq">FAQ</router-link>
		    	<router-link class="nav-item nav-link mr-2 text-primary" to="/game"><b>Coupon!</b></router-link>
		    </div>
		  </div>
		</nav>
		<div class="cart-sm">
			<div class="cart-icon" @click="isShow=!isShow">
			  	<i class="fas fa-shopping-cart"></i>
			  	<i class="fas fa-circle" v-if="cartNum!==0"></i>
			</div>
			<div class="cart-box" v-if="isShow">
			 <div class="row justify-content-center bg-light border rounded py-3">
					<div class="col-md-12">
						<div class="h5"><b>購物車清單</b></div>
						<table class="table table-sm my-0">
						  <tbody>
						  	<tr v-if="cartNum==0">購物車還沒有東西哦！</tr>
						    <tr v-for="item in cart.carts">
						      <td>
						        <button type="button" class="btn bg-transparent btn-sm" @click="removeCart(item.id)">
						          <i class="far fa-trash-alt"></i>
						        </button>
						      </td>
						      <td class="text-info">{{ item.product.title }}</td>
						      <td>{{ item.qty }}{{ item.product.unit }}</td>
						      <td class="text-right">{{ item.final_total | currency }}</td>
						    </tr>
						  </tbody>
						</table>
						<!-- button -->
						<router-link class="nav-item text-white" to="/createOrder" v-if="cartNum!==0">
							<button type="button" class="btn btn-danger d-block mx-auto w-100" 
							@click="isShow=!isShow">結帳去</button>
						</router-link>
						<button type="button" class="btn btn-danger d-block text-white mx-auto w-100 mt-2" 
						v-if="cartNum==0" @click="isShow=!isShow">繼續購物</button>
					</div>
				</div>
			</div>
		</div>
			
		<!-- shop -->
		<router-view></router-view>

		<!-- footer -->
		<footer class="bg-light py-4 text-center">
			<div class="container">
		  <router-link class="store-name" to="/">Weird Store</router-link>
		  <div class="h5">#BeingWeird</div>
		  <div class="social-bar my-4">
		  	<a href="#" class="nav-item text-dark"><i class="fab fa-facebook-square"></i></a>
		  	<a href="#" class="nav-item text-dark"><i class="fab fa-instagram"></i></a>
		  	<a href="#" class="nav-item text-dark"><i class="fab fa-google-plus-square"></i></a>
		  	<a href="#" class="nav-item text-dark"><i class="fab fa-twitter-square"></i></a>
		  </div>
		  <div>ⓒ 2018 vue EC shop by Vivi Tseng</div>
			</div>
		</footer>
	</div>
</template>

<script>
export default {
	data () {
		return {
			cart: {
				carts: [],
			},
			isShow: false,
			cartW: '',
			cartH: '',
		}
	},
	methods: {
		getCart(){
    	const vm = this;
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart`; 
      this.$http.get(api).then((response) => {
      	vm.cart = response.data.data;
        // console.log(response);
      });
    },
    removeCart(id) {
      const vm = this;
			let url = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart/${id}`;
			this.$http.delete(url).then((response) => {
				vm.getCart();
				// console.log(response);
			});
    },
	},
	computed: {
		cartNum() {
    	const vm = this;
    	vm.getCart();
      return vm.cart.carts.length;
    },
	},
	created() {
		this.getCart();
	},
}
</script>

<style>
/*-----------------*/
/*global
/*-----------------*/
*{
	position:relative;
	box-sizing:border-box;
}
body{
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "sans-serif", "Apple Color Emoji", 
	"Segoe UI Emoji", "Segoe UI Symbol", \5FAE\8EDF\6B63\9ED1\9AD4;
}
.wrapper{
	overflow:hidden;
}
/*-----------------*/
/*store name
/*-----------------*/
.store-name{
	display:inline-block;
	text-decoration: none;
  font-family: 'Knewave', cursive;
  font-size: 36px;
  padding: 5px 10px;
  background: -webkit-linear-gradient(45deg, #3A1C71, #D76D77, #FFAF7B);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
@media (max-width:768px){
	.store-name{font-size: 24px}
}
/*-----------------*/
/*cart
/*-----------------*/
.cart-sm{
	position:fixed;
	bottom:15px;
	right:15px;
	z-index:500;
}
.cart-icon{
	position:absolute;
	bottom:0;
	right:0;
	cursor:pointer;
}
.fa-shopping-cart{
	font-size: 36px;
	color:#000;
}
.fa-circle{
	position:absolute;
	top:-5px;
	right:-5px;
	color:red;
}
.cart-box{
	position: relative;
	bottom:50px;
	right:50px;
}
/*-----------------*/
/*footer: social bar
/*-----------------*/
.social-bar{
	font-size:24px;
}
.social-bar i{
	margin:0 3px;
	cursor: pointer;
}
</style>