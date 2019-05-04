import Taro, { Component } from '@tarojs/taro'
import { View,Navigator,Image } from '@tarojs/components'
import './index.less'
import jiangli  from '../../imgs/jiangli.png'

import QQMapWX from '../../qqmap-wx-jssdk1.0/qqmap-wx-jssdk.js'
import MtLocation  from '../../components/MtLocation/Index.jsx'
import MtSwiper  from '../../components/MtSwiper/Index.jsx'
import MyNav  from '../../components/MyNav/Index.jsx'
import MyGroup  from '../../components/MyGroup/Index.jsx'
import MtAd  from '../../components/MtAd/Index.jsx'
import MtShop  from '../../components/MtShop/Index.jsx'

var qqmapsdk = new QQMapWX({
  key: 'FQLBZ-474AU-DGTVG-2DOZU-STEE3-JQFL4' // 必填
});

export default class Index extends Component {
  constructor(props){
    super(props);

    this.state = {
      city: '',
      swiperArr: [],
      navArr: [],
      groupArr: [],
      adArr: [],
      shopArr: []
    }
  }

  config = {
    navigationBarTitleText: '美团'
  }

  // 获取用户的地理位置信息
  async getLocation(){
    let point = await Taro.getLocation({});
    let latitude = point.latitude
    let longitude = point.longitude

    let city = (await this.reverseGeocoder({latitude,longitude})).result.address_component.city

    this.setState({
      city
    });


    // 获取商店信息
    let shopInfoArr = (await this.getShopArr());
    // 商店的经纬度数组
    let shopArrDis = shopInfoArr.map((v) => {
      return {
        latitude: v.distance.lat,
        longitude: v.distance.lng
      }
    })

    //发送请求计算距离
    let shopDis = (await this.calculateDistance({
      from: {latitude,longitude},
      to: shopArrDis
    })).result.elements;

    let newShopDis = shopInfoArr.map((v,i) => {
      v.dis = shopDis[i].distance;
      return v;
    })

    this.setState({
      shopArr: newShopDis
    })


  }

  // 获取轮播图的数据
  async getSwiperArr(){
    let swiperArr = (await Taro.request({
      url: "https://nei.netease.com/api/apimock/f24b78ec29760fc9073f012abfd4c4f3/index/swiper"
    })).data.data;

    this.setState({
      swiperArr
    })
  }

  // 获取首页导航的数据
  async getNavArr(){
    let navArr = (await Taro.request({
      url: "https://nei.netease.com/api/apimock/f24b78ec29760fc9073f012abfd4c4f3/index/entry"
    })).data.data;

    this.setState({
      navArr
    })
  }

  // 获取好货拼团的数据
  async getGroupArr(){
    let groupArr = (await Taro.request({
      url: "https://nei.netease.com/api/apimock/f24b78ec29760fc9073f012abfd4c4f3/index/pingtuan"
    })).data.data;

    this.setState({
      groupArr
    })
  }

  //获取广告的数据
  async getAdArr(){
    let adArr = (await Taro.request({
      url: "https://nei.netease.com/api/apimock/f24b78ec29760fc9073f012abfd4c4f3/index/ad"
    })).data.data;

    this.setState({
      adArr
    })
  }

  // 获取猜你喜欢的数据
  async getShopArr(){
    let shopArr = (await Taro.request({
      url: "https://nei.netease.com/api/apimock/f24b78ec29760fc9073f012abfd4c4f3/index/like"
    })).data.data;

    return shopArr
  }

  componentDidMount () {
    this.getLocation();
    this.getSwiperArr();
    this.getNavArr();
    this.getGroupArr();
    this.getAdArr();
    // this.getShopArr();
   }

  reverseGeocoder(obj){
    return new Promise((r,j) => {
      qqmapsdk.reverseGeocoder({
        location: {
          latitude: obj.latitude,
          longitude: obj.longitude
        },
        success: function(res){
          r(res);
        },
        fail: function(res){
          j(res);
        }
      })
    })
  }

  calculateDistance(obj){
    return new Promise((r,j) => {
      qqmapsdk.calculateDistance({
        from: obj.from || '', //若起点有数据则采用起点坐标，若为空默认当前地址
        to: obj.to, //终点坐标
        success: function(res) {//成功后的回调
          r(res);
        },
        fail: function(error) {
          j(error);
        },
      })
    })
  }

  render () {
    return (
      <View className='index'>
        <MtLocation city={this.state.city} />
        <MtSwiper swiper_arr = {this.state.swiperArr} />
        <MyNav nav_arr={this.state.navArr}/>
        <Navigator>
          <Image mode="widthFix" style="width:100%" src={jiangli}></Image>
        </Navigator>
        <MyGroup group_arr={this.state.groupArr} />
        <MtAd ad_arr={this.state.adArr} />
        <MtShop shop_arr={this.state.shopArr}/>
      </View>
    )
  }
}
