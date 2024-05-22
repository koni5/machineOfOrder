<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <el-scrollbar height="100vh">
          <el-menu
              :default-active="category[0]?.id"
              class="el-menu-vertical-demo"
          >
            <el-menu-item :index="item.id" v-for="item in category">
              <span @click="getDish(item.id)" style="font-size: 20px;padding-top: 20px">{{ item.name }}</span>
            </el-menu-item>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-main>
        <el-scrollbar height="100vh">
          <el-row :gutter="20">
            <el-col :span="8" v-for="item in dishList" :key="item.id">
              <el-card style="max-width: 480px" shadow="hover">
                <template #footer>
                  <p>{{ item.name }}</p>
                  <div class="dishInfo"><span>配料:{{ item.description }}</span>
                    <span>价格:{{ item.price }}￥</span>
                    <el-button @click="flavorPopup(item.name,item.id)" style="margin-top: 10px" type="primary" round>
                      选择口味
                    </el-button>
                  </div>
                </template>
                <img
                    :src="item.image"
                    style="width: 100%;border-radius: 5px;height: 200px;text-align: center;display: block;margin: 0 auto; "
                />

              </el-card>
            </el-col>
          </el-row>
        </el-scrollbar>
      </el-main>
    </el-container>
    <!-- 购物车里没有订单的状态 -->
    <div class="footer_order_buttom" v-if="true">
      <div class="order_number">
        <img
            src="../../assets/package.png"
            class="order_number_icon"
            alt="package"
        />
      </div>
      <div class="order_price">
        <span class="ico">您还未挑选商品</span>
      </div>
      <div class="order_but">去结算</div>
    </div>
  </div>
  <!--  口味选择弹窗-->
  <el-dialog
      @close="closeFlavorPop"
      :title="dishName"
      v-model="flavorVisible"
      width="30%"
      center>
    <div v-for="flavor in flavors" :key="flavor.id">
      <h3>{{ flavor.name }}</h3>
      <el-radio-group v-model="selectedFlavors[flavor.name]">
        <el-radio-button
            v-for="item in flavor.value.split(',')"
            :key="item"
            :label="item"
        >
          {{ item }}
        </el-radio-button>
      </el-radio-group>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addToCart">添加到购物车</el-button>
      </span>
  </el-dialog>
  <!--  购物车详情弹窗-->
  <el-drawer
      v-model="popCart"
      title="I am the title"
      direction="btt"
  >
    <PopCart></PopCart>
  </el-drawer>
</template>
<script setup>
import {useShopStore} from "@/stores/index.js";
import {getCategoryAPI, getDishAPI} from "@/service/menu.js";
import {addToCartAPI} from "@/service/shoppingCart.js";
import {onMounted, ref} from "vue";
import PopCart from "@/components/popCart.vue";
//店铺仓库信息
const shopStore = useShopStore()
//购物车弹窗控制
let popCart = ref(true)
// 添加到购物车
const addToCart = async () => {
  // 检查口味是否选择完整
  for (let flavor of flavors.value) {
    if (!selectedFlavors.value[flavor.name]) {
      alert(`请选择${flavor.name}`);
      return; // 口味未选择完整，不执行添加到购物车操作
    }
  }
  let selectedData = flavors.value.map(flavor => `${flavor.name}:${selectedFlavors.value[flavor.name]}`).join(';');
  // console.log(selectedData)
  flavorVisible.value = false;
  let res = await addToCartAPI({dishId:dishId.value, dishFlavor: selectedData, shopId: shopStore.info.id})
  // console.log(res.data)
}
// 存储用户选择的口味数据
let selectedFlavors = ref({});
//口味弹窗
let flavorVisible = ref(false)
//口味列表
let flavors = ref()
//选择口味时标题中的菜品名字
let dishName = ref()
//菜品id
let dishId = ref()
//打开口味弹窗
const flavorPopup = (val1, val2) => {
  flavorVisible.value = true;
  let item = category.value.find(val => val.id === categoryId)
  flavors.value = item.flavors
  dishName.value = val1
  dishId.value = val2
  // console.log(flavors.value)
}
//关闭口味弹窗
const closeFlavorPop = () => {
  selectedFlavors.value = {}
  flavorVisible.value = false
}
//存储菜品分类
let category = ref([])
//获取菜品分类的函数
const getCategory = async () => {
  let res = await getCategoryAPI()
  // console.log(res.data)
  category.value = res.data.data
}
//用于口味选择
let categoryId = ref()
//存储对应分类下的菜品变量
let dishList = ref()
//获取菜品的函数
const getDish = async (val) => {
  let res = await getDishAPI(val)
  // console.log(res.data)
  dishList.value = res.data.data
  categoryId = val
}
onMounted(async () => {
  await getCategory()
  await getDish(category.value[0].id);
})
</script>
<style scoped lang="scss">
.footer_order_buttom {
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  bottom: 0;
  width: 99%;
  height: 60px;
  margin: 0 auto;
  background: #3a3a3a;
  border-radius: 25px;
  box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.25);
  z-index: 99;
  padding: 0 10px;
  box-sizing: border-box;

  .order_number {
    position: relative;
    width: 80px;

    .order_number_icon {
      display: block;
      width: 80px;
      height: 80px;
      left: 10px;
      margin-bottom: 25px;
    }

    .order_dish_num {
      position: absolute;
      display: inline-block;
      z-index: 9;
      min-width: 12px;
      height: 24px;
      line-height: 24px;
      padding: 0 12px;
      left: 60px;
      font-size: 14px;
      top: -8px;
      border-radius: 12px;
      background-color: #e94e3c;
      color: #fff;
      font-weight: 500;
    }
  }

  .order_price {
    flex: 1;
    text-align: left;
    color: #fff;
    line-height: 60px;
    padding-left: 20px;
    box-sizing: border-box;
    font-size: 24px;
    font-family: DIN, DIN-Medium;
    font-weight: 500;

    .ico {
      font-size: 24px;
      color: white;
    }
  }

  .order_but {
    background-color: #6a6a6a;
    width: 140px;
    height: 40px;
    line-height: 40px;
    border-radius: 20px;
    color: #fff;
    text-align: center;
    margin-top: 10px;
  }
}


.dialog-footer {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.dishInfo {
  display: flex;
  flex-direction: column;
}

.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>