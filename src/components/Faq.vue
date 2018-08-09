<template>
	<div class="u-faq-bg">
		<div class="container py-4">
			<div class="row justify-content-center">
				<div class="col-12">
					<h5 class="my-4"><b>不讀則已一讀驚人的購物指南</b></h5>
					<div id="accordion" class="mb-4">
					  <div class="card">
					    <div class="card-header" id="headingOne">
					      <h5 class="mb-0">
					        <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
					          關於寄送時間
					        </button>
					      </h5>
					    </div>
					    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
					      <div class="card-body">
					      	下單後依老闆的心情出貨，若久候多時仍未收到商品，歡迎來電關心老闆：02-2222-9487。
					      </div>
					    </div>
					  </div>
					  <div class="card">
					    <div class="card-header" id="headingTwo">
					      <h5 class="mb-0">
					        <button class="btn btn-link" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
					          如何挑選商品
					        </button>
					      </h5>
					    </div>
					    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
					      <div class="card-body">
					      	購物就像聯誼，選第一眼看到最喜歡的那個就對了。<br>
									<router-link class="btn btn-info text-white mt-2" to="/">聯誼去</router-link>
					      </div>
					    </div>
					  </div>
					  <div class="card">
					    <div class="card-header" id="headingThree">
					      <h5 class="mb-0">
					        <button class="btn btn-link" data-toggle="collapse" data-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
					          經濟拮据怎麼辦
					        </button>
					      </h5>
					    </div>
					    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
					      <div class="card-body">
					      	那就把存款都花掉吧，讓自己窮困潦倒沒有後路退，就會有認真賺錢的動力了。<br>
									<router-link class="btn btn-info text-white mt-2" to="/">破釜沉舟去</router-link>
					      </div>
					    </div>
					  </div>
					</div>
					<a class="btn btn-info text-white mt-2" href="#"  @click.prevent="beforePath()">Back</a>
				</div>
			</div>
		</div>
	</div>
		
</template>

<script>
export default {
	data(){
		return {}
	},
	methods: {
		beforePath() {
			this.$router.back();
		}
	}
}
</script>

<style>
.u-faq-bg{
	background: url('../../static/image/yellow-wall.jpg');	
	background-size: cover;
	-webkit-background-size: cover;
	background-position: center;
}
.u-faq-bg:before{
	content: "";
	width:100%;
	height:100%;
	position:absolute;
	top:0;
	left:0;
	background-color: rgba(256,256,256,0.3);
}
</style>