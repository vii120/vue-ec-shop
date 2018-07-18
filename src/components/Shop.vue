<template>
	<div>
		<!-- thumbnail -->
		<div class="row justify-content-center u-over-hidden">
			<div class="u-thumb-bg"></div>
			<div class="col-md-7 col-sm-9 mx-auto">
				<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
				  <ol class="carousel-indicators">
				    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
				    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
				    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
				  </ol>
				  <div class="carousel-inner">
				    <div class="carousel-item active">
				      <img class="d-block w-100" src="static/image/pexels-photo-209600.jpeg" alt="First slide">
				    </div>
				    <div class="carousel-item">
				      <img class="d-block w-100" src="static/image/not-hear-1760750_1920.jpg" alt="Second slide">
				    </div>
				    <div class="carousel-item">
				      <img class="d-block w-100" src="static/image/justin-lim-500765-unsplash.jpg" alt="Third slide">
				    </div>
				  </div>
				  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
				    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
				    <span class="sr-only">Previous</span>
				  </a>
				  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
				    <span class="carousel-control-next-icon" aria-hidden="true"></span>
				    <span class="sr-only">Next</span>
				  </a>
				</div>
			</div>
		</div>
		<!-- product section -->
		<router-view></router-view>

	</div>
</template>

<script>
import $ from 'jquery';

export default {
	data() {
		return {
			products: [],
			filtProducts: [],
			selected: '',
		}
	},
	methods: {
		getProducts() {
      const vm = this;
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/products`;
      this.$http.get(api).then((response) => {
        vm.products = response.data.products;
        console.log(vm.products);
      });
    }
	},
	computed: {
		filtData (){
			var vm = this;
			if (vm.selected==''){
				return vm.products
			} else {
				return vm.products.filter(function(item){
					return item.category == vm.selected
				})
			}
		}
	},
	mounted() {
		this.getProducts();
	}
}
</script>

<style>
/*-----------------*/
/*thumbnail
/*-----------------*/
*{
	position:relative;
	box-sizing:border-box;
}
.u-over-hidden{
  overflow: hidden;
}
.u-thumb-bg{
	position:absolute;
	top:0;
	left:0;
	width:100%;
	height:100%;
	background: url('../../static/image/edgar-chaparro-627143-unsplash.jpg');
	background-size: cover;
	-webkit-background-size: cover;
	background-position: center;
	opacity:.9;
  filter: blur(2px);
}
</style>