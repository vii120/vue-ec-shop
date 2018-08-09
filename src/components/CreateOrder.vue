<template>
	<div class="container">
		<loading :active.sync="isLoading"></loading>
		<div class="row justify-content-center mt-4 mb-0 mb-md-4">
			<div class="col-md-10">
				<!-- header -->
				<h3 class="text-center"><b>購物車清單</b></h3>
				<div class="row justify-content-center mt-4 text-center">
					<div class="col-md-4"><span class="step" :class="{'current-step':step==1}">1. 確認購買清單</span></div>
					<div class="col-md-4"><span class="step" :class="{'current-step':step==2}">2. 填寫收件資料</span></div>
					<div class="col-md-4"><span class="step" :class="{'current-step':step==3}">3. 完成訂單！</span></div>
				</div>
			</div>
		</div>
		<!-- step1: shopping list -->
		<div class="row justify-content-center mb-4" v-if="step==1">
			<div class="col-md-10">
				<table class="table mt-4">
				  <thead>
				    <th class="text-center" v-if="!cartEmpty">
				    	<div class="u-clear text-danger" @click="removeAllCart()">
				    		<i class="far fa-trash-alt mr-1"></i>
				    		<b class="d-none d-md-inline-block">全部清空</b>
				    	</div>
				    </th>
				    <th>商品</th>
				    <th>數量</th>
				    <th v-if="cart.final_total!==cart.total">折扣價</th>
				    <th v-else class="text-right">售價</th>
				  </thead>

				  <tbody>
				  	<tr v-if="cartEmpty">購物車還沒有東西哦！</tr>
				    <tr v-for="(item, key) in cart.carts" :key="key">
				      <td class="align-middle text-center">
				        <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCart(item.id)">
				          <i class="far fa-trash-alt"></i>
				        </button>
				      </td>
				      <td class="align-middle">
				        {{ item.product.title }}
				        <div class="text-success" v-if="item.coupon">已套用優惠券	</div>
				      </td>
				      <td class="align-middle">{{ item.qty }}{{ item.product.unit }}</td>
				      <td class="align-middle text-right">{{ item.final_total | currency }}</td>
				    </tr>
				  </tbody>
				  <tfoot v-if="!cartEmpty">
				    <tr>
				      <td colspan="3" class="text-right">總計金額</td>
				      <td class="text-right">{{ cart.total | currency }}</td>
				    </tr>
				    <tr v-if="cart.final_total!==cart.total">
				      <td colspan="3" class="text-right text-success">折扣後金額</td>
				      <td class="text-right text-success">{{ cart.final_total | currency }}</td>
				    </tr>
				    <tr>
				      <td colspan="4" class="text-primary font-weight-bold">
				      	<i class="fab fa-angellist"></i><i class="fab fa-angellist"></i><i class="fab fa-angellist"></i>
				      	首次購物享有免運費優惠！
				      </td>
				    </tr>
				  </tfoot>
				</table>
				<div class="input-group mb-3 input-group-sm" v-if="!cartEmpty">
				  <input type="text" class="form-control py-2 pl-3" placeholder="請輸入優惠碼" v-model="coupon_code">
				  <div class="input-group-append">
				    <button class="btn btn-outline-secondary" type="button" @click="addCoupon">套用優惠碼</button>
				  </div>
				</div>
			</div>
		</div>
		<!-- step2: customer info -->
		<div class="row justify-content-center mb-4" v-if="step==2">
			<!-- shopping list details -->
			<div class="col-md-8 mb-4">
				<div id="accordion">
				  <div class="card">
				    <div class="card-header" id="headingOne">
				      <h5 class="mb-0">
				        <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">查看購物車明細</button>
				      </h5>
				    </div>
				    <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
				      <div class="card-body">
				      	<table class="table my-2">
								  <thead>
								    <th>商品</th>
								    <th width=60>數量</th>
								    <th min-width=60 v-if="cart.final_total!==cart.total">折扣價</th>
								    <th min-width=60 v-else class="text-right">售價</th>
								  </thead>
								  <tbody>
								    <tr v-for="(item, key) in cart.carts" :key="key">
								      <td class="align-middle">{{ item.product.title }}</td>
								      <td class="align-middle">{{ item.qty }}{{ item.product.unit }}</td>
								      <td class="align-middle text-right">{{ item.final_total | currency }}</td>
								    </tr>
								  </tbody>
								  <tfoot>
								    <tr class="text-danger">
								      <td colspan="2" class="text-right">
									      <span v-if="cart.final_total==cart.total">總計金額</span>
									      <span v-else>折扣後金額</span>
									    </td>
								      <td class="text-right">{{ cart.final_total | currency }}</td>
								    </tr>
								  </tfoot>
								</table>
				      </div>
				    </div>
				  </div>
				</div>
			</div>
			<!-- form -->
		  <form class="col-md-8">
		    <div class="form-group">
		      <label for="useremail">Email</label>
		      <input type="email" class="form-control" name="email" id="useremail" v-validate="'required|email'"
		      :class="{'is-invalid': errors.has('email')}"
		      v-model="form.user.email" placeholder="請輸入 Email">
		      <span class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</span>
		    </div>
		    <div class="form-group">
		      <label for="username">收件人姓名</label>
		      <input type="text" class="form-control" name="name" id="username" v-validate="'required'"
		      :class="{'is-invalid': errors.has('name')}"
		      v-model="form.user.name" placeholder="輸入姓名">
		      <span class="text-danger" v-if="errors.has('name')">姓名欄位不可空白</span>
		    </div>
		    <div class="form-group">
		      <label for="usertel">收件人電話</label>
		      <input type="tel" class="form-control" id="usertel" v-model="form.user.tel" placeholder="請輸入電話">
		    </div>
		    <div class="form-group">
		      <label for="useraddress">收件人地址</label>
		      <input type="address" class="form-control" name="address" id="useraddress" v-validate="'required'"
		      :class="{'is-invalid': errors.has('address')}"
		      v-model="form.user.address" placeholder="請輸入地址">
		      <span class="text-danger" v-if="errors.has('address')">地址欄位不可空白</span>
		    </div>
		    <div class="form-group">
		      <label for="useraddress">留言</label>
		      <textarea name="" id="" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
		    </div>
		  </form>
		</div>
		<!-- step3: order complete -->
		<div class="my-5 row justify-content-center" v-if="step==3">
		  <form class="col-md-6" @submit.prevent="payOrder">
		    <table class="table">
		      <thead>
		        <th>品名</th>
		        <th>數量</th>
		        <th>單價</th>
		      </thead>
		      <tbody>
		        <tr v-for="item in order.products" :key="item.id">
		          <td class="align-middle">{{ item.product.title }}</td>
		          <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
		          <td class="align-middle text-right">{{ item.final_total }}</td>
		        </tr>
		      </tbody>
		      <tfoot>
		        <tr>
		          <td colspan="2" class="text-right">總計</td>
		          <td class="text-right">{{ order.total }}</td>
		        </tr>
		      </tfoot>
		    </table>

		    <table class="table">
		      <tbody>
		        <tr>
		          <th>Email</th>
		          <td>{{ order.user.email }}</td>
		        </tr>
		        <tr>
		          <th>姓名</th>
		          <td>{{ order.user.name }}</td>
		        </tr>
		        <tr>
		          <th>收件人電話</th>
		          <td v-if="order.user.tel==''">未填寫</td>
		          <td v-else>{{ order.user.tel }}</td>
		        </tr>
		        <tr>
		          <th>收件人地址</th>
		          <td>{{ order.user.address }}</td>
		        </tr>
		        <tr>
		          <th>付款狀態</th>
		          <td>
		            <span v-if="!order.is_paid">尚未付款</span>
		            <span v-else class="text-success">付款完成</span>
		          </td>
		        </tr>
		      </tbody>
		    </table>
		    <div class="text-right" v-if="order.is_paid === false">
		      <button class="btn btn-danger">確認付款去</button>
		    </div>
		  </form>
		</div>

		<!-- button -->
		<div class="row justify-content-center my-4">
			
			<div class="col-md-6 order-md-2 u-orderbtn-step" v-if="cart.total!==0">
				<button type="button" class="btn btn-info d-block mr-2" v-if="step==2" @click="stepChange('prev')">
					上一步
				</button>
				<button type="button" class="btn btn-info d-block" v-if="step==1" @click="stepChange()">
					下一步：填寫收件資料
				</button>
				<button type="button" class="btn btn-danger d-block" v-if="step==2" @click="createOrder()">
					下一步：完成訂單！
				</button>
			</div>
			<div :class="{'col-md-4':cart.total!==0}" class="order-md-1 u-orderbtn-shop">
				<router-link class="nav-item btn btn-outline-info d-inline-block" to="/"> &lt;&lt; 我要繼續逛</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import $ from 'jquery';
