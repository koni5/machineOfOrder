<template>
  <div class="cart_pop">
    <div class="top_title">
      <div class="tit">购物车</div>
      <div class="clear">
        <el-icon color="#409eff">
          <Delete/>
        </el-icon>
        <span @click="clearCart" class="clear-des">清空</span>
      </div>
    </div>
    <div class="card_order_list">
      <div class="type_item" v-for="(item, index) in props.cartList" :key="item.id">
        <div class="dish_img">
          <img
              :src="item.image"
              class="dish_img_url"
              alt="dish"
          />
        </div>
        <div class="dish_info">
          <div class="dish_name">{{ item.name }}</div>
          <div class="dish_dishFlavor">{{ item.dishFlavor }}</div>
          <div class="dish_price">
            <span class="ico">￥</span>
            {{ item.amount }}
          </div>
          <div class="dish_active">
            <el-icon color="#409eff" @click="deleteDish(item.id)">
              <Remove/>
            </el-icon>
            <span class="dish_number">{{ item.number }}</span>
            <el-icon color="#409eff" @click="addDish(item.id)">
              <CirclePlus/>
            </el-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';

let props = defineProps(['cartList'])
const clearCart = () => {
  cartList.value = [];
};

const deleteDish = (id) => {
  const index = cartList.value.findIndex(item => item.id === id);
  if (index !== -1) {
    cartList.value[index].number -= 1;
    if (cartList.value[index].number === 0) {
      cartList.value.splice(index, 1);
    }
  }
};

//购物车菜品加1
const addDish = async (shopCartId) => {
  // console.log(shopCartId)
  await addOneAPI(shopCartId);
  props.getCartList();
};
</script>

<style lang="scss" scoped>
.cart_pop {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 55vh;
  background-color: #fff;
  border-radius: 12px 12px 0 0;
  padding: 20px 30px;
  box-sizing: border-box;
  overflow-y: auto;

  .top_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: solid 1px #ebeef5;
    padding-bottom: 10px;

    .tit {
      font-size: 24px;
      font-weight: bold;
      color: #20232a;
    }

    .clear {
      color: #999999;
      font-size: 16px;
      font-weight: 400;
      display: flex;
      align-items: center;

      .clear_icon {
        width: 16px;
        height: 16px;
        margin-right: 5px;
      }

      .clear-des {
        cursor: pointer;
      }
    }
  }

  .card_order_list {
    background-color: #fff;
    padding-top: 10px;
    box-sizing: border-box;

    .type_item {
      display: flex;
      margin-bottom: 20px;
      border-bottom: solid 1px #ebeef5;
      padding-bottom: 20px;

      .dish_img {
        width: 80px;
        margin-right: 20px;

        .dish_img_url {
          display: block;
          width: 80px;
          height: 80px;
          border-radius: 8px;
        }
      }

      .dish_info {
        flex: 1;
        position: relative;

        .dish_name {
          font-size: 18px;
          color: #333333;
          font-weight: 600;
        }

        .dish_dishFlavor {
          font-size: 16px;
          color: #666666;
          margin-top: 5px;
        }

        .dish_price {
          font-size: 18px;
          color: #e94e3c;
          position: absolute;
          bottom: 10px;

          .ico {
            font-size: 14px;
          }
        }

        .dish_active {
          position: absolute;
          right: 10px;
          bottom: 10px;
          display: flex;
          align-items: center;

          .dish_add,
          .dish_red {
            width: 24px;
            height: 24px;
            cursor: pointer;
          }

          .dish_number {
            margin: 0 10px;
            font-size: 18px;
          }
        }
      }
    }
  }
}
</style>
