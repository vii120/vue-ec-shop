<template>
	<div>
		<loading :active.sync="isLoading"></loading>
		<!-- breadcrumb -->
		<nav aria-label="breadcrumb">
		  <ol class="breadcrumb">
		  	<div class="container d-flex">
		  		<li class="breadcrumb-item"><router-link to="/">Weird Store</router-link></li>
			    <li class="breadcrumb-item">{{series(product.category)}}</li>
			    <li class="breadcrumb-item active" aria-current="page">{{product.title}}</li>
		  	</div>
			    
		  </ol>
		</nav>
		<!-- product -->
		<div class="container">
			<div class="row justify-content-center my-4">
				<!-- image -->
				<div class="col-md-7 order-md-2 text-center">
					<img :src="product.imageUrl" class="img-fluid shadow" alt="">
				</div>
				<!-- main text -->
				<div class="col-md-5 order-md-1 mt-4 mt-md-0">
					<h1 class="h3 mb-4">{{product.title}}</h1>
					<div class="d-flex justify-content-end">
	          <div v-if="!product.price">${{ product.origin_price }}</div>
	          <del v-if="product.price" class="mr-2">原價{{ product.origin_price | currency }}</del>
	          <div class="h5 text-danger" v-if="product.price">特價{{ product.price | currency }}</div>
	        </div>
	        <hr>
	        <div class="d-flex justify-content-around mx-4">
	        	<div class="u-pointer"><i class="far fa-thumbs-up"></i>評價</div>
	        	<div class="u-pointer"><i class="fas fa-pencil-ruler"></i>尺寸</div>
	        	<div class="u-pointer"><i class="far fa-star"></i>收藏</div>
	        </div>
	        <div class="d-flex my-4">
	        	<select name="" class="form-control mr-2" v-model="product.num">
							<option value="0" selected disabled>請選擇商品數量</option>
							<option :value="num" v-for="num in 10" :key="num">選購 {{num}} {{product.unit}}</option>
						</select>
						<button class="btn btn-primary u-pointer" @click="addtoCart(product.id,product.num)">
							<i class="fas fa-plus-circle"></i>
							加入購物車
						</button>
	        </div>
				</div>
			</div>
			<!-- description -->
			<div class="row justify-content-center mb-4">
				<div class="col-10">
					<!-- text -->
					<div class="u-desc text-center">
						<h4 class="">商品描述</h4>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis repellendus, facilis, culpa itaque atque excepturi quia, explicabo officiis odio enim provident ipsam id dolor eligendi similique minima dicta nihil voluptate.</p>
					</div>
					<!-- image -->
					<div class="text-center mb-2" v-for="url in randomUrl">
						<img :src="url" :alt="url" class="img-fluid d-block mx-auto">
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
					</div>
					<div class="text-center">
						<router-link class="btn btn-info text-white" to="/faq">購物指南</router-link>
					</div>
					<div class="text-right">
						<a class="btn btn-info text-white mt-2" href="#"  @click.prevent="beforePath()">Back</a>
					</div>
				</div>
			</div>
		</div>
			

	</div>
</template>

<script>
export default {
	data () {
		return {
			isLoading: false,
			itemId: '',
			product: {},
			randomUrl: [],
			randomImgNum: 3,
		}
	},
	methods: {
		getProduct() {
    	const vm = this;
      const url = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/product/${vm.itemId}`; 
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        vm.product = response.data.product;
        vm.product.num = 0;
     		// vm.isLoading = false;
        console.log(vm.product);
      });
    },
    series(category) {
    	switch (category) {
    		case '買了變文青': return '文青系列'; break;
    		case '不要玩食物': return '吃貨系列'; break;
    		case '有輪子的': return '輪子系列'; break;
    		default: return '全系列'; 
    	}
    },
    randomImg() {
    	const vm = this;
    	const url = 'https://picsum.photos/480/360/?random';
    	vm.isLoading = true;
    	for (let i=0; i<vm.randomImgNum; i++) {
    		this.$http.get(url).then((response) => {
    			// vm.randomUrl[i] = response.request.responseURL;  //無法雙向綁定
    			vm.$set(vm.randomUrl, i, response.request.responseURL);
    			vm.isLoading = false;
	    	})
    	}
    },
    addtoCart(id, qty = 1){
    	if (qty==0){
    		alert("請選擇商品數量");
    	} else {
    		const vm = this;
	      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart`; 
	      const cart = {
	      	product_id: id,
	      	qty
	      }
	      this.$http.post(api, {data: cart}).then((response) => {
	        // console.log(response);
	        vm.getCart();
	      });
	      alert("已加入購物車！");
    	}
    },
    getCart(){
    	const vm = this;
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart`; 
      this.$http.get(api).then((response) => {
      	vm.cart = response.data.data; 
        console.log(response);
      });
      this.$emit( 'inCart');
    },
    beforePath() {
			this.$router.back();
		},
	},
	created() {
		this.itemId = this.$route.params.itemId;
		// console.log(this.$route.params)
		this.getProduct();
		this.randomImg();
		document.body.scrollTop = 350;
    document.documentElement.scrollTop = 350;
	}
}
</script>

<style>
.u-pointer{
	cursor:pointer;
}
.u-pointer:active{
	position:relative;
	top:1px;
	left:1px;
}
.u-desc{
	padding-top:16px;
}
.u-desc p{
	line-height:24px;
}
</style>