export default {
	data () {
		return {
			step: 1,
			coupon_code: '',
			form: {
      	user: {
      		name: '',
      		email: '',
      		tel: '',
      		address: '',
      	},
      	message: '',
      },
      orderId:'',
			order: {
				user: {
      		name: '',
      		email: '',
      		tel: '',
      		address: '',
      	}
			},
		}
	},
	methods: {
    ...mapActions(['getCart', 'removeAllCart']),
    removeCart(id) {
      this.$store.dispatch('removeCart', id);
    },
    addCoupon() {
      this.$store.dispatch('addCoupon', this.coupon_code);
    },
    stepChange(dir) {
    	const vm = this;
    	document.body.scrollTop = 0;
    	document.documentElement.scrollTop = 0;
    	if (vm.step==1){
    		vm.step = 2;
    	} else {
    		if (dir=='prev') {
    			vm.step -= 1
    		} else {
    			vm.step +=1;
    		}
    	}
    },
    createOrder() {
      const vm = this;
      const url = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/order`;
      const order = vm.form;
      this.$validator.validate().then((result) => {
        if (result) {
          this.$http.post(url, { data: order }).then((response) => {
            if (response.data.success){
            	vm.step = 3;
            	vm.orderId = response.data.orderId;
              vm.getOrder();
              vm.$store.dispatch('getCart');
              alert('訂單已建立!');
            } else {
              alert('訂單建立失敗!')
            }
          });
        } else {
          alert('訂單欄位不完整')
        }
      });
    },
    getOrder() {
			const vm = this;
      const url = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/order/${vm.orderId}`; 
      this.$http.get(url).then((response) => {
      	vm.order = response.data.order;
      });
		},
		payOrder() {
			const vm = this;
      const url = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/pay/${vm.orderId}`; 
      this.$http.post(url).then((response) => {
      	if (response.data.success) {
      		vm.getOrder();
      	}
      });
		}
  },
  computed: {
    ...mapGetters(['cart', 'isLoading']),
    cartEmpty(){
      if (this.cart.carts.length==0){
        return true
      } else {
        return false
      }
    }
  },
	created() {
    this.getCart();
  },
}
</script>

<style>
/*-----------------*/
/*step description
/*-----------------*/
.step{
	display:inline-block;
	color:#b1b1b1;
	font-weight: bold;
	border-bottom:3px solid;
	border-color:transparent;
	padding-bottom: 2px;
}
@media (max-width:768px) {
	.step{margin-bottom: 5px;}
}
.current-step{
	color:#000;
	border-color:#000;
}
/*-----------------*/
/*step button
/*-----------------*/
.u-orderbtn-step{
	display: flex;
	justify-content: flex-end;
}
.u-orderbtn-shop{
	text-align: center;
	margin-top:36px;
}
@media (min-width:768px) {
	.u-orderbtn-shop{
		text-align: left;
		margin-top:0px;
	}
}
/*-----------------*/
/*clear button
/*-----------------*/
.u-clear{
	cursor: pointer;
}
</style>