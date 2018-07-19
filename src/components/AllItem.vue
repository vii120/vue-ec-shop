<template>
	<!-- product list -->
	<div class="container">
		<loading :active.sync="isLoading"></loading>
		<div class="row justify-content-center">
			<div class="col-12">
				<!-- quote -->
				<div class="quote text-center my-4">
					<i class="fas fa-quote-left mb-3 mb-md-0"></i>
					<span>It's not weird to be weird, it's weird not to be weird.</span>
				</div>
				<!-- category bar -->
				<ul class="nav nav-tabs w-100">
				  <li class="nav-item">
				    <a class="nav-link" href="#" :class="{'active': selected==''}"
				    @click.prevent="selected=''; getProducts(1)">全部商品</a>
				  </li>
				  <li class="nav-item">
				    <a class="nav-link" href="#" :class="{'active': selected=='文青'}"
				    @click.prevent="selected='文青'; getProducts('all')">文青系列</a>
				  </li>
				  <li class="nav-item">
				    <a class="nav-link" href="#" :class="{'active': selected=='吃貨'}"
				    @click.prevent="selected='吃貨'; getProducts('all')">吃貨系列</a>
				  </li>
				  <li class="nav-item">
				    <a class="nav-link" href="#" :class="{'active': selected=='輪子'}" 
				    @click.prevent="selected='輪子'; getProducts('all')">輪子系列</a>
				  </li>
				</ul>
				<!-- products -->
				<div class="row mt-4">
		      <div class="col-md-4 mb-4" v-for="item in filtData" :key="item.id">
		        <div class="card border-0 shadow">
		          <div class="u-item-img" :style="{backgroundImage: `url(${item.imageUrl})`}">
		          	<router-link class="u-item-cover" :to="`/product/${item.id}`">
		          			<div class="u-item-btn">See More</div>
		          	</router-link>
		          </div>
		          <div class="card-body">
		            <h6 class="card-title mt-2">
		            	<router-link class="text-dark font-weight-bold" :to="`/product/${item.id}`">
			            	{{ item.title }}
			            </router-link>
		            </h6>
		            <p class="card-text">{{ item.content }}</p>
		            <div class="h6 text-right" v-if="item.price">{{ item.price | currency }}</div>
		          </div>
		        </div>
		      </div>
		    </div>
			   <!-- pagination -->
				<nav aria-label="Page navigation example" v-if="selected==''">
				  <ul class="pagination justify-content-center">
				  	<!-- prev page icon -->
				    <li class="page-item" :class="{'disabled': !pagination.has_pre}" v-if="!allPage">
				      <a class="page-link" href="#" aria-label="Previous" @click.prevent="getProducts(pagination.current_page-1)">
				        <span aria-hidden="true">&laquo;</span>
				        <span class="sr-only">Previous</span>
				      </a>
				    </li>
				  	<!-- all pages icon -->
				    <li class="page-item" v-for="page in pagination.total_pages" :key="page" v-if="!allPage"
				    :class="{'active': page==pagination.current_page}">
				    	<a class="page-link" href="#" @click.prevent="getProducts(page)">{{page}}</a>
				    </li>
				  	<!-- next page icon -->
				    <li class="page-item" :class="{'disabled': !pagination.has_next}" v-if="!allPage">
				      <a class="page-link" href="#" aria-label="Next" @click.prevent="getProducts(pagination.current_page+1)">
				        <span aria-hidden="true">&raquo;</span>
				        <span class="sr-only">Next</span>
				      </a>
				    </li>
				    <!-- see all -->
				    <li class="page-item">
				    	<a class="page-link" href="#" @click.prevent="getProducts('all')" v-if="!allPage">See All</a>
				    </li>
				    <li class="page-item">
				    	<a class="page-link" href="#" @click.prevent="getProducts(1)" v-if="allPage">Back to pages</a>
				    </li>
				  </ul>
				</nav>
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
			products: [],
			selected: '',
			pagination: {},
			allPage: false,
		}
	},
	methods: {
		getProducts(page = 1) {
      const vm = this;
      let api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/products`;
      if (page == 'all') {
				api += `/all`;
				vm.allPage = true;
			} else {
				api += `?page=${page}`;
				vm.allPage = false;
			}
			vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.products = response.data.products.filter(function(item){
        	return item.is_enabled == 1
        });
        vm.isLoading = false;
        // console.log(response.data);
        if (page !== 'all') { 
        	vm.pagination = response.data.pagination
        } else {
        	vm.products = vm.products.reverse()
        }
      });
    },
	},
	computed: {
		filtData() {
			var vm = this;
			if (vm.selected==''){
				return vm.products;
			} else {
				return vm.products.filter(function(item){
					return item.category == vm.selected;
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
*{
	position:relative;
	box-sizing:border-box;
}
/*-----------------*/
/*quote
/*-----------------*/
.quote{
  font-family: 'Oxygen Mono', monospace;
  line-height:30px;
}
.quote span{
	display: inline-block;
}
.fa-quote-left{
	color:#c3c0c0;
	font-size:60px;
	margin-right:20px;
}
/*-----------------*/
/*shop
/*-----------------*/
.u-item-img{
	height: 180px; 
	background-size: cover; 
	background-position: center;
}
.u-item-cover{
	background-color: rgba(0,0,0,0.5);
	position:absolute;
	top:0;
	left:0;
	width:100%;
	height:100%;
	cursor:pointer;
	visibility: hidden;
	opacity:0;
	transition: all .2s;
}
.u-item-btn{
	position:absolute;
	top:50%;
	left:50%;
	transform: translate(-50%,-50%);
	padding:5px 10px;
	border:1px solid;
	color:#fff;
	text-decoration: none;
}
.u-item-img:hover .u-item-cover{
	visibility: visible;
	opacity:1;
}
.u-item-img:hover .u-item-btn{
	color:#fff;
	text-decoration: none;
}

</style>