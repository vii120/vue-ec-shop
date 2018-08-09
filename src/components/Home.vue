<template>
	<div class="wrapper">
    <loading :active.sync="isLoading"></loading>
		<!-- nav bar -->
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
		  <router-link class="nav-item nav-link store-name" to="/">Weird Store</router-link>
		  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
		    <span class="navbar-toggler-icon"></span>
		  </button>
		  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
		    <div class="navbar-nav ml-4">
		    	<div @click="hideMenu()">
		    		<router-link class="nav-item nav-link mr-2" to="/">Home</router-link>
		    	</div>
		    	<div @click="hideMenu()">
		    		<router-link class="nav-item nav-link mr-2" to="/faq">FAQ</router-link>
		    	</div>
		    	<div @click="hideMenu()">
		    		<router-link class="nav-item nav-link mr-2 text-primary" to="/game">Coupon!</router-link>
		    	</div>
		    </div>
		  </div>
		</nav>
		<!-- cart icon -->
		<div class="cart-sm">
			<div class="cart-icon" @click="isShow=!isShow">
			  	<i class="fas fa-shopping-cart"></i>
			  	<i class="fas fa-circle" v-if="cart.carts.length!==0"></i>
			</div>
			<div class="cart-box" v-if="isShow">
			 <div class="row justify-content-center bg-light border rounded py-3">
					<div class="col-md-12">
						<div class="h5"><b>購物車清單</b></div>
						<div class="u-close" @click="isShow=false">
							<span></span>
							<span></span>
						</div>
						<table class="table table-sm my-0">
						  <tbody>
						  	<tr v-if="cart.carts.length==0">購物車還沒有東西哦！</tr>
						    <tr v-for="(item, key) in cart.carts" :key="key">
						      <td>
						        <button type="button" class="btn bg-transparent btn-sm d-none d-md-block" @click="removeCart(item.id)">
						          <i class="far fa-trash-alt"></i>
						        </button>
						      </td>
						      <td class="text-info u-cart-title">{{ item.product.title }}</td>
						      <td>{{ item.qty }}{{ item.product.unit }}</td>
						      <td class="text-right">{{ item.final_total | currency }}</td>
						    </tr>
						  </tbody>
						</table>
						<!-- button -->
						<router-link class="nav-item text-white" to="/createOrder" v-if="cart.carts.length!==0">
							<button type="button" class="btn btn-danger d-block mx-auto w-100" 
							@click="isShow=!isShow">結帳去</button>
						</router-link>
						<button type="button" class="btn btn-danger d-block text-white mx-auto w-100 mt-2" 
						v-if="cart.carts.length==0" @click="isShow=!isShow">繼續購物</button>
					</div>
				</div>
			</div>
		</div>

		<!-- shop -->
		<router-view></router-view>

		<!-- footer -->
		<footer class="bg-light py-4 text-center">
			<div class="container">
		  <router-link class="nav-item nav-link store-name" to="/">Weird Store</router-link>
		  <div class="h5 text-dark"># Life is too short to be normal. Stay Weird.</div>
		  <div class="social-bar my-4">
		  	<a href="#" class="nav-item text-dark"><i class="fab fa-facebook-square"></i></a>
		  	<a href="#" class="nav-item text-dark"><i class="fab fa-instagram"></i></a>
		  	<a href="#" class="nav-item text-dark"><i class="fab fa-google-plus-square"></i></a>
		  	<a href="#" class="nav-item text-dark"><i class="fab fa-twitter-square"></i></a>
		  </div>
		  <div>ⓒ 2018 vue ec shop by Vivi Tseng</div>
			</div>
		</footer>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import $ from 'jquery';
export default {
	data () {
		return {
			isShow: false,
		}
	},
	methods: {
		hideMenu(){
			$('#navbarNavAltMarkup').collapse('hide');
		},
    ...mapActions(['getCart']),
    removeCart(id) {
      this.$store.dispatch('removeCart', id);
    }
  },
  computed: {
    ...mapGetters(['cart', 'isLoading'])
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
  background-clip: text;
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
	text-shadow: 2px 2px 5px rgba(256,256,256,0.8);
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
@media (max-width:768px){
	.u-cart-title{
		max-width:150px;
		overflow:hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.cart-box{
		right: 8px;
	}
}
.u-close{
	position: absolute;
	top:-5px;
	right:5px;
	width:30px;
	height:30px;
	cursor:pointer;
}
.u-close span{
	position:absolute;
	top:50%;
	left:50%;
	width:24px;
	height:2px;
	background-color: lightgrey;
}
.u-close span:first-child{
	transform: translate(-50%, -50%) rotate(45deg);
}
.u-close span:last-child{
	transform: translate(-50%, -50%) rotate(-45deg);
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